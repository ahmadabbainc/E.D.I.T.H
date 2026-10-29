# Explainer Engine

Write a scene file → get a finished explainer MP4. No video-generation tool: Claude writes JS/SVG, Chromium draws it, ffmpeg encodes it.

```
npm install && npx playwright install chromium     # once (ffmpeg must be on PATH)
npm run dev                                         # live preview with scrubber
npm run render browser-engines                      # -> out/browser-engines.mp4
```

## How the reference video is made (what to copy)

| Layer in the reference | How it is built here |
|---|---|
| Flat cream background, one green accent, thin dark outlines | 6 CSS variables in `engine/style.css` |
| Rounded app-icon tiles that pop in with overshoot | `type:"card"`, `enter:"pop"` (back-ease) |
| Hub-and-spoke diagram, lines drawing themselves | `type:"line"` with `enter:"draw"` (SVG stroke-dashoffset) |
| Boxed callouts ("Chromium · open source") with a leader line | `type:"label"` + `type:"line"` |
| Pill tags ("Gecko", "WebKit") | `type:"pill"` |
| Coin flying from Google to Firefox | `to:[{x,y,dur}]` keyframes |
| Isometric stacks / slabs (35,000,000+ lines) | `type:"box3d"` (CSS 3D, rotateX/rotateZ) |
| Isometric machines, laptop, sandbox rooms | `type:"svg"` — Claude draws inline SVG; reuse as symbols |
| Slow push-in / pan | `camera:{from:{x,y,z},to:{x,y,z}}` per scene |
| Bottom caption, spoken words turn green one by one | `say:"..."` → karaoke spans, timed per word |
| Scene change: previous objects fade, new ones enter | `clear:true` |
| Voiceover + hard cuts on the sentence | `voice.mp3` + `timings` |
| Big end-card "Follow" with cursor | normal scene with `card` + `pill` + moving `svg` cursor |
| App-icon wall (100+ logos popping, then fading) | generate items in a JS loop (`Array.from({length:100})`) with staggered `at` |
| Zoom into a laptop screen, text typing | `svg`/`html` item + camera zoom; typing = reveal text by `t` (see ideas) |

The reference is ~129s, 576×1024, 30fps, ~40 sentence-scenes, each 1 sentence = 1 scene = 1 visual idea. That rhythm is the real secret: **one sentence, one picture, one motion.**

## The pipeline (why it is simple)
1. `video.js` = pure data (scenes + items).
2. `engine/player.js` turns it into DOM and exposes `seek(t)`; no timers, so every frame is reproducible.
3. `render.mjs` loops `seek(t)` → screenshot (JPEG q92) → pipes into **one** ffmpeg H.264 encode (+ optional audio).
4. `.github/workflows/render.yml` renders on every push and publishes the studio + MP4s on GitHub Pages.

## Voiceover options (pick any)
- Free/offline: Piper, Kokoro, espeak-ng.  Free/online: `edge-tts`.  Paid: ElevenLabs, OpenAI TTS.
- Generate one clip per scene, measure lengths, put them in `export default {timings:[..]}`, concatenate to `voice.mp3`.
- Background music: `music.mp3` is mixed at 12% automatically.

## More possibilities (all within the same engine)
Lottie / Rive / Three.js / D3 charts inside an `html` item · AI-generated SVG icons (Iconify, Simple Icons) · typewriter code blocks · number counters · progress bars · map/zoom reveals · subtitle export (.srt from `say`) · 16:9 and 1:1 exports (change `width/height`) · batch-render a whole series · templates per episode (`npm run new <name>`) · GitHub Action that renders on a schedule · in-browser export with WebCodecs (no server needed).

## Using it with Claude Code
Open this repo in Claude Code (it reads `CLAUDE.md`) and say: *"New video: how DNS works, 30 seconds, same style."*
