// Icon kit: flat outlined icons in the reference style. Colours come from CSS variables, so themes re-skin them.
// Use in a scene:  {type:"icon", kit:"laptop", size:110, x:288, y:300}   or inside a card: {type:"card", kit:"lock"}
const S='fill="var(--card)" stroke="var(--ink)" stroke-width="2.6" stroke-linejoin="round" stroke-linecap="round"';
const A='fill="var(--accent)" stroke="var(--ink)" stroke-width="2.2" stroke-linejoin="round" stroke-linecap="round"';
const L='fill="var(--accent2)" stroke="var(--ink)" stroke-width="2.2" stroke-linejoin="round" stroke-linecap="round"';
const N='fill="none" stroke="var(--ink)" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"';
const G='fill="none" stroke="var(--accent)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"';
const gear=(()=>{let t='';for(let i=0;i<8;i++)t+=`<rect x="28" y="6" width="8" height="12" rx="2" ${S} transform="rotate(${i*45} 32 32)"/>`;return t})();
const ICONS={
 laptop:`<rect x="11" y="12" width="42" height="28" rx="3" ${S}/><rect x="15" y="16" width="34" height="20" rx="1.5" fill="var(--bg)" stroke="var(--ink)" stroke-width="1.8"/><path d="M19 22h16M19 27h24M19 32h12" ${G} stroke-width="2.4"/><path d="M5 44h54l-4 9H9z" ${S}/><path d="M26 48h12" ${N} stroke-width="2"/>`,
 phone:`<rect x="19" y="5" width="26" height="54" rx="6" ${S}/><rect x="23" y="11" width="18" height="36" rx="2" fill="var(--bg)" stroke="var(--ink)" stroke-width="1.8"/><path d="M26 18h12M26 24h8" ${G} stroke-width="2.4"/><circle cx="32" cy="53" r="2.2" fill="var(--ink)"/>`,
 server:`<rect x="9" y="8" width="46" height="14" rx="3" ${S}/><rect x="9" y="25" width="46" height="14" rx="3" ${S}/><rect x="9" y="42" width="46" height="14" rx="3" ${S}/><circle cx="17" cy="15" r="2.4" ${A}/><circle cx="17" cy="32" r="2.4" ${A}/><circle cx="17" cy="49" r="2.4" ${L}/><path d="M30 15h18M30 32h18M30 49h18" ${N} stroke-width="2"/>`,
 database:`<path d="M10 14v36c0 5 10 9 22 9s22-4 22-9V14" ${S}/><ellipse cx="32" cy="14" rx="22" ry="8" ${S}/><path d="M10 27c0 5 10 9 22 9s22-4 22-9M10 40c0 5 10 9 22 9s22-4 22-9" ${N} stroke-width="2"/>`,
 cloud:`<path d="M18 46a11 11 0 0 1-1-22 15 15 0 0 1 29 4 9.5 9.5 0 0 1 0 18z" ${S}/><path d="M24 37l8-8 8 8M32 29v16" ${G} stroke-width="3"/>`,
 globe:`<circle cx="32" cy="32" r="24" ${S}/><ellipse cx="32" cy="32" rx="10" ry="24" ${N} stroke-width="2"/><path d="M8 32h48M12 19h40M12 45h40" ${N} stroke-width="2"/><path d="M24 20c4 2 6 6 3 10s0 8 6 9" ${G} stroke-width="3"/>`,
 lock:`<path d="M20 28V19a12 12 0 0 1 24 0v9" ${N} stroke-width="4"/><rect x="12" y="28" width="40" height="29" rx="5" ${S}/><circle cx="32" cy="40" r="4.5" ${A}/><path d="M32 44v7" ${N} stroke-width="3"/>`,
 key:`<circle cx="22" cy="32" r="12" ${S}/><circle cx="22" cy="32" r="4" ${A}/><path d="M34 32h22M48 32v9M55 32v7" ${N} stroke-width="3.4"/>`,
 gear:`${gear}<circle cx="32" cy="32" r="18" ${S}/><circle cx="32" cy="32" r="7" ${A}/>`,
 chip:`<path d="M20 6v8M32 6v8M44 6v8M20 50v8M32 50v8M44 50v8M6 20h8M6 32h8M6 44h8M50 20h8M50 32h8M50 44h8" ${N} stroke-width="3"/><rect x="13" y="13" width="38" height="38" rx="5" ${S}/><rect x="23" y="23" width="18" height="18" rx="3" ${A}/>`,
 document:`<path d="M14 5h26l12 12v42H14z" ${S}/><path d="M40 5v12h12" ${S}/><path d="M21 28h22M21 36h22M21 44h14" ${G} stroke-width="3"/>`,
 folder:`<path d="M5 14h20l5 6h29v34H5z" ${S}/><path d="M5 26h54" ${N} stroke-width="2.2"/>`,
 person:`<circle cx="32" cy="20" r="11" ${S}/><path d="M10 58c0-15 9-22 22-22s22 7 22 22z" ${S}/><path d="M26 46l6 6 6-6" ${G} stroke-width="2.6"/>`,
 search:`<circle cx="27" cy="27" r="17" ${S}/><path d="M39.5 39.5L57 57" ${N} stroke-width="6"/><path d="M19 22a10 10 0 0 1 8-6" ${G} stroke-width="3"/>`,
 bolt:`<path d="M36 4L12 36h16l-4 24 28-34H35z" ${L}/>`,
 code:`<rect x="5" y="10" width="54" height="44" rx="5" ${S}/><path d="M5 22h54" ${N} stroke-width="2.2"/><circle cx="12" cy="16" r="1.8" fill="var(--ink)"/><circle cx="18" cy="16" r="1.8" fill="var(--ink)"/><path d="M26 31l-7 7 7 7M38 31l7 7-7 7" ${G} stroke-width="3.4"/>`,
 shield:`<path d="M32 4l22 8v18c0 14-9 24-22 30C19 54 10 44 10 30V12z" ${S}/><path d="M22 32l8 8 13-15" ${G} stroke-width="4.5"/>`,
 bulb:`<path d="M32 5a18 18 0 0 0-10 33c2 2 3 4 3 7h14c0-3 1-5 3-7A18 18 0 0 0 32 5z" ${L}/><path d="M25 51h14M27 57h10" ${N} stroke-width="3"/><path d="M26 28l6-6 6 6" ${N} stroke-width="2.2"/>`,
 clock:`<circle cx="32" cy="32" r="25" ${S}/><path d="M32 16v16l11 7" ${N} stroke-width="3.6"/><circle cx="32" cy="32" r="2.5" fill="var(--ink)"/>`,
 coin:`<circle cx="32" cy="32" r="25" ${L}/><circle cx="32" cy="32" r="18" fill="none" stroke="var(--ink)" stroke-width="1.8"/><path d="M38 23c-2-3-12-3-12 2s12 4 12 9-10 6-13 2M32 17v30" ${N} stroke-width="2.8"/>`,
 check:`<circle cx="32" cy="32" r="25" ${A}/><path d="M20 33l9 9 16-19" fill="none" stroke="var(--card)" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>`,
 cross:`<circle cx="32" cy="32" r="25" fill="#e0343c" stroke="var(--ink)" stroke-width="2.2"/><path d="M22 22l20 20M42 22L22 42" fill="none" stroke="var(--card)" stroke-width="6" stroke-linecap="round"/>`,
 question:`<circle cx="32" cy="32" r="25" ${L}/><path d="M23 25c0-6 5-9 10-9s9 3 9 8c0 7-9 7-9 14" ${N} stroke-width="4"/><circle cx="33" cy="48" r="2.8" fill="var(--ink)"/>`,
 arrow:`<path d="M8 32h42M36 17l16 15-16 15" ${N} stroke-width="5"/>`,
 wifi:`<path d="M6 25a36 36 0 0 1 52 0M14 34a24 24 0 0 1 36 0M22 43a12 12 0 0 1 20 0" ${N} stroke-width="4.4"/><circle cx="32" cy="52" r="4" ${A}/>`,
 mail:`<rect x="6" y="14" width="52" height="38" rx="5" ${S}/><path d="M7 17l25 20 25-20" ${N} stroke-width="3"/>`,
 chat:`<path d="M8 10h48a3 3 0 0 1 3 3v28a3 3 0 0 1-3 3H28l-12 12V44H8a3 3 0 0 1-3-3V13a3 3 0 0 1 3-3z" ${S}/><path d="M16 21h32M16 30h20" ${G} stroke-width="3"/>`,
 cursor:`<path d="M12 6l38 20-17 4-6 17z" ${S}/><path d="M33 31l12 18" ${N} stroke-width="4"/>`,
 stack:`<path d="M32 40L6 28l26-12 26 12z" ${S}/><path d="M6 36l26 12 26-12" ${N} stroke-width="2.6"/><path d="M6 44l26 12 26-12" ${N} stroke-width="2.6"/><path d="M32 24L16 28l16 8 16-8z" ${A}/>`,
 cube:`<path d="M32 5l22 12v26L32 59 10 43V17z" ${S}/><path d="M10 17l22 12 22-12M32 29v30" ${N} stroke-width="2.4"/><path d="M32 29l22-12v26L32 59z" fill="var(--accent2)" stroke="var(--ink)" stroke-width="2.2" stroke-linejoin="round"/>`,
 rocket:`<path d="M32 4c10 8 14 20 12 34H20C18 24 22 12 32 4z" ${S}/><circle cx="32" cy="24" r="5" ${A}/><path d="M20 30l-9 10 9 2M44 30l9 10-9 2" ${S}/><path d="M26 44l6 14 6-14" ${L}/>`,
 star:`<path d="M32 5l8 18 19 2-14 13 4 19-17-10-17 10 4-19L5 25l19-2z" ${L}/>`,
 heart:`<path d="M32 56S6 40 6 22a13 13 0 0 1 26-4 13 13 0 0 1 26 4c0 18-26 34-26 34z" fill="#e0343c" stroke="var(--ink)" stroke-width="2.4" stroke-linejoin="round"/>`,
 camera:`<path d="M8 18h10l4-7h20l4 7h10a3 3 0 0 1 3 3v31a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V21a3 3 0 0 1 3-3z" ${S}/><circle cx="32" cy="36" r="12" ${S}/><circle cx="32" cy="36" r="5" ${A}/>`,
 tower:`<path d="M32 6l-14 52h28z" ${S}/><path d="M25 32h14M21 46h22M28 18h8" ${N} stroke-width="2.4"/><path d="M12 14a28 28 0 0 0 0 22M52 14a28 28 0 0 1 0 22" ${G} stroke-width="3"/>`,
 truck:`<rect x="3" y="16" width="36" height="28" rx="3" ${S}/><path d="M39 26h13l9 10v8H39z" ${S}/><circle cx="16" cy="48" r="6" ${S}/><circle cx="48" cy="48" r="6" ${S}/>`,
 bug:`<ellipse cx="32" cy="36" rx="13" ry="18" ${A}/><circle cx="32" cy="16" r="7" ${S}/><path d="M19 28H6M19 40H6M45 28h13M45 40h13M22 52l-8 8M42 52l8 8M24 11l-6-6M40 11l6-6M32 24v24" ${N} stroke-width="2.6"/>`,
};
export const KIT_NAMES=Object.keys(ICONS);
export const kit=(name,extra='')=>ICONS[name]?`<svg viewBox="0 0 64 64" ${extra}>${ICONS[name]}</svg>`:`<svg viewBox="0 0 64 64"><circle cx="32" cy="32" r="22" ${S}/><text x="32" y="40" font-size="24" text-anchor="middle" fill="var(--ink)" font-family="Inter,sans-serif" font-weight="800">${(name||'?')[0].toUpperCase()}</text></svg>`;
