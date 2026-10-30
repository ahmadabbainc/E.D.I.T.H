// Generated from topic: "How does WiFi work s"
export default {
 "title": "How WiFi Actually Works",
 "width": 576,
 "height": 1024,
 "fps": 30,
 "scenes": [
  {
   "say": "How does your phone pull videos right out of thin air?",
   "items": [
    {
     "type": "icon",
     "id": "phone1",
     "kit": "phone",
     "size": 180,
     "at": 0.2,
     "float": 4,
     "x": 288,
     "y": 340,
     "enter": "pop"
    },
    {
     "type": "icon",
     "kit": "wifi",
     "size": 80,
     "at": 0.6,
     "float": 3,
     "x": 420,
     "y": 220,
     "enter": "pop"
    },
    {
     "type": "icon",
     "kit": "question",
     "size": 70,
     "at": 0.8,
     "float": 2,
     "x": 150,
     "y": 220,
     "enter": "pop"
    },
    {
     "type": "label",
     "text": "Invisible magic?",
     "sub": "how data travels wirelessly",
     "at": 1.1,
     "x": 288,
     "y": 560,
     "enter": "rise"
    }
   ]
  },
  {
   "say": "At its heart, Wi-Fi is just invisible radio waves.",
   "items": [
    {
     "type": "icon",
     "id": "wf_hero",
     "kit": "wifi",
     "size": 200,
     "at": 0.2,
     "float": 5,
     "x": 288,
     "y": 340,
     "enter": "pop"
    },
    {
     "type": "pill",
     "text": "Radio spectrum",
     "at": 0.7,
     "x": 288,
     "y": 520,
     "enter": "rise",
     "style": {
      "background": "#9bd400"
     }
    },
    {
     "type": "label",
     "text": "Pure radio waves",
     "sub": "just like FM radio or walkie-talkies",
     "at": 1,
     "x": 288,
     "y": 620,
     "enter": "rise"
    }
   ],
   "clear": true
  },
  {
   "say": "Everything on your device begins as computer binary code.",
   "items": [
    {
     "type": "icon",
     "id": "phone_code",
     "kit": "phone",
     "size": 150,
     "at": 0.2,
     "x": 140,
     "y": 380,
     "keep": true
    },
    {
     "type": "icon",
     "id": "code_hero",
     "kit": "code",
     "size": 140,
     "at": 0.5,
     "x": 420,
     "y": 380,
     "enter": "pop"
    },
    {
     "type": "text",
     "text": "010110",
     "color": "#2a8a00",
     "size": 60,
     "at": 0.8,
     "x": 288,
     "y": 210,
     "enter": "pop"
    },
    {
     "type": "label",
     "text": "Binary digits",
     "sub": "every photo is ones and zeros",
     "at": 1.2,
     "x": 288,
     "y": 580,
     "enter": "rise"
    }
   ],
   "clear": true
  },
  {
   "say": "A tiny Wi-Fi chip converts these numbers into radio pulses.",
   "items": [
    {
     "type": "icon",
     "id": "chip_hero",
     "kit": "chip",
     "size": 180,
     "at": 0.2,
     "float": 4,
     "x": 288,
     "y": 340,
     "enter": "pop",
     "keep": true
    },
    {
     "type": "icon",
     "kit": "bolt",
     "size": 70,
     "at": 0.7,
     "x": 420,
     "y": 240,
     "enter": "pop"
    },
    {
     "type": "pill",
     "text": "Modulator chip",
     "at": 1,
     "x": 288,
     "y": 510,
     "enter": "rise"
    },
    {
     "type": "label",
     "text": "Data to radio",
     "sub": "translates bits into frequencies",
     "at": 1.3,
     "x": 288,
     "y": 610,
     "enter": "rise"
    }
   ],
   "clear": true
  },
  {
   "say": "Your phone antenna beams those pulses out in all directions.",
   "items": [
    {
     "type": "icon",
     "id": "emitter_phone",
     "kit": "phone",
     "size": 150,
     "at": 0.2,
     "x": 130,
     "y": 390,
     "keep": true
    },
    {
     "type": "icon",
     "id": "wave1",
     "kit": "wifi",
     "size": 90,
     "at": 0.6,
     "x": 280,
     "y": 390,
     "enter": "pop",
     "to": [
      {
       "at": 1,
       "dur": 1.4,
       "x": 420,
       "y": 390,
       "ease": "inOut"
      }
     ]
    },
    {
     "type": "label",
     "text": "Broadcasting",
     "sub": "rippling through the air",
     "at": 1.2,
     "x": 288,
     "y": 590,
     "enter": "rise"
    }
   ],
   "clear": true,
   "camera": {
    "from": {
     "x": 288,
     "y": 400,
     "z": 1
    },
    "to": {
     "x": 288,
     "y": 400,
     "z": 1.05
    }
   }
  },
  {
   "say": "These invisible waves travel at the speed of light.",
   "items": [
    {
     "type": "icon",
     "id": "speed_icon",
     "kit": "bolt",
     "size": 180,
     "at": 0.2,
     "float": 5,
     "x": 288,
     "y": 330,
     "enter": "pop"
    },
    {
     "type": "text",
     "text": "300,000 km/s",
     "color": "#2a8a00",
     "size": 48,
     "at": 0.7,
     "x": 288,
     "y": 490,
     "enter": "pop"
    },
    {
     "type": "label",
     "text": "Speed of light",
     "sub": "instant across your living room",
     "at": 1.1,
     "x": 288,
     "y": 610,
     "enter": "rise"
    }
   ],
   "clear": true
  },
  {
   "say": "Your home router detects the signal using its own antenna.",
   "items": [
    {
     "type": "icon",
     "id": "r_phone",
     "kit": "phone",
     "size": 130,
     "at": 0.2,
     "x": 120,
     "y": 390,
     "keep": true
    },
    {
     "type": "icon",
     "id": "r_router",
     "kit": "tower",
     "size": 150,
     "at": 0.5,
     "x": 440,
     "y": 370,
     "enter": "pop",
     "keep": true
    },
    {
     "type": "icon",
     "kit": "arrow",
     "size": 60,
     "at": 0.8,
     "x": 280,
     "y": 380,
     "enter": "pop"
    },
    {
     "type": "pill",
     "text": "Receiving antenna",
     "at": 1.1,
     "x": 440,
     "y": 510,
     "enter": "rise"
    },
    {
     "type": "label",
     "text": "Signal caught",
     "sub": "router picks up the whisper",
     "at": 1.4,
     "x": 288,
     "y": 610,
     "enter": "rise"
    }
   ],
   "clear": true
  },
  {
   "say": "The router instantly reverses the wave back into data.",
   "items": [
    {
     "type": "icon",
     "id": "gear_dec",
     "kit": "gear",
     "size": 130,
     "at": 0.3,
     "float": 3,
     "x": 160,
     "y": 370,
     "enter": "pop"
    },
    {
     "type": "line",
     "id": "r_line",
     "color": "#2a8a00",
     "w": 4,
     "at": 0.6,
     "from": "gear_dec",
     "toId": "r_router",
     "enter": "draw"
    },
    {
     "type": "pill",
     "text": "Decoded: 01011",
     "at": 0.9,
     "x": 160,
     "y": 490,
     "enter": "pop",
     "style": {
      "background": "#9bd400"
     }
    },
    {
     "type": "label",
     "text": "Demodulation",
     "sub": "waves turned back to binary",
     "at": 1.2,
     "x": 288,
     "y": 610,
     "enter": "rise"
    }
   ],
   "remove": [
    "r_phone"
   ]
  },
  {
   "say": "Then physical cables whisk that data out to the internet.",
   "items": [
    {
     "type": "icon",
     "id": "net_router",
     "kit": "tower",
     "size": 130,
     "at": 0.2,
     "x": 120,
     "y": 410,
     "keep": true
    },
    {
     "type": "icon",
     "id": "net_globe",
     "kit": "globe",
     "size": 130,
     "at": 0.5,
     "x": 440,
     "y": 410,
     "enter": "pop",
     "keep": true
    },
    {
     "type": "line",
     "id": "net_wire",
     "color": "#2a8a00",
     "w": 5,
     "at": 0.8,
     "from": "net_router",
     "toId": "net_globe",
     "enter": "draw"
    },
    {
     "type": "pill",
     "text": "Fiber optic wire",
     "at": 1.1,
     "x": 288,
     "y": 510,
     "enter": "rise"
    },
    {
     "type": "label",
     "text": "Wired backbone",
     "sub": "glass cables span the oceans",
     "at": 1.4,
     "x": 288,
     "y": 610,
     "enter": "rise"
    }
   ],
   "clear": true
  },
  {
   "say": "When a website responds, the entire trip runs in reverse.",
   "items": [
    {
     "type": "icon",
     "id": "reply_doc",
     "kit": "document",
     "size": 56,
     "at": 0.3,
     "x": 380,
     "y": 250,
     "enter": "pop",
     "to": [
      {
       "at": 0.8,
       "dur": 1.4,
       "x": 180,
       "y": 250,
       "ease": "inOut"
      }
     ]
    },
    {
     "type": "pill",
     "text": "Reply incoming",
     "at": 0.7,
     "x": 288,
     "y": 190,
     "enter": "pop"
    },
    {
     "type": "label",
     "text": "Two-way talk",
     "sub": "upload and download streams",
     "at": 1.3,
     "x": 288,
     "y": 610,
     "enter": "rise"
    }
   ]
  },
  {
   "say": "Most routers broadcast on two distinct radio frequencies.",
   "items": [
    {
     "type": "icon",
     "id": "dual_router",
     "kit": "tower",
     "size": 150,
     "at": 0.2,
     "float": 3,
     "x": 288,
     "y": 260,
     "enter": "pop"
    },
    {
     "type": "pill",
     "id": "p24",
     "text": "2.4 GHz",
     "at": 0.6,
     "x": 170,
     "y": 400,
     "enter": "rise"
    },
    {
     "type": "pill",
     "id": "p5",
     "text": "5 GHz",
     "at": 0.8,
     "x": 406,
     "y": 400,
     "enter": "rise",
     "style": {
      "background": "#9bd400"
     }
    },
    {
     "type": "label",
     "text": "Dual band",
     "sub": "two frequencies, two strengths",
     "at": 1.1,
     "x": 288,
     "y": 520,
     "enter": "rise"
    }
   ],
   "clear": true
  },
  {
   "say": "Two point four gigahertz easily passes through solid walls.",
   "items": [
    {
     "type": "text",
     "id": "w_band",
     "text": "2.4 GHz",
     "color": "#2a8a00",
     "size": 52,
     "at": 0.2,
     "x": 288,
     "y": 210,
     "enter": "pop"
    },
    {
     "type": "icon",
     "id": "shield_wall",
     "kit": "shield",
     "size": 150,
     "at": 0.5,
     "x": 288,
     "y": 370,
     "enter": "pop"
    },
    {
     "type": "icon",
     "kit": "check",
     "size": 70,
     "at": 0.9,
     "x": 440,
     "y": 370,
     "enter": "pop"
    },
    {
     "type": "label",
     "text": "Better range",
     "sub": "travels far and penetrates brick",
     "at": 1.2,
     "x": 288,
     "y": 570,
     "enter": "rise"
    }
   ],
   "clear": true
  },
  {
   "say": "While five gigahertz delivers blazing speed over short distances.",
   "items": [
    {
     "type": "text",
     "id": "fast_band",
     "text": "5 GHz",
     "color": "#2a8a00",
     "size": 56,
     "at": 0.2,
     "x": 288,
     "y": 210,
     "enter": "pop"
    },
    {
     "type": "icon",
     "id": "bolt_spd",
     "kit": "bolt",
     "size": 170,
     "at": 0.5,
     "float": 4,
     "x": 288,
     "y": 370,
     "enter": "pop"
    },
    {
     "type": "pill",
     "text": "High speed",
     "at": 0.9,
     "x": 288,
     "y": 510,
     "enter": "rise",
     "style": {
      "background": "#9bd400"
     }
    },
    {
     "type": "label",
     "text": "Max bandwidth",
     "sub": "fastest streams near the router",
     "at": 1.2,
     "x": 288,
     "y": 610,
     "enter": "rise"
    }
   ],
   "clear": true
  },
  {
   "say": "Concrete, metal, and microwave ovens can scramble the wave.",
   "items": [
    {
     "type": "icon",
     "id": "blocker",
     "kit": "cube",
     "size": 150,
     "at": 0.2,
     "float": 3,
     "x": 288,
     "y": 330,
     "enter": "pop"
    },
    {
     "type": "icon",
     "id": "bad_cross",
     "kit": "cross",
     "size": 80,
     "at": 0.7,
     "x": 420,
     "y": 250,
     "enter": "pop"
    },
    {
     "type": "pill",
     "text": "Interference",
     "at": 1,
     "x": 288,
     "y": 480,
     "enter": "rise"
    },
    {
     "type": "label",
     "text": "Signal blockers",
     "sub": "materials that absorb radio waves",
     "at": 1.3,
     "x": 288,
     "y": 600,
     "enter": "rise"
    }
   ],
   "clear": true
  },
  {
   "say": "That is why your stream buffers when you step outside.",
   "items": [
    {
     "type": "icon",
     "id": "buf_phone",
     "kit": "phone",
     "size": 170,
     "at": 0.2,
     "float": 4,
     "x": 288,
     "y": 320,
     "enter": "pop"
    },
    {
     "type": "icon",
     "id": "buf_clock",
     "kit": "clock",
     "size": 80,
     "at": 0.6,
     "x": 420,
     "y": 240,
     "enter": "pop"
    },
    {
     "type": "pill",
     "text": "Buffering...",
     "at": 0.9,
     "x": 288,
     "y": 470,
     "enter": "rise"
    },
    {
     "type": "label",
     "text": "Weak signal",
     "sub": "too far for waves to reach",
     "at": 1.2,
     "x": 288,
     "y": 590,
     "enter": "rise"
    }
   ],
   "clear": true
  },
  {
   "say": "Yet modern Wi-Fi pulses billions of signals every single second.",
   "items": [
    {
     "type": "icon",
     "id": "hero_pulse",
     "kit": "wifi",
     "size": 160,
     "at": 0.2,
     "float": 4,
     "x": 288,
     "y": 260,
     "enter": "pop"
    },
    {
     "type": "text",
     "text": "Billions / sec",
     "color": "#2a8a00",
     "size": 44,
     "at": 0.6,
     "x": 288,
     "y": 410,
     "enter": "pop"
    },
    {
     "type": "label",
     "text": "Silent tech",
     "sub": "connecting billions of devices",
     "at": 1.1,
     "x": 288,
     "y": 530,
     "enter": "rise"
    }
   ],
   "clear": true
  },
  {
   "say": "Follow for more everyday tech explained simply!",
   "items": [
    {
     "type": "icon",
     "id": "rocket_end",
     "kit": "rocket",
     "size": 210,
     "at": 0.2,
     "float": 6,
     "x": 288,
     "y": 350,
     "enter": "pop"
    },
    {
     "type": "icon",
     "kit": "star",
     "size": 70,
     "at": 0.6,
     "float": 3,
     "x": 430,
     "y": 230,
     "enter": "pop"
    },
    {
     "type": "pill",
     "text": "+ Follow",
     "at": 1,
     "x": 288,
     "y": 560,
     "enter": "pop",
     "style": {
      "background": "#2a8a00",
      "color": "#fff"
     }
    }
   ],
   "clear": true
  }
 ]
};
