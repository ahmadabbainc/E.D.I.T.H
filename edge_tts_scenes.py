# Free neural voice fallback (Microsoft Edge TTS, no key). usage: python edge_tts_scenes.py texts.json outdir voice
import asyncio, json, sys, os
import edge_tts
texts, outdir, voice = json.load(open(sys.argv[1])), sys.argv[2], sys.argv[3]
os.makedirs(outdir, exist_ok=True)
async def one(i, text):
    for attempt in range(4):
        try:
            try: com = edge_tts.Communicate(text, voice, boundary="WordBoundary")
            except TypeError: com = edge_tts.Communicate(text, voice)
            words, audio = [], b""
            async for ch in com.stream():
                if ch["type"] == "audio": audio += ch["data"]
                elif ch["type"] == "WordBoundary": words.append({"t": ch["offset"] / 1e7, "d": ch["duration"] / 1e7, "w": ch["text"]})
            if not audio: raise RuntimeError("no audio")
            open(f"{outdir}/{i}.mp3", "wb").write(audio); json.dump(words, open(f"{outdir}/{i}.json", "w")); return
        except Exception as e:
            print("edge-tts retry", i, e, file=sys.stderr); await asyncio.sleep(2 * (attempt + 1))
    raise SystemExit(f"edge-tts failed for scene {i}")
async def main():
    for i, t in enumerate(texts):
        if t.strip(): await one(i, t)
asyncio.run(main())
