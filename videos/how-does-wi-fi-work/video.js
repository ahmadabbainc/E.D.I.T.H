// Generated from topic: "How does Wi-Fi work?"
export default {
 "title": "How Wi-Fi Works",
 "width": 576,
 "height": 1024,
 "fps": 30,
 "scenes": [
  {
   "say": "Ever wonder how invisible air carries movies straight to your phone screen?",
   "items": [
    {
     "type": "icon",
     "id": "hero_ph",
     "kit": "phone",
     "size": 130,
     "at": 0.2,
     "float": 4,
     "x": 288,
     "y": 350,
     "enter": "pop"
    },
    {
     "type": "icon",
     "kit": "wifi",
     "size": 70,
     "at": 0.6,
     "float": 3,
     "x": 392,
     "y": 260,
     "enter": "pop"
    },
    {
     "type": "icon",
     "kit": "question",
     "size": 64,
     "at": 0.9,
     "float": 2,
     "x": 184,
     "y": 260,
     "enter": "pop"
    },
    {
     "type": "label",
     "text": "Invisible Signals",
     "sub": "Streaming through thin air",
     "at": 1.2,
     "x": 288,
     "y": 530,
     "enter": "rise"
    }
   ]
  },
  {
   "say": "Everything your device sends begins as a stream of ones and zeros.",
   "items": [
    {
     "type": "icon",
     "id": "ph2",
     "kit": "phone",
     "size": 110,
     "at": 0.2,
     "x": 150,
     "y": 380,
     "enter": "pop",
     "keep": true
    },
    {
     "type": "icon",
     "id": "chip2",
     "kit": "chip",
     "size": 90,
     "at": 0.6,
     "x": 426,
     "y": 380,
     "enter": "pop",
     "keep": true
    },
    {
     "type": "line",
     "id": "l_code",
     "color": "#2a8a00",
     "w": 4,
     "at": 0.9,
     "from": "ph2",
     "toId": "chip2",
     "enter": "draw"
    },
    {
     "type": "pill",
     "text": "10110010",
     "at": 1.1,
     "x": 288,
     "y": 380,
     "enter": "rise"
    },
    {
     "type": "label",
     "text": "Binary Code",
     "sub": "Pure digital data",
     "at": 1.4,
     "x": 288,
     "y": 530,
     "enter": "rise"
    }
   ],
   "clear": true
  },
  {
   "say": "A transmitter chip converts that computer code into rapid radio waves.",
   "items": [
    {
     "type": "icon",
     "id": "wave1",
     "kit": "bolt",
     "size": 90,
     "at": 0.3,
     "float": 3,
     "x": 426,
     "y": 250,
     "enter": "pop"
    },
    {
     "type": "line",
     "color": "#2a8a00",
     "w": 4,
     "at": 0.7,
     "from": "chip2",
     "toId": "wave1",
     "enter": "draw"
    },
    {
     "type": "label",
     "text": "Radio Pulses",
     "sub": "Data converted into waves",
     "at": 1.1,
     "x": 288,
     "y": 530,
     "enter": "rise"
    }
   ],
   "remove": [
    "l_code"
   ],
   "camera": {
    "from": {
     "x": 288,
     "y": 400,
     "z": 1
    },
    "to": {
     "x": 288,
     "y": 400,
     "z": 1.08
    }
   }
  },
  {
   "say": "Wi-Fi uses the same electromagnetic radio spectrum as FM car radios.",
   "items": [
    {
     "type": "icon",
     "kit": "tower",
     "size": 110,
     "at": 0.2,
     "float": 3,
     "x": 160,
     "y": 350,
     "enter": "pop"
    },
    {
     "type": "icon",
     "kit": "wifi",
     "size": 110,
     "at": 0.6,
     "float": 3,
     "x": 416,
     "y": 350,
     "enter": "pop"
    },
    {
     "type": "pill",
     "text": "FM: Megahertz",
     "at": 1,
     "x": 160,
     "y": 460,
     "enter": "rise"
    },
    {
     "type": "pill",
     "text": "Wi-Fi: Gigahertz",
     "at": 1.2,
     "x": 416,
     "y": 460,
     "enter": "rise",
     "style": {
      "background": "#9bd400"
     }
    },
    {
     "type": "label",
     "text": "Electromagnetic Waves",
     "sub": "Light-speed radio vibrations",
     "at": 1.4,
     "x": 288,
     "y": 560,
     "enter": "rise"
    }
   ],
   "clear": true
  },
  {
   "say": "Except Wi-Fi vibrates at billions of cycles every single second.",
   "items": [
    {
     "type": "icon",
     "kit": "bolt",
     "size": 120,
     "at": 0.2,
     "float": 4,
     "x": 288,
     "y": 320,
     "enter": "pop"
    },
    {
     "type": "text",
     "text": "5 GHz",
     "color": "#2a8a00",
     "size": 70,
     "at": 0.6,
     "x": 288,
     "y": 460,
     "enter": "pop"
    },
    {
     "type": "pill",
     "text": "5 billion pulses/sec",
     "at": 1,
     "x": 288,
     "y": 550,
     "enter": "rise"
    }
   ],
   "clear": true
  },
  {
   "say": "Your home router catches these wave pulses using its antennas.",
   "items": [
    {
     "type": "icon",
     "id": "ph6",
     "kit": "phone",
     "size": 100,
     "at": 0.2,
     "x": 120,
     "y": 400,
     "enter": "pop",
     "keep": true
    },
    {
     "type": "icon",
     "id": "r6",
     "kit": "server",
     "size": 110,
     "at": 0.5,
     "x": 450,
     "y": 400,
     "enter": "pop",
     "keep": true
    },
    {
     "type": "icon",
     "id": "wave_fly",
     "kit": "wifi",
     "size": 60,
     "at": 0.8,
     "x": 210,
     "y": 310,
     "enter": "pop",
     "to": [
      {
       "at": 0.3,
       "dur": 1.2,
       "x": 350,
       "y": 310
      },
      {
       "at": 1.5,
       "dur": 0.2,
       "opacity": 0
      }
     ]
    },
    {
     "type": "label",
     "text": "Antenna Reception",
     "sub": "Harvesting signal pulses",
     "at": 1.2,
     "x": 288,
     "y": 540,
     "enter": "rise"
    }
   ],
   "clear": true
  },
  {
   "say": "The router instantly translates those wave vibrations back into computer code.",
   "items": [
    {
     "type": "icon",
     "kit": "chip",
     "size": 80,
     "at": 0.3,
     "x": 450,
     "y": 260,
     "enter": "pop"
    },
    {
     "type": "icon",
     "kit": "check",
     "size": 60,
     "at": 0.8,
     "x": 450,
     "y": 160,
     "enter": "pop"
    },
    {
     "type": "pill",
     "text": "Decoded: 10110010",
     "at": 1.2,
     "x": 288,
     "y": 530,
     "enter": "rise"
    }
   ],
   "camera": {
    "from": {
     "x": 288,
     "y": 400,
     "z": 1
    },
    "to": {
     "x": 288,
     "y": 400,
     "z": 1.1
    }
   }
  },
  {
   "say": "Then it fires the data through a glass fiber cable into the internet.",
   "items": [
    {
     "type": "icon",
     "id": "r8",
     "kit": "server",
     "size": 100,
     "at": 0.2,
     "x": 120,
     "y": 390,
     "enter": "pop",
     "keep": true
    },
    {
     "type": "icon",
     "id": "g8",
     "kit": "globe",
     "size": 110,
     "at": 0.5,
     "x": 450,
     "y": 390,
     "enter": "pop",
     "keep": true
    },
    {
     "type": "line",
     "id": "cable",
     "color": "#2a8a00",
     "w": 5,
     "at": 0.8,
     "from": "r8",
     "toId": "g8",
     "enter": "draw",
     "keep": true
    },
    {
     "type": "icon",
     "kit": "bolt",
     "size": 60,
     "at": 1.1,
     "float": 3,
     "x": 288,
     "y": 310,
     "enter": "pop"
    },
    {
     "type": "pill",
     "text": "Fiber optic line",
     "at": 1.3,
     "x": 288,
     "y": 470,
     "enter": "rise"
    }
   ],
   "clear": true
  },
  {
   "say": "Web servers send the requested video data back along that line.",
   "items": [
    {
     "type": "icon",
     "kit": "document",
     "size": 56,
     "at": 0.2,
     "x": 360,
     "y": 310,
     "enter": "pop",
     "to": [
      {
       "at": 0.4,
       "dur": 1.2,
       "x": 210,
       "y": 310
      },
      {
       "at": 1.6,
       "dur": 0.3,
       "opacity": 0
      }
     ]
    },
    {
     "type": "label",
     "text": "Streaming Packets",
     "sub": "Racing back toward your home",
     "at": 1,
     "x": 288,
     "y": 560,
     "enter": "rise"
    }
   ]
  },
  {
   "say": "The router translates it back to radio and beams it to your phone.",
   "items": [
    {
     "type": "icon",
     "id": "r10",
     "kit": "server",
     "size": 100,
     "at": 0.2,
     "x": 120,
     "y": 400,
     "enter": "pop",
     "keep": true
    },
    {
     "type": "icon",
     "id": "ph10",
     "kit": "phone",
     "size": 100,
     "at": 0.5,
     "x": 450,
     "y": 400,
     "enter": "pop",
     "keep": true
    },
    {
     "type": "icon",
     "id": "beam",
     "kit": "wifi",
     "size": 60,
     "at": 0.8,
     "x": 210,
     "y": 310,
     "enter": "pop",
     "to": [
      {
       "at": 0.3,
       "dur": 1.2,
       "x": 360,
       "y": 310
      },
      {
       "at": 1.5,
       "dur": 0.2,
       "opacity": 0
      }
     ]
    },
    {
     "type": "label",
     "text": "Broadcast to Device",
     "sub": "Radio waves return home",
     "at": 1.2,
     "x": 288,
     "y": 540,
     "enter": "rise"
    }
   ],
   "clear": true
  },
  {
   "say": "This two-way radio conversation happens thousands of times every single second.",
   "items": [
    {
     "type": "line",
     "color": "#2a8a00",
     "w": 4,
     "at": 0.3,
     "from": "r10",
     "toId": "ph10",
     "enter": "draw"
    },
    {
     "type": "icon",
     "kit": "clock",
     "size": 80,
     "at": 0.7,
     "float": 4,
     "x": 288,
     "y": 270,
     "enter": "pop"
    },
    {
     "type": "label",
     "text": "Constant Sync",
     "sub": "Thousands of times per second",
     "at": 1.1,
     "x": 288,
     "y": 540,
     "enter": "rise"
    }
   ],
   "remove": [
    "beam"
   ],
   "camera": {
    "from": {
     "x": 288,
     "y": 400,
     "z": 1
    },
    "to": {
     "x": 288,
     "y": 400,
     "z": 1.12
    }
   }
  },
  {
   "say": "Solid walls and metal objects absorb waves, creating frustrating dead zones.",
   "items": [
    {
     "type": "icon",
     "kit": "wifi",
     "size": 100,
     "at": 0.2,
     "x": 120,
     "y": 380,
     "enter": "pop"
    },
    {
     "type": "icon",
     "kit": "cube",
     "size": 100,
     "at": 0.5,
     "x": 288,
     "y": 380,
     "enter": "pop"
    },
    {
     "type": "icon",
     "kit": "cross",
     "size": 80,
     "at": 0.9,
     "float": 3,
     "x": 450,
     "y": 380,
     "enter": "pop"
    },
    {
     "type": "pill",
     "text": "Thick Wall",
     "at": 1.1,
     "x": 288,
     "y": 470,
     "enter": "rise"
    },
    {
     "type": "label",
     "text": "Signal Loss",
     "sub": "Solids weaken radio frequency",
     "at": 1.3,
     "x": 288,
     "y": 560,
     "enter": "rise"
    }
   ],
   "clear": true
  },
  {
   "say": "Follow for more simple breakdowns of how everyday tech works.",
   "items": [
    {
     "type": "icon",
     "kit": "rocket",
     "size": 130,
     "at": 0.2,
     "float": 5,
     "x": 288,
     "y": 330,
     "enter": "pop"
    },
    {
     "type": "icon",
     "kit": "star",
     "size": 60,
     "at": 0.6,
     "float": 3,
     "x": 180,
     "y": 250,
     "enter": "pop"
    },
    {
     "type": "icon",
     "kit": "star",
     "size": 60,
     "at": 0.8,
     "float": 4,
     "x": 396,
     "y": 250,
     "enter": "pop"
    },
    {
     "type": "pill",
     "text": "+ Follow",
     "at": 1.1,
     "x": 288,
     "y": 510,
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
