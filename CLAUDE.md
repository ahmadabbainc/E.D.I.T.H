# Explainer Engine — instructions for Claude Code

You build vertical (576x1024, 30fps) explainer motion videos purely from code.

## To make a new video
1. `mkdir videos/<name>` and write `videos/<name>/video.js` (copy `videos/browser-engines/video.js`).
2. Add `{slug,title,topic}` for it to `videos.json` (the studio dropdown reads it).
3. Preview: `npm run dev` -> http://localhost:5173/?v=<name> (scrub the timeline).
4. Render: `npm run render <name>` -> `out/<name>.mp4`.
5. Look at 3-4 frames (ffmpeg -ss T -frames:v 1) BEFORE the full render; fix overlaps.

## Scene format
Scene = `{ say:"words spoken", min:seconds, clear?:true, camera?:{from:{x,y,z},to:{x,y,z}}, items:[...] }`
Item = `{ id?, type, x, y, at, enter, keep?, until?, float?, to?:[{at,dur,x,y,scale,opacity,rot,ease}] }`
- types: icon(kit,size) card(kit|html,size) label(text,sub) pill(text) text(text,size,color) svg/html(html) line(from,toId | x1,y1,x2,y2) box3d(w,d,h)
- enter: pop | fade | rise | left | right | draw | none      ease: lin|out|inOut|back|spring
- `keep:true` persists across scenes until a later scene has `clear:true`.
- Captions (karaoke highlight) come from `say`. Scene length = max(min, words*0.36+0.4) unless `dur` is set
  or `V.timings=[...]` (seconds per scene, e.g. measured from a voiceover) is exported.
- Layout rules: picture area y 80-720, captions occupy y 780-880 (keep clear), side margin 30px.
- Style lives in `engine/style.css` (6 CSS variables). Everything is deterministic: seek(t) -> pixels.

## Voice / music
`node tts.mjs <name>` writes voice.wav + timings.json (+ words.json) and render.mjs muxes them. Or drop your own voice.mp3/music.mp3 in the video folder.

## Icon kit
`engine/kit.js` has flat icons (laptop, phone, server, database, cloud, globe, lock, key, gear, chip, document, folder, person, search, bolt, code, shield, bulb, clock, coin, check, cross, question, arrow, wifi, mail, chat, cursor, stack, cube, rocket, star, heart, camera, tower, truck, bug). Use `{type:"icon",kit:"laptop"}`. Add new ones in the same style.

## AI generation pipeline
Web page (index.html) -> dispatches `.github/workflows/generate.yml` -> `generate.mjs` (LLM writes scenes JSON from `prompts/example.json` style + spec, `lint.mjs` checks overlaps and the LLM repairs) -> `tts.mjs` (Gemini voice, falls back to free Edge voice) -> `render.mjs` -> GitHub Release (mp4 + jpg). Secrets: GEMINI_API_KEY (required), ANTHROPIC_API_KEY (optional, better scripts).
Local: `node generate.mjs "topic" --seconds 60` then `node lint.mjs <slug>`.

## Isometric assets
`engine/iso-assets.js` draws detailed isometric objects in code (laptop, phone, monitor, browser, document, stack, chip, server, machine, database, router, satellite, solar, package). Use `{type:"iso",asset:"laptop",screen:"code",size:240}`. Add new ones in the same file using `Sc`/`Plane` from `engine/iso.js`.
