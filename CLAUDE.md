# Explainer Engine — instructions for Claude Code

You build vertical (576x1024, 30fps) explainer motion videos purely from code.

## To make a new video
1. `mkdir videos/<name>` and write `videos/<name>/video.js` (copy `videos/browser-engines/video.js`).
2. Add `<name>` to the `list` array in `index.html`.
3. Preview: `npm run dev` -> http://localhost:5173/?v=<name> (scrub the timeline).
4. Render: `npm run render <name>` -> `out/<name>.mp4`.
5. Look at 3-4 frames (ffmpeg -ss T -frames:v 1) BEFORE the full render; fix overlaps.

## Scene format
Scene = `{ say:"words spoken", min:seconds, clear?:true, camera?:{from:{x,y,z},to:{x,y,z}}, items:[...] }`
Item = `{ id?, type, x, y, at, enter, keep?, until?, float?, to?:[{at,dur,x,y,scale,opacity,rot,ease}] }`
- types: card(html|icon,size) label(text,sub) pill(text) text(text,size,color) svg/html(html) line(from,toId | x1,y1,x2,y2) box3d(w,d,h)
- enter: pop | fade | rise | left | right | draw | none      ease: lin|out|inOut|back|spring
- `keep:true` persists across scenes until a later scene has `clear:true`.
- Captions (karaoke highlight) come from `say`. Scene length = max(min, words*0.36+0.4) unless `dur` is set
  or `V.timings=[...]` (seconds per scene, e.g. measured from a voiceover) is exported.
- Layout rules: picture area y 80-720, captions occupy y 780-880 (keep clear), side margin 30px.
- Style lives in `engine/style.css` (6 CSS variables). Everything is deterministic: seek(t) -> pixels.

## Voice / music
Drop `voice.mp3` (and/or `music.mp3`) in the video folder; render.mjs muxes it. Set `timings` so scenes match the audio.
