/* ============================================================
   英語文期中考／期末考 題庫（2026 年 11 月）
   範圍：Wonder World 3（康軒）全冊
        Get Ready、Units 1–4、Culture & Festivals、Task、
        Review 1–2、Picture Dictionary、Around the World、Word Hunt
   依據使用者提供的課本影片內容重新命題（原創自編，非官方試題）
   ------------------------------------------------------------
   文字標記（index.html 會自動轉換）：
     *英文*        → 可點擊的英文，點一下用 en-US 語音發音
     `[音標]`      → 以清楚可辨的 KK 音標字型顯示
     其餘文字      → 一般中文
   每卷 50 題：26 個課本小節各 1 題核心＋14 題延伸選擇＋10 題素養題組
   ============================================================ */
var SECTIONS = [
  {
    "id": "gr-numbers",
    "u": "Get Ready・Numbers 16–20"
  },
  {
    "id": "gr-a-e",
    "u": "Get Ready・Phonics a_e"
  },
  {
    "id": "u1-vocab",
    "u": "Unit 1・Weather Vocabulary"
  },
  {
    "id": "u1-sent",
    "u": "Unit 1・Weather Sentences"
  },
  {
    "id": "u1-phonics",
    "u": "Unit 1・Phonics e_e / ee"
  },
  {
    "id": "u1-daily",
    "u": "Unit 1・The Big Wind"
  },
  {
    "id": "u2-vocab",
    "u": "Unit 2・Numbers & Time"
  },
  {
    "id": "u2-sent",
    "u": "Unit 2・Time Sentences"
  },
  {
    "id": "u2-phonics",
    "u": "Unit 2・Phonics i_e"
  },
  {
    "id": "u2-daily",
    "u": "Unit 2・Going Back Home"
  },
  {
    "id": "u3-vocab",
    "u": "Unit 3・School Supplies"
  },
  {
    "id": "u3-sent",
    "u": "Unit 3・Possessive Sentences"
  },
  {
    "id": "u3-phonics",
    "u": "Unit 3・Phonics o_e"
  },
  {
    "id": "u3-daily",
    "u": "Unit 3・Be Honest"
  },
  {
    "id": "u4-vocab",
    "u": "Unit 4・Position Words"
  },
  {
    "id": "u4-sent",
    "u": "Unit 4・Where Sentences"
  },
  {
    "id": "u4-phonics",
    "u": "Unit 4・Phonics u_e"
  },
  {
    "id": "u4-daily",
    "u": "Unit 4・Earthquake Drill"
  },
  {
    "id": "culture-halloween",
    "u": "Culture & Festivals・Halloween"
  },
  {
    "id": "task-emergency",
    "u": "Task・Emergency Weather"
  },
  {
    "id": "review1-teen-ty",
    "u": "Review 1・-teen / -ty"
  },
  {
    "id": "review2-syllables",
    "u": "Review 2・Syllables"
  },
  {
    "id": "classroom-characters",
    "u": "Classroom English & Characters"
  },
  {
    "id": "world-picture",
    "u": "Picture Dictionary & Around the World"
  },
  {
    "id": "review-family-animals",
    "u": "Vocabulary Review・Family & Animals"
  },
  {
    "id": "review-jobs-abilities",
    "u": "Vocabulary Review・Jobs & Abilities"
  }
];

var SELECT = [
  {
    "sid": "gr-numbers",
    "u": "Get Ready・Numbers 16–20",
    "d": "易",
    "q": "Get Ready 數字：「十一」的英文是哪一個？",
    "o": [
      "*eleven* `[ɪˋlɛvən]`",
      "*twelve* `[twɛlv]`",
      "*thirteen* `[ˏθɝˋtin]`",
      "*fourteen* `[ˏfɔrˋtin]`"
    ],
    "a": 0,
    "e": "「十一」是 *eleven* `[ɪˋlɛvən]`（十一）。",
    "w": [
      "",
      "「十二」是 *twelve* `[twɛlv]`（十二）。",
      "「十三」是 *thirteen* `[ˏθɝˋtin]`（十三）。",
      "「十四」是 *fourteen* `[ˏfɔrˋtin]`（十四）。"
    ]
  },
  {
    "sid": "gr-numbers",
    "u": "Get Ready・Numbers 16–20",
    "d": "易",
    "q": "Get Ready 數字：「十二」的英文是哪一個？",
    "o": [
      "*twelve* `[twɛlv]`",
      "*thirteen* `[ˏθɝˋtin]`",
      "*fourteen* `[ˏfɔrˋtin]`",
      "*fifteen* `[ˏfɪfˋtin]`"
    ],
    "a": 0,
    "e": "「十二」是 *twelve* `[twɛlv]`（十二）。",
    "w": [
      "",
      "「十三」是 *thirteen* `[ˏθɝˋtin]`（十三）。",
      "「十四」是 *fourteen* `[ˏfɔrˋtin]`（十四）。",
      "「十五」是 *fifteen* `[ˏfɪfˋtin]`（十五）。"
    ]
  },
  {
    "sid": "gr-numbers",
    "u": "Get Ready・Numbers 16–20",
    "d": "易",
    "q": "Get Ready 數字：「十三」的英文是哪一個？",
    "o": [
      "*thirteen* `[ˏθɝˋtin]`",
      "*fourteen* `[ˏfɔrˋtin]`",
      "*fifteen* `[ˏfɪfˋtin]`",
      "*sixteen* `[ˏsɪksˋtin]`"
    ],
    "a": 0,
    "e": "「十三」是 *thirteen* `[ˏθɝˋtin]`（十三）。",
    "w": [
      "",
      "「十四」是 *fourteen* `[ˏfɔrˋtin]`（十四）。",
      "「十五」是 *fifteen* `[ˏfɪfˋtin]`（十五）。",
      "「十六」是 *sixteen* `[ˏsɪksˋtin]`（十六）。"
    ]
  },
  {
    "sid": "gr-numbers",
    "u": "Get Ready・Numbers 16–20",
    "d": "易",
    "q": "Get Ready 數字：「十四」的英文是哪一個？",
    "o": [
      "*fourteen* `[ˏfɔrˋtin]`",
      "*fifteen* `[ˏfɪfˋtin]`",
      "*sixteen* `[ˏsɪksˋtin]`",
      "*seventeen* `[ˏsɛvənˋtin]`"
    ],
    "a": 0,
    "e": "「十四」是 *fourteen* `[ˏfɔrˋtin]`（十四）。",
    "w": [
      "",
      "「十五」是 *fifteen* `[ˏfɪfˋtin]`（十五）。",
      "「十六」是 *sixteen* `[ˏsɪksˋtin]`（十六）。",
      "「十七」是 *seventeen* `[ˏsɛvənˋtin]`（十七）。"
    ]
  },
  {
    "sid": "gr-numbers",
    "u": "Get Ready・Numbers 16–20",
    "d": "易",
    "q": "Get Ready 數字：「十五」的英文是哪一個？",
    "o": [
      "*fifteen* `[ˏfɪfˋtin]`",
      "*sixteen* `[ˏsɪksˋtin]`",
      "*seventeen* `[ˏsɛvənˋtin]`",
      "*eighteen* `[eˋtin]`"
    ],
    "a": 0,
    "e": "「十五」是 *fifteen* `[ˏfɪfˋtin]`（十五）。",
    "w": [
      "",
      "「十六」是 *sixteen* `[ˏsɪksˋtin]`（十六）。",
      "「十七」是 *seventeen* `[ˏsɛvənˋtin]`（十七）。",
      "「十八」是 *eighteen* `[eˋtin]`（十八）。"
    ]
  },
  {
    "sid": "gr-numbers",
    "u": "Get Ready・Numbers 16–20",
    "d": "易",
    "q": "Get Ready 數字：「十六」的英文是哪一個？",
    "o": [
      "*sixteen* `[ˏsɪksˋtin]`",
      "*seventeen* `[ˏsɛvənˋtin]`",
      "*eighteen* `[eˋtin]`",
      "*nineteen* `[ˏnaɪnˋtin]`"
    ],
    "a": 0,
    "e": "「十六」是 *sixteen* `[ˏsɪksˋtin]`（十六）。",
    "w": [
      "",
      "「十七」是 *seventeen* `[ˏsɛvənˋtin]`（十七）。",
      "「十八」是 *eighteen* `[eˋtin]`（十八）。",
      "「十九」是 *nineteen* `[ˏnaɪnˋtin]`（十九）。"
    ]
  },
  {
    "sid": "gr-numbers",
    "u": "Get Ready・Numbers 16–20",
    "d": "易",
    "q": "Get Ready 數字：「十七」的英文是哪一個？",
    "o": [
      "*seventeen* `[ˏsɛvənˋtin]`",
      "*eighteen* `[eˋtin]`",
      "*nineteen* `[ˏnaɪnˋtin]`",
      "*twenty* `[ˋtwɛnti]`"
    ],
    "a": 0,
    "e": "「十七」是 *seventeen* `[ˏsɛvənˋtin]`（十七）。",
    "w": [
      "",
      "「十八」是 *eighteen* `[eˋtin]`（十八）。",
      "「十九」是 *nineteen* `[ˏnaɪnˋtin]`（十九）。",
      "「二十」是 *twenty* `[ˋtwɛnti]`（二十）。"
    ]
  },
  {
    "sid": "gr-numbers",
    "u": "Get Ready・Numbers 16–20",
    "d": "易",
    "q": "Get Ready 數字：「十八」的英文是哪一個？",
    "o": [
      "*eighteen* `[eˋtin]`",
      "*nineteen* `[ˏnaɪnˋtin]`",
      "*twenty* `[ˋtwɛnti]`",
      "*eleven* `[ɪˋlɛvən]`"
    ],
    "a": 0,
    "e": "「十八」是 *eighteen* `[eˋtin]`（十八）。",
    "w": [
      "",
      "「十九」是 *nineteen* `[ˏnaɪnˋtin]`（十九）。",
      "「二十」是 *twenty* `[ˋtwɛnti]`（二十）。",
      "「十一」是 *eleven* `[ɪˋlɛvən]`（十一）。"
    ]
  },
  {
    "sid": "gr-numbers",
    "u": "Get Ready・Numbers 16–20",
    "d": "易",
    "q": "Get Ready 數字：「十九」的英文是哪一個？",
    "o": [
      "*nineteen* `[ˏnaɪnˋtin]`",
      "*twenty* `[ˋtwɛnti]`",
      "*eleven* `[ɪˋlɛvən]`",
      "*twelve* `[twɛlv]`"
    ],
    "a": 0,
    "e": "「十九」是 *nineteen* `[ˏnaɪnˋtin]`（十九）。",
    "w": [
      "",
      "「二十」是 *twenty* `[ˋtwɛnti]`（二十）。",
      "「十一」是 *eleven* `[ɪˋlɛvən]`（十一）。",
      "「十二」是 *twelve* `[twɛlv]`（十二）。"
    ]
  },
  {
    "sid": "gr-numbers",
    "u": "Get Ready・Numbers 16–20",
    "d": "易",
    "q": "Get Ready 數字：「二十」的英文是哪一個？",
    "o": [
      "*twenty* `[ˋtwɛnti]`",
      "*eleven* `[ɪˋlɛvən]`",
      "*twelve* `[twɛlv]`",
      "*thirteen* `[ˏθɝˋtin]`"
    ],
    "a": 0,
    "e": "「二十」是 *twenty* `[ˋtwɛnti]`（二十）。",
    "w": [
      "",
      "「十一」是 *eleven* `[ɪˋlɛvən]`（十一）。",
      "「十二」是 *twelve* `[twɛlv]`（十二）。",
      "「十三」是 *thirteen* `[ˏθɝˋtin]`（十三）。"
    ]
  },
  {
    "sid": "gr-numbers",
    "u": "Get Ready・Numbers 16–20",
    "d": "易",
    "q": "Get Ready 數字：*eleven* `[ɪˋlɛvən]` 的中文意思是什麼？",
    "o": [
      "十一",
      "十二",
      "十三",
      "十四"
    ],
    "a": 0,
    "e": "*eleven* `[ɪˋlɛvən]`（十一） 是「十一」。",
    "w": [
      "",
      "*twelve* `[twɛlv]` 是「十二」。",
      "*thirteen* `[ˏθɝˋtin]` 是「十三」。",
      "*fourteen* `[ˏfɔrˋtin]` 是「十四」。"
    ]
  },
  {
    "sid": "gr-numbers",
    "u": "Get Ready・Numbers 16–20",
    "d": "易",
    "q": "Get Ready 數字：*twelve* `[twɛlv]` 的中文意思是什麼？",
    "o": [
      "十二",
      "十三",
      "十四",
      "十五"
    ],
    "a": 0,
    "e": "*twelve* `[twɛlv]`（十二） 是「十二」。",
    "w": [
      "",
      "*thirteen* `[ˏθɝˋtin]` 是「十三」。",
      "*fourteen* `[ˏfɔrˋtin]` 是「十四」。",
      "*fifteen* `[ˏfɪfˋtin]` 是「十五」。"
    ]
  },
  {
    "sid": "gr-numbers",
    "u": "Get Ready・Numbers 16–20",
    "d": "易",
    "q": "Get Ready 數字：*thirteen* `[ˏθɝˋtin]` 的中文意思是什麼？",
    "o": [
      "十三",
      "十四",
      "十五",
      "十六"
    ],
    "a": 0,
    "e": "*thirteen* `[ˏθɝˋtin]`（十三） 是「十三」。",
    "w": [
      "",
      "*fourteen* `[ˏfɔrˋtin]` 是「十四」。",
      "*fifteen* `[ˏfɪfˋtin]` 是「十五」。",
      "*sixteen* `[ˏsɪksˋtin]` 是「十六」。"
    ]
  },
  {
    "sid": "gr-numbers",
    "u": "Get Ready・Numbers 16–20",
    "d": "易",
    "q": "Get Ready 數字：*fourteen* `[ˏfɔrˋtin]` 的中文意思是什麼？",
    "o": [
      "十四",
      "十五",
      "十六",
      "十七"
    ],
    "a": 0,
    "e": "*fourteen* `[ˏfɔrˋtin]`（十四） 是「十四」。",
    "w": [
      "",
      "*fifteen* `[ˏfɪfˋtin]` 是「十五」。",
      "*sixteen* `[ˏsɪksˋtin]` 是「十六」。",
      "*seventeen* `[ˏsɛvənˋtin]` 是「十七」。"
    ]
  },
  {
    "sid": "gr-numbers",
    "u": "Get Ready・Numbers 16–20",
    "d": "易",
    "q": "Get Ready 數字：*fifteen* `[ˏfɪfˋtin]` 的中文意思是什麼？",
    "o": [
      "十五",
      "十六",
      "十七",
      "十八"
    ],
    "a": 0,
    "e": "*fifteen* `[ˏfɪfˋtin]`（十五） 是「十五」。",
    "w": [
      "",
      "*sixteen* `[ˏsɪksˋtin]` 是「十六」。",
      "*seventeen* `[ˏsɛvənˋtin]` 是「十七」。",
      "*eighteen* `[eˋtin]` 是「十八」。"
    ]
  },
  {
    "sid": "gr-numbers",
    "u": "Get Ready・Numbers 16–20",
    "d": "易",
    "q": "Get Ready 數字：*sixteen* `[ˏsɪksˋtin]` 的中文意思是什麼？",
    "o": [
      "十六",
      "十七",
      "十八",
      "十九"
    ],
    "a": 0,
    "e": "*sixteen* `[ˏsɪksˋtin]`（十六） 是「十六」。",
    "w": [
      "",
      "*seventeen* `[ˏsɛvənˋtin]` 是「十七」。",
      "*eighteen* `[eˋtin]` 是「十八」。",
      "*nineteen* `[ˏnaɪnˋtin]` 是「十九」。"
    ]
  },
  {
    "sid": "gr-numbers",
    "u": "Get Ready・Numbers 16–20",
    "d": "易",
    "q": "Get Ready 數字：*seventeen* `[ˏsɛvənˋtin]` 的中文意思是什麼？",
    "o": [
      "十七",
      "十八",
      "十九",
      "二十"
    ],
    "a": 0,
    "e": "*seventeen* `[ˏsɛvənˋtin]`（十七） 是「十七」。",
    "w": [
      "",
      "*eighteen* `[eˋtin]` 是「十八」。",
      "*nineteen* `[ˏnaɪnˋtin]` 是「十九」。",
      "*twenty* `[ˋtwɛnti]` 是「二十」。"
    ]
  },
  {
    "sid": "gr-numbers",
    "u": "Get Ready・Numbers 16–20",
    "d": "易",
    "q": "Get Ready 數字：*eighteen* `[eˋtin]` 的中文意思是什麼？",
    "o": [
      "十八",
      "十九",
      "二十",
      "十一"
    ],
    "a": 0,
    "e": "*eighteen* `[eˋtin]`（十八） 是「十八」。",
    "w": [
      "",
      "*nineteen* `[ˏnaɪnˋtin]` 是「十九」。",
      "*twenty* `[ˋtwɛnti]` 是「二十」。",
      "*eleven* `[ɪˋlɛvən]` 是「十一」。"
    ]
  },
  {
    "sid": "gr-numbers",
    "u": "Get Ready・Numbers 16–20",
    "d": "易",
    "q": "Get Ready 數字：*nineteen* `[ˏnaɪnˋtin]` 的中文意思是什麼？",
    "o": [
      "十九",
      "二十",
      "十一",
      "十二"
    ],
    "a": 0,
    "e": "*nineteen* `[ˏnaɪnˋtin]`（十九） 是「十九」。",
    "w": [
      "",
      "*twenty* `[ˋtwɛnti]` 是「二十」。",
      "*eleven* `[ɪˋlɛvən]` 是「十一」。",
      "*twelve* `[twɛlv]` 是「十二」。"
    ]
  },
  {
    "sid": "gr-numbers",
    "u": "Get Ready・Numbers 16–20",
    "d": "易",
    "q": "Get Ready 數字：*twenty* `[ˋtwɛnti]` 的中文意思是什麼？",
    "o": [
      "二十",
      "十一",
      "十二",
      "十三"
    ],
    "a": 0,
    "e": "*twenty* `[ˋtwɛnti]`（二十） 是「二十」。",
    "w": [
      "",
      "*eleven* `[ɪˋlɛvən]` 是「十一」。",
      "*twelve* `[twɛlv]` 是「十二」。",
      "*thirteen* `[ˏθɝˋtin]` 是「十三」。"
    ]
  },
  {
    "sid": "gr-numbers",
    "u": "Get Ready・Numbers 16–20",
    "d": "中",
    "q": "Get Ready 數字：音標 `[ɪˋlɛvən]` 對應的單字是哪一個？",
    "o": [
      "*eleven*",
      "*twelve*",
      "*thirteen*",
      "*fourteen*"
    ],
    "a": 0,
    "e": "`[ɪˋlɛvən]` 是 *eleven* `[ɪˋlɛvən]`（十一）。",
    "w": [
      "",
      "這個音標是 *twelve* `[twɛlv]`（十二）。",
      "這個音標是 *thirteen* `[ˏθɝˋtin]`（十三）。",
      "這個音標是 *fourteen* `[ˏfɔrˋtin]`（十四）。"
    ]
  },
  {
    "sid": "gr-numbers",
    "u": "Get Ready・Numbers 16–20",
    "d": "中",
    "q": "Get Ready 數字：音標 `[twɛlv]` 對應的單字是哪一個？",
    "o": [
      "*twelve*",
      "*thirteen*",
      "*fourteen*",
      "*fifteen*"
    ],
    "a": 0,
    "e": "`[twɛlv]` 是 *twelve* `[twɛlv]`（十二）。",
    "w": [
      "",
      "這個音標是 *thirteen* `[ˏθɝˋtin]`（十三）。",
      "這個音標是 *fourteen* `[ˏfɔrˋtin]`（十四）。",
      "這個音標是 *fifteen* `[ˏfɪfˋtin]`（十五）。"
    ]
  },
  {
    "sid": "gr-numbers",
    "u": "Get Ready・Numbers 16–20",
    "d": "中",
    "q": "Get Ready 數字：音標 `[ˏθɝˋtin]` 對應的單字是哪一個？",
    "o": [
      "*thirteen*",
      "*fourteen*",
      "*fifteen*",
      "*sixteen*"
    ],
    "a": 0,
    "e": "`[ˏθɝˋtin]` 是 *thirteen* `[ˏθɝˋtin]`（十三）。",
    "w": [
      "",
      "這個音標是 *fourteen* `[ˏfɔrˋtin]`（十四）。",
      "這個音標是 *fifteen* `[ˏfɪfˋtin]`（十五）。",
      "這個音標是 *sixteen* `[ˏsɪksˋtin]`（十六）。"
    ]
  },
  {
    "sid": "gr-numbers",
    "u": "Get Ready・Numbers 16–20",
    "d": "中",
    "q": "Get Ready 數字：音標 `[ˏfɔrˋtin]` 對應的單字是哪一個？",
    "o": [
      "*fourteen*",
      "*fifteen*",
      "*sixteen*",
      "*seventeen*"
    ],
    "a": 0,
    "e": "`[ˏfɔrˋtin]` 是 *fourteen* `[ˏfɔrˋtin]`（十四）。",
    "w": [
      "",
      "這個音標是 *fifteen* `[ˏfɪfˋtin]`（十五）。",
      "這個音標是 *sixteen* `[ˏsɪksˋtin]`（十六）。",
      "這個音標是 *seventeen* `[ˏsɛvənˋtin]`（十七）。"
    ]
  },
  {
    "sid": "gr-numbers",
    "u": "Get Ready・Numbers 16–20",
    "d": "中",
    "q": "Get Ready 數字：音標 `[ˏfɪfˋtin]` 對應的單字是哪一個？",
    "o": [
      "*fifteen*",
      "*sixteen*",
      "*seventeen*",
      "*eighteen*"
    ],
    "a": 0,
    "e": "`[ˏfɪfˋtin]` 是 *fifteen* `[ˏfɪfˋtin]`（十五）。",
    "w": [
      "",
      "這個音標是 *sixteen* `[ˏsɪksˋtin]`（十六）。",
      "這個音標是 *seventeen* `[ˏsɛvənˋtin]`（十七）。",
      "這個音標是 *eighteen* `[eˋtin]`（十八）。"
    ]
  },
  {
    "sid": "gr-numbers",
    "u": "Get Ready・Numbers 16–20",
    "d": "中",
    "q": "Get Ready 數字：音標 `[ˏsɪksˋtin]` 對應的單字是哪一個？",
    "o": [
      "*sixteen*",
      "*seventeen*",
      "*eighteen*",
      "*nineteen*"
    ],
    "a": 0,
    "e": "`[ˏsɪksˋtin]` 是 *sixteen* `[ˏsɪksˋtin]`（十六）。",
    "w": [
      "",
      "這個音標是 *seventeen* `[ˏsɛvənˋtin]`（十七）。",
      "這個音標是 *eighteen* `[eˋtin]`（十八）。",
      "這個音標是 *nineteen* `[ˏnaɪnˋtin]`（十九）。"
    ]
  },
  {
    "sid": "gr-numbers",
    "u": "Get Ready・Numbers 16–20",
    "d": "中",
    "q": "Get Ready 數字：音標 `[ˏsɛvənˋtin]` 對應的單字是哪一個？",
    "o": [
      "*seventeen*",
      "*eighteen*",
      "*nineteen*",
      "*twenty*"
    ],
    "a": 0,
    "e": "`[ˏsɛvənˋtin]` 是 *seventeen* `[ˏsɛvənˋtin]`（十七）。",
    "w": [
      "",
      "這個音標是 *eighteen* `[eˋtin]`（十八）。",
      "這個音標是 *nineteen* `[ˏnaɪnˋtin]`（十九）。",
      "這個音標是 *twenty* `[ˋtwɛnti]`（二十）。"
    ]
  },
  {
    "sid": "gr-numbers",
    "u": "Get Ready・Numbers 16–20",
    "d": "中",
    "q": "Get Ready 數字：音標 `[eˋtin]` 對應的單字是哪一個？",
    "o": [
      "*eighteen*",
      "*nineteen*",
      "*twenty*",
      "*eleven*"
    ],
    "a": 0,
    "e": "`[eˋtin]` 是 *eighteen* `[eˋtin]`（十八）。",
    "w": [
      "",
      "這個音標是 *nineteen* `[ˏnaɪnˋtin]`（十九）。",
      "這個音標是 *twenty* `[ˋtwɛnti]`（二十）。",
      "這個音標是 *eleven* `[ɪˋlɛvən]`（十一）。"
    ]
  },
  {
    "sid": "gr-numbers",
    "u": "Get Ready・Numbers 16–20",
    "d": "中",
    "q": "Get Ready 數字：音標 `[ˏnaɪnˋtin]` 對應的單字是哪一個？",
    "o": [
      "*nineteen*",
      "*twenty*",
      "*eleven*",
      "*twelve*"
    ],
    "a": 0,
    "e": "`[ˏnaɪnˋtin]` 是 *nineteen* `[ˏnaɪnˋtin]`（十九）。",
    "w": [
      "",
      "這個音標是 *twenty* `[ˋtwɛnti]`（二十）。",
      "這個音標是 *eleven* `[ɪˋlɛvən]`（十一）。",
      "這個音標是 *twelve* `[twɛlv]`（十二）。"
    ]
  },
  {
    "sid": "gr-numbers",
    "u": "Get Ready・Numbers 16–20",
    "d": "中",
    "q": "Get Ready 數字：音標 `[ˋtwɛnti]` 對應的單字是哪一個？",
    "o": [
      "*twenty*",
      "*eleven*",
      "*twelve*",
      "*thirteen*"
    ],
    "a": 0,
    "e": "`[ˋtwɛnti]` 是 *twenty* `[ˋtwɛnti]`（二十）。",
    "w": [
      "",
      "這個音標是 *eleven* `[ɪˋlɛvən]`（十一）。",
      "這個音標是 *twelve* `[twɛlv]`（十二）。",
      "這個音標是 *thirteen* `[ˏθɝˋtin]`（十三）。"
    ]
  },
  {
    "sid": "u1-vocab",
    "u": "Unit 1・Weather Vocabulary",
    "d": "易",
    "q": "Unit 1 天氣：「多雲的」的英文是哪一個？",
    "o": [
      "*cloudy* `[ˋklaʊdi]`",
      "*rainy* `[ˋreni]`",
      "*sunny* `[ˋsʌni]`",
      "*windy* `[ˋwɪndi]`"
    ],
    "a": 0,
    "e": "「多雲的」是 *cloudy* `[ˋklaʊdi]`（多雲的）。",
    "w": [
      "",
      "「下雨的」是 *rainy* `[ˋreni]`（下雨的）。",
      "「晴朗的」是 *sunny* `[ˋsʌni]`（晴朗的）。",
      "「有風的」是 *windy* `[ˋwɪndi]`（有風的）。"
    ]
  },
  {
    "sid": "u1-vocab",
    "u": "Unit 1・Weather Vocabulary",
    "d": "易",
    "q": "Unit 1 天氣：「下雨的」的英文是哪一個？",
    "o": [
      "*rainy* `[ˋreni]`",
      "*sunny* `[ˋsʌni]`",
      "*windy* `[ˋwɪndi]`",
      "*cold* `[kold]`"
    ],
    "a": 0,
    "e": "「下雨的」是 *rainy* `[ˋreni]`（下雨的）。",
    "w": [
      "",
      "「晴朗的」是 *sunny* `[ˋsʌni]`（晴朗的）。",
      "「有風的」是 *windy* `[ˋwɪndi]`（有風的）。",
      "「寒冷的」是 *cold* `[kold]`（寒冷的）。"
    ]
  },
  {
    "sid": "u1-vocab",
    "u": "Unit 1・Weather Vocabulary",
    "d": "易",
    "q": "Unit 1 天氣：「晴朗的」的英文是哪一個？",
    "o": [
      "*sunny* `[ˋsʌni]`",
      "*windy* `[ˋwɪndi]`",
      "*cold* `[kold]`",
      "*hot* `[hɑt]`"
    ],
    "a": 0,
    "e": "「晴朗的」是 *sunny* `[ˋsʌni]`（晴朗的）。",
    "w": [
      "",
      "「有風的」是 *windy* `[ˋwɪndi]`（有風的）。",
      "「寒冷的」是 *cold* `[kold]`（寒冷的）。",
      "「炎熱的」是 *hot* `[hɑt]`（炎熱的）。"
    ]
  },
  {
    "sid": "u1-vocab",
    "u": "Unit 1・Weather Vocabulary",
    "d": "易",
    "q": "Unit 1 天氣：「有風的」的英文是哪一個？",
    "o": [
      "*windy* `[ˋwɪndi]`",
      "*cold* `[kold]`",
      "*hot* `[hɑt]`",
      "*cloudy* `[ˋklaʊdi]`"
    ],
    "a": 0,
    "e": "「有風的」是 *windy* `[ˋwɪndi]`（有風的）。",
    "w": [
      "",
      "「寒冷的」是 *cold* `[kold]`（寒冷的）。",
      "「炎熱的」是 *hot* `[hɑt]`（炎熱的）。",
      "「多雲的」是 *cloudy* `[ˋklaʊdi]`（多雲的）。"
    ]
  },
  {
    "sid": "u1-vocab",
    "u": "Unit 1・Weather Vocabulary",
    "d": "易",
    "q": "Unit 1 天氣：「寒冷的」的英文是哪一個？",
    "o": [
      "*cold* `[kold]`",
      "*hot* `[hɑt]`",
      "*cloudy* `[ˋklaʊdi]`",
      "*rainy* `[ˋreni]`"
    ],
    "a": 0,
    "e": "「寒冷的」是 *cold* `[kold]`（寒冷的）。",
    "w": [
      "",
      "「炎熱的」是 *hot* `[hɑt]`（炎熱的）。",
      "「多雲的」是 *cloudy* `[ˋklaʊdi]`（多雲的）。",
      "「下雨的」是 *rainy* `[ˋreni]`（下雨的）。"
    ]
  },
  {
    "sid": "u1-vocab",
    "u": "Unit 1・Weather Vocabulary",
    "d": "易",
    "q": "Unit 1 天氣：「炎熱的」的英文是哪一個？",
    "o": [
      "*hot* `[hɑt]`",
      "*cloudy* `[ˋklaʊdi]`",
      "*rainy* `[ˋreni]`",
      "*sunny* `[ˋsʌni]`"
    ],
    "a": 0,
    "e": "「炎熱的」是 *hot* `[hɑt]`（炎熱的）。",
    "w": [
      "",
      "「多雲的」是 *cloudy* `[ˋklaʊdi]`（多雲的）。",
      "「下雨的」是 *rainy* `[ˋreni]`（下雨的）。",
      "「晴朗的」是 *sunny* `[ˋsʌni]`（晴朗的）。"
    ]
  },
  {
    "sid": "u1-vocab",
    "u": "Unit 1・Weather Vocabulary",
    "d": "易",
    "q": "Unit 1 天氣：*cloudy* `[ˋklaʊdi]` 的中文意思是什麼？",
    "o": [
      "多雲的",
      "下雨的",
      "晴朗的",
      "有風的"
    ],
    "a": 0,
    "e": "*cloudy* `[ˋklaʊdi]`（多雲的） 是「多雲的」。",
    "w": [
      "",
      "*rainy* `[ˋreni]` 是「下雨的」。",
      "*sunny* `[ˋsʌni]` 是「晴朗的」。",
      "*windy* `[ˋwɪndi]` 是「有風的」。"
    ]
  },
  {
    "sid": "u1-vocab",
    "u": "Unit 1・Weather Vocabulary",
    "d": "易",
    "q": "Unit 1 天氣：*rainy* `[ˋreni]` 的中文意思是什麼？",
    "o": [
      "下雨的",
      "晴朗的",
      "有風的",
      "寒冷的"
    ],
    "a": 0,
    "e": "*rainy* `[ˋreni]`（下雨的） 是「下雨的」。",
    "w": [
      "",
      "*sunny* `[ˋsʌni]` 是「晴朗的」。",
      "*windy* `[ˋwɪndi]` 是「有風的」。",
      "*cold* `[kold]` 是「寒冷的」。"
    ]
  },
  {
    "sid": "u1-vocab",
    "u": "Unit 1・Weather Vocabulary",
    "d": "易",
    "q": "Unit 1 天氣：*sunny* `[ˋsʌni]` 的中文意思是什麼？",
    "o": [
      "晴朗的",
      "有風的",
      "寒冷的",
      "炎熱的"
    ],
    "a": 0,
    "e": "*sunny* `[ˋsʌni]`（晴朗的） 是「晴朗的」。",
    "w": [
      "",
      "*windy* `[ˋwɪndi]` 是「有風的」。",
      "*cold* `[kold]` 是「寒冷的」。",
      "*hot* `[hɑt]` 是「炎熱的」。"
    ]
  },
  {
    "sid": "u1-vocab",
    "u": "Unit 1・Weather Vocabulary",
    "d": "易",
    "q": "Unit 1 天氣：*windy* `[ˋwɪndi]` 的中文意思是什麼？",
    "o": [
      "有風的",
      "寒冷的",
      "炎熱的",
      "多雲的"
    ],
    "a": 0,
    "e": "*windy* `[ˋwɪndi]`（有風的） 是「有風的」。",
    "w": [
      "",
      "*cold* `[kold]` 是「寒冷的」。",
      "*hot* `[hɑt]` 是「炎熱的」。",
      "*cloudy* `[ˋklaʊdi]` 是「多雲的」。"
    ]
  },
  {
    "sid": "u1-vocab",
    "u": "Unit 1・Weather Vocabulary",
    "d": "易",
    "q": "Unit 1 天氣：*cold* `[kold]` 的中文意思是什麼？",
    "o": [
      "寒冷的",
      "炎熱的",
      "多雲的",
      "下雨的"
    ],
    "a": 0,
    "e": "*cold* `[kold]`（寒冷的） 是「寒冷的」。",
    "w": [
      "",
      "*hot* `[hɑt]` 是「炎熱的」。",
      "*cloudy* `[ˋklaʊdi]` 是「多雲的」。",
      "*rainy* `[ˋreni]` 是「下雨的」。"
    ]
  },
  {
    "sid": "u1-vocab",
    "u": "Unit 1・Weather Vocabulary",
    "d": "易",
    "q": "Unit 1 天氣：*hot* `[hɑt]` 的中文意思是什麼？",
    "o": [
      "炎熱的",
      "多雲的",
      "下雨的",
      "晴朗的"
    ],
    "a": 0,
    "e": "*hot* `[hɑt]`（炎熱的） 是「炎熱的」。",
    "w": [
      "",
      "*cloudy* `[ˋklaʊdi]` 是「多雲的」。",
      "*rainy* `[ˋreni]` 是「下雨的」。",
      "*sunny* `[ˋsʌni]` 是「晴朗的」。"
    ]
  },
  {
    "sid": "u1-vocab",
    "u": "Unit 1・Weather Vocabulary",
    "d": "中",
    "q": "Unit 1 天氣：音標 `[ˋklaʊdi]` 對應的單字是哪一個？",
    "o": [
      "*cloudy*",
      "*rainy*",
      "*sunny*",
      "*windy*"
    ],
    "a": 0,
    "e": "`[ˋklaʊdi]` 是 *cloudy* `[ˋklaʊdi]`（多雲的）。",
    "w": [
      "",
      "這個音標是 *rainy* `[ˋreni]`（下雨的）。",
      "這個音標是 *sunny* `[ˋsʌni]`（晴朗的）。",
      "這個音標是 *windy* `[ˋwɪndi]`（有風的）。"
    ]
  },
  {
    "sid": "u1-vocab",
    "u": "Unit 1・Weather Vocabulary",
    "d": "中",
    "q": "Unit 1 天氣：音標 `[ˋreni]` 對應的單字是哪一個？",
    "o": [
      "*rainy*",
      "*sunny*",
      "*windy*",
      "*cold*"
    ],
    "a": 0,
    "e": "`[ˋreni]` 是 *rainy* `[ˋreni]`（下雨的）。",
    "w": [
      "",
      "這個音標是 *sunny* `[ˋsʌni]`（晴朗的）。",
      "這個音標是 *windy* `[ˋwɪndi]`（有風的）。",
      "這個音標是 *cold* `[kold]`（寒冷的）。"
    ]
  },
  {
    "sid": "u1-vocab",
    "u": "Unit 1・Weather Vocabulary",
    "d": "中",
    "q": "Unit 1 天氣：音標 `[ˋsʌni]` 對應的單字是哪一個？",
    "o": [
      "*sunny*",
      "*windy*",
      "*cold*",
      "*hot*"
    ],
    "a": 0,
    "e": "`[ˋsʌni]` 是 *sunny* `[ˋsʌni]`（晴朗的）。",
    "w": [
      "",
      "這個音標是 *windy* `[ˋwɪndi]`（有風的）。",
      "這個音標是 *cold* `[kold]`（寒冷的）。",
      "這個音標是 *hot* `[hɑt]`（炎熱的）。"
    ]
  },
  {
    "sid": "u1-vocab",
    "u": "Unit 1・Weather Vocabulary",
    "d": "中",
    "q": "Unit 1 天氣：音標 `[ˋwɪndi]` 對應的單字是哪一個？",
    "o": [
      "*windy*",
      "*cold*",
      "*hot*",
      "*cloudy*"
    ],
    "a": 0,
    "e": "`[ˋwɪndi]` 是 *windy* `[ˋwɪndi]`（有風的）。",
    "w": [
      "",
      "這個音標是 *cold* `[kold]`（寒冷的）。",
      "這個音標是 *hot* `[hɑt]`（炎熱的）。",
      "這個音標是 *cloudy* `[ˋklaʊdi]`（多雲的）。"
    ]
  },
  {
    "sid": "u1-vocab",
    "u": "Unit 1・Weather Vocabulary",
    "d": "中",
    "q": "Unit 1 天氣：音標 `[kold]` 對應的單字是哪一個？",
    "o": [
      "*cold*",
      "*hot*",
      "*cloudy*",
      "*rainy*"
    ],
    "a": 0,
    "e": "`[kold]` 是 *cold* `[kold]`（寒冷的）。",
    "w": [
      "",
      "這個音標是 *hot* `[hɑt]`（炎熱的）。",
      "這個音標是 *cloudy* `[ˋklaʊdi]`（多雲的）。",
      "這個音標是 *rainy* `[ˋreni]`（下雨的）。"
    ]
  },
  {
    "sid": "u1-vocab",
    "u": "Unit 1・Weather Vocabulary",
    "d": "中",
    "q": "Unit 1 天氣：音標 `[hɑt]` 對應的單字是哪一個？",
    "o": [
      "*hot*",
      "*cloudy*",
      "*rainy*",
      "*sunny*"
    ],
    "a": 0,
    "e": "`[hɑt]` 是 *hot* `[hɑt]`（炎熱的）。",
    "w": [
      "",
      "這個音標是 *cloudy* `[ˋklaʊdi]`（多雲的）。",
      "這個音標是 *rainy* `[ˋreni]`（下雨的）。",
      "這個音標是 *sunny* `[ˋsʌni]`（晴朗的）。"
    ]
  },
  {
    "sid": "u2-vocab",
    "u": "Unit 2・Numbers & Time",
    "d": "易",
    "q": "Unit 2 數字：「十五」的英文是哪一個？",
    "o": [
      "*fifteen* `[ˏfɪfˋtin]`",
      "*twenty* `[ˋtwɛnti]`",
      "*twenty-five* `[ˏtwɛntiˋfaɪv]`",
      "*thirty* `[ˋθɝti]`"
    ],
    "a": 0,
    "e": "「十五」是 *fifteen* `[ˏfɪfˋtin]`（十五）。",
    "w": [
      "",
      "「二十」是 *twenty* `[ˋtwɛnti]`（二十）。",
      "「二十五」是 *twenty-five* `[ˏtwɛntiˋfaɪv]`（二十五）。",
      "「三十」是 *thirty* `[ˋθɝti]`（三十）。"
    ]
  },
  {
    "sid": "u2-vocab",
    "u": "Unit 2・Numbers & Time",
    "d": "易",
    "q": "Unit 2 數字：「二十」的英文是哪一個？",
    "o": [
      "*twenty* `[ˋtwɛnti]`",
      "*twenty-five* `[ˏtwɛntiˋfaɪv]`",
      "*thirty* `[ˋθɝti]`",
      "*forty* `[ˋfɔrti]`"
    ],
    "a": 0,
    "e": "「二十」是 *twenty* `[ˋtwɛnti]`（二十）。",
    "w": [
      "",
      "「二十五」是 *twenty-five* `[ˏtwɛntiˋfaɪv]`（二十五）。",
      "「三十」是 *thirty* `[ˋθɝti]`（三十）。",
      "「四十」是 *forty* `[ˋfɔrti]`（四十）。"
    ]
  },
  {
    "sid": "u2-vocab",
    "u": "Unit 2・Numbers & Time",
    "d": "易",
    "q": "Unit 2 數字：「二十五」的英文是哪一個？",
    "o": [
      "*twenty-five* `[ˏtwɛntiˋfaɪv]`",
      "*thirty* `[ˋθɝti]`",
      "*forty* `[ˋfɔrti]`",
      "*fifty* `[ˋfɪfti]`"
    ],
    "a": 0,
    "e": "「二十五」是 *twenty-five* `[ˏtwɛntiˋfaɪv]`（二十五）。",
    "w": [
      "",
      "「三十」是 *thirty* `[ˋθɝti]`（三十）。",
      "「四十」是 *forty* `[ˋfɔrti]`（四十）。",
      "「五十」是 *fifty* `[ˋfɪfti]`（五十）。"
    ]
  },
  {
    "sid": "u2-vocab",
    "u": "Unit 2・Numbers & Time",
    "d": "易",
    "q": "Unit 2 數字：「三十」的英文是哪一個？",
    "o": [
      "*thirty* `[ˋθɝti]`",
      "*forty* `[ˋfɔrti]`",
      "*fifty* `[ˋfɪfti]`",
      "*fifteen* `[ˏfɪfˋtin]`"
    ],
    "a": 0,
    "e": "「三十」是 *thirty* `[ˋθɝti]`（三十）。",
    "w": [
      "",
      "「四十」是 *forty* `[ˋfɔrti]`（四十）。",
      "「五十」是 *fifty* `[ˋfɪfti]`（五十）。",
      "「十五」是 *fifteen* `[ˏfɪfˋtin]`（十五）。"
    ]
  },
  {
    "sid": "u2-vocab",
    "u": "Unit 2・Numbers & Time",
    "d": "易",
    "q": "Unit 2 數字：「四十」的英文是哪一個？",
    "o": [
      "*forty* `[ˋfɔrti]`",
      "*fifty* `[ˋfɪfti]`",
      "*fifteen* `[ˏfɪfˋtin]`",
      "*twenty* `[ˋtwɛnti]`"
    ],
    "a": 0,
    "e": "「四十」是 *forty* `[ˋfɔrti]`（四十）。",
    "w": [
      "",
      "「五十」是 *fifty* `[ˋfɪfti]`（五十）。",
      "「十五」是 *fifteen* `[ˏfɪfˋtin]`（十五）。",
      "「二十」是 *twenty* `[ˋtwɛnti]`（二十）。"
    ]
  },
  {
    "sid": "u2-vocab",
    "u": "Unit 2・Numbers & Time",
    "d": "易",
    "q": "Unit 2 數字：「五十」的英文是哪一個？",
    "o": [
      "*fifty* `[ˋfɪfti]`",
      "*fifteen* `[ˏfɪfˋtin]`",
      "*twenty* `[ˋtwɛnti]`",
      "*twenty-five* `[ˏtwɛntiˋfaɪv]`"
    ],
    "a": 0,
    "e": "「五十」是 *fifty* `[ˋfɪfti]`（五十）。",
    "w": [
      "",
      "「十五」是 *fifteen* `[ˏfɪfˋtin]`（十五）。",
      "「二十」是 *twenty* `[ˋtwɛnti]`（二十）。",
      "「二十五」是 *twenty-five* `[ˏtwɛntiˋfaɪv]`（二十五）。"
    ]
  },
  {
    "sid": "u2-vocab",
    "u": "Unit 2・Numbers & Time",
    "d": "易",
    "q": "Unit 2 數字：*fifteen* `[ˏfɪfˋtin]` 的中文意思是什麼？",
    "o": [
      "十五",
      "二十",
      "二十五",
      "三十"
    ],
    "a": 0,
    "e": "*fifteen* `[ˏfɪfˋtin]`（十五） 是「十五」。",
    "w": [
      "",
      "*twenty* `[ˋtwɛnti]` 是「二十」。",
      "*twenty-five* `[ˏtwɛntiˋfaɪv]` 是「二十五」。",
      "*thirty* `[ˋθɝti]` 是「三十」。"
    ]
  },
  {
    "sid": "u2-vocab",
    "u": "Unit 2・Numbers & Time",
    "d": "易",
    "q": "Unit 2 數字：*twenty* `[ˋtwɛnti]` 的中文意思是什麼？",
    "o": [
      "二十",
      "二十五",
      "三十",
      "四十"
    ],
    "a": 0,
    "e": "*twenty* `[ˋtwɛnti]`（二十） 是「二十」。",
    "w": [
      "",
      "*twenty-five* `[ˏtwɛntiˋfaɪv]` 是「二十五」。",
      "*thirty* `[ˋθɝti]` 是「三十」。",
      "*forty* `[ˋfɔrti]` 是「四十」。"
    ]
  },
  {
    "sid": "u2-vocab",
    "u": "Unit 2・Numbers & Time",
    "d": "易",
    "q": "Unit 2 數字：*twenty-five* `[ˏtwɛntiˋfaɪv]` 的中文意思是什麼？",
    "o": [
      "二十五",
      "三十",
      "四十",
      "五十"
    ],
    "a": 0,
    "e": "*twenty-five* `[ˏtwɛntiˋfaɪv]`（二十五） 是「二十五」。",
    "w": [
      "",
      "*thirty* `[ˋθɝti]` 是「三十」。",
      "*forty* `[ˋfɔrti]` 是「四十」。",
      "*fifty* `[ˋfɪfti]` 是「五十」。"
    ]
  },
  {
    "sid": "u2-vocab",
    "u": "Unit 2・Numbers & Time",
    "d": "易",
    "q": "Unit 2 數字：*thirty* `[ˋθɝti]` 的中文意思是什麼？",
    "o": [
      "三十",
      "四十",
      "五十",
      "十五"
    ],
    "a": 0,
    "e": "*thirty* `[ˋθɝti]`（三十） 是「三十」。",
    "w": [
      "",
      "*forty* `[ˋfɔrti]` 是「四十」。",
      "*fifty* `[ˋfɪfti]` 是「五十」。",
      "*fifteen* `[ˏfɪfˋtin]` 是「十五」。"
    ]
  },
  {
    "sid": "u2-vocab",
    "u": "Unit 2・Numbers & Time",
    "d": "易",
    "q": "Unit 2 數字：*forty* `[ˋfɔrti]` 的中文意思是什麼？",
    "o": [
      "四十",
      "五十",
      "十五",
      "二十"
    ],
    "a": 0,
    "e": "*forty* `[ˋfɔrti]`（四十） 是「四十」。",
    "w": [
      "",
      "*fifty* `[ˋfɪfti]` 是「五十」。",
      "*fifteen* `[ˏfɪfˋtin]` 是「十五」。",
      "*twenty* `[ˋtwɛnti]` 是「二十」。"
    ]
  },
  {
    "sid": "u2-vocab",
    "u": "Unit 2・Numbers & Time",
    "d": "易",
    "q": "Unit 2 數字：*fifty* `[ˋfɪfti]` 的中文意思是什麼？",
    "o": [
      "五十",
      "十五",
      "二十",
      "二十五"
    ],
    "a": 0,
    "e": "*fifty* `[ˋfɪfti]`（五十） 是「五十」。",
    "w": [
      "",
      "*fifteen* `[ˏfɪfˋtin]` 是「十五」。",
      "*twenty* `[ˋtwɛnti]` 是「二十」。",
      "*twenty-five* `[ˏtwɛntiˋfaɪv]` 是「二十五」。"
    ]
  },
  {
    "sid": "u2-vocab",
    "u": "Unit 2・Numbers & Time",
    "d": "中",
    "q": "Unit 2 數字：音標 `[ˏfɪfˋtin]` 對應的單字是哪一個？",
    "o": [
      "*fifteen*",
      "*twenty*",
      "*twenty-five*",
      "*thirty*"
    ],
    "a": 0,
    "e": "`[ˏfɪfˋtin]` 是 *fifteen* `[ˏfɪfˋtin]`（十五）。",
    "w": [
      "",
      "這個音標是 *twenty* `[ˋtwɛnti]`（二十）。",
      "這個音標是 *twenty-five* `[ˏtwɛntiˋfaɪv]`（二十五）。",
      "這個音標是 *thirty* `[ˋθɝti]`（三十）。"
    ]
  },
  {
    "sid": "u2-vocab",
    "u": "Unit 2・Numbers & Time",
    "d": "中",
    "q": "Unit 2 數字：音標 `[ˋtwɛnti]` 對應的單字是哪一個？",
    "o": [
      "*twenty*",
      "*twenty-five*",
      "*thirty*",
      "*forty*"
    ],
    "a": 0,
    "e": "`[ˋtwɛnti]` 是 *twenty* `[ˋtwɛnti]`（二十）。",
    "w": [
      "",
      "這個音標是 *twenty-five* `[ˏtwɛntiˋfaɪv]`（二十五）。",
      "這個音標是 *thirty* `[ˋθɝti]`（三十）。",
      "這個音標是 *forty* `[ˋfɔrti]`（四十）。"
    ]
  },
  {
    "sid": "u2-vocab",
    "u": "Unit 2・Numbers & Time",
    "d": "中",
    "q": "Unit 2 數字：音標 `[ˏtwɛntiˋfaɪv]` 對應的單字是哪一個？",
    "o": [
      "*twenty-five*",
      "*thirty*",
      "*forty*",
      "*fifty*"
    ],
    "a": 0,
    "e": "`[ˏtwɛntiˋfaɪv]` 是 *twenty-five* `[ˏtwɛntiˋfaɪv]`（二十五）。",
    "w": [
      "",
      "這個音標是 *thirty* `[ˋθɝti]`（三十）。",
      "這個音標是 *forty* `[ˋfɔrti]`（四十）。",
      "這個音標是 *fifty* `[ˋfɪfti]`（五十）。"
    ]
  },
  {
    "sid": "u2-vocab",
    "u": "Unit 2・Numbers & Time",
    "d": "中",
    "q": "Unit 2 數字：音標 `[ˋθɝti]` 對應的單字是哪一個？",
    "o": [
      "*thirty*",
      "*forty*",
      "*fifty*",
      "*fifteen*"
    ],
    "a": 0,
    "e": "`[ˋθɝti]` 是 *thirty* `[ˋθɝti]`（三十）。",
    "w": [
      "",
      "這個音標是 *forty* `[ˋfɔrti]`（四十）。",
      "這個音標是 *fifty* `[ˋfɪfti]`（五十）。",
      "這個音標是 *fifteen* `[ˏfɪfˋtin]`（十五）。"
    ]
  },
  {
    "sid": "u2-vocab",
    "u": "Unit 2・Numbers & Time",
    "d": "中",
    "q": "Unit 2 數字：音標 `[ˋfɔrti]` 對應的單字是哪一個？",
    "o": [
      "*forty*",
      "*fifty*",
      "*fifteen*",
      "*twenty*"
    ],
    "a": 0,
    "e": "`[ˋfɔrti]` 是 *forty* `[ˋfɔrti]`（四十）。",
    "w": [
      "",
      "這個音標是 *fifty* `[ˋfɪfti]`（五十）。",
      "這個音標是 *fifteen* `[ˏfɪfˋtin]`（十五）。",
      "這個音標是 *twenty* `[ˋtwɛnti]`（二十）。"
    ]
  },
  {
    "sid": "u2-vocab",
    "u": "Unit 2・Numbers & Time",
    "d": "中",
    "q": "Unit 2 數字：音標 `[ˋfɪfti]` 對應的單字是哪一個？",
    "o": [
      "*fifty*",
      "*fifteen*",
      "*twenty*",
      "*twenty-five*"
    ],
    "a": 0,
    "e": "`[ˋfɪfti]` 是 *fifty* `[ˋfɪfti]`（五十）。",
    "w": [
      "",
      "這個音標是 *fifteen* `[ˏfɪfˋtin]`（十五）。",
      "這個音標是 *twenty* `[ˋtwɛnti]`（二十）。",
      "這個音標是 *twenty-five* `[ˏtwɛntiˋfaɪv]`（二十五）。"
    ]
  },
  {
    "sid": "u3-vocab",
    "u": "Unit 3・School Supplies",
    "d": "易",
    "q": "Unit 3 文具：「書」的英文是哪一個？",
    "o": [
      "*book* `[bʊk]`",
      "*eraser* `[ɪˋresɚ]`",
      "*marker* `[ˋmɑrkɚ]`",
      "*pen* `[pɛn]`"
    ],
    "a": 0,
    "e": "「書」是 *book* `[bʊk]`（書）。",
    "w": [
      "",
      "「橡皮擦」是 *eraser* `[ɪˋresɚ]`（橡皮擦）。",
      "「麥克筆」是 *marker* `[ˋmɑrkɚ]`（麥克筆）。",
      "「筆」是 *pen* `[pɛn]`（筆）。"
    ]
  },
  {
    "sid": "u3-vocab",
    "u": "Unit 3・School Supplies",
    "d": "易",
    "q": "Unit 3 文具：「橡皮擦」的英文是哪一個？",
    "o": [
      "*eraser* `[ɪˋresɚ]`",
      "*marker* `[ˋmɑrkɚ]`",
      "*pen* `[pɛn]`",
      "*pencil* `[ˋpɛnsəl]`"
    ],
    "a": 0,
    "e": "「橡皮擦」是 *eraser* `[ɪˋresɚ]`（橡皮擦）。",
    "w": [
      "",
      "「麥克筆」是 *marker* `[ˋmɑrkɚ]`（麥克筆）。",
      "「筆」是 *pen* `[pɛn]`（筆）。",
      "「鉛筆」是 *pencil* `[ˋpɛnsəl]`（鉛筆）。"
    ]
  },
  {
    "sid": "u3-vocab",
    "u": "Unit 3・School Supplies",
    "d": "易",
    "q": "Unit 3 文具：「麥克筆」的英文是哪一個？",
    "o": [
      "*marker* `[ˋmɑrkɚ]`",
      "*pen* `[pɛn]`",
      "*pencil* `[ˋpɛnsəl]`",
      "*ruler* `[ˋrulɚ]`"
    ],
    "a": 0,
    "e": "「麥克筆」是 *marker* `[ˋmɑrkɚ]`（麥克筆）。",
    "w": [
      "",
      "「筆」是 *pen* `[pɛn]`（筆）。",
      "「鉛筆」是 *pencil* `[ˋpɛnsəl]`（鉛筆）。",
      "「尺」是 *ruler* `[ˋrulɚ]`（尺）。"
    ]
  },
  {
    "sid": "u3-vocab",
    "u": "Unit 3・School Supplies",
    "d": "易",
    "q": "Unit 3 文具：「筆」的英文是哪一個？",
    "o": [
      "*pen* `[pɛn]`",
      "*pencil* `[ˋpɛnsəl]`",
      "*ruler* `[ˋrulɚ]`",
      "*book* `[bʊk]`"
    ],
    "a": 0,
    "e": "「筆」是 *pen* `[pɛn]`（筆）。",
    "w": [
      "",
      "「鉛筆」是 *pencil* `[ˋpɛnsəl]`（鉛筆）。",
      "「尺」是 *ruler* `[ˋrulɚ]`（尺）。",
      "「書」是 *book* `[bʊk]`（書）。"
    ]
  },
  {
    "sid": "u3-vocab",
    "u": "Unit 3・School Supplies",
    "d": "易",
    "q": "Unit 3 文具：「鉛筆」的英文是哪一個？",
    "o": [
      "*pencil* `[ˋpɛnsəl]`",
      "*ruler* `[ˋrulɚ]`",
      "*book* `[bʊk]`",
      "*eraser* `[ɪˋresɚ]`"
    ],
    "a": 0,
    "e": "「鉛筆」是 *pencil* `[ˋpɛnsəl]`（鉛筆）。",
    "w": [
      "",
      "「尺」是 *ruler* `[ˋrulɚ]`（尺）。",
      "「書」是 *book* `[bʊk]`（書）。",
      "「橡皮擦」是 *eraser* `[ɪˋresɚ]`（橡皮擦）。"
    ]
  },
  {
    "sid": "u3-vocab",
    "u": "Unit 3・School Supplies",
    "d": "易",
    "q": "Unit 3 文具：「尺」的英文是哪一個？",
    "o": [
      "*ruler* `[ˋrulɚ]`",
      "*book* `[bʊk]`",
      "*eraser* `[ɪˋresɚ]`",
      "*marker* `[ˋmɑrkɚ]`"
    ],
    "a": 0,
    "e": "「尺」是 *ruler* `[ˋrulɚ]`（尺）。",
    "w": [
      "",
      "「書」是 *book* `[bʊk]`（書）。",
      "「橡皮擦」是 *eraser* `[ɪˋresɚ]`（橡皮擦）。",
      "「麥克筆」是 *marker* `[ˋmɑrkɚ]`（麥克筆）。"
    ]
  },
  {
    "sid": "u3-vocab",
    "u": "Unit 3・School Supplies",
    "d": "易",
    "q": "Unit 3 文具：*book* `[bʊk]` 的中文意思是什麼？",
    "o": [
      "書",
      "橡皮擦",
      "麥克筆",
      "筆"
    ],
    "a": 0,
    "e": "*book* `[bʊk]`（書） 是「書」。",
    "w": [
      "",
      "*eraser* `[ɪˋresɚ]` 是「橡皮擦」。",
      "*marker* `[ˋmɑrkɚ]` 是「麥克筆」。",
      "*pen* `[pɛn]` 是「筆」。"
    ]
  },
  {
    "sid": "u3-vocab",
    "u": "Unit 3・School Supplies",
    "d": "易",
    "q": "Unit 3 文具：*eraser* `[ɪˋresɚ]` 的中文意思是什麼？",
    "o": [
      "橡皮擦",
      "麥克筆",
      "筆",
      "鉛筆"
    ],
    "a": 0,
    "e": "*eraser* `[ɪˋresɚ]`（橡皮擦） 是「橡皮擦」。",
    "w": [
      "",
      "*marker* `[ˋmɑrkɚ]` 是「麥克筆」。",
      "*pen* `[pɛn]` 是「筆」。",
      "*pencil* `[ˋpɛnsəl]` 是「鉛筆」。"
    ]
  },
  {
    "sid": "u3-vocab",
    "u": "Unit 3・School Supplies",
    "d": "易",
    "q": "Unit 3 文具：*marker* `[ˋmɑrkɚ]` 的中文意思是什麼？",
    "o": [
      "麥克筆",
      "筆",
      "鉛筆",
      "尺"
    ],
    "a": 0,
    "e": "*marker* `[ˋmɑrkɚ]`（麥克筆） 是「麥克筆」。",
    "w": [
      "",
      "*pen* `[pɛn]` 是「筆」。",
      "*pencil* `[ˋpɛnsəl]` 是「鉛筆」。",
      "*ruler* `[ˋrulɚ]` 是「尺」。"
    ]
  },
  {
    "sid": "u3-vocab",
    "u": "Unit 3・School Supplies",
    "d": "易",
    "q": "Unit 3 文具：*pen* `[pɛn]` 的中文意思是什麼？",
    "o": [
      "筆",
      "鉛筆",
      "尺",
      "書"
    ],
    "a": 0,
    "e": "*pen* `[pɛn]`（筆） 是「筆」。",
    "w": [
      "",
      "*pencil* `[ˋpɛnsəl]` 是「鉛筆」。",
      "*ruler* `[ˋrulɚ]` 是「尺」。",
      "*book* `[bʊk]` 是「書」。"
    ]
  },
  {
    "sid": "u3-vocab",
    "u": "Unit 3・School Supplies",
    "d": "易",
    "q": "Unit 3 文具：*pencil* `[ˋpɛnsəl]` 的中文意思是什麼？",
    "o": [
      "鉛筆",
      "尺",
      "書",
      "橡皮擦"
    ],
    "a": 0,
    "e": "*pencil* `[ˋpɛnsəl]`（鉛筆） 是「鉛筆」。",
    "w": [
      "",
      "*ruler* `[ˋrulɚ]` 是「尺」。",
      "*book* `[bʊk]` 是「書」。",
      "*eraser* `[ɪˋresɚ]` 是「橡皮擦」。"
    ]
  },
  {
    "sid": "u3-vocab",
    "u": "Unit 3・School Supplies",
    "d": "易",
    "q": "Unit 3 文具：*ruler* `[ˋrulɚ]` 的中文意思是什麼？",
    "o": [
      "尺",
      "書",
      "橡皮擦",
      "麥克筆"
    ],
    "a": 0,
    "e": "*ruler* `[ˋrulɚ]`（尺） 是「尺」。",
    "w": [
      "",
      "*book* `[bʊk]` 是「書」。",
      "*eraser* `[ɪˋresɚ]` 是「橡皮擦」。",
      "*marker* `[ˋmɑrkɚ]` 是「麥克筆」。"
    ]
  },
  {
    "sid": "u3-vocab",
    "u": "Unit 3・School Supplies",
    "d": "中",
    "q": "Unit 3 文具：音標 `[bʊk]` 對應的單字是哪一個？",
    "o": [
      "*book*",
      "*eraser*",
      "*marker*",
      "*pen*"
    ],
    "a": 0,
    "e": "`[bʊk]` 是 *book* `[bʊk]`（書）。",
    "w": [
      "",
      "這個音標是 *eraser* `[ɪˋresɚ]`（橡皮擦）。",
      "這個音標是 *marker* `[ˋmɑrkɚ]`（麥克筆）。",
      "這個音標是 *pen* `[pɛn]`（筆）。"
    ]
  },
  {
    "sid": "u3-vocab",
    "u": "Unit 3・School Supplies",
    "d": "中",
    "q": "Unit 3 文具：音標 `[ɪˋresɚ]` 對應的單字是哪一個？",
    "o": [
      "*eraser*",
      "*marker*",
      "*pen*",
      "*pencil*"
    ],
    "a": 0,
    "e": "`[ɪˋresɚ]` 是 *eraser* `[ɪˋresɚ]`（橡皮擦）。",
    "w": [
      "",
      "這個音標是 *marker* `[ˋmɑrkɚ]`（麥克筆）。",
      "這個音標是 *pen* `[pɛn]`（筆）。",
      "這個音標是 *pencil* `[ˋpɛnsəl]`（鉛筆）。"
    ]
  },
  {
    "sid": "u3-vocab",
    "u": "Unit 3・School Supplies",
    "d": "中",
    "q": "Unit 3 文具：音標 `[ˋmɑrkɚ]` 對應的單字是哪一個？",
    "o": [
      "*marker*",
      "*pen*",
      "*pencil*",
      "*ruler*"
    ],
    "a": 0,
    "e": "`[ˋmɑrkɚ]` 是 *marker* `[ˋmɑrkɚ]`（麥克筆）。",
    "w": [
      "",
      "這個音標是 *pen* `[pɛn]`（筆）。",
      "這個音標是 *pencil* `[ˋpɛnsəl]`（鉛筆）。",
      "這個音標是 *ruler* `[ˋrulɚ]`（尺）。"
    ]
  },
  {
    "sid": "u3-vocab",
    "u": "Unit 3・School Supplies",
    "d": "中",
    "q": "Unit 3 文具：音標 `[pɛn]` 對應的單字是哪一個？",
    "o": [
      "*pen*",
      "*pencil*",
      "*ruler*",
      "*book*"
    ],
    "a": 0,
    "e": "`[pɛn]` 是 *pen* `[pɛn]`（筆）。",
    "w": [
      "",
      "這個音標是 *pencil* `[ˋpɛnsəl]`（鉛筆）。",
      "這個音標是 *ruler* `[ˋrulɚ]`（尺）。",
      "這個音標是 *book* `[bʊk]`（書）。"
    ]
  },
  {
    "sid": "u3-vocab",
    "u": "Unit 3・School Supplies",
    "d": "中",
    "q": "Unit 3 文具：音標 `[ˋpɛnsəl]` 對應的單字是哪一個？",
    "o": [
      "*pencil*",
      "*ruler*",
      "*book*",
      "*eraser*"
    ],
    "a": 0,
    "e": "`[ˋpɛnsəl]` 是 *pencil* `[ˋpɛnsəl]`（鉛筆）。",
    "w": [
      "",
      "這個音標是 *ruler* `[ˋrulɚ]`（尺）。",
      "這個音標是 *book* `[bʊk]`（書）。",
      "這個音標是 *eraser* `[ɪˋresɚ]`（橡皮擦）。"
    ]
  },
  {
    "sid": "u3-vocab",
    "u": "Unit 3・School Supplies",
    "d": "中",
    "q": "Unit 3 文具：音標 `[ˋrulɚ]` 對應的單字是哪一個？",
    "o": [
      "*ruler*",
      "*book*",
      "*eraser*",
      "*marker*"
    ],
    "a": 0,
    "e": "`[ˋrulɚ]` 是 *ruler* `[ˋrulɚ]`（尺）。",
    "w": [
      "",
      "這個音標是 *book* `[bʊk]`（書）。",
      "這個音標是 *eraser* `[ɪˋresɚ]`（橡皮擦）。",
      "這個音標是 *marker* `[ˋmɑrkɚ]`（麥克筆）。"
    ]
  },
  {
    "sid": "u4-vocab",
    "u": "Unit 4・Position Words",
    "d": "易",
    "q": "Unit 4 位置：「在……裡面」的英文是哪一個？",
    "o": [
      "*in* `[ɪn]`",
      "*on* `[ɑn]`",
      "*under* `[ˋʌndɚ]`",
      "*box* `[bɑks]`"
    ],
    "a": 0,
    "e": "「在……裡面」是 *in* `[ɪn]`（在……裡面）。",
    "w": [
      "",
      "「在……上面」是 *on* `[ɑn]`（在……上面）。",
      "「在……下面」是 *under* `[ˋʌndɚ]`（在……下面）。",
      "「盒子」是 *box* `[bɑks]`（盒子）。"
    ]
  },
  {
    "sid": "u4-vocab",
    "u": "Unit 4・Position Words",
    "d": "易",
    "q": "Unit 4 位置：「在……上面」的英文是哪一個？",
    "o": [
      "*on* `[ɑn]`",
      "*under* `[ˋʌndɚ]`",
      "*box* `[bɑks]`",
      "*chair* `[tʃɛr]`"
    ],
    "a": 0,
    "e": "「在……上面」是 *on* `[ɑn]`（在……上面）。",
    "w": [
      "",
      "「在……下面」是 *under* `[ˋʌndɚ]`（在……下面）。",
      "「盒子」是 *box* `[bɑks]`（盒子）。",
      "「椅子」是 *chair* `[tʃɛr]`（椅子）。"
    ]
  },
  {
    "sid": "u4-vocab",
    "u": "Unit 4・Position Words",
    "d": "易",
    "q": "Unit 4 位置：「在……下面」的英文是哪一個？",
    "o": [
      "*under* `[ˋʌndɚ]`",
      "*box* `[bɑks]`",
      "*chair* `[tʃɛr]`",
      "*desk* `[dɛsk]`"
    ],
    "a": 0,
    "e": "「在……下面」是 *under* `[ˋʌndɚ]`（在……下面）。",
    "w": [
      "",
      "「盒子」是 *box* `[bɑks]`（盒子）。",
      "「椅子」是 *chair* `[tʃɛr]`（椅子）。",
      "「書桌」是 *desk* `[dɛsk]`（書桌）。"
    ]
  },
  {
    "sid": "u4-vocab",
    "u": "Unit 4・Position Words",
    "d": "易",
    "q": "Unit 4 位置：「盒子」的英文是哪一個？",
    "o": [
      "*box* `[bɑks]`",
      "*chair* `[tʃɛr]`",
      "*desk* `[dɛsk]`",
      "*in* `[ɪn]`"
    ],
    "a": 0,
    "e": "「盒子」是 *box* `[bɑks]`（盒子）。",
    "w": [
      "",
      "「椅子」是 *chair* `[tʃɛr]`（椅子）。",
      "「書桌」是 *desk* `[dɛsk]`（書桌）。",
      "「在……裡面」是 *in* `[ɪn]`（在……裡面）。"
    ]
  },
  {
    "sid": "u4-vocab",
    "u": "Unit 4・Position Words",
    "d": "易",
    "q": "Unit 4 位置：「椅子」的英文是哪一個？",
    "o": [
      "*chair* `[tʃɛr]`",
      "*desk* `[dɛsk]`",
      "*in* `[ɪn]`",
      "*on* `[ɑn]`"
    ],
    "a": 0,
    "e": "「椅子」是 *chair* `[tʃɛr]`（椅子）。",
    "w": [
      "",
      "「書桌」是 *desk* `[dɛsk]`（書桌）。",
      "「在……裡面」是 *in* `[ɪn]`（在……裡面）。",
      "「在……上面」是 *on* `[ɑn]`（在……上面）。"
    ]
  },
  {
    "sid": "u4-vocab",
    "u": "Unit 4・Position Words",
    "d": "易",
    "q": "Unit 4 位置：「書桌」的英文是哪一個？",
    "o": [
      "*desk* `[dɛsk]`",
      "*in* `[ɪn]`",
      "*on* `[ɑn]`",
      "*under* `[ˋʌndɚ]`"
    ],
    "a": 0,
    "e": "「書桌」是 *desk* `[dɛsk]`（書桌）。",
    "w": [
      "",
      "「在……裡面」是 *in* `[ɪn]`（在……裡面）。",
      "「在……上面」是 *on* `[ɑn]`（在……上面）。",
      "「在……下面」是 *under* `[ˋʌndɚ]`（在……下面）。"
    ]
  },
  {
    "sid": "u4-vocab",
    "u": "Unit 4・Position Words",
    "d": "易",
    "q": "Unit 4 位置：*in* `[ɪn]` 的中文意思是什麼？",
    "o": [
      "在……裡面",
      "在……上面",
      "在……下面",
      "盒子"
    ],
    "a": 0,
    "e": "*in* `[ɪn]`（在……裡面） 是「在……裡面」。",
    "w": [
      "",
      "*on* `[ɑn]` 是「在……上面」。",
      "*under* `[ˋʌndɚ]` 是「在……下面」。",
      "*box* `[bɑks]` 是「盒子」。"
    ]
  },
  {
    "sid": "u4-vocab",
    "u": "Unit 4・Position Words",
    "d": "易",
    "q": "Unit 4 位置：*on* `[ɑn]` 的中文意思是什麼？",
    "o": [
      "在……上面",
      "在……下面",
      "盒子",
      "椅子"
    ],
    "a": 0,
    "e": "*on* `[ɑn]`（在……上面） 是「在……上面」。",
    "w": [
      "",
      "*under* `[ˋʌndɚ]` 是「在……下面」。",
      "*box* `[bɑks]` 是「盒子」。",
      "*chair* `[tʃɛr]` 是「椅子」。"
    ]
  },
  {
    "sid": "u4-vocab",
    "u": "Unit 4・Position Words",
    "d": "易",
    "q": "Unit 4 位置：*under* `[ˋʌndɚ]` 的中文意思是什麼？",
    "o": [
      "在……下面",
      "盒子",
      "椅子",
      "書桌"
    ],
    "a": 0,
    "e": "*under* `[ˋʌndɚ]`（在……下面） 是「在……下面」。",
    "w": [
      "",
      "*box* `[bɑks]` 是「盒子」。",
      "*chair* `[tʃɛr]` 是「椅子」。",
      "*desk* `[dɛsk]` 是「書桌」。"
    ]
  },
  {
    "sid": "u4-vocab",
    "u": "Unit 4・Position Words",
    "d": "易",
    "q": "Unit 4 位置：*box* `[bɑks]` 的中文意思是什麼？",
    "o": [
      "盒子",
      "椅子",
      "書桌",
      "在……裡面"
    ],
    "a": 0,
    "e": "*box* `[bɑks]`（盒子） 是「盒子」。",
    "w": [
      "",
      "*chair* `[tʃɛr]` 是「椅子」。",
      "*desk* `[dɛsk]` 是「書桌」。",
      "*in* `[ɪn]` 是「在……裡面」。"
    ]
  },
  {
    "sid": "u4-vocab",
    "u": "Unit 4・Position Words",
    "d": "易",
    "q": "Unit 4 位置：*chair* `[tʃɛr]` 的中文意思是什麼？",
    "o": [
      "椅子",
      "書桌",
      "在……裡面",
      "在……上面"
    ],
    "a": 0,
    "e": "*chair* `[tʃɛr]`（椅子） 是「椅子」。",
    "w": [
      "",
      "*desk* `[dɛsk]` 是「書桌」。",
      "*in* `[ɪn]` 是「在……裡面」。",
      "*on* `[ɑn]` 是「在……上面」。"
    ]
  },
  {
    "sid": "u4-vocab",
    "u": "Unit 4・Position Words",
    "d": "易",
    "q": "Unit 4 位置：*desk* `[dɛsk]` 的中文意思是什麼？",
    "o": [
      "書桌",
      "在……裡面",
      "在……上面",
      "在……下面"
    ],
    "a": 0,
    "e": "*desk* `[dɛsk]`（書桌） 是「書桌」。",
    "w": [
      "",
      "*in* `[ɪn]` 是「在……裡面」。",
      "*on* `[ɑn]` 是「在……上面」。",
      "*under* `[ˋʌndɚ]` 是「在……下面」。"
    ]
  },
  {
    "sid": "u4-vocab",
    "u": "Unit 4・Position Words",
    "d": "中",
    "q": "Unit 4 位置：音標 `[ɪn]` 對應的單字是哪一個？",
    "o": [
      "*in*",
      "*on*",
      "*under*",
      "*box*"
    ],
    "a": 0,
    "e": "`[ɪn]` 是 *in* `[ɪn]`（在……裡面）。",
    "w": [
      "",
      "這個音標是 *on* `[ɑn]`（在……上面）。",
      "這個音標是 *under* `[ˋʌndɚ]`（在……下面）。",
      "這個音標是 *box* `[bɑks]`（盒子）。"
    ]
  },
  {
    "sid": "u4-vocab",
    "u": "Unit 4・Position Words",
    "d": "中",
    "q": "Unit 4 位置：音標 `[ɑn]` 對應的單字是哪一個？",
    "o": [
      "*on*",
      "*under*",
      "*box*",
      "*chair*"
    ],
    "a": 0,
    "e": "`[ɑn]` 是 *on* `[ɑn]`（在……上面）。",
    "w": [
      "",
      "這個音標是 *under* `[ˋʌndɚ]`（在……下面）。",
      "這個音標是 *box* `[bɑks]`（盒子）。",
      "這個音標是 *chair* `[tʃɛr]`（椅子）。"
    ]
  },
  {
    "sid": "u4-vocab",
    "u": "Unit 4・Position Words",
    "d": "中",
    "q": "Unit 4 位置：音標 `[ˋʌndɚ]` 對應的單字是哪一個？",
    "o": [
      "*under*",
      "*box*",
      "*chair*",
      "*desk*"
    ],
    "a": 0,
    "e": "`[ˋʌndɚ]` 是 *under* `[ˋʌndɚ]`（在……下面）。",
    "w": [
      "",
      "這個音標是 *box* `[bɑks]`（盒子）。",
      "這個音標是 *chair* `[tʃɛr]`（椅子）。",
      "這個音標是 *desk* `[dɛsk]`（書桌）。"
    ]
  },
  {
    "sid": "u4-vocab",
    "u": "Unit 4・Position Words",
    "d": "中",
    "q": "Unit 4 位置：音標 `[bɑks]` 對應的單字是哪一個？",
    "o": [
      "*box*",
      "*chair*",
      "*desk*",
      "*in*"
    ],
    "a": 0,
    "e": "`[bɑks]` 是 *box* `[bɑks]`（盒子）。",
    "w": [
      "",
      "這個音標是 *chair* `[tʃɛr]`（椅子）。",
      "這個音標是 *desk* `[dɛsk]`（書桌）。",
      "這個音標是 *in* `[ɪn]`（在……裡面）。"
    ]
  },
  {
    "sid": "u4-vocab",
    "u": "Unit 4・Position Words",
    "d": "中",
    "q": "Unit 4 位置：音標 `[tʃɛr]` 對應的單字是哪一個？",
    "o": [
      "*chair*",
      "*desk*",
      "*in*",
      "*on*"
    ],
    "a": 0,
    "e": "`[tʃɛr]` 是 *chair* `[tʃɛr]`（椅子）。",
    "w": [
      "",
      "這個音標是 *desk* `[dɛsk]`（書桌）。",
      "這個音標是 *in* `[ɪn]`（在……裡面）。",
      "這個音標是 *on* `[ɑn]`（在……上面）。"
    ]
  },
  {
    "sid": "u4-vocab",
    "u": "Unit 4・Position Words",
    "d": "中",
    "q": "Unit 4 位置：音標 `[dɛsk]` 對應的單字是哪一個？",
    "o": [
      "*desk*",
      "*in*",
      "*on*",
      "*under*"
    ],
    "a": 0,
    "e": "`[dɛsk]` 是 *desk* `[dɛsk]`（書桌）。",
    "w": [
      "",
      "這個音標是 *in* `[ɪn]`（在……裡面）。",
      "這個音標是 *on* `[ɑn]`（在……上面）。",
      "這個音標是 *under* `[ˋʌndɚ]`（在……下面）。"
    ]
  },
  {
    "sid": "culture-halloween",
    "u": "Culture & Festivals・Halloween",
    "d": "易",
    "q": "萬聖節：「鬼」的英文是哪一個？",
    "o": [
      "*ghost* `[gost]`",
      "*jack-o'-lantern* `[ˋdʒæk ə ˏlæntɚn]`",
      "*mummy* `[ˋmʌmi]`",
      "*vampire* `[ˋvæmpaɪr]`"
    ],
    "a": 0,
    "e": "「鬼」是 *ghost* `[gost]`（鬼）。",
    "w": [
      "",
      "「南瓜燈」是 *jack-o'-lantern* `[ˋdʒæk ə ˏlæntɚn]`（南瓜燈）。",
      "「木乃伊」是 *mummy* `[ˋmʌmi]`（木乃伊）。",
      "「吸血鬼」是 *vampire* `[ˋvæmpaɪr]`（吸血鬼）。"
    ]
  },
  {
    "sid": "culture-halloween",
    "u": "Culture & Festivals・Halloween",
    "d": "易",
    "q": "萬聖節：「南瓜燈」的英文是哪一個？",
    "o": [
      "*jack-o'-lantern* `[ˋdʒæk ə ˏlæntɚn]`",
      "*mummy* `[ˋmʌmi]`",
      "*vampire* `[ˋvæmpaɪr]`",
      "*witch* `[wɪtʃ]`"
    ],
    "a": 0,
    "e": "「南瓜燈」是 *jack-o'-lantern* `[ˋdʒæk ə ˏlæntɚn]`（南瓜燈）。",
    "w": [
      "",
      "「木乃伊」是 *mummy* `[ˋmʌmi]`（木乃伊）。",
      "「吸血鬼」是 *vampire* `[ˋvæmpaɪr]`（吸血鬼）。",
      "「女巫」是 *witch* `[wɪtʃ]`（女巫）。"
    ]
  },
  {
    "sid": "culture-halloween",
    "u": "Culture & Festivals・Halloween",
    "d": "易",
    "q": "萬聖節：「木乃伊」的英文是哪一個？",
    "o": [
      "*mummy* `[ˋmʌmi]`",
      "*vampire* `[ˋvæmpaɪr]`",
      "*witch* `[wɪtʃ]`",
      "*ghost* `[gost]`"
    ],
    "a": 0,
    "e": "「木乃伊」是 *mummy* `[ˋmʌmi]`（木乃伊）。",
    "w": [
      "",
      "「吸血鬼」是 *vampire* `[ˋvæmpaɪr]`（吸血鬼）。",
      "「女巫」是 *witch* `[wɪtʃ]`（女巫）。",
      "「鬼」是 *ghost* `[gost]`（鬼）。"
    ]
  },
  {
    "sid": "culture-halloween",
    "u": "Culture & Festivals・Halloween",
    "d": "易",
    "q": "萬聖節：「吸血鬼」的英文是哪一個？",
    "o": [
      "*vampire* `[ˋvæmpaɪr]`",
      "*witch* `[wɪtʃ]`",
      "*ghost* `[gost]`",
      "*jack-o'-lantern* `[ˋdʒæk ə ˏlæntɚn]`"
    ],
    "a": 0,
    "e": "「吸血鬼」是 *vampire* `[ˋvæmpaɪr]`（吸血鬼）。",
    "w": [
      "",
      "「女巫」是 *witch* `[wɪtʃ]`（女巫）。",
      "「鬼」是 *ghost* `[gost]`（鬼）。",
      "「南瓜燈」是 *jack-o'-lantern* `[ˋdʒæk ə ˏlæntɚn]`（南瓜燈）。"
    ]
  },
  {
    "sid": "culture-halloween",
    "u": "Culture & Festivals・Halloween",
    "d": "易",
    "q": "萬聖節：「女巫」的英文是哪一個？",
    "o": [
      "*witch* `[wɪtʃ]`",
      "*ghost* `[gost]`",
      "*jack-o'-lantern* `[ˋdʒæk ə ˏlæntɚn]`",
      "*mummy* `[ˋmʌmi]`"
    ],
    "a": 0,
    "e": "「女巫」是 *witch* `[wɪtʃ]`（女巫）。",
    "w": [
      "",
      "「鬼」是 *ghost* `[gost]`（鬼）。",
      "「南瓜燈」是 *jack-o'-lantern* `[ˋdʒæk ə ˏlæntɚn]`（南瓜燈）。",
      "「木乃伊」是 *mummy* `[ˋmʌmi]`（木乃伊）。"
    ]
  },
  {
    "sid": "culture-halloween",
    "u": "Culture & Festivals・Halloween",
    "d": "易",
    "q": "萬聖節：*ghost* `[gost]` 的中文意思是什麼？",
    "o": [
      "鬼",
      "南瓜燈",
      "木乃伊",
      "吸血鬼"
    ],
    "a": 0,
    "e": "*ghost* `[gost]`（鬼） 是「鬼」。",
    "w": [
      "",
      "*jack-o'-lantern* `[ˋdʒæk ə ˏlæntɚn]` 是「南瓜燈」。",
      "*mummy* `[ˋmʌmi]` 是「木乃伊」。",
      "*vampire* `[ˋvæmpaɪr]` 是「吸血鬼」。"
    ]
  },
  {
    "sid": "culture-halloween",
    "u": "Culture & Festivals・Halloween",
    "d": "易",
    "q": "萬聖節：*jack-o'-lantern* `[ˋdʒæk ə ˏlæntɚn]` 的中文意思是什麼？",
    "o": [
      "南瓜燈",
      "木乃伊",
      "吸血鬼",
      "女巫"
    ],
    "a": 0,
    "e": "*jack-o'-lantern* `[ˋdʒæk ə ˏlæntɚn]`（南瓜燈） 是「南瓜燈」。",
    "w": [
      "",
      "*mummy* `[ˋmʌmi]` 是「木乃伊」。",
      "*vampire* `[ˋvæmpaɪr]` 是「吸血鬼」。",
      "*witch* `[wɪtʃ]` 是「女巫」。"
    ]
  },
  {
    "sid": "culture-halloween",
    "u": "Culture & Festivals・Halloween",
    "d": "易",
    "q": "萬聖節：*mummy* `[ˋmʌmi]` 的中文意思是什麼？",
    "o": [
      "木乃伊",
      "吸血鬼",
      "女巫",
      "鬼"
    ],
    "a": 0,
    "e": "*mummy* `[ˋmʌmi]`（木乃伊） 是「木乃伊」。",
    "w": [
      "",
      "*vampire* `[ˋvæmpaɪr]` 是「吸血鬼」。",
      "*witch* `[wɪtʃ]` 是「女巫」。",
      "*ghost* `[gost]` 是「鬼」。"
    ]
  },
  {
    "sid": "culture-halloween",
    "u": "Culture & Festivals・Halloween",
    "d": "易",
    "q": "萬聖節：*vampire* `[ˋvæmpaɪr]` 的中文意思是什麼？",
    "o": [
      "吸血鬼",
      "女巫",
      "鬼",
      "南瓜燈"
    ],
    "a": 0,
    "e": "*vampire* `[ˋvæmpaɪr]`（吸血鬼） 是「吸血鬼」。",
    "w": [
      "",
      "*witch* `[wɪtʃ]` 是「女巫」。",
      "*ghost* `[gost]` 是「鬼」。",
      "*jack-o'-lantern* `[ˋdʒæk ə ˏlæntɚn]` 是「南瓜燈」。"
    ]
  },
  {
    "sid": "culture-halloween",
    "u": "Culture & Festivals・Halloween",
    "d": "易",
    "q": "萬聖節：*witch* `[wɪtʃ]` 的中文意思是什麼？",
    "o": [
      "女巫",
      "鬼",
      "南瓜燈",
      "木乃伊"
    ],
    "a": 0,
    "e": "*witch* `[wɪtʃ]`（女巫） 是「女巫」。",
    "w": [
      "",
      "*ghost* `[gost]` 是「鬼」。",
      "*jack-o'-lantern* `[ˋdʒæk ə ˏlæntɚn]` 是「南瓜燈」。",
      "*mummy* `[ˋmʌmi]` 是「木乃伊」。"
    ]
  },
  {
    "sid": "culture-halloween",
    "u": "Culture & Festivals・Halloween",
    "d": "中",
    "q": "萬聖節：音標 `[gost]` 對應的單字是哪一個？",
    "o": [
      "*ghost*",
      "*jack-o'-lantern*",
      "*mummy*",
      "*vampire*"
    ],
    "a": 0,
    "e": "`[gost]` 是 *ghost* `[gost]`（鬼）。",
    "w": [
      "",
      "這個音標是 *jack-o'-lantern* `[ˋdʒæk ə ˏlæntɚn]`（南瓜燈）。",
      "這個音標是 *mummy* `[ˋmʌmi]`（木乃伊）。",
      "這個音標是 *vampire* `[ˋvæmpaɪr]`（吸血鬼）。"
    ]
  },
  {
    "sid": "culture-halloween",
    "u": "Culture & Festivals・Halloween",
    "d": "中",
    "q": "萬聖節：音標 `[ˋdʒæk ə ˏlæntɚn]` 對應的單字是哪一個？",
    "o": [
      "*jack-o'-lantern*",
      "*mummy*",
      "*vampire*",
      "*witch*"
    ],
    "a": 0,
    "e": "`[ˋdʒæk ə ˏlæntɚn]` 是 *jack-o'-lantern* `[ˋdʒæk ə ˏlæntɚn]`（南瓜燈）。",
    "w": [
      "",
      "這個音標是 *mummy* `[ˋmʌmi]`（木乃伊）。",
      "這個音標是 *vampire* `[ˋvæmpaɪr]`（吸血鬼）。",
      "這個音標是 *witch* `[wɪtʃ]`（女巫）。"
    ]
  },
  {
    "sid": "culture-halloween",
    "u": "Culture & Festivals・Halloween",
    "d": "中",
    "q": "萬聖節：音標 `[ˋmʌmi]` 對應的單字是哪一個？",
    "o": [
      "*mummy*",
      "*vampire*",
      "*witch*",
      "*ghost*"
    ],
    "a": 0,
    "e": "`[ˋmʌmi]` 是 *mummy* `[ˋmʌmi]`（木乃伊）。",
    "w": [
      "",
      "這個音標是 *vampire* `[ˋvæmpaɪr]`（吸血鬼）。",
      "這個音標是 *witch* `[wɪtʃ]`（女巫）。",
      "這個音標是 *ghost* `[gost]`（鬼）。"
    ]
  },
  {
    "sid": "culture-halloween",
    "u": "Culture & Festivals・Halloween",
    "d": "中",
    "q": "萬聖節：音標 `[ˋvæmpaɪr]` 對應的單字是哪一個？",
    "o": [
      "*vampire*",
      "*witch*",
      "*ghost*",
      "*jack-o'-lantern*"
    ],
    "a": 0,
    "e": "`[ˋvæmpaɪr]` 是 *vampire* `[ˋvæmpaɪr]`（吸血鬼）。",
    "w": [
      "",
      "這個音標是 *witch* `[wɪtʃ]`（女巫）。",
      "這個音標是 *ghost* `[gost]`（鬼）。",
      "這個音標是 *jack-o'-lantern* `[ˋdʒæk ə ˏlæntɚn]`（南瓜燈）。"
    ]
  },
  {
    "sid": "culture-halloween",
    "u": "Culture & Festivals・Halloween",
    "d": "中",
    "q": "萬聖節：音標 `[wɪtʃ]` 對應的單字是哪一個？",
    "o": [
      "*witch*",
      "*ghost*",
      "*jack-o'-lantern*",
      "*mummy*"
    ],
    "a": 0,
    "e": "`[wɪtʃ]` 是 *witch* `[wɪtʃ]`（女巫）。",
    "w": [
      "",
      "這個音標是 *ghost* `[gost]`（鬼）。",
      "這個音標是 *jack-o'-lantern* `[ˋdʒæk ə ˏlæntɚn]`（南瓜燈）。",
      "這個音標是 *mummy* `[ˋmʌmi]`（木乃伊）。"
    ]
  },
  {
    "sid": "task-emergency",
    "u": "Task・Emergency Weather",
    "d": "易",
    "q": "防災任務：「地震」的英文是哪一個？",
    "o": [
      "*earthquake* `[ˋɝθˏkwek]`",
      "*fire* `[faɪr]`",
      "*flood* `[flʌd]`",
      "*mudslide* `[ˋmʌdˏslaɪd]`"
    ],
    "a": 0,
    "e": "「地震」是 *earthquake* `[ˋɝθˏkwek]`（地震）。",
    "w": [
      "",
      "「火災」是 *fire* `[faɪr]`（火災）。",
      "「水災」是 *flood* `[flʌd]`（水災）。",
      "「土石流」是 *mudslide* `[ˋmʌdˏslaɪd]`（土石流）。"
    ]
  },
  {
    "sid": "task-emergency",
    "u": "Task・Emergency Weather",
    "d": "易",
    "q": "防災任務：「火災」的英文是哪一個？",
    "o": [
      "*fire* `[faɪr]`",
      "*flood* `[flʌd]`",
      "*mudslide* `[ˋmʌdˏslaɪd]`",
      "*rainy* `[ˋreni]`"
    ],
    "a": 0,
    "e": "「火災」是 *fire* `[faɪr]`（火災）。",
    "w": [
      "",
      "「水災」是 *flood* `[flʌd]`（水災）。",
      "「土石流」是 *mudslide* `[ˋmʌdˏslaɪd]`（土石流）。",
      "「下雨的」是 *rainy* `[ˋreni]`（下雨的）。"
    ]
  },
  {
    "sid": "task-emergency",
    "u": "Task・Emergency Weather",
    "d": "易",
    "q": "防災任務：「水災」的英文是哪一個？",
    "o": [
      "*flood* `[flʌd]`",
      "*mudslide* `[ˋmʌdˏslaɪd]`",
      "*rainy* `[ˋreni]`",
      "*windy* `[ˋwɪndi]`"
    ],
    "a": 0,
    "e": "「水災」是 *flood* `[flʌd]`（水災）。",
    "w": [
      "",
      "「土石流」是 *mudslide* `[ˋmʌdˏslaɪd]`（土石流）。",
      "「下雨的」是 *rainy* `[ˋreni]`（下雨的）。",
      "「有風的」是 *windy* `[ˋwɪndi]`（有風的）。"
    ]
  },
  {
    "sid": "task-emergency",
    "u": "Task・Emergency Weather",
    "d": "易",
    "q": "防災任務：「土石流」的英文是哪一個？",
    "o": [
      "*mudslide* `[ˋmʌdˏslaɪd]`",
      "*rainy* `[ˋreni]`",
      "*windy* `[ˋwɪndi]`",
      "*cold* `[kold]`"
    ],
    "a": 0,
    "e": "「土石流」是 *mudslide* `[ˋmʌdˏslaɪd]`（土石流）。",
    "w": [
      "",
      "「下雨的」是 *rainy* `[ˋreni]`（下雨的）。",
      "「有風的」是 *windy* `[ˋwɪndi]`（有風的）。",
      "「寒冷的」是 *cold* `[kold]`（寒冷的）。"
    ]
  },
  {
    "sid": "task-emergency",
    "u": "Task・Emergency Weather",
    "d": "易",
    "q": "防災任務：「下雨的」的英文是哪一個？",
    "o": [
      "*rainy* `[ˋreni]`",
      "*windy* `[ˋwɪndi]`",
      "*cold* `[kold]`",
      "*hot* `[hɑt]`"
    ],
    "a": 0,
    "e": "「下雨的」是 *rainy* `[ˋreni]`（下雨的）。",
    "w": [
      "",
      "「有風的」是 *windy* `[ˋwɪndi]`（有風的）。",
      "「寒冷的」是 *cold* `[kold]`（寒冷的）。",
      "「炎熱的」是 *hot* `[hɑt]`（炎熱的）。"
    ]
  },
  {
    "sid": "task-emergency",
    "u": "Task・Emergency Weather",
    "d": "易",
    "q": "防災任務：「有風的」的英文是哪一個？",
    "o": [
      "*windy* `[ˋwɪndi]`",
      "*cold* `[kold]`",
      "*hot* `[hɑt]`",
      "*dark* `[dɑrk]`"
    ],
    "a": 0,
    "e": "「有風的」是 *windy* `[ˋwɪndi]`（有風的）。",
    "w": [
      "",
      "「寒冷的」是 *cold* `[kold]`（寒冷的）。",
      "「炎熱的」是 *hot* `[hɑt]`（炎熱的）。",
      "「黑暗的」是 *dark* `[dɑrk]`（黑暗的）。"
    ]
  },
  {
    "sid": "task-emergency",
    "u": "Task・Emergency Weather",
    "d": "易",
    "q": "防災任務：「寒冷的」的英文是哪一個？",
    "o": [
      "*cold* `[kold]`",
      "*hot* `[hɑt]`",
      "*dark* `[dɑrk]`",
      "*earthquake* `[ˋɝθˏkwek]`"
    ],
    "a": 0,
    "e": "「寒冷的」是 *cold* `[kold]`（寒冷的）。",
    "w": [
      "",
      "「炎熱的」是 *hot* `[hɑt]`（炎熱的）。",
      "「黑暗的」是 *dark* `[dɑrk]`（黑暗的）。",
      "「地震」是 *earthquake* `[ˋɝθˏkwek]`（地震）。"
    ]
  },
  {
    "sid": "task-emergency",
    "u": "Task・Emergency Weather",
    "d": "易",
    "q": "防災任務：「炎熱的」的英文是哪一個？",
    "o": [
      "*hot* `[hɑt]`",
      "*dark* `[dɑrk]`",
      "*earthquake* `[ˋɝθˏkwek]`",
      "*fire* `[faɪr]`"
    ],
    "a": 0,
    "e": "「炎熱的」是 *hot* `[hɑt]`（炎熱的）。",
    "w": [
      "",
      "「黑暗的」是 *dark* `[dɑrk]`（黑暗的）。",
      "「地震」是 *earthquake* `[ˋɝθˏkwek]`（地震）。",
      "「火災」是 *fire* `[faɪr]`（火災）。"
    ]
  },
  {
    "sid": "task-emergency",
    "u": "Task・Emergency Weather",
    "d": "易",
    "q": "防災任務：「黑暗的」的英文是哪一個？",
    "o": [
      "*dark* `[dɑrk]`",
      "*earthquake* `[ˋɝθˏkwek]`",
      "*fire* `[faɪr]`",
      "*flood* `[flʌd]`"
    ],
    "a": 0,
    "e": "「黑暗的」是 *dark* `[dɑrk]`（黑暗的）。",
    "w": [
      "",
      "「地震」是 *earthquake* `[ˋɝθˏkwek]`（地震）。",
      "「火災」是 *fire* `[faɪr]`（火災）。",
      "「水災」是 *flood* `[flʌd]`（水災）。"
    ]
  },
  {
    "sid": "task-emergency",
    "u": "Task・Emergency Weather",
    "d": "易",
    "q": "防災任務：*earthquake* `[ˋɝθˏkwek]` 的中文意思是什麼？",
    "o": [
      "地震",
      "火災",
      "水災",
      "土石流"
    ],
    "a": 0,
    "e": "*earthquake* `[ˋɝθˏkwek]`（地震） 是「地震」。",
    "w": [
      "",
      "*fire* `[faɪr]` 是「火災」。",
      "*flood* `[flʌd]` 是「水災」。",
      "*mudslide* `[ˋmʌdˏslaɪd]` 是「土石流」。"
    ]
  },
  {
    "sid": "task-emergency",
    "u": "Task・Emergency Weather",
    "d": "易",
    "q": "防災任務：*fire* `[faɪr]` 的中文意思是什麼？",
    "o": [
      "火災",
      "水災",
      "土石流",
      "下雨的"
    ],
    "a": 0,
    "e": "*fire* `[faɪr]`（火災） 是「火災」。",
    "w": [
      "",
      "*flood* `[flʌd]` 是「水災」。",
      "*mudslide* `[ˋmʌdˏslaɪd]` 是「土石流」。",
      "*rainy* `[ˋreni]` 是「下雨的」。"
    ]
  },
  {
    "sid": "task-emergency",
    "u": "Task・Emergency Weather",
    "d": "易",
    "q": "防災任務：*flood* `[flʌd]` 的中文意思是什麼？",
    "o": [
      "水災",
      "土石流",
      "下雨的",
      "有風的"
    ],
    "a": 0,
    "e": "*flood* `[flʌd]`（水災） 是「水災」。",
    "w": [
      "",
      "*mudslide* `[ˋmʌdˏslaɪd]` 是「土石流」。",
      "*rainy* `[ˋreni]` 是「下雨的」。",
      "*windy* `[ˋwɪndi]` 是「有風的」。"
    ]
  },
  {
    "sid": "task-emergency",
    "u": "Task・Emergency Weather",
    "d": "易",
    "q": "防災任務：*mudslide* `[ˋmʌdˏslaɪd]` 的中文意思是什麼？",
    "o": [
      "土石流",
      "下雨的",
      "有風的",
      "寒冷的"
    ],
    "a": 0,
    "e": "*mudslide* `[ˋmʌdˏslaɪd]`（土石流） 是「土石流」。",
    "w": [
      "",
      "*rainy* `[ˋreni]` 是「下雨的」。",
      "*windy* `[ˋwɪndi]` 是「有風的」。",
      "*cold* `[kold]` 是「寒冷的」。"
    ]
  },
  {
    "sid": "task-emergency",
    "u": "Task・Emergency Weather",
    "d": "易",
    "q": "防災任務：*rainy* `[ˋreni]` 的中文意思是什麼？",
    "o": [
      "下雨的",
      "有風的",
      "寒冷的",
      "炎熱的"
    ],
    "a": 0,
    "e": "*rainy* `[ˋreni]`（下雨的） 是「下雨的」。",
    "w": [
      "",
      "*windy* `[ˋwɪndi]` 是「有風的」。",
      "*cold* `[kold]` 是「寒冷的」。",
      "*hot* `[hɑt]` 是「炎熱的」。"
    ]
  },
  {
    "sid": "task-emergency",
    "u": "Task・Emergency Weather",
    "d": "易",
    "q": "防災任務：*windy* `[ˋwɪndi]` 的中文意思是什麼？",
    "o": [
      "有風的",
      "寒冷的",
      "炎熱的",
      "黑暗的"
    ],
    "a": 0,
    "e": "*windy* `[ˋwɪndi]`（有風的） 是「有風的」。",
    "w": [
      "",
      "*cold* `[kold]` 是「寒冷的」。",
      "*hot* `[hɑt]` 是「炎熱的」。",
      "*dark* `[dɑrk]` 是「黑暗的」。"
    ]
  },
  {
    "sid": "task-emergency",
    "u": "Task・Emergency Weather",
    "d": "易",
    "q": "防災任務：*cold* `[kold]` 的中文意思是什麼？",
    "o": [
      "寒冷的",
      "炎熱的",
      "黑暗的",
      "地震"
    ],
    "a": 0,
    "e": "*cold* `[kold]`（寒冷的） 是「寒冷的」。",
    "w": [
      "",
      "*hot* `[hɑt]` 是「炎熱的」。",
      "*dark* `[dɑrk]` 是「黑暗的」。",
      "*earthquake* `[ˋɝθˏkwek]` 是「地震」。"
    ]
  },
  {
    "sid": "task-emergency",
    "u": "Task・Emergency Weather",
    "d": "易",
    "q": "防災任務：*hot* `[hɑt]` 的中文意思是什麼？",
    "o": [
      "炎熱的",
      "黑暗的",
      "地震",
      "火災"
    ],
    "a": 0,
    "e": "*hot* `[hɑt]`（炎熱的） 是「炎熱的」。",
    "w": [
      "",
      "*dark* `[dɑrk]` 是「黑暗的」。",
      "*earthquake* `[ˋɝθˏkwek]` 是「地震」。",
      "*fire* `[faɪr]` 是「火災」。"
    ]
  },
  {
    "sid": "task-emergency",
    "u": "Task・Emergency Weather",
    "d": "易",
    "q": "防災任務：*dark* `[dɑrk]` 的中文意思是什麼？",
    "o": [
      "黑暗的",
      "地震",
      "火災",
      "水災"
    ],
    "a": 0,
    "e": "*dark* `[dɑrk]`（黑暗的） 是「黑暗的」。",
    "w": [
      "",
      "*earthquake* `[ˋɝθˏkwek]` 是「地震」。",
      "*fire* `[faɪr]` 是「火災」。",
      "*flood* `[flʌd]` 是「水災」。"
    ]
  },
  {
    "sid": "task-emergency",
    "u": "Task・Emergency Weather",
    "d": "中",
    "q": "防災任務：音標 `[ˋɝθˏkwek]` 對應的單字是哪一個？",
    "o": [
      "*earthquake*",
      "*fire*",
      "*flood*",
      "*mudslide*"
    ],
    "a": 0,
    "e": "`[ˋɝθˏkwek]` 是 *earthquake* `[ˋɝθˏkwek]`（地震）。",
    "w": [
      "",
      "這個音標是 *fire* `[faɪr]`（火災）。",
      "這個音標是 *flood* `[flʌd]`（水災）。",
      "這個音標是 *mudslide* `[ˋmʌdˏslaɪd]`（土石流）。"
    ]
  },
  {
    "sid": "task-emergency",
    "u": "Task・Emergency Weather",
    "d": "中",
    "q": "防災任務：音標 `[faɪr]` 對應的單字是哪一個？",
    "o": [
      "*fire*",
      "*flood*",
      "*mudslide*",
      "*rainy*"
    ],
    "a": 0,
    "e": "`[faɪr]` 是 *fire* `[faɪr]`（火災）。",
    "w": [
      "",
      "這個音標是 *flood* `[flʌd]`（水災）。",
      "這個音標是 *mudslide* `[ˋmʌdˏslaɪd]`（土石流）。",
      "這個音標是 *rainy* `[ˋreni]`（下雨的）。"
    ]
  },
  {
    "sid": "task-emergency",
    "u": "Task・Emergency Weather",
    "d": "中",
    "q": "防災任務：音標 `[flʌd]` 對應的單字是哪一個？",
    "o": [
      "*flood*",
      "*mudslide*",
      "*rainy*",
      "*windy*"
    ],
    "a": 0,
    "e": "`[flʌd]` 是 *flood* `[flʌd]`（水災）。",
    "w": [
      "",
      "這個音標是 *mudslide* `[ˋmʌdˏslaɪd]`（土石流）。",
      "這個音標是 *rainy* `[ˋreni]`（下雨的）。",
      "這個音標是 *windy* `[ˋwɪndi]`（有風的）。"
    ]
  },
  {
    "sid": "task-emergency",
    "u": "Task・Emergency Weather",
    "d": "中",
    "q": "防災任務：音標 `[ˋmʌdˏslaɪd]` 對應的單字是哪一個？",
    "o": [
      "*mudslide*",
      "*rainy*",
      "*windy*",
      "*cold*"
    ],
    "a": 0,
    "e": "`[ˋmʌdˏslaɪd]` 是 *mudslide* `[ˋmʌdˏslaɪd]`（土石流）。",
    "w": [
      "",
      "這個音標是 *rainy* `[ˋreni]`（下雨的）。",
      "這個音標是 *windy* `[ˋwɪndi]`（有風的）。",
      "這個音標是 *cold* `[kold]`（寒冷的）。"
    ]
  },
  {
    "sid": "task-emergency",
    "u": "Task・Emergency Weather",
    "d": "中",
    "q": "防災任務：音標 `[ˋreni]` 對應的單字是哪一個？",
    "o": [
      "*rainy*",
      "*windy*",
      "*cold*",
      "*hot*"
    ],
    "a": 0,
    "e": "`[ˋreni]` 是 *rainy* `[ˋreni]`（下雨的）。",
    "w": [
      "",
      "這個音標是 *windy* `[ˋwɪndi]`（有風的）。",
      "這個音標是 *cold* `[kold]`（寒冷的）。",
      "這個音標是 *hot* `[hɑt]`（炎熱的）。"
    ]
  },
  {
    "sid": "task-emergency",
    "u": "Task・Emergency Weather",
    "d": "中",
    "q": "防災任務：音標 `[ˋwɪndi]` 對應的單字是哪一個？",
    "o": [
      "*windy*",
      "*cold*",
      "*hot*",
      "*dark*"
    ],
    "a": 0,
    "e": "`[ˋwɪndi]` 是 *windy* `[ˋwɪndi]`（有風的）。",
    "w": [
      "",
      "這個音標是 *cold* `[kold]`（寒冷的）。",
      "這個音標是 *hot* `[hɑt]`（炎熱的）。",
      "這個音標是 *dark* `[dɑrk]`（黑暗的）。"
    ]
  },
  {
    "sid": "task-emergency",
    "u": "Task・Emergency Weather",
    "d": "中",
    "q": "防災任務：音標 `[kold]` 對應的單字是哪一個？",
    "o": [
      "*cold*",
      "*hot*",
      "*dark*",
      "*earthquake*"
    ],
    "a": 0,
    "e": "`[kold]` 是 *cold* `[kold]`（寒冷的）。",
    "w": [
      "",
      "這個音標是 *hot* `[hɑt]`（炎熱的）。",
      "這個音標是 *dark* `[dɑrk]`（黑暗的）。",
      "這個音標是 *earthquake* `[ˋɝθˏkwek]`（地震）。"
    ]
  },
  {
    "sid": "task-emergency",
    "u": "Task・Emergency Weather",
    "d": "中",
    "q": "防災任務：音標 `[hɑt]` 對應的單字是哪一個？",
    "o": [
      "*hot*",
      "*dark*",
      "*earthquake*",
      "*fire*"
    ],
    "a": 0,
    "e": "`[hɑt]` 是 *hot* `[hɑt]`（炎熱的）。",
    "w": [
      "",
      "這個音標是 *dark* `[dɑrk]`（黑暗的）。",
      "這個音標是 *earthquake* `[ˋɝθˏkwek]`（地震）。",
      "這個音標是 *fire* `[faɪr]`（火災）。"
    ]
  },
  {
    "sid": "task-emergency",
    "u": "Task・Emergency Weather",
    "d": "中",
    "q": "防災任務：音標 `[dɑrk]` 對應的單字是哪一個？",
    "o": [
      "*dark*",
      "*earthquake*",
      "*fire*",
      "*flood*"
    ],
    "a": 0,
    "e": "`[dɑrk]` 是 *dark* `[dɑrk]`（黑暗的）。",
    "w": [
      "",
      "這個音標是 *earthquake* `[ˋɝθˏkwek]`（地震）。",
      "這個音標是 *fire* `[faɪr]`（火災）。",
      "這個音標是 *flood* `[flʌd]`（水災）。"
    ]
  },
  {
    "sid": "gr-a-e",
    "u": "Get Ready・Phonics a_e",
    "d": "易",
    "q": "Get Ready 發音：[[fig:eng-phonics-ae|a_e 的母音規則]] 下列哪一個單字含有長母音 /e/（a_e）？",
    "o": [
      "*cape* `[kep]`",
      "*cap* `[kæp]`",
      "*tap* `[tæp]`",
      "*mat* `[mæt]`"
    ],
    "a": 0,
    "e": "*cape* 含有長母音 /e/（a_e）。",
    "w": [
      "",
      "*cap* 是短母音 /æ/。",
      "*tap* 是短母音 /æ/。",
      "*mat* 是短母音 /æ/。"
    ]
  },
  {
    "sid": "gr-a-e",
    "u": "Get Ready・Phonics a_e",
    "d": "易",
    "q": "Get Ready 發音：下列哪一個單字含有短母音 /æ/？",
    "o": [
      "*cap* `[kæp]`",
      "*cape* `[kep]`",
      "*tape* `[tep]`",
      "*mate* `[met]`"
    ],
    "a": 0,
    "e": "*cap* 含有短母音 /æ/。",
    "w": [
      "",
      "*cape* 是長母音 /e/（a_e）。",
      "*tape* 是長母音 /e/（a_e）。",
      "*mate* 是長母音 /e/（a_e）。"
    ]
  },
  {
    "sid": "gr-a-e",
    "u": "Get Ready・Phonics a_e",
    "d": "中",
    "q": "Get Ready 發音：音標 `[kep]` 對應的單字是哪一個？",
    "o": [
      "*cape*",
      "*tape*",
      "*mate*",
      "*cap*"
    ],
    "a": 0,
    "e": "`[kep]` 是 *cape* `[kep]`（披風）。",
    "w": [
      "",
      "這是 *tape* `[tep]`（膠帶）。",
      "這是 *mate* `[met]`（夥伴）。",
      "這是 *cap* `[kæp]`（帽子），是短母音 /æ/。"
    ]
  },
  {
    "sid": "gr-a-e",
    "u": "Get Ready・Phonics a_e",
    "d": "中",
    "q": "Get Ready 發音：音標 `[kæp]` 對應的單字是哪一個？",
    "o": [
      "*cap*",
      "*tap*",
      "*mat*",
      "*cape*"
    ],
    "a": 0,
    "e": "`[kæp]` 是 *cap* `[kæp]`（帽子）。",
    "w": [
      "",
      "這是 *tap* `[tæp]`（輕拍）。",
      "這是 *mat* `[mæt]`（墊子）。",
      "這是 *cape* `[kep]`（披風），是長母音 /e/（a_e）。"
    ]
  },
  {
    "sid": "gr-a-e",
    "u": "Get Ready・Phonics a_e",
    "d": "中",
    "q": "Get Ready 發音：哪一組是「短母音 → 長母音」的正確配對？",
    "o": [
      "*cap* → *cape*",
      "*cape* → *cap*",
      "*tap* → *mat*",
      "*tape* → *mate*"
    ],
    "a": 0,
    "e": "*cap* 是短母音，*cape* 是長母音。",
    "w": [
      "",
      "這是長母音 → 短母音，順序相反。",
      "這兩個都是短母音，沒有長母音。",
      "這兩個都是長母音，沒有短母音。"
    ]
  },
  {
    "sid": "gr-a-e",
    "u": "Get Ready・Phonics a_e",
    "d": "中",
    "q": "Get Ready 發音：哪一個單字和 *cape* 有相同的母音發音？",
    "o": [
      "*tape* `[tep]`",
      "*cap* `[kæp]`",
      "*tap* `[tæp]`",
      "*mat* `[mæt]`"
    ],
    "a": 0,
    "e": "*cape* 和 *tape* 都有長母音 /e/（a_e）。",
    "w": [
      "",
      "*cap* 是短母音 /æ/。",
      "*tap* 是短母音 /æ/。",
      "*mat* 是短母音 /æ/。"
    ]
  },
  {
    "sid": "gr-a-e",
    "u": "Get Ready・Phonics a_e",
    "d": "中",
    "q": "Get Ready 發音：下列哪一個單字「沒有」長母音 /e/（a_e）？",
    "o": [
      "*cap* `[kæp]`",
      "*cape* `[kep]`",
      "*tape* `[tep]`",
      "*mate* `[met]`"
    ],
    "a": 0,
    "e": "*cap* 是短母音 /æ/，沒有長母音 /e/（a_e）。",
    "w": [
      "",
      "*cape* 有長母音 /e/（a_e）。",
      "*tape* 有長母音 /e/（a_e）。",
      "*mate* 有長母音 /e/（a_e）。"
    ]
  },
  {
    "sid": "gr-a-e",
    "u": "Get Ready・Phonics a_e",
    "d": "易",
    "q": "Get Ready 發音：*cape* 的中文意思是什麼？",
    "o": [
      "披風",
      "帽子",
      "膠帶",
      "輕拍"
    ],
    "a": 0,
    "e": "*cape* 是「披風」。",
    "w": [
      "",
      "*cap* 是「帽子」。",
      "*tape* 是「膠帶」。",
      "*tap* 是「輕拍」。"
    ]
  },
  {
    "sid": "u1-phonics",
    "u": "Unit 1・Phonics e_e / ee",
    "d": "易",
    "q": "Unit 1 發音：下列哪一個單字含有長母音 /i/（e_e、ee）？",
    "o": [
      "*Pete* `[pit]`",
      "*pet* `[pɛt]`",
      "*Ted* `[tɛd]`",
      "*them* `[ðɛm]`"
    ],
    "a": 0,
    "e": "*Pete* 含有長母音 /i/（e_e、ee）。",
    "w": [
      "",
      "*pet* 是短母音 /ɛ/。",
      "*Ted* 是短母音 /ɛ/。",
      "*them* 是短母音 /ɛ/。"
    ]
  },
  {
    "sid": "u1-phonics",
    "u": "Unit 1・Phonics e_e / ee",
    "d": "易",
    "q": "Unit 1 發音：下列哪一個單字含有短母音 /ɛ/？",
    "o": [
      "*pet* `[pɛt]`",
      "*Pete* `[pit]`",
      "*theme* `[θim]`",
      "*sea* `[si]`"
    ],
    "a": 0,
    "e": "*pet* 含有短母音 /ɛ/。",
    "w": [
      "",
      "*Pete* 是長母音 /i/（e_e、ee）。",
      "*theme* 是長母音 /i/（e_e、ee）。",
      "*sea* 是長母音 /i/（e_e、ee）。"
    ]
  },
  {
    "sid": "u1-phonics",
    "u": "Unit 1・Phonics e_e / ee",
    "d": "中",
    "q": "Unit 1 發音：音標 `[pit]` 對應的單字是哪一個？",
    "o": [
      "*Pete*",
      "*theme*",
      "*sea*",
      "*pet*"
    ],
    "a": 0,
    "e": "`[pit]` 是 *Pete* `[pit]`（皮特）。 `[pit]` 的 i 是長母音 /i/；`[pɪt]` 才是短母音 /ɪ/（pit，坑）。",
    "w": [
      "",
      "這是 *theme* `[θim]`（主題）。",
      "這是 *sea* `[si]`（海）。",
      "這是 *pet* `[pɛt]`（寵物），是短母音 /ɛ/。"
    ]
  },
  {
    "sid": "u1-phonics",
    "u": "Unit 1・Phonics e_e / ee",
    "d": "中",
    "q": "Unit 1 發音：音標 `[pɛt]` 對應的單字是哪一個？",
    "o": [
      "*pet*",
      "*Ted*",
      "*them*",
      "*Pete*"
    ],
    "a": 0,
    "e": "`[pɛt]` 是 *pet* `[pɛt]`（寵物）。",
    "w": [
      "",
      "這是 *Ted* `[tɛd]`（泰德）。",
      "這是 *them* `[ðɛm]`（他們）。",
      "這是 *Pete* `[pit]`（皮特），是長母音 /i/（e_e、ee）。"
    ]
  },
  {
    "sid": "u1-phonics",
    "u": "Unit 1・Phonics e_e / ee",
    "d": "中",
    "q": "Unit 1 發音：哪一組是「短母音 → 長母音」的正確配對？",
    "o": [
      "*pet* → *Pete*",
      "*Pete* → *pet*",
      "*them* → *Ted*",
      "*theme* → *Eve*"
    ],
    "a": 0,
    "e": "*pet* 是短母音，*Pete* 是長母音。",
    "w": [
      "",
      "這是長母音 → 短母音，順序相反。",
      "這兩個都是短母音，沒有長母音。",
      "這兩個都是長母音，沒有短母音。"
    ]
  },
  {
    "sid": "u1-phonics",
    "u": "Unit 1・Phonics e_e / ee",
    "d": "中",
    "q": "Unit 1 發音：哪一個單字和 *Pete* 有相同的母音發音？",
    "o": [
      "*theme* `[θim]`",
      "*pet* `[pɛt]`",
      "*Ted* `[tɛd]`",
      "*them* `[ðɛm]`"
    ],
    "a": 0,
    "e": "*Pete* 和 *theme* 都有長母音 /i/（e_e、ee）。",
    "w": [
      "",
      "*pet* 是短母音 /ɛ/。",
      "*Ted* 是短母音 /ɛ/。",
      "*them* 是短母音 /ɛ/。"
    ]
  },
  {
    "sid": "u1-phonics",
    "u": "Unit 1・Phonics e_e / ee",
    "d": "中",
    "q": "Unit 1 發音：下列哪一個單字「沒有」長母音 /i/（e_e、ee）？",
    "o": [
      "*pet* `[pɛt]`",
      "*Pete* `[pit]`",
      "*theme* `[θim]`",
      "*sea* `[si]`"
    ],
    "a": 0,
    "e": "*pet* 是短母音 /ɛ/，沒有長母音 /i/（e_e、ee）。",
    "w": [
      "",
      "*Pete* 有長母音 /i/（e_e、ee）。",
      "*theme* 有長母音 /i/（e_e、ee）。",
      "*sea* 有長母音 /i/（e_e、ee）。"
    ]
  },
  {
    "sid": "u1-phonics",
    "u": "Unit 1・Phonics e_e / ee",
    "d": "易",
    "q": "Unit 1 發音：*Pete* 的中文意思是什麼？",
    "o": [
      "皮特",
      "寵物",
      "主題",
      "泰德"
    ],
    "a": 0,
    "e": "*Pete* 是「皮特」。",
    "w": [
      "",
      "*pet* 是「寵物」。",
      "*theme* 是「主題」。",
      "*Ted* 是「泰德」。"
    ]
  },
  {
    "sid": "u2-phonics",
    "u": "Unit 2・Phonics i_e",
    "d": "易",
    "q": "Unit 2 發音：下列哪一個單字含有長母音 /aɪ/（i_e）？",
    "o": [
      "*kite* `[kaɪt]`",
      "*kit* `[kɪt]`",
      "*pin* `[pɪn]`",
      "*win* `[wɪn]`"
    ],
    "a": 0,
    "e": "*kite* 含有長母音 /aɪ/（i_e）。",
    "w": [
      "",
      "*kit* 是短母音 /ɪ/。",
      "*pin* 是短母音 /ɪ/。",
      "*win* 是短母音 /ɪ/。"
    ]
  },
  {
    "sid": "u2-phonics",
    "u": "Unit 2・Phonics i_e",
    "d": "易",
    "q": "Unit 2 發音：下列哪一個單字含有短母音 /ɪ/？",
    "o": [
      "*kit* `[kɪt]`",
      "*kite* `[kaɪt]`",
      "*pine* `[paɪn]`",
      "*wine* `[waɪn]`"
    ],
    "a": 0,
    "e": "*kit* 含有短母音 /ɪ/。",
    "w": [
      "",
      "*kite* 是長母音 /aɪ/（i_e）。",
      "*pine* 是長母音 /aɪ/（i_e）。",
      "*wine* 是長母音 /aɪ/（i_e）。"
    ]
  },
  {
    "sid": "u2-phonics",
    "u": "Unit 2・Phonics i_e",
    "d": "中",
    "q": "Unit 2 發音：音標 `[kaɪt]` 對應的單字是哪一個？",
    "o": [
      "*kite*",
      "*pine*",
      "*wine*",
      "*kit*"
    ],
    "a": 0,
    "e": "`[kaɪt]` 是 *kite* `[kaɪt]`（風箏）。",
    "w": [
      "",
      "這是 *pine* `[paɪn]`（松樹）。",
      "這是 *wine* `[waɪn]`（酒）。",
      "這是 *kit* `[kɪt]`（工具包），是短母音 /ɪ/。"
    ]
  },
  {
    "sid": "u2-phonics",
    "u": "Unit 2・Phonics i_e",
    "d": "中",
    "q": "Unit 2 發音：音標 `[kɪt]` 對應的單字是哪一個？",
    "o": [
      "*kit*",
      "*pin*",
      "*win*",
      "*kite*"
    ],
    "a": 0,
    "e": "`[kɪt]` 是 *kit* `[kɪt]`（工具包）。",
    "w": [
      "",
      "這是 *pin* `[pɪn]`（別針）。",
      "這是 *win* `[wɪn]`（贏）。",
      "這是 *kite* `[kaɪt]`（風箏），是長母音 /aɪ/（i_e）。"
    ]
  },
  {
    "sid": "u2-phonics",
    "u": "Unit 2・Phonics i_e",
    "d": "中",
    "q": "Unit 2 發音：哪一組是「短母音 → 長母音」的正確配對？",
    "o": [
      "*kit* → *kite*",
      "*kite* → *kit*",
      "*pin* → *win*",
      "*pine* → *wine*"
    ],
    "a": 0,
    "e": "*kit* 是短母音，*kite* 是長母音。",
    "w": [
      "",
      "這是長母音 → 短母音，順序相反。",
      "這兩個都是短母音，沒有長母音。",
      "這兩個都是長母音，沒有短母音。"
    ]
  },
  {
    "sid": "u2-phonics",
    "u": "Unit 2・Phonics i_e",
    "d": "中",
    "q": "Unit 2 發音：哪一個單字和 *kite* 有相同的母音發音？",
    "o": [
      "*pine* `[paɪn]`",
      "*kit* `[kɪt]`",
      "*pin* `[pɪn]`",
      "*win* `[wɪn]`"
    ],
    "a": 0,
    "e": "*kite* 和 *pine* 都有長母音 /aɪ/（i_e）。",
    "w": [
      "",
      "*kit* 是短母音 /ɪ/。",
      "*pin* 是短母音 /ɪ/。",
      "*win* 是短母音 /ɪ/。"
    ]
  },
  {
    "sid": "u2-phonics",
    "u": "Unit 2・Phonics i_e",
    "d": "中",
    "q": "Unit 2 發音：下列哪一個單字「沒有」長母音 /aɪ/（i_e）？",
    "o": [
      "*kit* `[kɪt]`",
      "*kite* `[kaɪt]`",
      "*pine* `[paɪn]`",
      "*wine* `[waɪn]`"
    ],
    "a": 0,
    "e": "*kit* 是短母音 /ɪ/，沒有長母音 /aɪ/（i_e）。",
    "w": [
      "",
      "*kite* 有長母音 /aɪ/（i_e）。",
      "*pine* 有長母音 /aɪ/（i_e）。",
      "*wine* 有長母音 /aɪ/（i_e）。"
    ]
  },
  {
    "sid": "u2-phonics",
    "u": "Unit 2・Phonics i_e",
    "d": "易",
    "q": "Unit 2 發音：*kite* 的中文意思是什麼？",
    "o": [
      "風箏",
      "工具包",
      "松樹",
      "別針"
    ],
    "a": 0,
    "e": "*kite* 是「風箏」。",
    "w": [
      "",
      "*kit* 是「工具包」。",
      "*pine* 是「松樹」。",
      "*pin* 是「別針」。"
    ]
  },
  {
    "sid": "u3-phonics",
    "u": "Unit 3・Phonics o_e",
    "d": "易",
    "q": "Unit 3 發音：下列哪一個單字含有長母音 /o/（o_e）？",
    "o": [
      "*hope* `[hop]`",
      "*hop* `[hɑp]`",
      "*rob* `[rɑb]`",
      "*cod* `[kɑd]`"
    ],
    "a": 0,
    "e": "*hope* 含有長母音 /o/（o_e）。",
    "w": [
      "",
      "*hop* 是短母音 /ɑ/。",
      "*rob* 是短母音 /ɑ/。",
      "*cod* 是短母音 /ɑ/。"
    ]
  },
  {
    "sid": "u3-phonics",
    "u": "Unit 3・Phonics o_e",
    "d": "易",
    "q": "Unit 3 發音：下列哪一個單字含有短母音 /ɑ/？",
    "o": [
      "*hop* `[hɑp]`",
      "*hope* `[hop]`",
      "*robe* `[rob]`",
      "*code* `[kod]`"
    ],
    "a": 0,
    "e": "*hop* 含有短母音 /ɑ/。",
    "w": [
      "",
      "*hope* 是長母音 /o/（o_e）。",
      "*robe* 是長母音 /o/（o_e）。",
      "*code* 是長母音 /o/（o_e）。"
    ]
  },
  {
    "sid": "u3-phonics",
    "u": "Unit 3・Phonics o_e",
    "d": "中",
    "q": "Unit 3 發音：音標 `[hop]` 對應的單字是哪一個？",
    "o": [
      "*hope*",
      "*robe*",
      "*code*",
      "*hop*"
    ],
    "a": 0,
    "e": "`[hop]` 是 *hope* `[hop]`（希望）。",
    "w": [
      "",
      "這是 *robe* `[rob]`（長袍）。",
      "這是 *code* `[kod]`（密碼）。",
      "這是 *hop* `[hɑp]`（跳），是短母音 /ɑ/。"
    ]
  },
  {
    "sid": "u3-phonics",
    "u": "Unit 3・Phonics o_e",
    "d": "中",
    "q": "Unit 3 發音：音標 `[hɑp]` 對應的單字是哪一個？",
    "o": [
      "*hop*",
      "*rob*",
      "*cod*",
      "*hope*"
    ],
    "a": 0,
    "e": "`[hɑp]` 是 *hop* `[hɑp]`（跳）。",
    "w": [
      "",
      "這是 *rob* `[rɑb]`（搶劫）。",
      "這是 *cod* `[kɑd]`（鱈魚）。",
      "這是 *hope* `[hop]`（希望），是長母音 /o/（o_e）。"
    ]
  },
  {
    "sid": "u3-phonics",
    "u": "Unit 3・Phonics o_e",
    "d": "中",
    "q": "Unit 3 發音：哪一組是「短母音 → 長母音」的正確配對？",
    "o": [
      "*hop* → *hope*",
      "*hope* → *hop*",
      "*rob* → *cod*",
      "*robe* → *code*"
    ],
    "a": 0,
    "e": "*hop* 是短母音，*hope* 是長母音。",
    "w": [
      "",
      "這是長母音 → 短母音，順序相反。",
      "這兩個都是短母音，沒有長母音。",
      "這兩個都是長母音，沒有短母音。"
    ]
  },
  {
    "sid": "u3-phonics",
    "u": "Unit 3・Phonics o_e",
    "d": "中",
    "q": "Unit 3 發音：哪一個單字和 *hope* 有相同的母音發音？",
    "o": [
      "*robe* `[rob]`",
      "*hop* `[hɑp]`",
      "*rob* `[rɑb]`",
      "*cod* `[kɑd]`"
    ],
    "a": 0,
    "e": "*hope* 和 *robe* 都有長母音 /o/（o_e）。",
    "w": [
      "",
      "*hop* 是短母音 /ɑ/。",
      "*rob* 是短母音 /ɑ/。",
      "*cod* 是短母音 /ɑ/。"
    ]
  },
  {
    "sid": "u3-phonics",
    "u": "Unit 3・Phonics o_e",
    "d": "中",
    "q": "Unit 3 發音：下列哪一個單字「沒有」長母音 /o/（o_e）？",
    "o": [
      "*hop* `[hɑp]`",
      "*hope* `[hop]`",
      "*robe* `[rob]`",
      "*code* `[kod]`"
    ],
    "a": 0,
    "e": "*hop* 是短母音 /ɑ/，沒有長母音 /o/（o_e）。",
    "w": [
      "",
      "*hope* 有長母音 /o/（o_e）。",
      "*robe* 有長母音 /o/（o_e）。",
      "*code* 有長母音 /o/（o_e）。"
    ]
  },
  {
    "sid": "u3-phonics",
    "u": "Unit 3・Phonics o_e",
    "d": "易",
    "q": "Unit 3 發音：*hope* 的中文意思是什麼？",
    "o": [
      "希望",
      "跳",
      "長袍",
      "搶劫"
    ],
    "a": 0,
    "e": "*hope* 是「希望」。",
    "w": [
      "",
      "*hop* 是「跳」。",
      "*robe* 是「長袍」。",
      "*rob* 是「搶劫」。"
    ]
  },
  {
    "sid": "u4-phonics",
    "u": "Unit 4・Phonics u_e",
    "d": "易",
    "q": "Unit 4 發音：下列哪一個單字含有長母音 u_e（/ju/ 或 /u/）？",
    "o": [
      "*cute* `[kjut]`",
      "*cut* `[kʌt]`",
      "*cub* `[kʌb]`",
      "*tub* `[tʌb]`"
    ],
    "a": 0,
    "e": "*cute* 含有長母音 u_e（/ju/ 或 /u/）。",
    "w": [
      "",
      "*cut* 是短母音 /ʌ/。",
      "*cub* 是短母音 /ʌ/。",
      "*tub* 是短母音 /ʌ/。"
    ]
  },
  {
    "sid": "u4-phonics",
    "u": "Unit 4・Phonics u_e",
    "d": "易",
    "q": "Unit 4 發音：下列哪一個單字含有短母音 /ʌ/？",
    "o": [
      "*cut* `[kʌt]`",
      "*cute* `[kjut]`",
      "*cube* `[kjub]`",
      "*tube* `[tub]`"
    ],
    "a": 0,
    "e": "*cut* 含有短母音 /ʌ/。",
    "w": [
      "",
      "*cute* 是長母音 u_e（/ju/ 或 /u/）。",
      "*cube* 是長母音 u_e（/ju/ 或 /u/）。",
      "*tube* 是長母音 u_e（/ju/ 或 /u/）。"
    ]
  },
  {
    "sid": "u4-phonics",
    "u": "Unit 4・Phonics u_e",
    "d": "中",
    "q": "Unit 4 發音：音標 `[kjut]` 對應的單字是哪一個？",
    "o": [
      "*cute*",
      "*cube*",
      "*tube*",
      "*cut*"
    ],
    "a": 0,
    "e": "`[kjut]` 是 *cute* `[kjut]`（可愛的）。",
    "w": [
      "",
      "這是 *cube* `[kjub]`（立方體）。",
      "這是 *tube* `[tub]`（管子）。",
      "這是 *cut* `[kʌt]`（切），是短母音 /ʌ/。"
    ]
  },
  {
    "sid": "u4-phonics",
    "u": "Unit 4・Phonics u_e",
    "d": "中",
    "q": "Unit 4 發音：音標 `[kʌt]` 對應的單字是哪一個？",
    "o": [
      "*cut*",
      "*cub*",
      "*tub*",
      "*cute*"
    ],
    "a": 0,
    "e": "`[kʌt]` 是 *cut* `[kʌt]`（切）。",
    "w": [
      "",
      "這是 *cub* `[kʌb]`（幼獸）。",
      "這是 *tub* `[tʌb]`（浴缸）。",
      "這是 *cute* `[kjut]`（可愛的），是長母音 u_e（/ju/ 或 /u/）。"
    ]
  },
  {
    "sid": "u4-phonics",
    "u": "Unit 4・Phonics u_e",
    "d": "中",
    "q": "Unit 4 發音：哪一組是「短母音 → 長母音」的正確配對？",
    "o": [
      "*cut* → *cute*",
      "*cute* → *cut*",
      "*cub* → *tub*",
      "*cube* → *tube*"
    ],
    "a": 0,
    "e": "*cut* 是短母音，*cute* 是長母音。",
    "w": [
      "",
      "這是長母音 → 短母音，順序相反。",
      "這兩個都是短母音，沒有長母音。",
      "這兩個都是長母音，沒有短母音。"
    ]
  },
  {
    "sid": "u4-phonics",
    "u": "Unit 4・Phonics u_e",
    "d": "中",
    "q": "Unit 4 發音：哪一個單字和 *cute* 有相同的母音發音？",
    "o": [
      "*cube* `[kjub]`",
      "*cut* `[kʌt]`",
      "*cub* `[kʌb]`",
      "*tub* `[tʌb]`"
    ],
    "a": 0,
    "e": "*cute* 和 *cube* 都有長母音 u_e（/ju/ 或 /u/）。",
    "w": [
      "",
      "*cut* 是短母音 /ʌ/。",
      "*cub* 是短母音 /ʌ/。",
      "*tub* 是短母音 /ʌ/。"
    ]
  },
  {
    "sid": "u4-phonics",
    "u": "Unit 4・Phonics u_e",
    "d": "中",
    "q": "Unit 4 發音：下列哪一個單字「沒有」長母音 u_e（/ju/ 或 /u/）？",
    "o": [
      "*cut* `[kʌt]`",
      "*cute* `[kjut]`",
      "*cube* `[kjub]`",
      "*tube* `[tub]`"
    ],
    "a": 0,
    "e": "*cut* 是短母音 /ʌ/，沒有長母音 u_e（/ju/ 或 /u/）。",
    "w": [
      "",
      "*cute* 有長母音 u_e（/ju/ 或 /u/）。",
      "*cube* 有長母音 u_e（/ju/ 或 /u/）。",
      "*tube* 有長母音 u_e（/ju/ 或 /u/）。"
    ]
  },
  {
    "sid": "u4-phonics",
    "u": "Unit 4・Phonics u_e",
    "d": "易",
    "q": "Unit 4 發音：*cute* 的中文意思是什麼？",
    "o": [
      "可愛的",
      "切",
      "立方體",
      "幼獸"
    ],
    "a": 0,
    "e": "*cute* 是「可愛的」。",
    "w": [
      "",
      "*cut* 是「切」。",
      "*cube* 是「立方體」。",
      "*cub* 是「幼獸」。"
    ]
  },
  {
    "sid": "u1-sent",
    "u": "Unit 1・Weather Sentences",
    "d": "易",
    "q": "Unit 1 句型：*How's the weather?* `[haʊz ðə ˋwɛðɚ]` 的中文意思最接近哪一句？",
    "o": [
      "天氣怎麼樣？",
      "現在是晴天。",
      "臺中是多雲。",
      "臺北的天氣怎麼樣？"
    ],
    "a": 0,
    "e": "*How's the weather?* `[haʊz ðə ˋwɛðɚ]`（天氣怎麼樣？） 是「天氣怎麼樣？」。",
    "w": [
      "",
      "*It's sunny.* `[ɪts ˋsʌni]` 是「現在是晴天。」。",
      "*It's cloudy in Taichung.* `[ɪts ˋklaʊdi ɪn ˏtaɪˋtʃʊŋ]` 是「臺中是多雲。」。",
      "*How's the weather in Taipei?* `[haʊz ðə ˋwɛðɚ ɪn ˏtaɪˋpe]` 是「臺北的天氣怎麼樣？」。"
    ]
  },
  {
    "sid": "u1-sent",
    "u": "Unit 1・Weather Sentences",
    "d": "易",
    "q": "Unit 1 句型：*It's sunny.* `[ɪts ˋsʌni]` 的中文意思最接近哪一句？",
    "o": [
      "現在是晴天。",
      "臺中是多雲。",
      "臺北的天氣怎麼樣？",
      "現在是晴天而且很熱。"
    ],
    "a": 0,
    "e": "*It's sunny.* `[ɪts ˋsʌni]`（現在是晴天。） 是「現在是晴天。」。",
    "w": [
      "",
      "*It's cloudy in Taichung.* `[ɪts ˋklaʊdi ɪn ˏtaɪˋtʃʊŋ]` 是「臺中是多雲。」。",
      "*How's the weather in Taipei?* `[haʊz ðə ˋwɛðɚ ɪn ˏtaɪˋpe]` 是「臺北的天氣怎麼樣？」。",
      "*It's sunny and hot.* `[ɪts ˋsʌni ænd hɑt]` 是「現在是晴天而且很熱。」。"
    ]
  },
  {
    "sid": "u1-sent",
    "u": "Unit 1・Weather Sentences",
    "d": "易",
    "q": "Unit 1 句型：*It's cloudy in Taichung.* `[ɪts ˋklaʊdi ɪn ˏtaɪˋtʃʊŋ]` 的中文意思最接近哪一句？",
    "o": [
      "臺中是多雲。",
      "臺北的天氣怎麼樣？",
      "現在是晴天而且很熱。",
      "如果雨下太多會怎麼樣？"
    ],
    "a": 0,
    "e": "*It's cloudy in Taichung.* `[ɪts ˋklaʊdi ɪn ˏtaɪˋtʃʊŋ]`（臺中是多雲。） 是「臺中是多雲。」。",
    "w": [
      "",
      "*How's the weather in Taipei?* `[haʊz ðə ˋwɛðɚ ɪn ˏtaɪˋpe]` 是「臺北的天氣怎麼樣？」。",
      "*It's sunny and hot.* `[ɪts ˋsʌni ænd hɑt]` 是「現在是晴天而且很熱。」。",
      "*What happens if it rains too much?* `[hwɑt ˋhæpənz ɪf ɪt renz tu mʌtʃ]` 是「如果雨下太多會怎麼樣？」。"
    ]
  },
  {
    "sid": "u1-sent",
    "u": "Unit 1・Weather Sentences",
    "d": "易",
    "q": "Unit 1 句型：*How's the weather in Taipei?* `[haʊz ðə ˋwɛðɚ ɪn ˏtaɪˋpe]` 的中文意思最接近哪一句？",
    "o": [
      "臺北的天氣怎麼樣？",
      "現在是晴天而且很熱。",
      "如果雨下太多會怎麼樣？",
      "現在下雨而且很冷。"
    ],
    "a": 0,
    "e": "*How's the weather in Taipei?* `[haʊz ðə ˋwɛðɚ ɪn ˏtaɪˋpe]`（臺北的天氣怎麼樣？） 是「臺北的天氣怎麼樣？」。",
    "w": [
      "",
      "*It's sunny and hot.* `[ɪts ˋsʌni ænd hɑt]` 是「現在是晴天而且很熱。」。",
      "*What happens if it rains too much?* `[hwɑt ˋhæpənz ɪf ɪt renz tu mʌtʃ]` 是「如果雨下太多會怎麼樣？」。",
      "*It's rainy and cold.* `[ɪts ˋreni ænd kold]` 是「現在下雨而且很冷。」。"
    ]
  },
  {
    "sid": "u1-sent",
    "u": "Unit 1・Weather Sentences",
    "d": "易",
    "q": "Unit 1 句型：*It's sunny and hot.* `[ɪts ˋsʌni ænd hɑt]` 的中文意思最接近哪一句？",
    "o": [
      "現在是晴天而且很熱。",
      "如果雨下太多會怎麼樣？",
      "現在下雨而且很冷。",
      "現在有風。"
    ],
    "a": 0,
    "e": "*It's sunny and hot.* `[ɪts ˋsʌni ænd hɑt]`（現在是晴天而且很熱。） 是「現在是晴天而且很熱。」。",
    "w": [
      "",
      "*What happens if it rains too much?* `[hwɑt ˋhæpənz ɪf ɪt renz tu mʌtʃ]` 是「如果雨下太多會怎麼樣？」。",
      "*It's rainy and cold.* `[ɪts ˋreni ænd kold]` 是「現在下雨而且很冷。」。",
      "*It's windy.* `[ɪts ˋwɪndi]` 是「現在有風。」。"
    ]
  },
  {
    "sid": "u1-sent",
    "u": "Unit 1・Weather Sentences",
    "d": "易",
    "q": "Unit 1 句型：*What happens if it rains too much?* `[hwɑt ˋhæpənz ɪf ɪt renz tu mʌtʃ]` 的中文意思最接近哪一句？",
    "o": [
      "如果雨下太多會怎麼樣？",
      "現在下雨而且很冷。",
      "現在有風。",
      "天氣怎麼樣？"
    ],
    "a": 0,
    "e": "*What happens if it rains too much?* `[hwɑt ˋhæpənz ɪf ɪt renz tu mʌtʃ]`（如果雨下太多會怎麼樣？） 是「如果雨下太多會怎麼樣？」。",
    "w": [
      "",
      "*It's rainy and cold.* `[ɪts ˋreni ænd kold]` 是「現在下雨而且很冷。」。",
      "*It's windy.* `[ɪts ˋwɪndi]` 是「現在有風。」。",
      "*How's the weather?* `[haʊz ðə ˋwɛðɚ]` 是「天氣怎麼樣？」。"
    ]
  },
  {
    "sid": "u1-sent",
    "u": "Unit 1・Weather Sentences",
    "d": "易",
    "q": "Unit 1 句型：*It's rainy and cold.* `[ɪts ˋreni ænd kold]` 的中文意思最接近哪一句？",
    "o": [
      "現在下雨而且很冷。",
      "現在有風。",
      "天氣怎麼樣？",
      "現在是晴天。"
    ],
    "a": 0,
    "e": "*It's rainy and cold.* `[ɪts ˋreni ænd kold]`（現在下雨而且很冷。） 是「現在下雨而且很冷。」。",
    "w": [
      "",
      "*It's windy.* `[ɪts ˋwɪndi]` 是「現在有風。」。",
      "*How's the weather?* `[haʊz ðə ˋwɛðɚ]` 是「天氣怎麼樣？」。",
      "*It's sunny.* `[ɪts ˋsʌni]` 是「現在是晴天。」。"
    ]
  },
  {
    "sid": "u1-sent",
    "u": "Unit 1・Weather Sentences",
    "d": "易",
    "q": "Unit 1 句型：*It's windy.* `[ɪts ˋwɪndi]` 的中文意思最接近哪一句？",
    "o": [
      "現在有風。",
      "天氣怎麼樣？",
      "現在是晴天。",
      "臺中是多雲。"
    ],
    "a": 0,
    "e": "*It's windy.* `[ɪts ˋwɪndi]`（現在有風。） 是「現在有風。」。",
    "w": [
      "",
      "*How's the weather?* `[haʊz ðə ˋwɛðɚ]` 是「天氣怎麼樣？」。",
      "*It's sunny.* `[ɪts ˋsʌni]` 是「現在是晴天。」。",
      "*It's cloudy in Taichung.* `[ɪts ˋklaʊdi ɪn ˏtaɪˋtʃʊŋ]` 是「臺中是多雲。」。"
    ]
  },
  {
    "sid": "u1-sent",
    "u": "Unit 1・Weather Sentences",
    "d": "中",
    "q": "Unit 1 句型：「天氣怎麼樣？」的英文是哪一句？",
    "o": [
      "*How's the weather?* `[haʊz ðə ˋwɛðɚ]`",
      "*It's sunny.* `[ɪts ˋsʌni]`",
      "*It's cloudy in Taichung.* `[ɪts ˋklaʊdi ɪn ˏtaɪˋtʃʊŋ]`",
      "*How's the weather in Taipei?* `[haʊz ðə ˋwɛðɚ ɪn ˏtaɪˋpe]`"
    ],
    "a": 0,
    "e": "「天氣怎麼樣？」是 *How's the weather?* `[haʊz ðə ˋwɛðɚ]`（天氣怎麼樣？）。",
    "w": [
      "",
      "「現在是晴天。」是 *It's sunny.* `[ɪts ˋsʌni]`。",
      "「臺中是多雲。」是 *It's cloudy in Taichung.* `[ɪts ˋklaʊdi ɪn ˏtaɪˋtʃʊŋ]`。",
      "「臺北的天氣怎麼樣？」是 *How's the weather in Taipei?* `[haʊz ðə ˋwɛðɚ ɪn ˏtaɪˋpe]`。"
    ]
  },
  {
    "sid": "u1-sent",
    "u": "Unit 1・Weather Sentences",
    "d": "中",
    "q": "Unit 1 句型：「現在是晴天。」的英文是哪一句？",
    "o": [
      "*It's sunny.* `[ɪts ˋsʌni]`",
      "*It's cloudy in Taichung.* `[ɪts ˋklaʊdi ɪn ˏtaɪˋtʃʊŋ]`",
      "*How's the weather in Taipei?* `[haʊz ðə ˋwɛðɚ ɪn ˏtaɪˋpe]`",
      "*It's sunny and hot.* `[ɪts ˋsʌni ænd hɑt]`"
    ],
    "a": 0,
    "e": "「現在是晴天。」是 *It's sunny.* `[ɪts ˋsʌni]`（現在是晴天。）。",
    "w": [
      "",
      "「臺中是多雲。」是 *It's cloudy in Taichung.* `[ɪts ˋklaʊdi ɪn ˏtaɪˋtʃʊŋ]`。",
      "「臺北的天氣怎麼樣？」是 *How's the weather in Taipei?* `[haʊz ðə ˋwɛðɚ ɪn ˏtaɪˋpe]`。",
      "「現在是晴天而且很熱。」是 *It's sunny and hot.* `[ɪts ˋsʌni ænd hɑt]`。"
    ]
  },
  {
    "sid": "u1-sent",
    "u": "Unit 1・Weather Sentences",
    "d": "中",
    "q": "Unit 1 句型：「臺中是多雲。」的英文是哪一句？",
    "o": [
      "*It's cloudy in Taichung.* `[ɪts ˋklaʊdi ɪn ˏtaɪˋtʃʊŋ]`",
      "*How's the weather in Taipei?* `[haʊz ðə ˋwɛðɚ ɪn ˏtaɪˋpe]`",
      "*It's sunny and hot.* `[ɪts ˋsʌni ænd hɑt]`",
      "*What happens if it rains too much?* `[hwɑt ˋhæpənz ɪf ɪt renz tu mʌtʃ]`"
    ],
    "a": 0,
    "e": "「臺中是多雲。」是 *It's cloudy in Taichung.* `[ɪts ˋklaʊdi ɪn ˏtaɪˋtʃʊŋ]`（臺中是多雲。）。",
    "w": [
      "",
      "「臺北的天氣怎麼樣？」是 *How's the weather in Taipei?* `[haʊz ðə ˋwɛðɚ ɪn ˏtaɪˋpe]`。",
      "「現在是晴天而且很熱。」是 *It's sunny and hot.* `[ɪts ˋsʌni ænd hɑt]`。",
      "「如果雨下太多會怎麼樣？」是 *What happens if it rains too much?* `[hwɑt ˋhæpənz ɪf ɪt renz tu mʌtʃ]`。"
    ]
  },
  {
    "sid": "u1-sent",
    "u": "Unit 1・Weather Sentences",
    "d": "中",
    "q": "Unit 1 句型：「臺北的天氣怎麼樣？」的英文是哪一句？",
    "o": [
      "*How's the weather in Taipei?* `[haʊz ðə ˋwɛðɚ ɪn ˏtaɪˋpe]`",
      "*It's sunny and hot.* `[ɪts ˋsʌni ænd hɑt]`",
      "*What happens if it rains too much?* `[hwɑt ˋhæpənz ɪf ɪt renz tu mʌtʃ]`",
      "*It's rainy and cold.* `[ɪts ˋreni ænd kold]`"
    ],
    "a": 0,
    "e": "「臺北的天氣怎麼樣？」是 *How's the weather in Taipei?* `[haʊz ðə ˋwɛðɚ ɪn ˏtaɪˋpe]`（臺北的天氣怎麼樣？）。",
    "w": [
      "",
      "「現在是晴天而且很熱。」是 *It's sunny and hot.* `[ɪts ˋsʌni ænd hɑt]`。",
      "「如果雨下太多會怎麼樣？」是 *What happens if it rains too much?* `[hwɑt ˋhæpənz ɪf ɪt renz tu mʌtʃ]`。",
      "「現在下雨而且很冷。」是 *It's rainy and cold.* `[ɪts ˋreni ænd kold]`。"
    ]
  },
  {
    "sid": "u1-sent",
    "u": "Unit 1・Weather Sentences",
    "d": "中",
    "q": "Unit 1 句型：「現在是晴天而且很熱。」的英文是哪一句？",
    "o": [
      "*It's sunny and hot.* `[ɪts ˋsʌni ænd hɑt]`",
      "*What happens if it rains too much?* `[hwɑt ˋhæpənz ɪf ɪt renz tu mʌtʃ]`",
      "*It's rainy and cold.* `[ɪts ˋreni ænd kold]`",
      "*It's windy.* `[ɪts ˋwɪndi]`"
    ],
    "a": 0,
    "e": "「現在是晴天而且很熱。」是 *It's sunny and hot.* `[ɪts ˋsʌni ænd hɑt]`（現在是晴天而且很熱。）。",
    "w": [
      "",
      "「如果雨下太多會怎麼樣？」是 *What happens if it rains too much?* `[hwɑt ˋhæpənz ɪf ɪt renz tu mʌtʃ]`。",
      "「現在下雨而且很冷。」是 *It's rainy and cold.* `[ɪts ˋreni ænd kold]`。",
      "「現在有風。」是 *It's windy.* `[ɪts ˋwɪndi]`。"
    ]
  },
  {
    "sid": "u1-sent",
    "u": "Unit 1・Weather Sentences",
    "d": "中",
    "q": "Unit 1 句型：「如果雨下太多會怎麼樣？」的英文是哪一句？",
    "o": [
      "*What happens if it rains too much?* `[hwɑt ˋhæpənz ɪf ɪt renz tu mʌtʃ]`",
      "*It's rainy and cold.* `[ɪts ˋreni ænd kold]`",
      "*It's windy.* `[ɪts ˋwɪndi]`",
      "*How's the weather?* `[haʊz ðə ˋwɛðɚ]`"
    ],
    "a": 0,
    "e": "「如果雨下太多會怎麼樣？」是 *What happens if it rains too much?* `[hwɑt ˋhæpənz ɪf ɪt renz tu mʌtʃ]`（如果雨下太多會怎麼樣？）。",
    "w": [
      "",
      "「現在下雨而且很冷。」是 *It's rainy and cold.* `[ɪts ˋreni ænd kold]`。",
      "「現在有風。」是 *It's windy.* `[ɪts ˋwɪndi]`。",
      "「天氣怎麼樣？」是 *How's the weather?* `[haʊz ðə ˋwɛðɚ]`。"
    ]
  },
  {
    "sid": "u1-sent",
    "u": "Unit 1・Weather Sentences",
    "d": "中",
    "q": "Unit 1 句型：「現在下雨而且很冷。」的英文是哪一句？",
    "o": [
      "*It's rainy and cold.* `[ɪts ˋreni ænd kold]`",
      "*It's windy.* `[ɪts ˋwɪndi]`",
      "*How's the weather?* `[haʊz ðə ˋwɛðɚ]`",
      "*It's sunny.* `[ɪts ˋsʌni]`"
    ],
    "a": 0,
    "e": "「現在下雨而且很冷。」是 *It's rainy and cold.* `[ɪts ˋreni ænd kold]`（現在下雨而且很冷。）。",
    "w": [
      "",
      "「現在有風。」是 *It's windy.* `[ɪts ˋwɪndi]`。",
      "「天氣怎麼樣？」是 *How's the weather?* `[haʊz ðə ˋwɛðɚ]`。",
      "「現在是晴天。」是 *It's sunny.* `[ɪts ˋsʌni]`。"
    ]
  },
  {
    "sid": "u1-sent",
    "u": "Unit 1・Weather Sentences",
    "d": "中",
    "q": "Unit 1 句型：「現在有風。」的英文是哪一句？",
    "o": [
      "*It's windy.* `[ɪts ˋwɪndi]`",
      "*How's the weather?* `[haʊz ðə ˋwɛðɚ]`",
      "*It's sunny.* `[ɪts ˋsʌni]`",
      "*It's cloudy in Taichung.* `[ɪts ˋklaʊdi ɪn ˏtaɪˋtʃʊŋ]`"
    ],
    "a": 0,
    "e": "「現在有風。」是 *It's windy.* `[ɪts ˋwɪndi]`（現在有風。）。",
    "w": [
      "",
      "「天氣怎麼樣？」是 *How's the weather?* `[haʊz ðə ˋwɛðɚ]`。",
      "「現在是晴天。」是 *It's sunny.* `[ɪts ˋsʌni]`。",
      "「臺中是多雲。」是 *It's cloudy in Taichung.* `[ɪts ˋklaʊdi ɪn ˏtaɪˋtʃʊŋ]`。"
    ]
  },
  {
    "sid": "u1-daily",
    "u": "Unit 1・The Big Wind",
    "d": "易",
    "q": "Unit 1 故事：*Let's go to the park.* `[lɛts go tu ðə pɑrk]` 的中文意思最接近哪一句？",
    "o": [
      "我們去公園吧。",
      "為什麼？",
      "看！是波卡！",
      "不，現在下雨。"
    ],
    "a": 0,
    "e": "*Let's go to the park.* `[lɛts go tu ðə pɑrk]`（我們去公園吧。） 是「我們去公園吧。」。",
    "w": [
      "",
      "*How come?* `[haʊ kʌm]` 是「為什麼？」。",
      "*Look! It's Boka!* `[lʊk ɪts ˋbokə]` 是「看！是波卡！」。",
      "*No, it's rainy.* `[no ɪts ˋreni]` 是「不，現在下雨。」。"
    ]
  },
  {
    "sid": "u1-daily",
    "u": "Unit 1・The Big Wind",
    "d": "易",
    "q": "Unit 1 故事：*How come?* `[haʊ kʌm]` 的中文意思最接近哪一句？",
    "o": [
      "為什麼？",
      "看！是波卡！",
      "不，現在下雨。",
      "怎麼了？"
    ],
    "a": 0,
    "e": "*How come?* `[haʊ kʌm]`（為什麼？） 是「為什麼？」。",
    "w": [
      "",
      "*Look! It's Boka!* `[lʊk ɪts ˋbokə]` 是「看！是波卡！」。",
      "*No, it's rainy.* `[no ɪts ˋreni]` 是「不，現在下雨。」。",
      "*What's going on?* `[hwɑts ˋgoɪŋ ɑn]` 是「怎麼了？」。"
    ]
  },
  {
    "sid": "u1-daily",
    "u": "Unit 1・The Big Wind",
    "d": "易",
    "q": "Unit 1 故事：*Look! It's Boka!* `[lʊk ɪts ˋbokə]` 的中文意思最接近哪一句？",
    "o": [
      "看！是波卡！",
      "不，現在下雨。",
      "怎麼了？",
      "請排隊。"
    ],
    "a": 0,
    "e": "*Look! It's Boka!* `[lʊk ɪts ˋbokə]`（看！是波卡！） 是「看！是波卡！」。",
    "w": [
      "",
      "*No, it's rainy.* `[no ɪts ˋreni]` 是「不，現在下雨。」。",
      "*What's going on?* `[hwɑts ˋgoɪŋ ɑn]` 是「怎麼了？」。",
      "*Line up, please.* `[laɪn ʌp pliz]` 是「請排隊。」。"
    ]
  },
  {
    "sid": "u1-daily",
    "u": "Unit 1・The Big Wind",
    "d": "易",
    "q": "Unit 1 故事：*No, it's rainy.* `[no ɪts ˋreni]` 的中文意思最接近哪一句？",
    "o": [
      "不，現在下雨。",
      "怎麼了？",
      "請排隊。",
      "糟了！我的帽子！"
    ],
    "a": 0,
    "e": "*No, it's rainy.* `[no ɪts ˋreni]`（不，現在下雨。） 是「不，現在下雨。」。",
    "w": [
      "",
      "*What's going on?* `[hwɑts ˋgoɪŋ ɑn]` 是「怎麼了？」。",
      "*Line up, please.* `[laɪn ʌp pliz]` 是「請排隊。」。",
      "*Oh no! My cap!* `[o no maɪ kæp]` 是「糟了！我的帽子！」。"
    ]
  },
  {
    "sid": "u1-daily",
    "u": "Unit 1・The Big Wind",
    "d": "易",
    "q": "Unit 1 故事：*What's going on?* `[hwɑts ˋgoɪŋ ɑn]` 的中文意思最接近哪一句？",
    "o": [
      "怎麼了？",
      "請排隊。",
      "糟了！我的帽子！",
      "看！多雲了。"
    ],
    "a": 0,
    "e": "*What's going on?* `[hwɑts ˋgoɪŋ ɑn]`（怎麼了？） 是「怎麼了？」。",
    "w": [
      "",
      "*Line up, please.* `[laɪn ʌp pliz]` 是「請排隊。」。",
      "*Oh no! My cap!* `[o no maɪ kæp]` 是「糟了！我的帽子！」。",
      "*Look! It's cloudy.* `[lʊk ɪts ˋklaʊdi]` 是「看！多雲了。」。"
    ]
  },
  {
    "sid": "u1-daily",
    "u": "Unit 1・The Big Wind",
    "d": "易",
    "q": "Unit 1 故事：*Line up, please.* `[laɪn ʌp pliz]` 的中文意思最接近哪一句？",
    "o": [
      "請排隊。",
      "糟了！我的帽子！",
      "看！多雲了。",
      "我們去公園吧。"
    ],
    "a": 0,
    "e": "*Line up, please.* `[laɪn ʌp pliz]`（請排隊。） 是「請排隊。」。",
    "w": [
      "",
      "*Oh no! My cap!* `[o no maɪ kæp]` 是「糟了！我的帽子！」。",
      "*Look! It's cloudy.* `[lʊk ɪts ˋklaʊdi]` 是「看！多雲了。」。",
      "*Let's go to the park.* `[lɛts go tu ðə pɑrk]` 是「我們去公園吧。」。"
    ]
  },
  {
    "sid": "u1-daily",
    "u": "Unit 1・The Big Wind",
    "d": "易",
    "q": "Unit 1 故事：*Oh no! My cap!* `[o no maɪ kæp]` 的中文意思最接近哪一句？",
    "o": [
      "糟了！我的帽子！",
      "看！多雲了。",
      "我們去公園吧。",
      "為什麼？"
    ],
    "a": 0,
    "e": "*Oh no! My cap!* `[o no maɪ kæp]`（糟了！我的帽子！） 是「糟了！我的帽子！」。",
    "w": [
      "",
      "*Look! It's cloudy.* `[lʊk ɪts ˋklaʊdi]` 是「看！多雲了。」。",
      "*Let's go to the park.* `[lɛts go tu ðə pɑrk]` 是「我們去公園吧。」。",
      "*How come?* `[haʊ kʌm]` 是「為什麼？」。"
    ]
  },
  {
    "sid": "u1-daily",
    "u": "Unit 1・The Big Wind",
    "d": "易",
    "q": "Unit 1 故事：*Look! It's cloudy.* `[lʊk ɪts ˋklaʊdi]` 的中文意思最接近哪一句？",
    "o": [
      "看！多雲了。",
      "我們去公園吧。",
      "為什麼？",
      "看！是波卡！"
    ],
    "a": 0,
    "e": "*Look! It's cloudy.* `[lʊk ɪts ˋklaʊdi]`（看！多雲了。） 是「看！多雲了。」。",
    "w": [
      "",
      "*Let's go to the park.* `[lɛts go tu ðə pɑrk]` 是「我們去公園吧。」。",
      "*How come?* `[haʊ kʌm]` 是「為什麼？」。",
      "*Look! It's Boka!* `[lʊk ɪts ˋbokə]` 是「看！是波卡！」。"
    ]
  },
  {
    "sid": "u1-daily",
    "u": "Unit 1・The Big Wind",
    "d": "中",
    "q": "Unit 1 故事：「我們去公園吧。」的英文是哪一句？",
    "o": [
      "*Let's go to the park.* `[lɛts go tu ðə pɑrk]`",
      "*How come?* `[haʊ kʌm]`",
      "*Look! It's Boka!* `[lʊk ɪts ˋbokə]`",
      "*No, it's rainy.* `[no ɪts ˋreni]`"
    ],
    "a": 0,
    "e": "「我們去公園吧。」是 *Let's go to the park.* `[lɛts go tu ðə pɑrk]`（我們去公園吧。）。",
    "w": [
      "",
      "「為什麼？」是 *How come?* `[haʊ kʌm]`。",
      "「看！是波卡！」是 *Look! It's Boka!* `[lʊk ɪts ˋbokə]`。",
      "「不，現在下雨。」是 *No, it's rainy.* `[no ɪts ˋreni]`。"
    ]
  },
  {
    "sid": "u1-daily",
    "u": "Unit 1・The Big Wind",
    "d": "中",
    "q": "Unit 1 故事：「為什麼？」的英文是哪一句？",
    "o": [
      "*How come?* `[haʊ kʌm]`",
      "*Look! It's Boka!* `[lʊk ɪts ˋbokə]`",
      "*No, it's rainy.* `[no ɪts ˋreni]`",
      "*What's going on?* `[hwɑts ˋgoɪŋ ɑn]`"
    ],
    "a": 0,
    "e": "「為什麼？」是 *How come?* `[haʊ kʌm]`（為什麼？）。",
    "w": [
      "",
      "「看！是波卡！」是 *Look! It's Boka!* `[lʊk ɪts ˋbokə]`。",
      "「不，現在下雨。」是 *No, it's rainy.* `[no ɪts ˋreni]`。",
      "「怎麼了？」是 *What's going on?* `[hwɑts ˋgoɪŋ ɑn]`。"
    ]
  },
  {
    "sid": "u1-daily",
    "u": "Unit 1・The Big Wind",
    "d": "中",
    "q": "Unit 1 故事：「看！是波卡！」的英文是哪一句？",
    "o": [
      "*Look! It's Boka!* `[lʊk ɪts ˋbokə]`",
      "*No, it's rainy.* `[no ɪts ˋreni]`",
      "*What's going on?* `[hwɑts ˋgoɪŋ ɑn]`",
      "*Line up, please.* `[laɪn ʌp pliz]`"
    ],
    "a": 0,
    "e": "「看！是波卡！」是 *Look! It's Boka!* `[lʊk ɪts ˋbokə]`（看！是波卡！）。",
    "w": [
      "",
      "「不，現在下雨。」是 *No, it's rainy.* `[no ɪts ˋreni]`。",
      "「怎麼了？」是 *What's going on?* `[hwɑts ˋgoɪŋ ɑn]`。",
      "「請排隊。」是 *Line up, please.* `[laɪn ʌp pliz]`。"
    ]
  },
  {
    "sid": "u1-daily",
    "u": "Unit 1・The Big Wind",
    "d": "中",
    "q": "Unit 1 故事：「不，現在下雨。」的英文是哪一句？",
    "o": [
      "*No, it's rainy.* `[no ɪts ˋreni]`",
      "*What's going on?* `[hwɑts ˋgoɪŋ ɑn]`",
      "*Line up, please.* `[laɪn ʌp pliz]`",
      "*Oh no! My cap!* `[o no maɪ kæp]`"
    ],
    "a": 0,
    "e": "「不，現在下雨。」是 *No, it's rainy.* `[no ɪts ˋreni]`（不，現在下雨。）。",
    "w": [
      "",
      "「怎麼了？」是 *What's going on?* `[hwɑts ˋgoɪŋ ɑn]`。",
      "「請排隊。」是 *Line up, please.* `[laɪn ʌp pliz]`。",
      "「糟了！我的帽子！」是 *Oh no! My cap!* `[o no maɪ kæp]`。"
    ]
  },
  {
    "sid": "u1-daily",
    "u": "Unit 1・The Big Wind",
    "d": "中",
    "q": "Unit 1 故事：「怎麼了？」的英文是哪一句？",
    "o": [
      "*What's going on?* `[hwɑts ˋgoɪŋ ɑn]`",
      "*Line up, please.* `[laɪn ʌp pliz]`",
      "*Oh no! My cap!* `[o no maɪ kæp]`",
      "*Look! It's cloudy.* `[lʊk ɪts ˋklaʊdi]`"
    ],
    "a": 0,
    "e": "「怎麼了？」是 *What's going on?* `[hwɑts ˋgoɪŋ ɑn]`（怎麼了？）。",
    "w": [
      "",
      "「請排隊。」是 *Line up, please.* `[laɪn ʌp pliz]`。",
      "「糟了！我的帽子！」是 *Oh no! My cap!* `[o no maɪ kæp]`。",
      "「看！多雲了。」是 *Look! It's cloudy.* `[lʊk ɪts ˋklaʊdi]`。"
    ]
  },
  {
    "sid": "u1-daily",
    "u": "Unit 1・The Big Wind",
    "d": "中",
    "q": "Unit 1 故事：「請排隊。」的英文是哪一句？",
    "o": [
      "*Line up, please.* `[laɪn ʌp pliz]`",
      "*Oh no! My cap!* `[o no maɪ kæp]`",
      "*Look! It's cloudy.* `[lʊk ɪts ˋklaʊdi]`",
      "*Let's go to the park.* `[lɛts go tu ðə pɑrk]`"
    ],
    "a": 0,
    "e": "「請排隊。」是 *Line up, please.* `[laɪn ʌp pliz]`（請排隊。）。",
    "w": [
      "",
      "「糟了！我的帽子！」是 *Oh no! My cap!* `[o no maɪ kæp]`。",
      "「看！多雲了。」是 *Look! It's cloudy.* `[lʊk ɪts ˋklaʊdi]`。",
      "「我們去公園吧。」是 *Let's go to the park.* `[lɛts go tu ðə pɑrk]`。"
    ]
  },
  {
    "sid": "u1-daily",
    "u": "Unit 1・The Big Wind",
    "d": "中",
    "q": "Unit 1 故事：「糟了！我的帽子！」的英文是哪一句？",
    "o": [
      "*Oh no! My cap!* `[o no maɪ kæp]`",
      "*Look! It's cloudy.* `[lʊk ɪts ˋklaʊdi]`",
      "*Let's go to the park.* `[lɛts go tu ðə pɑrk]`",
      "*How come?* `[haʊ kʌm]`"
    ],
    "a": 0,
    "e": "「糟了！我的帽子！」是 *Oh no! My cap!* `[o no maɪ kæp]`（糟了！我的帽子！）。",
    "w": [
      "",
      "「看！多雲了。」是 *Look! It's cloudy.* `[lʊk ɪts ˋklaʊdi]`。",
      "「我們去公園吧。」是 *Let's go to the park.* `[lɛts go tu ðə pɑrk]`。",
      "「為什麼？」是 *How come?* `[haʊ kʌm]`。"
    ]
  },
  {
    "sid": "u1-daily",
    "u": "Unit 1・The Big Wind",
    "d": "中",
    "q": "Unit 1 故事：「看！多雲了。」的英文是哪一句？",
    "o": [
      "*Look! It's cloudy.* `[lʊk ɪts ˋklaʊdi]`",
      "*Let's go to the park.* `[lɛts go tu ðə pɑrk]`",
      "*How come?* `[haʊ kʌm]`",
      "*Look! It's Boka!* `[lʊk ɪts ˋbokə]`"
    ],
    "a": 0,
    "e": "「看！多雲了。」是 *Look! It's cloudy.* `[lʊk ɪts ˋklaʊdi]`（看！多雲了。）。",
    "w": [
      "",
      "「我們去公園吧。」是 *Let's go to the park.* `[lɛts go tu ðə pɑrk]`。",
      "「為什麼？」是 *How come?* `[haʊ kʌm]`。",
      "「看！是波卡！」是 *Look! It's Boka!* `[lʊk ɪts ˋbokə]`。"
    ]
  },
  {
    "sid": "u2-sent",
    "u": "Unit 2・Time Sentences",
    "d": "易",
    "q": "Unit 2 句型：*What time is it?* `[hwɑt taɪm ɪz ɪt]` 的中文意思最接近哪一句？",
    "o": [
      "現在幾點？",
      "現在十二點。",
      "現在十二點三十分。",
      "東京現在幾點？"
    ],
    "a": 0,
    "e": "*What time is it?* `[hwɑt taɪm ɪz ɪt]`（現在幾點？） 是「現在幾點？」。",
    "w": [
      "",
      "*It's twelve o'clock.* `[ɪts twɛlv əˋklɑk]` 是「現在十二點。」。",
      "*It's twelve thirty.* `[ɪts twɛlv ˋθɝti]` 是「現在十二點三十分。」。",
      "*What time is it in Tokyo?* `[hwɑt taɪm ɪz ɪt ɪn ˋtokɪo]` 是「東京現在幾點？」。"
    ]
  },
  {
    "sid": "u2-sent",
    "u": "Unit 2・Time Sentences",
    "d": "易",
    "q": "Unit 2 句型：*It's twelve o'clock.* `[ɪts twɛlv əˋklɑk]` 的中文意思最接近哪一句？",
    "o": [
      "現在十二點。",
      "現在十二點三十分。",
      "東京現在幾點？",
      "現在八點十五分。"
    ],
    "a": 0,
    "e": "*It's twelve o'clock.* `[ɪts twɛlv əˋklɑk]`（現在十二點。） 是「現在十二點。」。",
    "w": [
      "",
      "*It's twelve thirty.* `[ɪts twɛlv ˋθɝti]` 是「現在十二點三十分。」。",
      "*What time is it in Tokyo?* `[hwɑt taɪm ɪz ɪt ɪn ˋtokɪo]` 是「東京現在幾點？」。",
      "*It's eight fifteen.* `[ɪts et ˏfɪfˋtin]` 是「現在八點十五分。」。"
    ]
  },
  {
    "sid": "u2-sent",
    "u": "Unit 2・Time Sentences",
    "d": "易",
    "q": "Unit 2 句型：*It's twelve thirty.* `[ɪts twɛlv ˋθɝti]` 的中文意思最接近哪一句？",
    "o": [
      "現在十二點三十分。",
      "東京現在幾點？",
      "現在八點十五分。",
      "該回家了。"
    ],
    "a": 0,
    "e": "*It's twelve thirty.* `[ɪts twɛlv ˋθɝti]`（現在十二點三十分。） 是「現在十二點三十分。」。",
    "w": [
      "",
      "*What time is it in Tokyo?* `[hwɑt taɪm ɪz ɪt ɪn ˋtokɪo]` 是「東京現在幾點？」。",
      "*It's eight fifteen.* `[ɪts et ˏfɪfˋtin]` 是「現在八點十五分。」。",
      "*Time to go home.* `[taɪm tu go hom]` 是「該回家了。」。"
    ]
  },
  {
    "sid": "u2-sent",
    "u": "Unit 2・Time Sentences",
    "d": "易",
    "q": "Unit 2 句型：*What time is it in Tokyo?* `[hwɑt taɪm ɪz ɪt ɪn ˋtokɪo]` 的中文意思最接近哪一句？",
    "o": [
      "東京現在幾點？",
      "現在八點十五分。",
      "該回家了。",
      "現在四點。"
    ],
    "a": 0,
    "e": "*What time is it in Tokyo?* `[hwɑt taɪm ɪz ɪt ɪn ˋtokɪo]`（東京現在幾點？） 是「東京現在幾點？」。",
    "w": [
      "",
      "*It's eight fifteen.* `[ɪts et ˏfɪfˋtin]` 是「現在八點十五分。」。",
      "*Time to go home.* `[taɪm tu go hom]` 是「該回家了。」。",
      "*It's four o'clock.* `[ɪts fɔr əˋklɑk]` 是「現在四點。」。"
    ]
  },
  {
    "sid": "u2-sent",
    "u": "Unit 2・Time Sentences",
    "d": "易",
    "q": "Unit 2 句型：*It's eight fifteen.* `[ɪts et ˏfɪfˋtin]` 的中文意思最接近哪一句？",
    "o": [
      "現在八點十五分。",
      "該回家了。",
      "現在四點。",
      "現在四點五十分。"
    ],
    "a": 0,
    "e": "*It's eight fifteen.* `[ɪts et ˏfɪfˋtin]`（現在八點十五分。） 是「現在八點十五分。」。",
    "w": [
      "",
      "*Time to go home.* `[taɪm tu go hom]` 是「該回家了。」。",
      "*It's four o'clock.* `[ɪts fɔr əˋklɑk]` 是「現在四點。」。",
      "*It's four fifty.* `[ɪts fɔr ˋfɪfti]` 是「現在四點五十分。」。"
    ]
  },
  {
    "sid": "u2-sent",
    "u": "Unit 2・Time Sentences",
    "d": "易",
    "q": "Unit 2 句型：*Time to go home.* `[taɪm tu go hom]` 的中文意思最接近哪一句？",
    "o": [
      "該回家了。",
      "現在四點。",
      "現在四點五十分。",
      "現在幾點？"
    ],
    "a": 0,
    "e": "*Time to go home.* `[taɪm tu go hom]`（該回家了。） 是「該回家了。」。",
    "w": [
      "",
      "*It's four o'clock.* `[ɪts fɔr əˋklɑk]` 是「現在四點。」。",
      "*It's four fifty.* `[ɪts fɔr ˋfɪfti]` 是「現在四點五十分。」。",
      "*What time is it?* `[hwɑt taɪm ɪz ɪt]` 是「現在幾點？」。"
    ]
  },
  {
    "sid": "u2-sent",
    "u": "Unit 2・Time Sentences",
    "d": "易",
    "q": "Unit 2 句型：*It's four o'clock.* `[ɪts fɔr əˋklɑk]` 的中文意思最接近哪一句？",
    "o": [
      "現在四點。",
      "現在四點五十分。",
      "現在幾點？",
      "現在十二點。"
    ],
    "a": 0,
    "e": "*It's four o'clock.* `[ɪts fɔr əˋklɑk]`（現在四點。） 是「現在四點。」。",
    "w": [
      "",
      "*It's four fifty.* `[ɪts fɔr ˋfɪfti]` 是「現在四點五十分。」。",
      "*What time is it?* `[hwɑt taɪm ɪz ɪt]` 是「現在幾點？」。",
      "*It's twelve o'clock.* `[ɪts twɛlv əˋklɑk]` 是「現在十二點。」。"
    ]
  },
  {
    "sid": "u2-sent",
    "u": "Unit 2・Time Sentences",
    "d": "易",
    "q": "Unit 2 句型：[[fig:eng-clock|It's four fifty. 的時鐘]] *It's four fifty.* `[ɪts fɔr ˋfɪfti]` 的中文意思最接近哪一句？",
    "o": [
      "現在四點五十分。",
      "現在幾點？",
      "現在十二點。",
      "現在十二點三十分。"
    ],
    "a": 0,
    "e": "*It's four fifty.* `[ɪts fɔr ˋfɪfti]`（現在四點五十分。） 是「現在四點五十分。」。",
    "w": [
      "",
      "*What time is it?* `[hwɑt taɪm ɪz ɪt]` 是「現在幾點？」。",
      "*It's twelve o'clock.* `[ɪts twɛlv əˋklɑk]` 是「現在十二點。」。",
      "*It's twelve thirty.* `[ɪts twɛlv ˋθɝti]` 是「現在十二點三十分。」。"
    ]
  },
  {
    "sid": "u2-sent",
    "u": "Unit 2・Time Sentences",
    "d": "中",
    "q": "Unit 2 句型：「現在幾點？」的英文是哪一句？",
    "o": [
      "*What time is it?* `[hwɑt taɪm ɪz ɪt]`",
      "*It's twelve o'clock.* `[ɪts twɛlv əˋklɑk]`",
      "*It's twelve thirty.* `[ɪts twɛlv ˋθɝti]`",
      "*What time is it in Tokyo?* `[hwɑt taɪm ɪz ɪt ɪn ˋtokɪo]`"
    ],
    "a": 0,
    "e": "「現在幾點？」是 *What time is it?* `[hwɑt taɪm ɪz ɪt]`（現在幾點？）。",
    "w": [
      "",
      "「現在十二點。」是 *It's twelve o'clock.* `[ɪts twɛlv əˋklɑk]`。",
      "「現在十二點三十分。」是 *It's twelve thirty.* `[ɪts twɛlv ˋθɝti]`。",
      "「東京現在幾點？」是 *What time is it in Tokyo?* `[hwɑt taɪm ɪz ɪt ɪn ˋtokɪo]`。"
    ]
  },
  {
    "sid": "u2-sent",
    "u": "Unit 2・Time Sentences",
    "d": "中",
    "q": "Unit 2 句型：「現在十二點。」的英文是哪一句？",
    "o": [
      "*It's twelve o'clock.* `[ɪts twɛlv əˋklɑk]`",
      "*It's twelve thirty.* `[ɪts twɛlv ˋθɝti]`",
      "*What time is it in Tokyo?* `[hwɑt taɪm ɪz ɪt ɪn ˋtokɪo]`",
      "*It's eight fifteen.* `[ɪts et ˏfɪfˋtin]`"
    ],
    "a": 0,
    "e": "「現在十二點。」是 *It's twelve o'clock.* `[ɪts twɛlv əˋklɑk]`（現在十二點。）。",
    "w": [
      "",
      "「現在十二點三十分。」是 *It's twelve thirty.* `[ɪts twɛlv ˋθɝti]`。",
      "「東京現在幾點？」是 *What time is it in Tokyo?* `[hwɑt taɪm ɪz ɪt ɪn ˋtokɪo]`。",
      "「現在八點十五分。」是 *It's eight fifteen.* `[ɪts et ˏfɪfˋtin]`。"
    ]
  },
  {
    "sid": "u2-sent",
    "u": "Unit 2・Time Sentences",
    "d": "中",
    "q": "Unit 2 句型：「現在十二點三十分。」的英文是哪一句？",
    "o": [
      "*It's twelve thirty.* `[ɪts twɛlv ˋθɝti]`",
      "*What time is it in Tokyo?* `[hwɑt taɪm ɪz ɪt ɪn ˋtokɪo]`",
      "*It's eight fifteen.* `[ɪts et ˏfɪfˋtin]`",
      "*Time to go home.* `[taɪm tu go hom]`"
    ],
    "a": 0,
    "e": "「現在十二點三十分。」是 *It's twelve thirty.* `[ɪts twɛlv ˋθɝti]`（現在十二點三十分。）。",
    "w": [
      "",
      "「東京現在幾點？」是 *What time is it in Tokyo?* `[hwɑt taɪm ɪz ɪt ɪn ˋtokɪo]`。",
      "「現在八點十五分。」是 *It's eight fifteen.* `[ɪts et ˏfɪfˋtin]`。",
      "「該回家了。」是 *Time to go home.* `[taɪm tu go hom]`。"
    ]
  },
  {
    "sid": "u2-sent",
    "u": "Unit 2・Time Sentences",
    "d": "中",
    "q": "Unit 2 句型：「東京現在幾點？」的英文是哪一句？",
    "o": [
      "*What time is it in Tokyo?* `[hwɑt taɪm ɪz ɪt ɪn ˋtokɪo]`",
      "*It's eight fifteen.* `[ɪts et ˏfɪfˋtin]`",
      "*Time to go home.* `[taɪm tu go hom]`",
      "*It's four o'clock.* `[ɪts fɔr əˋklɑk]`"
    ],
    "a": 0,
    "e": "「東京現在幾點？」是 *What time is it in Tokyo?* `[hwɑt taɪm ɪz ɪt ɪn ˋtokɪo]`（東京現在幾點？）。",
    "w": [
      "",
      "「現在八點十五分。」是 *It's eight fifteen.* `[ɪts et ˏfɪfˋtin]`。",
      "「該回家了。」是 *Time to go home.* `[taɪm tu go hom]`。",
      "「現在四點。」是 *It's four o'clock.* `[ɪts fɔr əˋklɑk]`。"
    ]
  },
  {
    "sid": "u2-sent",
    "u": "Unit 2・Time Sentences",
    "d": "中",
    "q": "Unit 2 句型：「現在八點十五分。」的英文是哪一句？",
    "o": [
      "*It's eight fifteen.* `[ɪts et ˏfɪfˋtin]`",
      "*Time to go home.* `[taɪm tu go hom]`",
      "*It's four o'clock.* `[ɪts fɔr əˋklɑk]`",
      "*It's four fifty.* `[ɪts fɔr ˋfɪfti]`"
    ],
    "a": 0,
    "e": "「現在八點十五分。」是 *It's eight fifteen.* `[ɪts et ˏfɪfˋtin]`（現在八點十五分。）。",
    "w": [
      "",
      "「該回家了。」是 *Time to go home.* `[taɪm tu go hom]`。",
      "「現在四點。」是 *It's four o'clock.* `[ɪts fɔr əˋklɑk]`。",
      "「現在四點五十分。」是 *It's four fifty.* `[ɪts fɔr ˋfɪfti]`。"
    ]
  },
  {
    "sid": "u2-sent",
    "u": "Unit 2・Time Sentences",
    "d": "中",
    "q": "Unit 2 句型：「該回家了。」的英文是哪一句？",
    "o": [
      "*Time to go home.* `[taɪm tu go hom]`",
      "*It's four o'clock.* `[ɪts fɔr əˋklɑk]`",
      "*It's four fifty.* `[ɪts fɔr ˋfɪfti]`",
      "*What time is it?* `[hwɑt taɪm ɪz ɪt]`"
    ],
    "a": 0,
    "e": "「該回家了。」是 *Time to go home.* `[taɪm tu go hom]`（該回家了。）。",
    "w": [
      "",
      "「現在四點。」是 *It's four o'clock.* `[ɪts fɔr əˋklɑk]`。",
      "「現在四點五十分。」是 *It's four fifty.* `[ɪts fɔr ˋfɪfti]`。",
      "「現在幾點？」是 *What time is it?* `[hwɑt taɪm ɪz ɪt]`。"
    ]
  },
  {
    "sid": "u2-sent",
    "u": "Unit 2・Time Sentences",
    "d": "中",
    "q": "Unit 2 句型：「現在四點。」的英文是哪一句？",
    "o": [
      "*It's four o'clock.* `[ɪts fɔr əˋklɑk]`",
      "*It's four fifty.* `[ɪts fɔr ˋfɪfti]`",
      "*What time is it?* `[hwɑt taɪm ɪz ɪt]`",
      "*It's twelve o'clock.* `[ɪts twɛlv əˋklɑk]`"
    ],
    "a": 0,
    "e": "「現在四點。」是 *It's four o'clock.* `[ɪts fɔr əˋklɑk]`（現在四點。）。",
    "w": [
      "",
      "「現在四點五十分。」是 *It's four fifty.* `[ɪts fɔr ˋfɪfti]`。",
      "「現在幾點？」是 *What time is it?* `[hwɑt taɪm ɪz ɪt]`。",
      "「現在十二點。」是 *It's twelve o'clock.* `[ɪts twɛlv əˋklɑk]`。"
    ]
  },
  {
    "sid": "u2-sent",
    "u": "Unit 2・Time Sentences",
    "d": "中",
    "q": "Unit 2 句型：「現在四點五十分。」的英文是哪一句？",
    "o": [
      "*It's four fifty.* `[ɪts fɔr ˋfɪfti]`",
      "*What time is it?* `[hwɑt taɪm ɪz ɪt]`",
      "*It's twelve o'clock.* `[ɪts twɛlv əˋklɑk]`",
      "*It's twelve thirty.* `[ɪts twɛlv ˋθɝti]`"
    ],
    "a": 0,
    "e": "「現在四點五十分。」是 *It's four fifty.* `[ɪts fɔr ˋfɪfti]`（現在四點五十分。）。",
    "w": [
      "",
      "「現在幾點？」是 *What time is it?* `[hwɑt taɪm ɪz ɪt]`。",
      "「現在十二點。」是 *It's twelve o'clock.* `[ɪts twɛlv əˋklɑk]`。",
      "「現在十二點三十分。」是 *It's twelve thirty.* `[ɪts twɛlv ˋθɝti]`。"
    ]
  },
  {
    "sid": "u2-daily",
    "u": "Unit 2・Going Back Home",
    "d": "易",
    "q": "Unit 2 故事：*We're back!* `[wɪr bæk]` 的中文意思最接近哪一句？",
    "o": [
      "我們回來了！",
      "現在四點十五分。",
      "我們必須回家了。",
      "是放學鐘聲。"
    ],
    "a": 0,
    "e": "*We're back!* `[wɪr bæk]`（我們回來了！） 是「我們回來了！」。",
    "w": [
      "",
      "*It's four fifteen.* `[ɪts fɔr ˏfɪfˋtin]` 是「現在四點十五分。」。",
      "*We must go home.* `[wi mʌst go hom]` 是「我們必須回家了。」。",
      "*It's the school bell.* `[ɪts ðə skul bɛl]` 是「是放學鐘聲。」。"
    ]
  },
  {
    "sid": "u2-daily",
    "u": "Unit 2・Going Back Home",
    "d": "易",
    "q": "Unit 2 故事：*It's four fifteen.* `[ɪts fɔr ˏfɪfˋtin]` 的中文意思最接近哪一句？",
    "o": [
      "現在四點十五分。",
      "我們必須回家了。",
      "是放學鐘聲。",
      "糟了！現在四點五十分！"
    ],
    "a": 0,
    "e": "*It's four fifteen.* `[ɪts fɔr ˏfɪfˋtin]`（現在四點十五分。） 是「現在四點十五分。」。",
    "w": [
      "",
      "*We must go home.* `[wi mʌst go hom]` 是「我們必須回家了。」。",
      "*It's the school bell.* `[ɪts ðə skul bɛl]` 是「是放學鐘聲。」。",
      "*Oh no! It's four fifty!* `[o no ɪts fɔr ˋfɪfti]` 是「糟了！現在四點五十分！」。"
    ]
  },
  {
    "sid": "u2-daily",
    "u": "Unit 2・Going Back Home",
    "d": "易",
    "q": "Unit 2 故事：*We must go home.* `[wi mʌst go hom]` 的中文意思最接近哪一句？",
    "o": [
      "我們必須回家了。",
      "是放學鐘聲。",
      "糟了！現在四點五十分！",
      "對不起，我遲到了，媽媽。"
    ],
    "a": 0,
    "e": "*We must go home.* `[wi mʌst go hom]`（我們必須回家了。） 是「我們必須回家了。」。",
    "w": [
      "",
      "*It's the school bell.* `[ɪts ðə skul bɛl]` 是「是放學鐘聲。」。",
      "*Oh no! It's four fifty!* `[o no ɪts fɔr ˋfɪfti]` 是「糟了！現在四點五十分！」。",
      "*Sorry, I'm late, Mom.* `[ˋsɑri aɪm let mɑm]` 是「對不起，我遲到了，媽媽。」。"
    ]
  },
  {
    "sid": "u2-daily",
    "u": "Unit 2・Going Back Home",
    "d": "易",
    "q": "Unit 2 故事：*It's the school bell.* `[ɪts ðə skul bɛl]` 的中文意思最接近哪一句？",
    "o": [
      "是放學鐘聲。",
      "糟了！現在四點五十分！",
      "對不起，我遲到了，媽媽。",
      "再見！"
    ],
    "a": 0,
    "e": "*It's the school bell.* `[ɪts ðə skul bɛl]`（是放學鐘聲。） 是「是放學鐘聲。」。",
    "w": [
      "",
      "*Oh no! It's four fifty!* `[o no ɪts fɔr ˋfɪfti]` 是「糟了！現在四點五十分！」。",
      "*Sorry, I'm late, Mom.* `[ˋsɑri aɪm let mɑm]` 是「對不起，我遲到了，媽媽。」。",
      "*Bye!* `[baɪ]` 是「再見！」。"
    ]
  },
  {
    "sid": "u2-daily",
    "u": "Unit 2・Going Back Home",
    "d": "易",
    "q": "Unit 2 故事：*Oh no! It's four fifty!* `[o no ɪts fɔr ˋfɪfti]` 的中文意思最接近哪一句？",
    "o": [
      "糟了！現在四點五十分！",
      "對不起，我遲到了，媽媽。",
      "再見！",
      "聽！"
    ],
    "a": 0,
    "e": "*Oh no! It's four fifty!* `[o no ɪts fɔr ˋfɪfti]`（糟了！現在四點五十分！） 是「糟了！現在四點五十分！」。",
    "w": [
      "",
      "*Sorry, I'm late, Mom.* `[ˋsɑri aɪm let mɑm]` 是「對不起，我遲到了，媽媽。」。",
      "*Bye!* `[baɪ]` 是「再見！」。",
      "*Listen!* `[ˋlɪsən]` 是「聽！」。"
    ]
  },
  {
    "sid": "u2-daily",
    "u": "Unit 2・Going Back Home",
    "d": "易",
    "q": "Unit 2 故事：*Sorry, I'm late, Mom.* `[ˋsɑri aɪm let mɑm]` 的中文意思最接近哪一句？",
    "o": [
      "對不起，我遲到了，媽媽。",
      "再見！",
      "聽！",
      "太棒了！"
    ],
    "a": 0,
    "e": "*Sorry, I'm late, Mom.* `[ˋsɑri aɪm let mɑm]`（對不起，我遲到了，媽媽。） 是「對不起，我遲到了，媽媽。」。",
    "w": [
      "",
      "*Bye!* `[baɪ]` 是「再見！」。",
      "*Listen!* `[ˋlɪsən]` 是「聽！」。",
      "*Great!* `[gret]` 是「太棒了！」。"
    ]
  },
  {
    "sid": "u2-daily",
    "u": "Unit 2・Going Back Home",
    "d": "易",
    "q": "Unit 2 故事：*Bye!* `[baɪ]` 的中文意思最接近哪一句？",
    "o": [
      "再見！",
      "聽！",
      "太棒了！",
      "是一隻狗。"
    ],
    "a": 0,
    "e": "*Bye!* `[baɪ]`（再見！） 是「再見！」。",
    "w": [
      "",
      "*Listen!* `[ˋlɪsən]` 是「聽！」。",
      "*Great!* `[gret]` 是「太棒了！」。",
      "*It's a dog.* `[ɪts ə dɔg]` 是「是一隻狗。」。"
    ]
  },
  {
    "sid": "u2-daily",
    "u": "Unit 2・Going Back Home",
    "d": "易",
    "q": "Unit 2 故事：*Listen!* `[ˋlɪsən]` 的中文意思最接近哪一句？",
    "o": [
      "聽！",
      "太棒了！",
      "是一隻狗。",
      "我們回來了！"
    ],
    "a": 0,
    "e": "*Listen!* `[ˋlɪsən]`（聽！） 是「聽！」。",
    "w": [
      "",
      "*Great!* `[gret]` 是「太棒了！」。",
      "*It's a dog.* `[ɪts ə dɔg]` 是「是一隻狗。」。",
      "*We're back!* `[wɪr bæk]` 是「我們回來了！」。"
    ]
  },
  {
    "sid": "u2-daily",
    "u": "Unit 2・Going Back Home",
    "d": "易",
    "q": "Unit 2 故事：*Great!* `[gret]` 的中文意思最接近哪一句？",
    "o": [
      "太棒了！",
      "是一隻狗。",
      "我們回來了！",
      "現在四點十五分。"
    ],
    "a": 0,
    "e": "*Great!* `[gret]`（太棒了！） 是「太棒了！」。",
    "w": [
      "",
      "*It's a dog.* `[ɪts ə dɔg]` 是「是一隻狗。」。",
      "*We're back!* `[wɪr bæk]` 是「我們回來了！」。",
      "*It's four fifteen.* `[ɪts fɔr ˏfɪfˋtin]` 是「現在四點十五分。」。"
    ]
  },
  {
    "sid": "u2-daily",
    "u": "Unit 2・Going Back Home",
    "d": "易",
    "q": "Unit 2 故事：*It's a dog.* `[ɪts ə dɔg]` 的中文意思最接近哪一句？",
    "o": [
      "是一隻狗。",
      "我們回來了！",
      "現在四點十五分。",
      "我們必須回家了。"
    ],
    "a": 0,
    "e": "*It's a dog.* `[ɪts ə dɔg]`（是一隻狗。） 是「是一隻狗。」。",
    "w": [
      "",
      "*We're back!* `[wɪr bæk]` 是「我們回來了！」。",
      "*It's four fifteen.* `[ɪts fɔr ˏfɪfˋtin]` 是「現在四點十五分。」。",
      "*We must go home.* `[wi mʌst go hom]` 是「我們必須回家了。」。"
    ]
  },
  {
    "sid": "u2-daily",
    "u": "Unit 2・Going Back Home",
    "d": "中",
    "q": "Unit 2 故事：「我們回來了！」的英文是哪一句？",
    "o": [
      "*We're back!* `[wɪr bæk]`",
      "*It's four fifteen.* `[ɪts fɔr ˏfɪfˋtin]`",
      "*We must go home.* `[wi mʌst go hom]`",
      "*It's the school bell.* `[ɪts ðə skul bɛl]`"
    ],
    "a": 0,
    "e": "「我們回來了！」是 *We're back!* `[wɪr bæk]`（我們回來了！）。",
    "w": [
      "",
      "「現在四點十五分。」是 *It's four fifteen.* `[ɪts fɔr ˏfɪfˋtin]`。",
      "「我們必須回家了。」是 *We must go home.* `[wi mʌst go hom]`。",
      "「是放學鐘聲。」是 *It's the school bell.* `[ɪts ðə skul bɛl]`。"
    ]
  },
  {
    "sid": "u2-daily",
    "u": "Unit 2・Going Back Home",
    "d": "中",
    "q": "Unit 2 故事：「現在四點十五分。」的英文是哪一句？",
    "o": [
      "*It's four fifteen.* `[ɪts fɔr ˏfɪfˋtin]`",
      "*We must go home.* `[wi mʌst go hom]`",
      "*It's the school bell.* `[ɪts ðə skul bɛl]`",
      "*Oh no! It's four fifty!* `[o no ɪts fɔr ˋfɪfti]`"
    ],
    "a": 0,
    "e": "「現在四點十五分。」是 *It's four fifteen.* `[ɪts fɔr ˏfɪfˋtin]`（現在四點十五分。）。",
    "w": [
      "",
      "「我們必須回家了。」是 *We must go home.* `[wi mʌst go hom]`。",
      "「是放學鐘聲。」是 *It's the school bell.* `[ɪts ðə skul bɛl]`。",
      "「糟了！現在四點五十分！」是 *Oh no! It's four fifty!* `[o no ɪts fɔr ˋfɪfti]`。"
    ]
  },
  {
    "sid": "u2-daily",
    "u": "Unit 2・Going Back Home",
    "d": "中",
    "q": "Unit 2 故事：「我們必須回家了。」的英文是哪一句？",
    "o": [
      "*We must go home.* `[wi mʌst go hom]`",
      "*It's the school bell.* `[ɪts ðə skul bɛl]`",
      "*Oh no! It's four fifty!* `[o no ɪts fɔr ˋfɪfti]`",
      "*Sorry, I'm late, Mom.* `[ˋsɑri aɪm let mɑm]`"
    ],
    "a": 0,
    "e": "「我們必須回家了。」是 *We must go home.* `[wi mʌst go hom]`（我們必須回家了。）。",
    "w": [
      "",
      "「是放學鐘聲。」是 *It's the school bell.* `[ɪts ðə skul bɛl]`。",
      "「糟了！現在四點五十分！」是 *Oh no! It's four fifty!* `[o no ɪts fɔr ˋfɪfti]`。",
      "「對不起，我遲到了，媽媽。」是 *Sorry, I'm late, Mom.* `[ˋsɑri aɪm let mɑm]`。"
    ]
  },
  {
    "sid": "u2-daily",
    "u": "Unit 2・Going Back Home",
    "d": "中",
    "q": "Unit 2 故事：「是放學鐘聲。」的英文是哪一句？",
    "o": [
      "*It's the school bell.* `[ɪts ðə skul bɛl]`",
      "*Oh no! It's four fifty!* `[o no ɪts fɔr ˋfɪfti]`",
      "*Sorry, I'm late, Mom.* `[ˋsɑri aɪm let mɑm]`",
      "*Bye!* `[baɪ]`"
    ],
    "a": 0,
    "e": "「是放學鐘聲。」是 *It's the school bell.* `[ɪts ðə skul bɛl]`（是放學鐘聲。）。",
    "w": [
      "",
      "「糟了！現在四點五十分！」是 *Oh no! It's four fifty!* `[o no ɪts fɔr ˋfɪfti]`。",
      "「對不起，我遲到了，媽媽。」是 *Sorry, I'm late, Mom.* `[ˋsɑri aɪm let mɑm]`。",
      "「再見！」是 *Bye!* `[baɪ]`。"
    ]
  },
  {
    "sid": "u2-daily",
    "u": "Unit 2・Going Back Home",
    "d": "中",
    "q": "Unit 2 故事：「糟了！現在四點五十分！」的英文是哪一句？",
    "o": [
      "*Oh no! It's four fifty!* `[o no ɪts fɔr ˋfɪfti]`",
      "*Sorry, I'm late, Mom.* `[ˋsɑri aɪm let mɑm]`",
      "*Bye!* `[baɪ]`",
      "*Listen!* `[ˋlɪsən]`"
    ],
    "a": 0,
    "e": "「糟了！現在四點五十分！」是 *Oh no! It's four fifty!* `[o no ɪts fɔr ˋfɪfti]`（糟了！現在四點五十分！）。",
    "w": [
      "",
      "「對不起，我遲到了，媽媽。」是 *Sorry, I'm late, Mom.* `[ˋsɑri aɪm let mɑm]`。",
      "「再見！」是 *Bye!* `[baɪ]`。",
      "「聽！」是 *Listen!* `[ˋlɪsən]`。"
    ]
  },
  {
    "sid": "u2-daily",
    "u": "Unit 2・Going Back Home",
    "d": "中",
    "q": "Unit 2 故事：「對不起，我遲到了，媽媽。」的英文是哪一句？",
    "o": [
      "*Sorry, I'm late, Mom.* `[ˋsɑri aɪm let mɑm]`",
      "*Bye!* `[baɪ]`",
      "*Listen!* `[ˋlɪsən]`",
      "*Great!* `[gret]`"
    ],
    "a": 0,
    "e": "「對不起，我遲到了，媽媽。」是 *Sorry, I'm late, Mom.* `[ˋsɑri aɪm let mɑm]`（對不起，我遲到了，媽媽。）。",
    "w": [
      "",
      "「再見！」是 *Bye!* `[baɪ]`。",
      "「聽！」是 *Listen!* `[ˋlɪsən]`。",
      "「太棒了！」是 *Great!* `[gret]`。"
    ]
  },
  {
    "sid": "u2-daily",
    "u": "Unit 2・Going Back Home",
    "d": "中",
    "q": "Unit 2 故事：「再見！」的英文是哪一句？",
    "o": [
      "*Bye!* `[baɪ]`",
      "*Listen!* `[ˋlɪsən]`",
      "*Great!* `[gret]`",
      "*It's a dog.* `[ɪts ə dɔg]`"
    ],
    "a": 0,
    "e": "「再見！」是 *Bye!* `[baɪ]`（再見！）。",
    "w": [
      "",
      "「聽！」是 *Listen!* `[ˋlɪsən]`。",
      "「太棒了！」是 *Great!* `[gret]`。",
      "「是一隻狗。」是 *It's a dog.* `[ɪts ə dɔg]`。"
    ]
  },
  {
    "sid": "u2-daily",
    "u": "Unit 2・Going Back Home",
    "d": "中",
    "q": "Unit 2 故事：「聽！」的英文是哪一句？",
    "o": [
      "*Listen!* `[ˋlɪsən]`",
      "*Great!* `[gret]`",
      "*It's a dog.* `[ɪts ə dɔg]`",
      "*We're back!* `[wɪr bæk]`"
    ],
    "a": 0,
    "e": "「聽！」是 *Listen!* `[ˋlɪsən]`（聽！）。",
    "w": [
      "",
      "「太棒了！」是 *Great!* `[gret]`。",
      "「是一隻狗。」是 *It's a dog.* `[ɪts ə dɔg]`。",
      "「我們回來了！」是 *We're back!* `[wɪr bæk]`。"
    ]
  },
  {
    "sid": "u2-daily",
    "u": "Unit 2・Going Back Home",
    "d": "中",
    "q": "Unit 2 故事：「太棒了！」的英文是哪一句？",
    "o": [
      "*Great!* `[gret]`",
      "*It's a dog.* `[ɪts ə dɔg]`",
      "*We're back!* `[wɪr bæk]`",
      "*It's four fifteen.* `[ɪts fɔr ˏfɪfˋtin]`"
    ],
    "a": 0,
    "e": "「太棒了！」是 *Great!* `[gret]`（太棒了！）。",
    "w": [
      "",
      "「是一隻狗。」是 *It's a dog.* `[ɪts ə dɔg]`。",
      "「我們回來了！」是 *We're back!* `[wɪr bæk]`。",
      "「現在四點十五分。」是 *It's four fifteen.* `[ɪts fɔr ˏfɪfˋtin]`。"
    ]
  },
  {
    "sid": "u2-daily",
    "u": "Unit 2・Going Back Home",
    "d": "中",
    "q": "Unit 2 故事：「是一隻狗。」的英文是哪一句？",
    "o": [
      "*It's a dog.* `[ɪts ə dɔg]`",
      "*We're back!* `[wɪr bæk]`",
      "*It's four fifteen.* `[ɪts fɔr ˏfɪfˋtin]`",
      "*We must go home.* `[wi mʌst go hom]`"
    ],
    "a": 0,
    "e": "「是一隻狗。」是 *It's a dog.* `[ɪts ə dɔg]`（是一隻狗。）。",
    "w": [
      "",
      "「我們回來了！」是 *We're back!* `[wɪr bæk]`。",
      "「現在四點十五分。」是 *It's four fifteen.* `[ɪts fɔr ˏfɪfˋtin]`。",
      "「我們必須回家了。」是 *We must go home.* `[wi mʌst go hom]`。"
    ]
  },
  {
    "sid": "u3-sent",
    "u": "Unit 3・Possessive Sentences",
    "d": "易",
    "q": "Unit 3 句型：*Is this your pencil?* `[ɪz ðɪs jʊr ˋpɛnsəl]` 的中文意思最接近哪一句？",
    "o": [
      "這是你的鉛筆嗎？",
      "是的。",
      "不，不是。",
      "這是你的橡皮擦嗎？"
    ],
    "a": 0,
    "e": "*Is this your pencil?* `[ɪz ðɪs jʊr ˋpɛnsəl]`（這是你的鉛筆嗎？） 是「這是你的鉛筆嗎？」。",
    "w": [
      "",
      "*Yes, it is.* `[jɛs ɪt ɪz]` 是「是的。」。",
      "*No, it's not.* `[no ɪts nɑt]` 是「不，不是。」。",
      "*Is this your eraser?* `[ɪz ðɪs jʊr ɪˋresɚ]` 是「這是你的橡皮擦嗎？」。"
    ]
  },
  {
    "sid": "u3-sent",
    "u": "Unit 3・Possessive Sentences",
    "d": "易",
    "q": "Unit 3 句型：*Yes, it is.* `[jɛs ɪt ɪz]` 的中文意思最接近哪一句？",
    "o": [
      "是的。",
      "不，不是。",
      "這是你的橡皮擦嗎？",
      "謝謝你。"
    ],
    "a": 0,
    "e": "*Yes, it is.* `[jɛs ɪt ɪz]`（是的。） 是「是的。」。",
    "w": [
      "",
      "*No, it's not.* `[no ɪts nɑt]` 是「不，不是。」。",
      "*Is this your eraser?* `[ɪz ðɪs jʊr ɪˋresɚ]` 是「這是你的橡皮擦嗎？」。",
      "*Thank you.* `[θæŋk ju]` 是「謝謝你。」。"
    ]
  },
  {
    "sid": "u3-sent",
    "u": "Unit 3・Possessive Sentences",
    "d": "易",
    "q": "Unit 3 句型：*No, it's not.* `[no ɪts nɑt]` 的中文意思最接近哪一句？",
    "o": [
      "不，不是。",
      "這是你的橡皮擦嗎？",
      "謝謝你。",
      "我們把它們送到失物招領處吧。"
    ],
    "a": 0,
    "e": "*No, it's not.* `[no ɪts nɑt]`（不，不是。） 是「不，不是。」。",
    "w": [
      "",
      "*Is this your eraser?* `[ɪz ðɪs jʊr ɪˋresɚ]` 是「這是你的橡皮擦嗎？」。",
      "*Thank you.* `[θæŋk ju]` 是「謝謝你。」。",
      "*Let's take them to the Lost and Found.* `[lɛts tek ðɛm tu ðə lɔst ænd faʊnd]` 是「我們把它們送到失物招領處吧。」。"
    ]
  },
  {
    "sid": "u3-sent",
    "u": "Unit 3・Possessive Sentences",
    "d": "易",
    "q": "Unit 3 句型：*Is this your eraser?* `[ɪz ðɪs jʊr ɪˋresɚ]` 的中文意思最接近哪一句？",
    "o": [
      "這是你的橡皮擦嗎？",
      "謝謝你。",
      "我們把它們送到失物招領處吧。",
      "這是我的尺。"
    ],
    "a": 0,
    "e": "*Is this your eraser?* `[ɪz ðɪs jʊr ɪˋresɚ]`（這是你的橡皮擦嗎？） 是「這是你的橡皮擦嗎？」。",
    "w": [
      "",
      "*Thank you.* `[θæŋk ju]` 是「謝謝你。」。",
      "*Let's take them to the Lost and Found.* `[lɛts tek ðɛm tu ðə lɔst ænd faʊnd]` 是「我們把它們送到失物招領處吧。」。",
      "*It's my ruler.* `[ɪts maɪ ˋrulɚ]` 是「這是我的尺。」。"
    ]
  },
  {
    "sid": "u3-sent",
    "u": "Unit 3・Possessive Sentences",
    "d": "易",
    "q": "Unit 3 句型：*Thank you.* `[θæŋk ju]` 的中文意思最接近哪一句？",
    "o": [
      "謝謝你。",
      "我們把它們送到失物招領處吧。",
      "這是我的尺。",
      "你會怎麼做？"
    ],
    "a": 0,
    "e": "*Thank you.* `[θæŋk ju]`（謝謝你。） 是「謝謝你。」。",
    "w": [
      "",
      "*Let's take them to the Lost and Found.* `[lɛts tek ðɛm tu ðə lɔst ænd faʊnd]` 是「我們把它們送到失物招領處吧。」。",
      "*It's my ruler.* `[ɪts maɪ ˋrulɚ]` 是「這是我的尺。」。",
      "*What would you do?* `[hwɑt wʊd ju du]` 是「你會怎麼做？」。"
    ]
  },
  {
    "sid": "u3-sent",
    "u": "Unit 3・Possessive Sentences",
    "d": "易",
    "q": "Unit 3 句型：*Let's take them to the Lost and Found.* `[lɛts tek ðɛm tu ðə lɔst ænd faʊnd]` 的中文意思最接近哪一句？",
    "o": [
      "我們把它們送到失物招領處吧。",
      "這是我的尺。",
      "你會怎麼做？",
      "這是你的鉛筆嗎？"
    ],
    "a": 0,
    "e": "*Let's take them to the Lost and Found.* `[lɛts tek ðɛm tu ðə lɔst ænd faʊnd]`（我們把它們送到失物招領處吧。） 是「我們把它們送到失物招領處吧。」。",
    "w": [
      "",
      "*It's my ruler.* `[ɪts maɪ ˋrulɚ]` 是「這是我的尺。」。",
      "*What would you do?* `[hwɑt wʊd ju du]` 是「你會怎麼做？」。",
      "*Is this your pencil?* `[ɪz ðɪs jʊr ˋpɛnsəl]` 是「這是你的鉛筆嗎？」。"
    ]
  },
  {
    "sid": "u3-sent",
    "u": "Unit 3・Possessive Sentences",
    "d": "易",
    "q": "Unit 3 句型：*It's my ruler.* `[ɪts maɪ ˋrulɚ]` 的中文意思最接近哪一句？",
    "o": [
      "這是我的尺。",
      "你會怎麼做？",
      "這是你的鉛筆嗎？",
      "是的。"
    ],
    "a": 0,
    "e": "*It's my ruler.* `[ɪts maɪ ˋrulɚ]`（這是我的尺。） 是「這是我的尺。」。",
    "w": [
      "",
      "*What would you do?* `[hwɑt wʊd ju du]` 是「你會怎麼做？」。",
      "*Is this your pencil?* `[ɪz ðɪs jʊr ˋpɛnsəl]` 是「這是你的鉛筆嗎？」。",
      "*Yes, it is.* `[jɛs ɪt ɪz]` 是「是的。」。"
    ]
  },
  {
    "sid": "u3-sent",
    "u": "Unit 3・Possessive Sentences",
    "d": "易",
    "q": "Unit 3 句型：*What would you do?* `[hwɑt wʊd ju du]` 的中文意思最接近哪一句？",
    "o": [
      "你會怎麼做？",
      "這是你的鉛筆嗎？",
      "是的。",
      "不，不是。"
    ],
    "a": 0,
    "e": "*What would you do?* `[hwɑt wʊd ju du]`（你會怎麼做？） 是「你會怎麼做？」。",
    "w": [
      "",
      "*Is this your pencil?* `[ɪz ðɪs jʊr ˋpɛnsəl]` 是「這是你的鉛筆嗎？」。",
      "*Yes, it is.* `[jɛs ɪt ɪz]` 是「是的。」。",
      "*No, it's not.* `[no ɪts nɑt]` 是「不，不是。」。"
    ]
  },
  {
    "sid": "u3-sent",
    "u": "Unit 3・Possessive Sentences",
    "d": "中",
    "q": "Unit 3 句型：「這是你的鉛筆嗎？」的英文是哪一句？",
    "o": [
      "*Is this your pencil?* `[ɪz ðɪs jʊr ˋpɛnsəl]`",
      "*Yes, it is.* `[jɛs ɪt ɪz]`",
      "*No, it's not.* `[no ɪts nɑt]`",
      "*Is this your eraser?* `[ɪz ðɪs jʊr ɪˋresɚ]`"
    ],
    "a": 0,
    "e": "「這是你的鉛筆嗎？」是 *Is this your pencil?* `[ɪz ðɪs jʊr ˋpɛnsəl]`（這是你的鉛筆嗎？）。",
    "w": [
      "",
      "「是的。」是 *Yes, it is.* `[jɛs ɪt ɪz]`。",
      "「不，不是。」是 *No, it's not.* `[no ɪts nɑt]`。",
      "「這是你的橡皮擦嗎？」是 *Is this your eraser?* `[ɪz ðɪs jʊr ɪˋresɚ]`。"
    ]
  },
  {
    "sid": "u3-sent",
    "u": "Unit 3・Possessive Sentences",
    "d": "中",
    "q": "Unit 3 句型：「是的。」的英文是哪一句？",
    "o": [
      "*Yes, it is.* `[jɛs ɪt ɪz]`",
      "*No, it's not.* `[no ɪts nɑt]`",
      "*Is this your eraser?* `[ɪz ðɪs jʊr ɪˋresɚ]`",
      "*Thank you.* `[θæŋk ju]`"
    ],
    "a": 0,
    "e": "「是的。」是 *Yes, it is.* `[jɛs ɪt ɪz]`（是的。）。",
    "w": [
      "",
      "「不，不是。」是 *No, it's not.* `[no ɪts nɑt]`。",
      "「這是你的橡皮擦嗎？」是 *Is this your eraser?* `[ɪz ðɪs jʊr ɪˋresɚ]`。",
      "「謝謝你。」是 *Thank you.* `[θæŋk ju]`。"
    ]
  },
  {
    "sid": "u3-sent",
    "u": "Unit 3・Possessive Sentences",
    "d": "中",
    "q": "Unit 3 句型：「不，不是。」的英文是哪一句？",
    "o": [
      "*No, it's not.* `[no ɪts nɑt]`",
      "*Is this your eraser?* `[ɪz ðɪs jʊr ɪˋresɚ]`",
      "*Thank you.* `[θæŋk ju]`",
      "*Let's take them to the Lost and Found.* `[lɛts tek ðɛm tu ðə lɔst ænd faʊnd]`"
    ],
    "a": 0,
    "e": "「不，不是。」是 *No, it's not.* `[no ɪts nɑt]`（不，不是。）。",
    "w": [
      "",
      "「這是你的橡皮擦嗎？」是 *Is this your eraser?* `[ɪz ðɪs jʊr ɪˋresɚ]`。",
      "「謝謝你。」是 *Thank you.* `[θæŋk ju]`。",
      "「我們把它們送到失物招領處吧。」是 *Let's take them to the Lost and Found.* `[lɛts tek ðɛm tu ðə lɔst ænd faʊnd]`。"
    ]
  },
  {
    "sid": "u3-sent",
    "u": "Unit 3・Possessive Sentences",
    "d": "中",
    "q": "Unit 3 句型：「這是你的橡皮擦嗎？」的英文是哪一句？",
    "o": [
      "*Is this your eraser?* `[ɪz ðɪs jʊr ɪˋresɚ]`",
      "*Thank you.* `[θæŋk ju]`",
      "*Let's take them to the Lost and Found.* `[lɛts tek ðɛm tu ðə lɔst ænd faʊnd]`",
      "*It's my ruler.* `[ɪts maɪ ˋrulɚ]`"
    ],
    "a": 0,
    "e": "「這是你的橡皮擦嗎？」是 *Is this your eraser?* `[ɪz ðɪs jʊr ɪˋresɚ]`（這是你的橡皮擦嗎？）。",
    "w": [
      "",
      "「謝謝你。」是 *Thank you.* `[θæŋk ju]`。",
      "「我們把它們送到失物招領處吧。」是 *Let's take them to the Lost and Found.* `[lɛts tek ðɛm tu ðə lɔst ænd faʊnd]`。",
      "「這是我的尺。」是 *It's my ruler.* `[ɪts maɪ ˋrulɚ]`。"
    ]
  },
  {
    "sid": "u3-sent",
    "u": "Unit 3・Possessive Sentences",
    "d": "中",
    "q": "Unit 3 句型：「謝謝你。」的英文是哪一句？",
    "o": [
      "*Thank you.* `[θæŋk ju]`",
      "*Let's take them to the Lost and Found.* `[lɛts tek ðɛm tu ðə lɔst ænd faʊnd]`",
      "*It's my ruler.* `[ɪts maɪ ˋrulɚ]`",
      "*What would you do?* `[hwɑt wʊd ju du]`"
    ],
    "a": 0,
    "e": "「謝謝你。」是 *Thank you.* `[θæŋk ju]`（謝謝你。）。",
    "w": [
      "",
      "「我們把它們送到失物招領處吧。」是 *Let's take them to the Lost and Found.* `[lɛts tek ðɛm tu ðə lɔst ænd faʊnd]`。",
      "「這是我的尺。」是 *It's my ruler.* `[ɪts maɪ ˋrulɚ]`。",
      "「你會怎麼做？」是 *What would you do?* `[hwɑt wʊd ju du]`。"
    ]
  },
  {
    "sid": "u3-sent",
    "u": "Unit 3・Possessive Sentences",
    "d": "中",
    "q": "Unit 3 句型：「我們把它們送到失物招領處吧。」的英文是哪一句？",
    "o": [
      "*Let's take them to the Lost and Found.* `[lɛts tek ðɛm tu ðə lɔst ænd faʊnd]`",
      "*It's my ruler.* `[ɪts maɪ ˋrulɚ]`",
      "*What would you do?* `[hwɑt wʊd ju du]`",
      "*Is this your pencil?* `[ɪz ðɪs jʊr ˋpɛnsəl]`"
    ],
    "a": 0,
    "e": "「我們把它們送到失物招領處吧。」是 *Let's take them to the Lost and Found.* `[lɛts tek ðɛm tu ðə lɔst ænd faʊnd]`（我們把它們送到失物招領處吧。）。",
    "w": [
      "",
      "「這是我的尺。」是 *It's my ruler.* `[ɪts maɪ ˋrulɚ]`。",
      "「你會怎麼做？」是 *What would you do?* `[hwɑt wʊd ju du]`。",
      "「這是你的鉛筆嗎？」是 *Is this your pencil?* `[ɪz ðɪs jʊr ˋpɛnsəl]`。"
    ]
  },
  {
    "sid": "u3-sent",
    "u": "Unit 3・Possessive Sentences",
    "d": "中",
    "q": "Unit 3 句型：「這是我的尺。」的英文是哪一句？",
    "o": [
      "*It's my ruler.* `[ɪts maɪ ˋrulɚ]`",
      "*What would you do?* `[hwɑt wʊd ju du]`",
      "*Is this your pencil?* `[ɪz ðɪs jʊr ˋpɛnsəl]`",
      "*Yes, it is.* `[jɛs ɪt ɪz]`"
    ],
    "a": 0,
    "e": "「這是我的尺。」是 *It's my ruler.* `[ɪts maɪ ˋrulɚ]`（這是我的尺。）。",
    "w": [
      "",
      "「你會怎麼做？」是 *What would you do?* `[hwɑt wʊd ju du]`。",
      "「這是你的鉛筆嗎？」是 *Is this your pencil?* `[ɪz ðɪs jʊr ˋpɛnsəl]`。",
      "「是的。」是 *Yes, it is.* `[jɛs ɪt ɪz]`。"
    ]
  },
  {
    "sid": "u3-sent",
    "u": "Unit 3・Possessive Sentences",
    "d": "中",
    "q": "Unit 3 句型：「你會怎麼做？」的英文是哪一句？",
    "o": [
      "*What would you do?* `[hwɑt wʊd ju du]`",
      "*Is this your pencil?* `[ɪz ðɪs jʊr ˋpɛnsəl]`",
      "*Yes, it is.* `[jɛs ɪt ɪz]`",
      "*No, it's not.* `[no ɪts nɑt]`"
    ],
    "a": 0,
    "e": "「你會怎麼做？」是 *What would you do?* `[hwɑt wʊd ju du]`（你會怎麼做？）。",
    "w": [
      "",
      "「這是你的鉛筆嗎？」是 *Is this your pencil?* `[ɪz ðɪs jʊr ˋpɛnsəl]`。",
      "「是的。」是 *Yes, it is.* `[jɛs ɪt ɪz]`。",
      "「不，不是。」是 *No, it's not.* `[no ɪts nɑt]`。"
    ]
  },
  {
    "sid": "u3-daily",
    "u": "Unit 3・Be Honest",
    "d": "易",
    "q": "Unit 3 故事：*What happened?* `[hwɑt ˋhæpənd]` 的中文意思最接近哪一句？",
    "o": [
      "發生了什麼事？",
      "這是你的麥克筆嗎？",
      "讓我幫你。",
      "非常謝謝你。"
    ],
    "a": 0,
    "e": "*What happened?* `[hwɑt ˋhæpənd]`（發生了什麼事？） 是「發生了什麼事？」。",
    "w": [
      "",
      "*Is this your marker?* `[ɪz ðɪs jʊr ˋmɑrkɚ]` 是「這是你的麥克筆嗎？」。",
      "*Let me help you.* `[lɛt mi hɛlp ju]` 是「讓我幫你。」。",
      "*Thank you very much.* `[θæŋk ju ˋvɛri mʌtʃ]` 是「非常謝謝你。」。"
    ]
  },
  {
    "sid": "u3-daily",
    "u": "Unit 3・Be Honest",
    "d": "易",
    "q": "Unit 3 故事：*Is this your marker?* `[ɪz ðɪs jʊr ˋmɑrkɚ]` 的中文意思最接近哪一句？",
    "o": [
      "這是你的麥克筆嗎？",
      "讓我幫你。",
      "非常謝謝你。",
      "太棒了！"
    ],
    "a": 0,
    "e": "*Is this your marker?* `[ɪz ðɪs jʊr ˋmɑrkɚ]`（這是你的麥克筆嗎？） 是「這是你的麥克筆嗎？」。",
    "w": [
      "",
      "*Let me help you.* `[lɛt mi hɛlp ju]` 是「讓我幫你。」。",
      "*Thank you very much.* `[θæŋk ju ˋvɛri mʌtʃ]` 是「非常謝謝你。」。",
      "*Nice!* `[naɪs]` 是「太棒了！」。"
    ]
  },
  {
    "sid": "u3-daily",
    "u": "Unit 3・Be Honest",
    "d": "易",
    "q": "Unit 3 故事：*Let me help you.* `[lɛt mi hɛlp ju]` 的中文意思最接近哪一句？",
    "o": [
      "讓我幫你。",
      "非常謝謝你。",
      "太棒了！",
      "呼！只是一個夢。"
    ],
    "a": 0,
    "e": "*Let me help you.* `[lɛt mi hɛlp ju]`（讓我幫你。） 是「讓我幫你。」。",
    "w": [
      "",
      "*Thank you very much.* `[θæŋk ju ˋvɛri mʌtʃ]` 是「非常謝謝你。」。",
      "*Nice!* `[naɪs]` 是「太棒了！」。",
      "*Phew! It's just a dream.* `[fju ɪts dʒʌst ə drim]` 是「呼！只是一個夢。」。"
    ]
  },
  {
    "sid": "u3-daily",
    "u": "Unit 3・Be Honest",
    "d": "易",
    "q": "Unit 3 故事：*Thank you very much.* `[θæŋk ju ˋvɛri mʌtʃ]` 的中文意思最接近哪一句？",
    "o": [
      "非常謝謝你。",
      "太棒了！",
      "呼！只是一個夢。",
      "這不是你的鉛筆。"
    ],
    "a": 0,
    "e": "*Thank you very much.* `[θæŋk ju ˋvɛri mʌtʃ]`（非常謝謝你。） 是「非常謝謝你。」。",
    "w": [
      "",
      "*Nice!* `[naɪs]` 是「太棒了！」。",
      "*Phew! It's just a dream.* `[fju ɪts dʒʌst ə drim]` 是「呼！只是一個夢。」。",
      "*It's not your pencil.* `[ɪts nɑt jʊr ˋpɛnsəl]` 是「這不是你的鉛筆。」。"
    ]
  },
  {
    "sid": "u3-daily",
    "u": "Unit 3・Be Honest",
    "d": "易",
    "q": "Unit 3 故事：*Nice!* `[naɪs]` 的中文意思最接近哪一句？",
    "o": [
      "太棒了！",
      "呼！只是一個夢。",
      "這不是你的鉛筆。",
      "我喜歡它們。"
    ],
    "a": 0,
    "e": "*Nice!* `[naɪs]`（太棒了！） 是「太棒了！」。",
    "w": [
      "",
      "*Phew! It's just a dream.* `[fju ɪts dʒʌst ə drim]` 是「呼！只是一個夢。」。",
      "*It's not your pencil.* `[ɪts nɑt jʊr ˋpɛnsəl]` 是「這不是你的鉛筆。」。",
      "*I like them.* `[aɪ laɪk ðɛm]` 是「我喜歡它們。」。"
    ]
  },
  {
    "sid": "u3-daily",
    "u": "Unit 3・Be Honest",
    "d": "易",
    "q": "Unit 3 故事：*Phew! It's just a dream.* `[fju ɪts dʒʌst ə drim]` 的中文意思最接近哪一句？",
    "o": [
      "呼！只是一個夢。",
      "這不是你的鉛筆。",
      "我喜歡它們。",
      "發生了什麼事？"
    ],
    "a": 0,
    "e": "*Phew! It's just a dream.* `[fju ɪts dʒʌst ə drim]`（呼！只是一個夢。） 是「呼！只是一個夢。」。",
    "w": [
      "",
      "*It's not your pencil.* `[ɪts nɑt jʊr ˋpɛnsəl]` 是「這不是你的鉛筆。」。",
      "*I like them.* `[aɪ laɪk ðɛm]` 是「我喜歡它們。」。",
      "*What happened?* `[hwɑt ˋhæpənd]` 是「發生了什麼事？」。"
    ]
  },
  {
    "sid": "u3-daily",
    "u": "Unit 3・Be Honest",
    "d": "易",
    "q": "Unit 3 故事：*It's not your pencil.* `[ɪts nɑt jʊr ˋpɛnsəl]` 的中文意思最接近哪一句？",
    "o": [
      "這不是你的鉛筆。",
      "我喜歡它們。",
      "發生了什麼事？",
      "這是你的麥克筆嗎？"
    ],
    "a": 0,
    "e": "*It's not your pencil.* `[ɪts nɑt jʊr ˋpɛnsəl]`（這不是你的鉛筆。） 是「這不是你的鉛筆。」。",
    "w": [
      "",
      "*I like them.* `[aɪ laɪk ðɛm]` 是「我喜歡它們。」。",
      "*What happened?* `[hwɑt ˋhæpənd]` 是「發生了什麼事？」。",
      "*Is this your marker?* `[ɪz ðɪs jʊr ˋmɑrkɚ]` 是「這是你的麥克筆嗎？」。"
    ]
  },
  {
    "sid": "u3-daily",
    "u": "Unit 3・Be Honest",
    "d": "易",
    "q": "Unit 3 故事：*I like them.* `[aɪ laɪk ðɛm]` 的中文意思最接近哪一句？",
    "o": [
      "我喜歡它們。",
      "發生了什麼事？",
      "這是你的麥克筆嗎？",
      "讓我幫你。"
    ],
    "a": 0,
    "e": "*I like them.* `[aɪ laɪk ðɛm]`（我喜歡它們。） 是「我喜歡它們。」。",
    "w": [
      "",
      "*What happened?* `[hwɑt ˋhæpənd]` 是「發生了什麼事？」。",
      "*Is this your marker?* `[ɪz ðɪs jʊr ˋmɑrkɚ]` 是「這是你的麥克筆嗎？」。",
      "*Let me help you.* `[lɛt mi hɛlp ju]` 是「讓我幫你。」。"
    ]
  },
  {
    "sid": "u3-daily",
    "u": "Unit 3・Be Honest",
    "d": "中",
    "q": "Unit 3 故事：「發生了什麼事？」的英文是哪一句？",
    "o": [
      "*What happened?* `[hwɑt ˋhæpənd]`",
      "*Is this your marker?* `[ɪz ðɪs jʊr ˋmɑrkɚ]`",
      "*Let me help you.* `[lɛt mi hɛlp ju]`",
      "*Thank you very much.* `[θæŋk ju ˋvɛri mʌtʃ]`"
    ],
    "a": 0,
    "e": "「發生了什麼事？」是 *What happened?* `[hwɑt ˋhæpənd]`（發生了什麼事？）。",
    "w": [
      "",
      "「這是你的麥克筆嗎？」是 *Is this your marker?* `[ɪz ðɪs jʊr ˋmɑrkɚ]`。",
      "「讓我幫你。」是 *Let me help you.* `[lɛt mi hɛlp ju]`。",
      "「非常謝謝你。」是 *Thank you very much.* `[θæŋk ju ˋvɛri mʌtʃ]`。"
    ]
  },
  {
    "sid": "u3-daily",
    "u": "Unit 3・Be Honest",
    "d": "中",
    "q": "Unit 3 故事：「這是你的麥克筆嗎？」的英文是哪一句？",
    "o": [
      "*Is this your marker?* `[ɪz ðɪs jʊr ˋmɑrkɚ]`",
      "*Let me help you.* `[lɛt mi hɛlp ju]`",
      "*Thank you very much.* `[θæŋk ju ˋvɛri mʌtʃ]`",
      "*Nice!* `[naɪs]`"
    ],
    "a": 0,
    "e": "「這是你的麥克筆嗎？」是 *Is this your marker?* `[ɪz ðɪs jʊr ˋmɑrkɚ]`（這是你的麥克筆嗎？）。",
    "w": [
      "",
      "「讓我幫你。」是 *Let me help you.* `[lɛt mi hɛlp ju]`。",
      "「非常謝謝你。」是 *Thank you very much.* `[θæŋk ju ˋvɛri mʌtʃ]`。",
      "「太棒了！」是 *Nice!* `[naɪs]`。"
    ]
  },
  {
    "sid": "u3-daily",
    "u": "Unit 3・Be Honest",
    "d": "中",
    "q": "Unit 3 故事：「讓我幫你。」的英文是哪一句？",
    "o": [
      "*Let me help you.* `[lɛt mi hɛlp ju]`",
      "*Thank you very much.* `[θæŋk ju ˋvɛri mʌtʃ]`",
      "*Nice!* `[naɪs]`",
      "*Phew! It's just a dream.* `[fju ɪts dʒʌst ə drim]`"
    ],
    "a": 0,
    "e": "「讓我幫你。」是 *Let me help you.* `[lɛt mi hɛlp ju]`（讓我幫你。）。",
    "w": [
      "",
      "「非常謝謝你。」是 *Thank you very much.* `[θæŋk ju ˋvɛri mʌtʃ]`。",
      "「太棒了！」是 *Nice!* `[naɪs]`。",
      "「呼！只是一個夢。」是 *Phew! It's just a dream.* `[fju ɪts dʒʌst ə drim]`。"
    ]
  },
  {
    "sid": "u3-daily",
    "u": "Unit 3・Be Honest",
    "d": "中",
    "q": "Unit 3 故事：「非常謝謝你。」的英文是哪一句？",
    "o": [
      "*Thank you very much.* `[θæŋk ju ˋvɛri mʌtʃ]`",
      "*Nice!* `[naɪs]`",
      "*Phew! It's just a dream.* `[fju ɪts dʒʌst ə drim]`",
      "*It's not your pencil.* `[ɪts nɑt jʊr ˋpɛnsəl]`"
    ],
    "a": 0,
    "e": "「非常謝謝你。」是 *Thank you very much.* `[θæŋk ju ˋvɛri mʌtʃ]`（非常謝謝你。）。",
    "w": [
      "",
      "「太棒了！」是 *Nice!* `[naɪs]`。",
      "「呼！只是一個夢。」是 *Phew! It's just a dream.* `[fju ɪts dʒʌst ə drim]`。",
      "「這不是你的鉛筆。」是 *It's not your pencil.* `[ɪts nɑt jʊr ˋpɛnsəl]`。"
    ]
  },
  {
    "sid": "u3-daily",
    "u": "Unit 3・Be Honest",
    "d": "中",
    "q": "Unit 3 故事：「太棒了！」的英文是哪一句？",
    "o": [
      "*Nice!* `[naɪs]`",
      "*Phew! It's just a dream.* `[fju ɪts dʒʌst ə drim]`",
      "*It's not your pencil.* `[ɪts nɑt jʊr ˋpɛnsəl]`",
      "*I like them.* `[aɪ laɪk ðɛm]`"
    ],
    "a": 0,
    "e": "「太棒了！」是 *Nice!* `[naɪs]`（太棒了！）。",
    "w": [
      "",
      "「呼！只是一個夢。」是 *Phew! It's just a dream.* `[fju ɪts dʒʌst ə drim]`。",
      "「這不是你的鉛筆。」是 *It's not your pencil.* `[ɪts nɑt jʊr ˋpɛnsəl]`。",
      "「我喜歡它們。」是 *I like them.* `[aɪ laɪk ðɛm]`。"
    ]
  },
  {
    "sid": "u3-daily",
    "u": "Unit 3・Be Honest",
    "d": "中",
    "q": "Unit 3 故事：「呼！只是一個夢。」的英文是哪一句？",
    "o": [
      "*Phew! It's just a dream.* `[fju ɪts dʒʌst ə drim]`",
      "*It's not your pencil.* `[ɪts nɑt jʊr ˋpɛnsəl]`",
      "*I like them.* `[aɪ laɪk ðɛm]`",
      "*What happened?* `[hwɑt ˋhæpənd]`"
    ],
    "a": 0,
    "e": "「呼！只是一個夢。」是 *Phew! It's just a dream.* `[fju ɪts dʒʌst ə drim]`（呼！只是一個夢。）。",
    "w": [
      "",
      "「這不是你的鉛筆。」是 *It's not your pencil.* `[ɪts nɑt jʊr ˋpɛnsəl]`。",
      "「我喜歡它們。」是 *I like them.* `[aɪ laɪk ðɛm]`。",
      "「發生了什麼事？」是 *What happened?* `[hwɑt ˋhæpənd]`。"
    ]
  },
  {
    "sid": "u3-daily",
    "u": "Unit 3・Be Honest",
    "d": "中",
    "q": "Unit 3 故事：「這不是你的鉛筆。」的英文是哪一句？",
    "o": [
      "*It's not your pencil.* `[ɪts nɑt jʊr ˋpɛnsəl]`",
      "*I like them.* `[aɪ laɪk ðɛm]`",
      "*What happened?* `[hwɑt ˋhæpənd]`",
      "*Is this your marker?* `[ɪz ðɪs jʊr ˋmɑrkɚ]`"
    ],
    "a": 0,
    "e": "「這不是你的鉛筆。」是 *It's not your pencil.* `[ɪts nɑt jʊr ˋpɛnsəl]`（這不是你的鉛筆。）。",
    "w": [
      "",
      "「我喜歡它們。」是 *I like them.* `[aɪ laɪk ðɛm]`。",
      "「發生了什麼事？」是 *What happened?* `[hwɑt ˋhæpənd]`。",
      "「這是你的麥克筆嗎？」是 *Is this your marker?* `[ɪz ðɪs jʊr ˋmɑrkɚ]`。"
    ]
  },
  {
    "sid": "u3-daily",
    "u": "Unit 3・Be Honest",
    "d": "中",
    "q": "Unit 3 故事：「我喜歡它們。」的英文是哪一句？",
    "o": [
      "*I like them.* `[aɪ laɪk ðɛm]`",
      "*What happened?* `[hwɑt ˋhæpənd]`",
      "*Is this your marker?* `[ɪz ðɪs jʊr ˋmɑrkɚ]`",
      "*Let me help you.* `[lɛt mi hɛlp ju]`"
    ],
    "a": 0,
    "e": "「我喜歡它們。」是 *I like them.* `[aɪ laɪk ðɛm]`（我喜歡它們。）。",
    "w": [
      "",
      "「發生了什麼事？」是 *What happened?* `[hwɑt ˋhæpənd]`。",
      "「這是你的麥克筆嗎？」是 *Is this your marker?* `[ɪz ðɪs jʊr ˋmɑrkɚ]`。",
      "「讓我幫你。」是 *Let me help you.* `[lɛt mi hɛlp ju]`。"
    ]
  },
  {
    "sid": "u4-sent",
    "u": "Unit 4・Where Sentences",
    "d": "易",
    "q": "Unit 4 句型：*Where's the eraser?* `[hwɛrz ði ɪˋresɚ]` 的中文意思最接近哪一句？",
    "o": [
      "橡皮擦在哪裡？",
      "它在椅子下面。",
      "防災包裡有什麼？",
      "這是我的狗。"
    ],
    "a": 0,
    "e": "*Where's the eraser?* `[hwɛrz ði ɪˋresɚ]`（橡皮擦在哪裡？） 是「橡皮擦在哪裡？」。",
    "w": [
      "",
      "*It's under the chair.* `[ɪts ˋʌndɚ ðə tʃɛr]` 是「它在椅子下面。」。",
      "*What's in the go bag?* `[hwɑts ɪn ðə go bæg]` 是「防災包裡有什麼？」。",
      "*This is my dog.* `[ðɪs ɪz maɪ dɔg]` 是「這是我的狗。」。"
    ]
  },
  {
    "sid": "u4-sent",
    "u": "Unit 4・Where Sentences",
    "d": "易",
    "q": "Unit 4 句型：*It's under the chair.* `[ɪts ˋʌndɚ ðə tʃɛr]` 的中文意思最接近哪一句？",
    "o": [
      "它在椅子下面。",
      "防災包裡有什麼？",
      "這是我的狗。",
      "那是你的狗嗎？"
    ],
    "a": 0,
    "e": "*It's under the chair.* `[ɪts ˋʌndɚ ðə tʃɛr]`（它在椅子下面。） 是「它在椅子下面。」。",
    "w": [
      "",
      "*What's in the go bag?* `[hwɑts ɪn ðə go bæg]` 是「防災包裡有什麼？」。",
      "*This is my dog.* `[ðɪs ɪz maɪ dɔg]` 是「這是我的狗。」。",
      "*Is that your dog?* `[ɪz ðæt jʊr dɔg]` 是「那是你的狗嗎？」。"
    ]
  },
  {
    "sid": "u4-sent",
    "u": "Unit 4・Where Sentences",
    "d": "易",
    "q": "Unit 4 句型：*What's in the go bag?* `[hwɑts ɪn ðə go bæg]` 的中文意思最接近哪一句？",
    "o": [
      "防災包裡有什麼？",
      "這是我的狗。",
      "那是你的狗嗎？",
      "它在桌上。"
    ],
    "a": 0,
    "e": "*What's in the go bag?* `[hwɑts ɪn ðə go bæg]`（防災包裡有什麼？） 是「防災包裡有什麼？」。",
    "w": [
      "",
      "*This is my dog.* `[ðɪs ɪz maɪ dɔg]` 是「這是我的狗。」。",
      "*Is that your dog?* `[ɪz ðæt jʊr dɔg]` 是「那是你的狗嗎？」。",
      "*It's on the desk.* `[ɪts ɑn ðə dɛsk]` 是「它在桌上。」。"
    ]
  },
  {
    "sid": "u4-sent",
    "u": "Unit 4・Where Sentences",
    "d": "易",
    "q": "Unit 4 句型：*This is my dog.* `[ðɪs ɪz maɪ dɔg]` 的中文意思最接近哪一句？",
    "o": [
      "這是我的狗。",
      "那是你的狗嗎？",
      "它在桌上。",
      "它在盒子裡。"
    ],
    "a": 0,
    "e": "*This is my dog.* `[ðɪs ɪz maɪ dɔg]`（這是我的狗。） 是「這是我的狗。」。",
    "w": [
      "",
      "*Is that your dog?* `[ɪz ðæt jʊr dɔg]` 是「那是你的狗嗎？」。",
      "*It's on the desk.* `[ɪts ɑn ðə dɛsk]` 是「它在桌上。」。",
      "*It's in the box.* `[ɪts ɪn ðə bɑks]` 是「它在盒子裡。」。"
    ]
  },
  {
    "sid": "u4-sent",
    "u": "Unit 4・Where Sentences",
    "d": "易",
    "q": "Unit 4 句型：*Is that your dog?* `[ɪz ðæt jʊr dɔg]` 的中文意思最接近哪一句？",
    "o": [
      "那是你的狗嗎？",
      "它在桌上。",
      "它在盒子裡。",
      "它在桌子下面。"
    ],
    "a": 0,
    "e": "*Is that your dog?* `[ɪz ðæt jʊr dɔg]`（那是你的狗嗎？） 是「那是你的狗嗎？」。",
    "w": [
      "",
      "*It's on the desk.* `[ɪts ɑn ðə dɛsk]` 是「它在桌上。」。",
      "*It's in the box.* `[ɪts ɪn ðə bɑks]` 是「它在盒子裡。」。",
      "*It's under the desk.* `[ɪts ˋʌndɚ ðə dɛsk]` 是「它在桌子下面。」。"
    ]
  },
  {
    "sid": "u4-sent",
    "u": "Unit 4・Where Sentences",
    "d": "易",
    "q": "Unit 4 句型：*It's on the desk.* `[ɪts ɑn ðə dɛsk]` 的中文意思最接近哪一句？",
    "o": [
      "它在桌上。",
      "它在盒子裡。",
      "它在桌子下面。",
      "橡皮擦在哪裡？"
    ],
    "a": 0,
    "e": "*It's on the desk.* `[ɪts ɑn ðə dɛsk]`（它在桌上。） 是「它在桌上。」。",
    "w": [
      "",
      "*It's in the box.* `[ɪts ɪn ðə bɑks]` 是「它在盒子裡。」。",
      "*It's under the desk.* `[ɪts ˋʌndɚ ðə dɛsk]` 是「它在桌子下面。」。",
      "*Where's the eraser?* `[hwɛrz ði ɪˋresɚ]` 是「橡皮擦在哪裡？」。"
    ]
  },
  {
    "sid": "u4-sent",
    "u": "Unit 4・Where Sentences",
    "d": "易",
    "q": "Unit 4 句型：*It's in the box.* `[ɪts ɪn ðə bɑks]` 的中文意思最接近哪一句？",
    "o": [
      "它在盒子裡。",
      "它在桌子下面。",
      "橡皮擦在哪裡？",
      "它在椅子下面。"
    ],
    "a": 0,
    "e": "*It's in the box.* `[ɪts ɪn ðə bɑks]`（它在盒子裡。） 是「它在盒子裡。」。",
    "w": [
      "",
      "*It's under the desk.* `[ɪts ˋʌndɚ ðə dɛsk]` 是「它在桌子下面。」。",
      "*Where's the eraser?* `[hwɛrz ði ɪˋresɚ]` 是「橡皮擦在哪裡？」。",
      "*It's under the chair.* `[ɪts ˋʌndɚ ðə tʃɛr]` 是「它在椅子下面。」。"
    ]
  },
  {
    "sid": "u4-sent",
    "u": "Unit 4・Where Sentences",
    "d": "易",
    "q": "Unit 4 句型：*It's under the desk.* `[ɪts ˋʌndɚ ðə dɛsk]` 的中文意思最接近哪一句？",
    "o": [
      "它在桌子下面。",
      "橡皮擦在哪裡？",
      "它在椅子下面。",
      "防災包裡有什麼？"
    ],
    "a": 0,
    "e": "*It's under the desk.* `[ɪts ˋʌndɚ ðə dɛsk]`（它在桌子下面。） 是「它在桌子下面。」。",
    "w": [
      "",
      "*Where's the eraser?* `[hwɛrz ði ɪˋresɚ]` 是「橡皮擦在哪裡？」。",
      "*It's under the chair.* `[ɪts ˋʌndɚ ðə tʃɛr]` 是「它在椅子下面。」。",
      "*What's in the go bag?* `[hwɑts ɪn ðə go bæg]` 是「防災包裡有什麼？」。"
    ]
  },
  {
    "sid": "u4-sent",
    "u": "Unit 4・Where Sentences",
    "d": "中",
    "q": "Unit 4 句型：「橡皮擦在哪裡？」的英文是哪一句？",
    "o": [
      "*Where's the eraser?* `[hwɛrz ði ɪˋresɚ]`",
      "*It's under the chair.* `[ɪts ˋʌndɚ ðə tʃɛr]`",
      "*What's in the go bag?* `[hwɑts ɪn ðə go bæg]`",
      "*This is my dog.* `[ðɪs ɪz maɪ dɔg]`"
    ],
    "a": 0,
    "e": "「橡皮擦在哪裡？」是 *Where's the eraser?* `[hwɛrz ði ɪˋresɚ]`（橡皮擦在哪裡？）。",
    "w": [
      "",
      "「它在椅子下面。」是 *It's under the chair.* `[ɪts ˋʌndɚ ðə tʃɛr]`。",
      "「防災包裡有什麼？」是 *What's in the go bag?* `[hwɑts ɪn ðə go bæg]`。",
      "「這是我的狗。」是 *This is my dog.* `[ðɪs ɪz maɪ dɔg]`。"
    ]
  },
  {
    "sid": "u4-sent",
    "u": "Unit 4・Where Sentences",
    "d": "中",
    "q": "Unit 4 句型：「它在椅子下面。」的英文是哪一句？",
    "o": [
      "*It's under the chair.* `[ɪts ˋʌndɚ ðə tʃɛr]`",
      "*What's in the go bag?* `[hwɑts ɪn ðə go bæg]`",
      "*This is my dog.* `[ðɪs ɪz maɪ dɔg]`",
      "*Is that your dog?* `[ɪz ðæt jʊr dɔg]`"
    ],
    "a": 0,
    "e": "「它在椅子下面。」是 *It's under the chair.* `[ɪts ˋʌndɚ ðə tʃɛr]`（它在椅子下面。）。",
    "w": [
      "",
      "「防災包裡有什麼？」是 *What's in the go bag?* `[hwɑts ɪn ðə go bæg]`。",
      "「這是我的狗。」是 *This is my dog.* `[ðɪs ɪz maɪ dɔg]`。",
      "「那是你的狗嗎？」是 *Is that your dog?* `[ɪz ðæt jʊr dɔg]`。"
    ]
  },
  {
    "sid": "u4-sent",
    "u": "Unit 4・Where Sentences",
    "d": "中",
    "q": "Unit 4 句型：「防災包裡有什麼？」的英文是哪一句？",
    "o": [
      "*What's in the go bag?* `[hwɑts ɪn ðə go bæg]`",
      "*This is my dog.* `[ðɪs ɪz maɪ dɔg]`",
      "*Is that your dog?* `[ɪz ðæt jʊr dɔg]`",
      "*It's on the desk.* `[ɪts ɑn ðə dɛsk]`"
    ],
    "a": 0,
    "e": "「防災包裡有什麼？」是 *What's in the go bag?* `[hwɑts ɪn ðə go bæg]`（防災包裡有什麼？）。",
    "w": [
      "",
      "「這是我的狗。」是 *This is my dog.* `[ðɪs ɪz maɪ dɔg]`。",
      "「那是你的狗嗎？」是 *Is that your dog?* `[ɪz ðæt jʊr dɔg]`。",
      "「它在桌上。」是 *It's on the desk.* `[ɪts ɑn ðə dɛsk]`。"
    ]
  },
  {
    "sid": "u4-sent",
    "u": "Unit 4・Where Sentences",
    "d": "中",
    "q": "Unit 4 句型：「這是我的狗。」的英文是哪一句？",
    "o": [
      "*This is my dog.* `[ðɪs ɪz maɪ dɔg]`",
      "*Is that your dog?* `[ɪz ðæt jʊr dɔg]`",
      "*It's on the desk.* `[ɪts ɑn ðə dɛsk]`",
      "*It's in the box.* `[ɪts ɪn ðə bɑks]`"
    ],
    "a": 0,
    "e": "「這是我的狗。」是 *This is my dog.* `[ðɪs ɪz maɪ dɔg]`（這是我的狗。）。",
    "w": [
      "",
      "「那是你的狗嗎？」是 *Is that your dog?* `[ɪz ðæt jʊr dɔg]`。",
      "「它在桌上。」是 *It's on the desk.* `[ɪts ɑn ðə dɛsk]`。",
      "「它在盒子裡。」是 *It's in the box.* `[ɪts ɪn ðə bɑks]`。"
    ]
  },
  {
    "sid": "u4-sent",
    "u": "Unit 4・Where Sentences",
    "d": "中",
    "q": "Unit 4 句型：「那是你的狗嗎？」的英文是哪一句？",
    "o": [
      "*Is that your dog?* `[ɪz ðæt jʊr dɔg]`",
      "*It's on the desk.* `[ɪts ɑn ðə dɛsk]`",
      "*It's in the box.* `[ɪts ɪn ðə bɑks]`",
      "*It's under the desk.* `[ɪts ˋʌndɚ ðə dɛsk]`"
    ],
    "a": 0,
    "e": "「那是你的狗嗎？」是 *Is that your dog?* `[ɪz ðæt jʊr dɔg]`（那是你的狗嗎？）。",
    "w": [
      "",
      "「它在桌上。」是 *It's on the desk.* `[ɪts ɑn ðə dɛsk]`。",
      "「它在盒子裡。」是 *It's in the box.* `[ɪts ɪn ðə bɑks]`。",
      "「它在桌子下面。」是 *It's under the desk.* `[ɪts ˋʌndɚ ðə dɛsk]`。"
    ]
  },
  {
    "sid": "u4-sent",
    "u": "Unit 4・Where Sentences",
    "d": "中",
    "q": "Unit 4 句型：「它在桌上。」的英文是哪一句？",
    "o": [
      "*It's on the desk.* `[ɪts ɑn ðə dɛsk]`",
      "*It's in the box.* `[ɪts ɪn ðə bɑks]`",
      "*It's under the desk.* `[ɪts ˋʌndɚ ðə dɛsk]`",
      "*Where's the eraser?* `[hwɛrz ði ɪˋresɚ]`"
    ],
    "a": 0,
    "e": "「它在桌上。」是 *It's on the desk.* `[ɪts ɑn ðə dɛsk]`（它在桌上。）。",
    "w": [
      "",
      "「它在盒子裡。」是 *It's in the box.* `[ɪts ɪn ðə bɑks]`。",
      "「它在桌子下面。」是 *It's under the desk.* `[ɪts ˋʌndɚ ðə dɛsk]`。",
      "「橡皮擦在哪裡？」是 *Where's the eraser?* `[hwɛrz ði ɪˋresɚ]`。"
    ]
  },
  {
    "sid": "u4-sent",
    "u": "Unit 4・Where Sentences",
    "d": "中",
    "q": "Unit 4 句型：「它在盒子裡。」的英文是哪一句？",
    "o": [
      "*It's in the box.* `[ɪts ɪn ðə bɑks]`",
      "*It's under the desk.* `[ɪts ˋʌndɚ ðə dɛsk]`",
      "*Where's the eraser?* `[hwɛrz ði ɪˋresɚ]`",
      "*It's under the chair.* `[ɪts ˋʌndɚ ðə tʃɛr]`"
    ],
    "a": 0,
    "e": "「它在盒子裡。」是 *It's in the box.* `[ɪts ɪn ðə bɑks]`（它在盒子裡。）。",
    "w": [
      "",
      "「它在桌子下面。」是 *It's under the desk.* `[ɪts ˋʌndɚ ðə dɛsk]`。",
      "「橡皮擦在哪裡？」是 *Where's the eraser?* `[hwɛrz ði ɪˋresɚ]`。",
      "「它在椅子下面。」是 *It's under the chair.* `[ɪts ˋʌndɚ ðə tʃɛr]`。"
    ]
  },
  {
    "sid": "u4-sent",
    "u": "Unit 4・Where Sentences",
    "d": "中",
    "q": "Unit 4 句型：「它在桌子下面。」的英文是哪一句？",
    "o": [
      "*It's under the desk.* `[ɪts ˋʌndɚ ðə dɛsk]`",
      "*Where's the eraser?* `[hwɛrz ði ɪˋresɚ]`",
      "*It's under the chair.* `[ɪts ˋʌndɚ ðə tʃɛr]`",
      "*What's in the go bag?* `[hwɑts ɪn ðə go bæg]`"
    ],
    "a": 0,
    "e": "「它在桌子下面。」是 *It's under the desk.* `[ɪts ˋʌndɚ ðə dɛsk]`（它在桌子下面。）。",
    "w": [
      "",
      "「橡皮擦在哪裡？」是 *Where's the eraser?* `[hwɛrz ði ɪˋresɚ]`。",
      "「它在椅子下面。」是 *It's under the chair.* `[ɪts ˋʌndɚ ðə tʃɛr]`。",
      "「防災包裡有什麼？」是 *What's in the go bag?* `[hwɑts ɪn ðə go bæg]`。"
    ]
  },
  {
    "sid": "u4-daily",
    "u": "Unit 4・Earthquake Drill",
    "d": "易",
    "q": "Unit 4 故事：*Earthquake! Please take cover.* `[ˋɝθˏkwek pliz tek ˋkʌvɚ]` 的中文意思最接近哪一句？",
    "o": [
      "地震！請掩護。",
      "到桌子下面。",
      "不！不是在桌上。",
      "該出去了。"
    ],
    "a": 0,
    "e": "*Earthquake! Please take cover.* `[ˋɝθˏkwek pliz tek ˋkʌvɚ]`（地震！請掩護。） 是「地震！請掩護。」。",
    "w": [
      "",
      "*Get under the desk.* `[gɛt ˋʌndɚ ðə dɛsk]` 是「到桌子下面。」。",
      "*No! Not on the desk.* `[no nɑt ɑn ðə dɛsk]` 是「不！不是在桌上。」。",
      "*Time to get out.* `[taɪm tu gɛt aʊt]` 是「該出去了。」。"
    ]
  },
  {
    "sid": "u4-daily",
    "u": "Unit 4・Earthquake Drill",
    "d": "易",
    "q": "Unit 4 故事：*Get under the desk.* `[gɛt ˋʌndɚ ðə dɛsk]` 的中文意思最接近哪一句？",
    "o": [
      "到桌子下面。",
      "不！不是在桌上。",
      "該出去了。",
      "我的書包在哪裡？"
    ],
    "a": 0,
    "e": "*Get under the desk.* `[gɛt ˋʌndɚ ðə dɛsk]`（到桌子下面。） 是「到桌子下面。」。",
    "w": [
      "",
      "*No! Not on the desk.* `[no nɑt ɑn ðə dɛsk]` 是「不！不是在桌上。」。",
      "*Time to get out.* `[taɪm tu gɛt aʊt]` 是「該出去了。」。",
      "*Where's my schoolbag?* `[hwɛrz maɪ ˋskulˏbæg]` 是「我的書包在哪裡？」。"
    ]
  },
  {
    "sid": "u4-daily",
    "u": "Unit 4・Earthquake Drill",
    "d": "易",
    "q": "Unit 4 故事：*No! Not on the desk.* `[no nɑt ɑn ðə dɛsk]` 的中文意思最接近哪一句？",
    "o": [
      "不！不是在桌上。",
      "該出去了。",
      "我的書包在哪裡？",
      "我在這裡。"
    ],
    "a": 0,
    "e": "*No! Not on the desk.* `[no nɑt ɑn ðə dɛsk]`（不！不是在桌上。） 是「不！不是在桌上。」。",
    "w": [
      "",
      "*Time to get out.* `[taɪm tu gɛt aʊt]` 是「該出去了。」。",
      "*Where's my schoolbag?* `[hwɛrz maɪ ˋskulˏbæg]` 是「我的書包在哪裡？」。",
      "*I'm here.* `[aɪm hɪr]` 是「我在這裡。」。"
    ]
  },
  {
    "sid": "u4-daily",
    "u": "Unit 4・Earthquake Drill",
    "d": "易",
    "q": "Unit 4 故事：*Time to get out.* `[taɪm tu gɛt aʊt]` 的中文意思最接近哪一句？",
    "o": [
      "該出去了。",
      "我的書包在哪裡？",
      "我在這裡。",
      "小心！"
    ],
    "a": 0,
    "e": "*Time to get out.* `[taɪm tu gɛt aʊt]`（該出去了。） 是「該出去了。」。",
    "w": [
      "",
      "*Where's my schoolbag?* `[hwɛrz maɪ ˋskulˏbæg]` 是「我的書包在哪裡？」。",
      "*I'm here.* `[aɪm hɪr]` 是「我在這裡。」。",
      "*Watch out!* `[wɑtʃ aʊt]` 是「小心！」。"
    ]
  },
  {
    "sid": "u4-daily",
    "u": "Unit 4・Earthquake Drill",
    "d": "易",
    "q": "Unit 4 故事：*Where's my schoolbag?* `[hwɛrz maɪ ˋskulˏbæg]` 的中文意思最接近哪一句？",
    "o": [
      "我的書包在哪裡？",
      "我在這裡。",
      "小心！",
      "請幫我一下。"
    ],
    "a": 0,
    "e": "*Where's my schoolbag?* `[hwɛrz maɪ ˋskulˏbæg]`（我的書包在哪裡？） 是「我的書包在哪裡？」。",
    "w": [
      "",
      "*I'm here.* `[aɪm hɪr]` 是「我在這裡。」。",
      "*Watch out!* `[wɑtʃ aʊt]` 是「小心！」。",
      "*Give me a hand, please.* `[gɪv mi ə hænd pliz]` 是「請幫我一下。」。"
    ]
  },
  {
    "sid": "u4-daily",
    "u": "Unit 4・Earthquake Drill",
    "d": "易",
    "q": "Unit 4 故事：*I'm here.* `[aɪm hɪr]` 的中文意思最接近哪一句？",
    "o": [
      "我在這裡。",
      "小心！",
      "請幫我一下。",
      "波卡在哪裡？"
    ],
    "a": 0,
    "e": "*I'm here.* `[aɪm hɪr]`（我在這裡。） 是「我在這裡。」。",
    "w": [
      "",
      "*Watch out!* `[wɑtʃ aʊt]` 是「小心！」。",
      "*Give me a hand, please.* `[gɪv mi ə hænd pliz]` 是「請幫我一下。」。",
      "*Where's Boka?* `[hwɛrz ˋbokə]` 是「波卡在哪裡？」。"
    ]
  },
  {
    "sid": "u4-daily",
    "u": "Unit 4・Earthquake Drill",
    "d": "易",
    "q": "Unit 4 故事：*Watch out!* `[wɑtʃ aʊt]` 的中文意思最接近哪一句？",
    "o": [
      "小心！",
      "請幫我一下。",
      "波卡在哪裡？",
      "一、二、三！"
    ],
    "a": 0,
    "e": "*Watch out!* `[wɑtʃ aʊt]`（小心！） 是「小心！」。",
    "w": [
      "",
      "*Give me a hand, please.* `[gɪv mi ə hænd pliz]` 是「請幫我一下。」。",
      "*Where's Boka?* `[hwɛrz ˋbokə]` 是「波卡在哪裡？」。",
      "*One, two, three!* `[wʌn tu θri]` 是「一、二、三！」。"
    ]
  },
  {
    "sid": "u4-daily",
    "u": "Unit 4・Earthquake Drill",
    "d": "易",
    "q": "Unit 4 故事：*Give me a hand, please.* `[gɪv mi ə hænd pliz]` 的中文意思最接近哪一句？",
    "o": [
      "請幫我一下。",
      "波卡在哪裡？",
      "一、二、三！",
      "地震！請掩護。"
    ],
    "a": 0,
    "e": "*Give me a hand, please.* `[gɪv mi ə hænd pliz]`（請幫我一下。） 是「請幫我一下。」。",
    "w": [
      "",
      "*Where's Boka?* `[hwɛrz ˋbokə]` 是「波卡在哪裡？」。",
      "*One, two, three!* `[wʌn tu θri]` 是「一、二、三！」。",
      "*Earthquake! Please take cover.* `[ˋɝθˏkwek pliz tek ˋkʌvɚ]` 是「地震！請掩護。」。"
    ]
  },
  {
    "sid": "u4-daily",
    "u": "Unit 4・Earthquake Drill",
    "d": "易",
    "q": "Unit 4 故事：*Where's Boka?* `[hwɛrz ˋbokə]` 的中文意思最接近哪一句？",
    "o": [
      "波卡在哪裡？",
      "一、二、三！",
      "地震！請掩護。",
      "到桌子下面。"
    ],
    "a": 0,
    "e": "*Where's Boka?* `[hwɛrz ˋbokə]`（波卡在哪裡？） 是「波卡在哪裡？」。",
    "w": [
      "",
      "*One, two, three!* `[wʌn tu θri]` 是「一、二、三！」。",
      "*Earthquake! Please take cover.* `[ˋɝθˏkwek pliz tek ˋkʌvɚ]` 是「地震！請掩護。」。",
      "*Get under the desk.* `[gɛt ˋʌndɚ ðə dɛsk]` 是「到桌子下面。」。"
    ]
  },
  {
    "sid": "u4-daily",
    "u": "Unit 4・Earthquake Drill",
    "d": "易",
    "q": "Unit 4 故事：*One, two, three!* `[wʌn tu θri]` 的中文意思最接近哪一句？",
    "o": [
      "一、二、三！",
      "地震！請掩護。",
      "到桌子下面。",
      "不！不是在桌上。"
    ],
    "a": 0,
    "e": "*One, two, three!* `[wʌn tu θri]`（一、二、三！） 是「一、二、三！」。",
    "w": [
      "",
      "*Earthquake! Please take cover.* `[ˋɝθˏkwek pliz tek ˋkʌvɚ]` 是「地震！請掩護。」。",
      "*Get under the desk.* `[gɛt ˋʌndɚ ðə dɛsk]` 是「到桌子下面。」。",
      "*No! Not on the desk.* `[no nɑt ɑn ðə dɛsk]` 是「不！不是在桌上。」。"
    ]
  },
  {
    "sid": "u4-daily",
    "u": "Unit 4・Earthquake Drill",
    "d": "中",
    "q": "Unit 4 故事：「地震！請掩護。」的英文是哪一句？",
    "o": [
      "*Earthquake! Please take cover.* `[ˋɝθˏkwek pliz tek ˋkʌvɚ]`",
      "*Get under the desk.* `[gɛt ˋʌndɚ ðə dɛsk]`",
      "*No! Not on the desk.* `[no nɑt ɑn ðə dɛsk]`",
      "*Time to get out.* `[taɪm tu gɛt aʊt]`"
    ],
    "a": 0,
    "e": "「地震！請掩護。」是 *Earthquake! Please take cover.* `[ˋɝθˏkwek pliz tek ˋkʌvɚ]`（地震！請掩護。）。",
    "w": [
      "",
      "「到桌子下面。」是 *Get under the desk.* `[gɛt ˋʌndɚ ðə dɛsk]`。",
      "「不！不是在桌上。」是 *No! Not on the desk.* `[no nɑt ɑn ðə dɛsk]`。",
      "「該出去了。」是 *Time to get out.* `[taɪm tu gɛt aʊt]`。"
    ]
  },
  {
    "sid": "u4-daily",
    "u": "Unit 4・Earthquake Drill",
    "d": "中",
    "q": "Unit 4 故事：「到桌子下面。」的英文是哪一句？",
    "o": [
      "*Get under the desk.* `[gɛt ˋʌndɚ ðə dɛsk]`",
      "*No! Not on the desk.* `[no nɑt ɑn ðə dɛsk]`",
      "*Time to get out.* `[taɪm tu gɛt aʊt]`",
      "*Where's my schoolbag?* `[hwɛrz maɪ ˋskulˏbæg]`"
    ],
    "a": 0,
    "e": "「到桌子下面。」是 *Get under the desk.* `[gɛt ˋʌndɚ ðə dɛsk]`（到桌子下面。）。",
    "w": [
      "",
      "「不！不是在桌上。」是 *No! Not on the desk.* `[no nɑt ɑn ðə dɛsk]`。",
      "「該出去了。」是 *Time to get out.* `[taɪm tu gɛt aʊt]`。",
      "「我的書包在哪裡？」是 *Where's my schoolbag?* `[hwɛrz maɪ ˋskulˏbæg]`。"
    ]
  },
  {
    "sid": "u4-daily",
    "u": "Unit 4・Earthquake Drill",
    "d": "中",
    "q": "Unit 4 故事：「不！不是在桌上。」的英文是哪一句？",
    "o": [
      "*No! Not on the desk.* `[no nɑt ɑn ðə dɛsk]`",
      "*Time to get out.* `[taɪm tu gɛt aʊt]`",
      "*Where's my schoolbag?* `[hwɛrz maɪ ˋskulˏbæg]`",
      "*I'm here.* `[aɪm hɪr]`"
    ],
    "a": 0,
    "e": "「不！不是在桌上。」是 *No! Not on the desk.* `[no nɑt ɑn ðə dɛsk]`（不！不是在桌上。）。",
    "w": [
      "",
      "「該出去了。」是 *Time to get out.* `[taɪm tu gɛt aʊt]`。",
      "「我的書包在哪裡？」是 *Where's my schoolbag?* `[hwɛrz maɪ ˋskulˏbæg]`。",
      "「我在這裡。」是 *I'm here.* `[aɪm hɪr]`。"
    ]
  },
  {
    "sid": "u4-daily",
    "u": "Unit 4・Earthquake Drill",
    "d": "中",
    "q": "Unit 4 故事：「該出去了。」的英文是哪一句？",
    "o": [
      "*Time to get out.* `[taɪm tu gɛt aʊt]`",
      "*Where's my schoolbag?* `[hwɛrz maɪ ˋskulˏbæg]`",
      "*I'm here.* `[aɪm hɪr]`",
      "*Watch out!* `[wɑtʃ aʊt]`"
    ],
    "a": 0,
    "e": "「該出去了。」是 *Time to get out.* `[taɪm tu gɛt aʊt]`（該出去了。）。",
    "w": [
      "",
      "「我的書包在哪裡？」是 *Where's my schoolbag?* `[hwɛrz maɪ ˋskulˏbæg]`。",
      "「我在這裡。」是 *I'm here.* `[aɪm hɪr]`。",
      "「小心！」是 *Watch out!* `[wɑtʃ aʊt]`。"
    ]
  },
  {
    "sid": "u4-daily",
    "u": "Unit 4・Earthquake Drill",
    "d": "中",
    "q": "Unit 4 故事：「我的書包在哪裡？」的英文是哪一句？",
    "o": [
      "*Where's my schoolbag?* `[hwɛrz maɪ ˋskulˏbæg]`",
      "*I'm here.* `[aɪm hɪr]`",
      "*Watch out!* `[wɑtʃ aʊt]`",
      "*Give me a hand, please.* `[gɪv mi ə hænd pliz]`"
    ],
    "a": 0,
    "e": "「我的書包在哪裡？」是 *Where's my schoolbag?* `[hwɛrz maɪ ˋskulˏbæg]`（我的書包在哪裡？）。",
    "w": [
      "",
      "「我在這裡。」是 *I'm here.* `[aɪm hɪr]`。",
      "「小心！」是 *Watch out!* `[wɑtʃ aʊt]`。",
      "「請幫我一下。」是 *Give me a hand, please.* `[gɪv mi ə hænd pliz]`。"
    ]
  },
  {
    "sid": "u4-daily",
    "u": "Unit 4・Earthquake Drill",
    "d": "中",
    "q": "Unit 4 故事：「我在這裡。」的英文是哪一句？",
    "o": [
      "*I'm here.* `[aɪm hɪr]`",
      "*Watch out!* `[wɑtʃ aʊt]`",
      "*Give me a hand, please.* `[gɪv mi ə hænd pliz]`",
      "*Where's Boka?* `[hwɛrz ˋbokə]`"
    ],
    "a": 0,
    "e": "「我在這裡。」是 *I'm here.* `[aɪm hɪr]`（我在這裡。）。",
    "w": [
      "",
      "「小心！」是 *Watch out!* `[wɑtʃ aʊt]`。",
      "「請幫我一下。」是 *Give me a hand, please.* `[gɪv mi ə hænd pliz]`。",
      "「波卡在哪裡？」是 *Where's Boka?* `[hwɛrz ˋbokə]`。"
    ]
  },
  {
    "sid": "u4-daily",
    "u": "Unit 4・Earthquake Drill",
    "d": "中",
    "q": "Unit 4 故事：「小心！」的英文是哪一句？",
    "o": [
      "*Watch out!* `[wɑtʃ aʊt]`",
      "*Give me a hand, please.* `[gɪv mi ə hænd pliz]`",
      "*Where's Boka?* `[hwɛrz ˋbokə]`",
      "*One, two, three!* `[wʌn tu θri]`"
    ],
    "a": 0,
    "e": "「小心！」是 *Watch out!* `[wɑtʃ aʊt]`（小心！）。",
    "w": [
      "",
      "「請幫我一下。」是 *Give me a hand, please.* `[gɪv mi ə hænd pliz]`。",
      "「波卡在哪裡？」是 *Where's Boka?* `[hwɛrz ˋbokə]`。",
      "「一、二、三！」是 *One, two, three!* `[wʌn tu θri]`。"
    ]
  },
  {
    "sid": "u4-daily",
    "u": "Unit 4・Earthquake Drill",
    "d": "中",
    "q": "Unit 4 故事：「請幫我一下。」的英文是哪一句？",
    "o": [
      "*Give me a hand, please.* `[gɪv mi ə hænd pliz]`",
      "*Where's Boka?* `[hwɛrz ˋbokə]`",
      "*One, two, three!* `[wʌn tu θri]`",
      "*Earthquake! Please take cover.* `[ˋɝθˏkwek pliz tek ˋkʌvɚ]`"
    ],
    "a": 0,
    "e": "「請幫我一下。」是 *Give me a hand, please.* `[gɪv mi ə hænd pliz]`（請幫我一下。）。",
    "w": [
      "",
      "「波卡在哪裡？」是 *Where's Boka?* `[hwɛrz ˋbokə]`。",
      "「一、二、三！」是 *One, two, three!* `[wʌn tu θri]`。",
      "「地震！請掩護。」是 *Earthquake! Please take cover.* `[ˋɝθˏkwek pliz tek ˋkʌvɚ]`。"
    ]
  },
  {
    "sid": "u4-daily",
    "u": "Unit 4・Earthquake Drill",
    "d": "中",
    "q": "Unit 4 故事：「波卡在哪裡？」的英文是哪一句？",
    "o": [
      "*Where's Boka?* `[hwɛrz ˋbokə]`",
      "*One, two, three!* `[wʌn tu θri]`",
      "*Earthquake! Please take cover.* `[ˋɝθˏkwek pliz tek ˋkʌvɚ]`",
      "*Get under the desk.* `[gɛt ˋʌndɚ ðə dɛsk]`"
    ],
    "a": 0,
    "e": "「波卡在哪裡？」是 *Where's Boka?* `[hwɛrz ˋbokə]`（波卡在哪裡？）。",
    "w": [
      "",
      "「一、二、三！」是 *One, two, three!* `[wʌn tu θri]`。",
      "「地震！請掩護。」是 *Earthquake! Please take cover.* `[ˋɝθˏkwek pliz tek ˋkʌvɚ]`。",
      "「到桌子下面。」是 *Get under the desk.* `[gɛt ˋʌndɚ ðə dɛsk]`。"
    ]
  },
  {
    "sid": "u4-daily",
    "u": "Unit 4・Earthquake Drill",
    "d": "中",
    "q": "Unit 4 故事：「一、二、三！」的英文是哪一句？",
    "o": [
      "*One, two, three!* `[wʌn tu θri]`",
      "*Earthquake! Please take cover.* `[ˋɝθˏkwek pliz tek ˋkʌvɚ]`",
      "*Get under the desk.* `[gɛt ˋʌndɚ ðə dɛsk]`",
      "*No! Not on the desk.* `[no nɑt ɑn ðə dɛsk]`"
    ],
    "a": 0,
    "e": "「一、二、三！」是 *One, two, three!* `[wʌn tu θri]`（一、二、三！）。",
    "w": [
      "",
      "「地震！請掩護。」是 *Earthquake! Please take cover.* `[ˋɝθˏkwek pliz tek ˋkʌvɚ]`。",
      "「到桌子下面。」是 *Get under the desk.* `[gɛt ˋʌndɚ ðə dɛsk]`。",
      "「不！不是在桌上。」是 *No! Not on the desk.* `[no nɑt ɑn ðə dɛsk]`。"
    ]
  },
  {
    "sid": "review1-teen-ty",
    "u": "Review 1・-teen / -ty",
    "d": "易",
    "q": "Review 1：*thirteen* `[ˏθɝˋtin]` 是哪一個數字？",
    "o": [
      "13",
      "30",
      "14",
      "15"
    ],
    "a": 0,
    "e": "*thirteen* 是 13。",
    "w": [
      "",
      "*thirty* 是 30。",
      "*fourteen* 是 14。",
      "*fifteen* 是 15。"
    ]
  },
  {
    "sid": "review1-teen-ty",
    "u": "Review 1・-teen / -ty",
    "d": "易",
    "q": "Review 1：*thirty* `[ˋθɝti]` 是哪一個數字？",
    "o": [
      "30",
      "13",
      "40",
      "50"
    ],
    "a": 0,
    "e": "*thirty* 是 30。",
    "w": [
      "",
      "*thirteen* 是 13。",
      "*forty* 是 40。",
      "*fifty* 是 50。"
    ]
  },
  {
    "sid": "review1-teen-ty",
    "u": "Review 1・-teen / -ty",
    "d": "中",
    "q": "Review 1：*fifteen* 和 *fifty* 分別是多少？",
    "o": [
      "15、50",
      "50、15",
      "5、15",
      "15、5"
    ],
    "a": 0,
    "e": "*fifteen* 是 15，*fifty* 是 50。",
    "w": [
      "",
      "這兩個字的順序顛倒了。",
      "*five* 是 5，不是 15。",
      "*five* 是 5，不是 50。"
    ]
  },
  {
    "sid": "review1-teen-ty",
    "u": "Review 1・-teen / -ty",
    "d": "易",
    "q": "Review 1：*forty* `[ˋfɔrti]` 是哪一個數字？",
    "o": [
      "40",
      "14",
      "4",
      "44"
    ],
    "a": 0,
    "e": "*forty* 是 40。",
    "w": [
      "",
      "*fourteen* 是 14。",
      "*four* 是 4。",
      "*forty-four* 是 44。"
    ]
  },
  {
    "sid": "review1-teen-ty",
    "u": "Review 1・-teen / -ty",
    "d": "易",
    "q": "Review 1：*fourteen* `[ˏfɔrˋtin]` 是哪一個數字？",
    "o": [
      "14",
      "40",
      "4",
      "24"
    ],
    "a": 0,
    "e": "*fourteen* 是 14。",
    "w": [
      "",
      "*forty* 是 40。",
      "*four* 是 4。",
      "*twenty-four* 是 24。"
    ]
  },
  {
    "sid": "review1-teen-ty",
    "u": "Review 1・-teen / -ty",
    "d": "中",
    "q": "Review 1：哪一個字是「17」？",
    "o": [
      "*seventeen* `[ˏsɛvənˋtin]`",
      "*seventy* `[ˋsɛvənti]`",
      "*seven* `[ˋsɛvən]`",
      "*seventh* `[ˋsɛvənθ]`"
    ],
    "a": 0,
    "e": "*seventeen* 是 17。",
    "w": [
      "",
      "*seventy* 是 70。",
      "*seven* 是 7。",
      "*seventh* 是「第七」。"
    ]
  },
  {
    "sid": "review1-teen-ty",
    "u": "Review 1・-teen / -ty",
    "d": "中",
    "q": "Review 1：哪一個字是「70」？",
    "o": [
      "*seventy* `[ˋsɛvənti]`",
      "*seventeen* `[ˏsɛvənˋtin]`",
      "*seven* `[ˋsɛvən]`",
      "*seventh* `[ˋsɛvənθ]`"
    ],
    "a": 0,
    "e": "*seventy* 是 70。",
    "w": [
      "",
      "*seventeen* 是 17。",
      "*seven* 是 7。",
      "*seventh* 是「第七」。"
    ]
  },
  {
    "sid": "review1-teen-ty",
    "u": "Review 1・-teen / -ty",
    "d": "中",
    "q": "Review 1：哪一個字的字尾是「-ty」？",
    "o": [
      "*sixty* `[ˋsɪksti]`",
      "*sixteen* `[ˏsɪksˋtin]`",
      "*six* `[sɪks]`",
      "*sixth* `[sɪksθ]`"
    ],
    "a": 0,
    "e": "*sixty* 的字尾是 -ty，表示 60。",
    "w": [
      "",
      "*sixteen* 的字尾是 -teen。",
      "*six* 沒有 -ty 字尾。",
      "*sixth* 是「第六」。"
    ]
  },
  {
    "sid": "review1-teen-ty",
    "u": "Review 1・-teen / -ty",
    "d": "中",
    "q": "Review 1：數一數：twenty, thirty, ___, fifty.",
    "o": [
      "*forty* `[ˋfɔrti]`",
      "*fourteen* `[ˏfɔrˋtin]`",
      "*four* `[fɔr]`",
      "*fifty* `[ˋfɪfti]`"
    ],
    "a": 0,
    "e": "二十、三十、四十、五十，所以是 *forty*。",
    "w": [
      "",
      "*fourteen* 是 14。",
      "*four* 是 4。",
      "*fifty* 已經出現在題目最後。"
    ]
  },
  {
    "sid": "review1-teen-ty",
    "u": "Review 1・-teen / -ty",
    "d": "易",
    "q": "Review 1：哪一個字是「十八」？",
    "o": [
      "*eighteen* `[eˋtin]`",
      "*eighty* `[ˋeti]`",
      "*eight* `[et]`",
      "*eighteenth* `[eˋtinθ]`"
    ],
    "a": 0,
    "e": "*eighteen* 是 18。",
    "w": [
      "",
      "*eighty* 是 80。",
      "*eight* 是 8。",
      "*eighteenth* 是「第十八」。"
    ]
  },
  {
    "sid": "review2-syllables",
    "u": "Review 2・Syllables",
    "d": "易",
    "q": "Review 2：*box* `[bɑks]` 有幾個音節？",
    "o": [
      "1 個",
      "2 個",
      "3 個",
      "4 個"
    ],
    "a": 0,
    "e": "*box* 有 1 個音節。",
    "w": [
      "",
      "box 只有一個母音音節。",
      "box 只有一個母音音節。",
      "box 只有一個母音音節。"
    ]
  },
  {
    "sid": "review2-syllables",
    "u": "Review 2・Syllables",
    "d": "易",
    "q": "Review 2：*under* `[ˋʌndɚ]` 有幾個音節？",
    "o": [
      "2 個",
      "1 個",
      "3 個",
      "4 個"
    ],
    "a": 0,
    "e": "*under* 有 2 個音節（un-der）。",
    "w": [
      "",
      "under 可以分成 un-der 兩個音節。",
      "under 只有兩個音節。",
      "under 只有兩個音節。"
    ]
  },
  {
    "sid": "review2-syllables",
    "u": "Review 2・Syllables",
    "d": "中",
    "q": "Review 2：*octopus* `[ˋɑktəpəs]` 有幾個音節？",
    "o": [
      "3 個",
      "1 個",
      "2 個",
      "4 個"
    ],
    "a": 0,
    "e": "*octopus* 有 3 個音節（oc-to-pus）。",
    "w": [
      "",
      "octopus 有三個音節。",
      "octopus 有三個音節。",
      "octopus 只有三個音節。"
    ]
  },
  {
    "sid": "review2-syllables",
    "u": "Review 2・Syllables",
    "d": "中",
    "q": "Review 2：*umbrella* `[ʌmˋbrɛlə]` 有幾個音節？",
    "o": [
      "3 個",
      "1 個",
      "2 個",
      "4 個"
    ],
    "a": 0,
    "e": "*umbrella* 有 3 個音節（um-brel-la）。",
    "w": [
      "",
      "umbrella 有三個音節。",
      "umbrella 有三個音節。",
      "umbrella 只有三個音節。"
    ]
  },
  {
    "sid": "review2-syllables",
    "u": "Review 2・Syllables",
    "d": "易",
    "q": "Review 2：*ruler* `[ˋrulɚ]` 有幾個音節？",
    "o": [
      "2 個",
      "1 個",
      "3 個",
      "4 個"
    ],
    "a": 0,
    "e": "*ruler* 有 2 個音節（ru-ler）。",
    "w": [
      "",
      "ruler 可以分成 ru-ler 兩個音節。",
      "ruler 只有兩個音節。",
      "ruler 只有兩個音節。"
    ]
  },
  {
    "sid": "review2-syllables",
    "u": "Review 2・Syllables",
    "d": "中",
    "q": "Review 2：*eraser* `[ɪˋresɚ]` 有幾個音節？",
    "o": [
      "3 個",
      "1 個",
      "2 個",
      "4 個"
    ],
    "a": 0,
    "e": "*eraser* 有 3 個音節（e-ra-ser）。",
    "w": [
      "",
      "eraser 有三個音節。",
      "eraser 有三個音節。",
      "eraser 只有三個音節。"
    ]
  },
  {
    "sid": "review2-syllables",
    "u": "Review 2・Syllables",
    "d": "易",
    "q": "Review 2：哪一個字有 1 個音節？",
    "o": [
      "*desk* `[dɛsk]`",
      "*under* `[ˋʌndɚ]`",
      "*marker* `[ˋmɑrkɚ]`",
      "*octopus* `[ˋɑktəpəs]`"
    ],
    "a": 0,
    "e": "*desk* 有 1 個音節。",
    "w": [
      "",
      "*under* 有 2 個音節。",
      "*marker* 有 2 個音節。",
      "*octopus* 有 3 個音節。"
    ]
  },
  {
    "sid": "review2-syllables",
    "u": "Review 2・Syllables",
    "d": "中",
    "q": "Review 2：哪一個字有 2 個音節？",
    "o": [
      "*pencil* `[ˋpɛnsəl]`",
      "*box* `[bɑks]`",
      "*umbrella* `[ʌmˋbrɛlə]`",
      "*octopus* `[ˋɑktəpəs]`"
    ],
    "a": 0,
    "e": "*pencil* 有 2 個音節（pen-cil）。",
    "w": [
      "",
      "*box* 有 1 個音節。",
      "*umbrella* 有 3 個音節。",
      "*octopus* 有 3 個音節。"
    ]
  },
  {
    "sid": "review2-syllables",
    "u": "Review 2・Syllables",
    "d": "中",
    "q": "Review 2：哪一個字有 3 個音節？",
    "o": [
      "*umbrella* `[ʌmˋbrɛlə]`",
      "*box* `[bɑks]`",
      "*ruler* `[ˋrulɚ]`",
      "*desk* `[dɛsk]`"
    ],
    "a": 0,
    "e": "*umbrella* 有 3 個音節。",
    "w": [
      "",
      "*box* 有 1 個音節。",
      "*ruler* 有 2 個音節。",
      "*desk* 有 1 個音節。"
    ]
  },
  {
    "sid": "review2-syllables",
    "u": "Review 2・Syllables",
    "d": "難",
    "q": "Review 2：哪一組音節數配對正確？",
    "o": [
      "*box*（1）、*under*（2）、*octopus*（3）",
      "*box*（2）、*under*（1）、*octopus*（3）",
      "*box*（1）、*under*（3）、*octopus*（2）",
      "*box*（3）、*under*（2）、*octopus*（1）"
    ],
    "a": 0,
    "e": "box＝1、under＝2、octopus＝3。",
    "w": [
      "",
      "box 是 1 個音節，under 是 2 個。",
      "under 是 2 個，octopus 是 3 個。",
      "box 是 1 個，octopus 是 3 個。"
    ]
  },
  {
    "sid": "classroom-characters",
    "u": "Classroom English & Characters",
    "d": "易",
    "q": "教室用語：*Be quiet.* `[bi ˋkwaɪət]` 是什麼意思？",
    "o": [
      "請安靜",
      "請說話",
      "請排隊",
      "請回家"
    ],
    "a": 0,
    "e": "*Be quiet.* 是「請安靜」。",
    "w": [
      "",
      "*Be quiet.* 是安靜，不是說話。",
      "排隊是 *Line up.*",
      "回家是 *Go home.*"
    ]
  },
  {
    "sid": "classroom-characters",
    "u": "Classroom English & Characters",
    "d": "易",
    "q": "教室用語：*Please turn to page 12.* `[pliz tɝn tu pedʒ twɛlv]` 是什麼意思？",
    "o": [
      "請翻到第 12 頁",
      "請寫第 12 頁",
      "請看黑板",
      "請坐下"
    ],
    "a": 0,
    "e": "*Please turn to page 12.* 是「請翻到第 12 頁」。",
    "w": [
      "",
      "*turn to* 是翻到，不是寫。",
      "看黑板是 *Look at the blackboard.*",
      "坐下是 *Sit down.*"
    ]
  },
  {
    "sid": "classroom-characters",
    "u": "Classroom English & Characters",
    "d": "易",
    "q": "教室用語：*Raise your hand.* `[rez jʊr hænd]` 是什麼意思？",
    "o": [
      "舉手",
      "放下手",
      "拍手",
      "握手"
    ],
    "a": 0,
    "e": "*Raise your hand.* 是「舉手」。",
    "w": [
      "",
      "放下手是 *Put down your hand.*",
      "拍手是 *clap*。",
      "握手是 *shake hands*。"
    ]
  },
  {
    "sid": "classroom-characters",
    "u": "Classroom English & Characters",
    "d": "易",
    "q": "教室用語：*Put down your hand.* `[pʊt daʊn jʊr hænd]` 是什麼意思？",
    "o": [
      "把手放下",
      "舉手",
      "手牽手",
      "把手洗乾淨"
    ],
    "a": 0,
    "e": "*Put down your hand.* 是「把手放下」。",
    "w": [
      "",
      "舉手是 *Raise your hand.*",
      "手牽手是 *hold hands*。",
      "洗手是 *wash your hands*。"
    ]
  },
  {
    "sid": "classroom-characters",
    "u": "Classroom English & Characters",
    "d": "中",
    "q": "教室用語：*Go back to your seat.* `[go bæk tu jʊr sit]` 是什麼意思？",
    "o": [
      "回到你的座位",
      "去操場",
      "站起來",
      "離開教室"
    ],
    "a": 0,
    "e": "*Go back to your seat.* 是「回到你的座位」。",
    "w": [
      "",
      "操場是 *playground*。",
      "站起來是 *Stand up.*",
      "離開教室是 *leave the classroom*。"
    ]
  },
  {
    "sid": "classroom-characters",
    "u": "Classroom English & Characters",
    "d": "中",
    "q": "教室用語：*Show me your homework.* `[ʃo mi jʊr ˋhomˏwɝk]` 是什麼意思？",
    "o": [
      "給我看你的作業",
      "幫我寫作業",
      "把作業收起來",
      "去問老師作業"
    ],
    "a": 0,
    "e": "*Show me your homework.* 是「給我看你的作業」。",
    "w": [
      "",
      "幫我寫作業是 *help me do my homework*。",
      "收起來是 *put away*。",
      "問老師是 *ask the teacher*。"
    ]
  },
  {
    "sid": "classroom-characters",
    "u": "Classroom English & Characters",
    "d": "中",
    "q": "教室用語：*Repeat after me.* `[rɪˋpit ˋæftɚ mi]` 是什麼意思？",
    "o": [
      "跟著我念",
      "再試一次",
      "跟我走",
      "聽我說"
    ],
    "a": 0,
    "e": "*Repeat after me.* 是「跟著我念」。",
    "w": [
      "",
      "再試一次是 *Try again.*",
      "跟我走是 *Follow me.*",
      "聽我說可以說 *Listen to me.*"
    ]
  },
  {
    "sid": "classroom-characters",
    "u": "Classroom English & Characters",
    "d": "中",
    "q": "教室用語：*Louder, please.* `[ˋlaʊdɚ pliz]` 是什麼意思？",
    "o": [
      "請大聲一點",
      "請小聲一點",
      "請快一點",
      "請慢一點"
    ],
    "a": 0,
    "e": "*Louder, please.* 是「請大聲一點」。",
    "w": [
      "",
      "小聲是 *quieter*。",
      "快一點是 *Hurry up.*",
      "慢一點是 *Slower, please.*"
    ]
  },
  {
    "sid": "classroom-characters",
    "u": "Classroom English & Characters",
    "d": "易",
    "q": "教室用語：*Who's she?* 的答句是哪一句？",
    "o": [
      "*She's Amy.* `[ʃiz ˋemi]`",
      "*He's Amy.*",
      "*She's Kevin.*",
      "*He's Kevin.*"
    ],
    "a": 0,
    "e": "*Who's she?* 問「她是誰？」，答句用 *She's Amy.*。",
    "w": [
      "",
      "問 *she* 要用 *she* 回答。",
      "Kevin 是男生名字，要用 *he*。",
      "題目問 *she*，不是 *he*。"
    ]
  },
  {
    "sid": "classroom-characters",
    "u": "Classroom English & Characters",
    "d": "易",
    "q": "教室用語：*Who's he?* 的答句是哪一句？",
    "o": [
      "*He's Kevin.* `[hiz ˋkɛvɪn]`",
      "*She's Kevin.*",
      "*He's Amy.*",
      "*She's Amy.*"
    ],
    "a": 0,
    "e": "*Who's he?* 問「他是誰？」，答句用 *He's Kevin.*。",
    "w": [
      "",
      "Kevin 是男生，要用 *he*。",
      "Amy 是女生，要用 *she*。",
      "題目問 *he*，不是 *she*。"
    ]
  },
  {
    "sid": "classroom-characters",
    "u": "Classroom English & Characters",
    "d": "中",
    "q": "教室用語：*She can't fly.* `[ʃi kænt flaɪ]` 是什麼意思？",
    "o": [
      "她不會飛",
      "她會飛",
      "她不會唱歌",
      "她會唱歌"
    ],
    "a": 0,
    "e": "*She can't fly.* 是「她不會飛」。",
    "w": [
      "",
      "這句有 *can't*，表示不會。",
      "唱歌是 *sing*，不是 *fly*。",
      "這句是 *fly*，不是 *sing*。"
    ]
  },
  {
    "sid": "classroom-characters",
    "u": "Classroom English & Characters",
    "d": "中",
    "q": "教室用語：*He can sing.* `[hi kæn sɪŋ]` 是什麼意思？",
    "o": [
      "他會唱歌",
      "他不會唱歌",
      "他會飛",
      "他不會飛"
    ],
    "a": 0,
    "e": "*He can sing.* 是「他會唱歌」。",
    "w": [
      "",
      "這句是 *can*，表示會。",
      "飛是 *fly*，不是 *sing*。",
      "這句是 *sing*，不是 *fly*。"
    ]
  },
  {
    "sid": "world-picture",
    "u": "Picture Dictionary & Around the World",
    "d": "易",
    "q": "世界文化：Picture Dictionary：哪一個是天氣字？",
    "o": [
      "*cloudy* `[ˋklaʊdi]`",
      "*marker* `[ˋmɑrkɚ]`",
      "*desk* `[dɛsk]`",
      "*ruler* `[ˋrulɚ]`"
    ],
    "a": 0,
    "e": "*cloudy* 是天氣字，意思是「多雲的」。",
    "w": [
      "",
      "*marker* 是麥克筆。",
      "*desk* 是書桌。",
      "*ruler* 是尺。"
    ]
  },
  {
    "sid": "world-picture",
    "u": "Picture Dictionary & Around the World",
    "d": "易",
    "q": "世界文化：Picture Dictionary：哪一個是文具字？",
    "o": [
      "*eraser* `[ɪˋresɚ]`",
      "*rainy* `[ˋreni]`",
      "*under* `[ˋʌndɚ]`",
      "*chair* `[tʃɛr]`"
    ],
    "a": 0,
    "e": "*eraser* 是文具，意思是「橡皮擦」。",
    "w": [
      "",
      "*rainy* 是天氣字。",
      "*under* 是位置字。",
      "*chair* 是家具。"
    ]
  },
  {
    "sid": "world-picture",
    "u": "Picture Dictionary & Around the World",
    "d": "易",
    "q": "世界文化：Picture Dictionary：哪一個是位置字？",
    "o": [
      "*under* `[ˋʌndɚ]`",
      "*sunny* `[ˋsʌni]`",
      "*pen* `[pɛn]`",
      "*ghost* `[gost]`"
    ],
    "a": 0,
    "e": "*under* 是位置字，意思是「在……下面」。",
    "w": [
      "",
      "*sunny* 是天氣字。",
      "*pen* 是文具。",
      "*ghost* 是萬聖節角色。"
    ]
  },
  {
    "sid": "world-picture",
    "u": "Picture Dictionary & Around the World",
    "d": "中",
    "q": "世界文化：*Big Ben* 在哪裡？",
    "o": [
      "英國倫敦",
      "美國紐約",
      "日本",
      "臺灣"
    ],
    "a": 0,
    "e": "*Big Ben* 在英國倫敦。",
    "w": [
      "",
      "*Grand Central Station Clock* 在紐約。",
      "*Cosmo Clock 21* 在日本。",
      "Big Ben 不在臺灣。"
    ]
  },
  {
    "sid": "world-picture",
    "u": "Picture Dictionary & Around the World",
    "d": "中",
    "q": "世界文化：*Grand Central Station Clock* 在哪裡？",
    "o": [
      "美國紐約",
      "英國倫敦",
      "日本",
      "臺灣"
    ],
    "a": 0,
    "e": "*Grand Central Station Clock* 在美國紐約。",
    "w": [
      "",
      "*Big Ben* 在倫敦。",
      "*Cosmo Clock 21* 在日本。",
      "這個鐘不在臺灣。"
    ]
  },
  {
    "sid": "world-picture",
    "u": "Picture Dictionary & Around the World",
    "d": "中",
    "q": "世界文化：*Cosmo Clock 21* 在哪裡？",
    "o": [
      "日本",
      "英國倫敦",
      "美國紐約",
      "臺灣"
    ],
    "a": 0,
    "e": "*Cosmo Clock 21* 在日本。",
    "w": [
      "",
      "*Big Ben* 在倫敦。",
      "*Grand Central Station Clock* 在紐約。",
      "這個鐘不在臺灣。"
    ]
  },
  {
    "sid": "world-picture",
    "u": "Picture Dictionary & Around the World",
    "d": "中",
    "q": "世界文化：*cuckoo clock* 裡有什麼？",
    "o": [
      "一隻鳥",
      "一隻狗",
      "一隻貓",
      "一條魚"
    ],
    "a": 0,
    "e": "*cuckoo clock* 是有鳥的鐘。",
    "w": [
      "",
      "狗是 *dog*，不是 cuckoo。",
      "貓是 *cat*。",
      "魚是 *fish*。"
    ]
  },
  {
    "sid": "world-picture",
    "u": "Picture Dictionary & Around the World",
    "d": "中",
    "q": "世界文化：*It's eleven twenty-six.* 是幾點？",
    "o": [
      "11:26",
      "11:36",
      "12:26",
      "11:20"
    ],
    "a": 0,
    "e": "*eleven twenty-six* 是 11 點 26 分。",
    "w": [
      "",
      "*twenty-six* 是 26 分，不是 36 分。",
      "*eleven* 是 11 點，不是 12 點。",
      "*twenty-six* 是 26 分，不是 20 分。"
    ]
  },
  {
    "sid": "world-picture",
    "u": "Picture Dictionary & Around the World",
    "d": "易",
    "q": "世界文化：Word Hunt：哪一個字是「萬聖節」？",
    "o": [
      "*Halloween* `[ˏhæloˋin]`",
      "*earthquake* `[ˋɝθˏkwek]`",
      "*weather* `[ˋwɛðɚ]`",
      "*marker* `[ˋmɑrkɚ]`"
    ],
    "a": 0,
    "e": "*Halloween* 是萬聖節。",
    "w": [
      "",
      "*earthquake* 是地震。",
      "*weather* 是天氣。",
      "*marker* 是麥克筆。"
    ]
  },
  {
    "sid": "world-picture",
    "u": "Picture Dictionary & Around the World",
    "d": "易",
    "q": "世界文化：Word Hunt：哪一個字是「地震」？",
    "o": [
      "*earthquake* `[ˋɝθˏkwek]`",
      "*Halloween* `[ˏhæloˋin]`",
      "*mudslide* `[ˋmʌdˏslaɪd]`",
      "*fire* `[faɪr]`"
    ],
    "a": 0,
    "e": "*earthquake* 是地震。",
    "w": [
      "",
      "*Halloween* 是萬聖節。",
      "*mudslide* 是土石流。",
      "*fire* 是火災。"
    ]
  },
  {
    "sid": "review-family-animals",
    "u": "Vocabulary Review・Family & Animals",
    "d": "易",
    "q": "複習・家庭與動物：「祖父」的英文是哪一個？",
    "o": [
      "*grandfather* `[ˋgrænˏfɑðɚ]`",
      "*grandmother* `[ˋgrænˏmʌðɚ]`",
      "*father* `[ˋfɑðɚ]`",
      "*brother* `[ˋbrʌðɚ]`"
    ],
    "a": 0,
    "e": "「祖父」是 *grandfather*。",
    "w": [
      "",
      "*grandmother* 是祖母。",
      "*father* 是爸爸。",
      "*brother* 是兄弟。"
    ]
  },
  {
    "sid": "review-family-animals",
    "u": "Vocabulary Review・Family & Animals",
    "d": "易",
    "q": "複習・家庭與動物：「祖母」的英文是哪一個？",
    "o": [
      "*grandmother* `[ˋgrænˏmʌðɚ]`",
      "*grandfather* `[ˋgrænˏfɑðɚ]`",
      "*mother* `[ˋmʌðɚ]`",
      "*sister* `[ˋsɪstɚ]`"
    ],
    "a": 0,
    "e": "「祖母」是 *grandmother*。",
    "w": [
      "",
      "*grandfather* 是祖父。",
      "*mother* 是媽媽。",
      "*sister* 是姊妹。"
    ]
  },
  {
    "sid": "review-family-animals",
    "u": "Vocabulary Review・Family & Animals",
    "d": "易",
    "q": "複習・家庭與動物：「爸爸」的英文是哪一個？",
    "o": [
      "*father* `[ˋfɑðɚ]`",
      "*mother* `[ˋmʌðɚ]`",
      "*grandfather* `[ˋgrænˏfɑðɚ]`",
      "*brother* `[ˋbrʌðɚ]`"
    ],
    "a": 0,
    "e": "「爸爸」是 *father*。",
    "w": [
      "",
      "*mother* 是媽媽。",
      "*grandfather* 是祖父。",
      "*brother* 是兄弟。"
    ]
  },
  {
    "sid": "review-family-animals",
    "u": "Vocabulary Review・Family & Animals",
    "d": "易",
    "q": "複習・家庭與動物：「媽媽」的英文是哪一個？",
    "o": [
      "*mother* `[ˋmʌðɚ]`",
      "*father* `[ˋfɑðɚ]`",
      "*grandmother* `[ˋgrænˏmʌðɚ]`",
      "*sister* `[ˋsɪstɚ]`"
    ],
    "a": 0,
    "e": "「媽媽」是 *mother*。",
    "w": [
      "",
      "*father* 是爸爸。",
      "*grandmother* 是祖母。",
      "*sister* 是姊妹。"
    ]
  },
  {
    "sid": "review-family-animals",
    "u": "Vocabulary Review・Family & Animals",
    "d": "易",
    "q": "複習・家庭與動物：「兄弟」的英文是哪一個？",
    "o": [
      "*brother* `[ˋbrʌðɚ]`",
      "*sister* `[ˋsɪstɚ]`",
      "*father* `[ˋfɑðɚ]`",
      "*me* `[mi]`"
    ],
    "a": 0,
    "e": "「兄弟」是 *brother*。",
    "w": [
      "",
      "*sister* 是姊妹。",
      "*father* 是爸爸。",
      "*me* 是「我」。"
    ]
  },
  {
    "sid": "review-family-animals",
    "u": "Vocabulary Review・Family & Animals",
    "d": "易",
    "q": "複習・家庭與動物：「姊妹」的英文是哪一個？",
    "o": [
      "*sister* `[ˋsɪstɚ]`",
      "*brother* `[ˋbrʌðɚ]`",
      "*mother* `[ˋmʌðɚ]`",
      "*me* `[mi]`"
    ],
    "a": 0,
    "e": "「姊妹」是 *sister*。",
    "w": [
      "",
      "*brother* 是兄弟。",
      "*mother* 是媽媽。",
      "*me* 是「我」。"
    ]
  },
  {
    "sid": "review-family-animals",
    "u": "Vocabulary Review・Family & Animals",
    "d": "中",
    "q": "複習・家庭與動物：「我」（當受詞，例如 *Give me a hand.*）的英文是哪一個？",
    "o": [
      "*me* `[mi]`",
      "*I* `[aɪ]`",
      "*my* `[maɪ]`",
      "*we* `[wi]`"
    ],
    "a": 0,
    "e": "受詞「我」是 *me*。",
    "w": [
      "",
      "*I* 是主詞「我」。",
      "*my* 是「我的」。",
      "*we* 是「我們」。"
    ]
  },
  {
    "sid": "review-family-animals",
    "u": "Vocabulary Review・Family & Animals",
    "d": "易",
    "q": "複習・家庭與動物：「鳥」的英文是哪一個？",
    "o": [
      "*bird* `[bɝd]`",
      "*cat* `[kæt]`",
      "*dog* `[dɔg]`",
      "*frog* `[frɔg]`"
    ],
    "a": 0,
    "e": "「鳥」是 *bird*。",
    "w": [
      "",
      "*cat* 是貓。",
      "*dog* 是狗。",
      "*frog* 是青蛙。"
    ]
  },
  {
    "sid": "review-family-animals",
    "u": "Vocabulary Review・Family & Animals",
    "d": "易",
    "q": "複習・家庭與動物：「貓」的英文是哪一個？",
    "o": [
      "*cat* `[kæt]`",
      "*dog* `[dɔg]`",
      "*rabbit* `[ˋræbɪt]`",
      "*bird* `[bɝd]`"
    ],
    "a": 0,
    "e": "「貓」是 *cat*。",
    "w": [
      "",
      "*dog* 是狗。",
      "*rabbit* 是兔子。",
      "*bird* 是鳥。"
    ]
  },
  {
    "sid": "review-family-animals",
    "u": "Vocabulary Review・Family & Animals",
    "d": "易",
    "q": "複習・家庭與動物：「狗」的英文是哪一個？",
    "o": [
      "*dog* `[dɔg]`",
      "*cat* `[kæt]`",
      "*ox* `[ɑks]`",
      "*frog* `[frɔg]`"
    ],
    "a": 0,
    "e": "「狗」是 *dog*。",
    "w": [
      "",
      "*cat* 是貓。",
      "*ox* 是公牛。",
      "*frog* 是青蛙。"
    ]
  },
  {
    "sid": "review-family-animals",
    "u": "Vocabulary Review・Family & Animals",
    "d": "易",
    "q": "複習・家庭與動物：「青蛙」的英文是哪一個？",
    "o": [
      "*frog* `[frɔg]`",
      "*rabbit* `[ˋræbɪt]`",
      "*bird* `[bɝd]`",
      "*cat* `[kæt]`"
    ],
    "a": 0,
    "e": "「青蛙」是 *frog*。",
    "w": [
      "",
      "*rabbit* 是兔子。",
      "*bird* 是鳥。",
      "*cat* 是貓。"
    ]
  },
  {
    "sid": "review-family-animals",
    "u": "Vocabulary Review・Family & Animals",
    "d": "易",
    "q": "複習・家庭與動物：「兔子」的英文是哪一個？",
    "o": [
      "*rabbit* `[ˋræbɪt]`",
      "*frog* `[frɔg]`",
      "*dog* `[dɔg]`",
      "*ox* `[ɑks]`"
    ],
    "a": 0,
    "e": "「兔子」是 *rabbit*。",
    "w": [
      "",
      "*frog* 是青蛙。",
      "*dog* 是狗。",
      "*ox* 是公牛。"
    ]
  },
  {
    "sid": "review-family-animals",
    "u": "Vocabulary Review・Family & Animals",
    "d": "易",
    "q": "複習・家庭與動物：「公牛」的英文是哪一個？",
    "o": [
      "*ox* `[ɑks]`",
      "*dog* `[dɔg]`",
      "*cat* `[kæt]`",
      "*rabbit* `[ˋræbɪt]`"
    ],
    "a": 0,
    "e": "「公牛」是 *ox*。",
    "w": [
      "",
      "*dog* 是狗。",
      "*cat* 是貓。",
      "*rabbit* 是兔子。"
    ]
  },
  {
    "sid": "review-family-animals",
    "u": "Vocabulary Review・Family & Animals",
    "d": "中",
    "q": "複習・家庭與動物：*Who's she?* 的答句是哪一句？",
    "o": [
      "*She's my mother.* `[ʃiz maɪ ˋmʌðɚ]`",
      "*He's my mother.*",
      "*She's my father.*",
      "*He's my father.*"
    ],
    "a": 0,
    "e": "*Who's she?* 問「她是誰？」，答句用 *She's my mother.*。",
    "w": [
      "",
      "mother 是女性，要用 *she*。",
      "father 是男性，要用 *he*。",
      "題目問 *she*，不是 *he*。"
    ]
  },
  {
    "sid": "review-family-animals",
    "u": "Vocabulary Review・Family & Animals",
    "d": "中",
    "q": "複習・家庭與動物：*Is it a cat?* 看到的是狗，答句是哪一句？",
    "o": [
      "*No, it's not. It's a dog.*",
      "*Yes, it is. It's a dog.*",
      "*No, it's a cat.*",
      "*Yes, it's a cat.*"
    ],
    "a": 0,
    "e": "不是貓，是狗，所以答 *No, it's not. It's a dog.*。",
    "w": [
      "",
      "*Yes* 表示是貓，前後矛盾。",
      "看到的是狗，不是貓。",
      "看到的是狗，不是貓。"
    ]
  },
  {
    "sid": "review-jobs-abilities",
    "u": "Vocabulary Review・Jobs & Abilities",
    "d": "易",
    "q": "複習・職業與能力：「廚師」的英文是哪一個？",
    "o": [
      "*cook* `[kʊk]`",
      "*doctor* `[ˋdɑktɚ]`",
      "*nurse* `[nɝs]`",
      "*teacher* `[ˋtitʃɚ]`"
    ],
    "a": 0,
    "e": "「廚師」是 *cook*。",
    "w": [
      "",
      "*doctor* 是醫生。",
      "*nurse* 是護士。",
      "*teacher* 是老師。"
    ]
  },
  {
    "sid": "review-jobs-abilities",
    "u": "Vocabulary Review・Jobs & Abilities",
    "d": "易",
    "q": "複習・職業與能力：「醫生」的英文是哪一個？",
    "o": [
      "*doctor* `[ˋdɑktɚ]`",
      "*nurse* `[nɝs]`",
      "*cook* `[kʊk]`",
      "*student* `[ˋstudnt]`"
    ],
    "a": 0,
    "e": "「醫生」是 *doctor*。",
    "w": [
      "",
      "*nurse* 是護士。",
      "*cook* 是廚師。",
      "*student* 是學生。"
    ]
  },
  {
    "sid": "review-jobs-abilities",
    "u": "Vocabulary Review・Jobs & Abilities",
    "d": "易",
    "q": "複習・職業與能力：「護士」的英文是哪一個？",
    "o": [
      "*nurse* `[nɝs]`",
      "*doctor* `[ˋdɑktɚ]`",
      "*teacher* `[ˋtitʃɚ]`",
      "*cook* `[kʊk]`"
    ],
    "a": 0,
    "e": "「護士」是 *nurse*。",
    "w": [
      "",
      "*doctor* 是醫生。",
      "*teacher* 是老師。",
      "*cook* 是廚師。"
    ]
  },
  {
    "sid": "review-jobs-abilities",
    "u": "Vocabulary Review・Jobs & Abilities",
    "d": "易",
    "q": "複習・職業與能力：「學生」的英文是哪一個？",
    "o": [
      "*student* `[ˋstudnt]`",
      "*teacher* `[ˋtitʃɚ]`",
      "*doctor* `[ˋdɑktɚ]`",
      "*nurse* `[nɝs]`"
    ],
    "a": 0,
    "e": "「學生」是 *student*。",
    "w": [
      "",
      "*teacher* 是老師。",
      "*doctor* 是醫生。",
      "*nurse* 是護士。"
    ]
  },
  {
    "sid": "review-jobs-abilities",
    "u": "Vocabulary Review・Jobs & Abilities",
    "d": "易",
    "q": "複習・職業與能力：「老師」的英文是哪一個？",
    "o": [
      "*teacher* `[ˋtitʃɚ]`",
      "*student* `[ˋstudnt]`",
      "*cook* `[kʊk]`",
      "*doctor* `[ˋdɑktɚ]`"
    ],
    "a": 0,
    "e": "「老師」是 *teacher*。",
    "w": [
      "",
      "*student* 是學生。",
      "*cook* 是廚師。",
      "*doctor* 是醫生。"
    ]
  },
  {
    "sid": "review-jobs-abilities",
    "u": "Vocabulary Review・Jobs & Abilities",
    "d": "易",
    "q": "複習・職業與能力：「跳舞」的英文是哪一個？",
    "o": [
      "*dance* `[dæns]`",
      "*draw* `[drɔ]`",
      "*sing* `[sɪŋ]`",
      "*swim* `[swɪm]`"
    ],
    "a": 0,
    "e": "「跳舞」是 *dance*。",
    "w": [
      "",
      "*draw* 是畫畫。",
      "*sing* 是唱歌。",
      "*swim* 是游泳。"
    ]
  },
  {
    "sid": "review-jobs-abilities",
    "u": "Vocabulary Review・Jobs & Abilities",
    "d": "易",
    "q": "複習・職業與能力：「畫畫」的英文是哪一個？",
    "o": [
      "*draw* `[drɔ]`",
      "*sing* `[sɪŋ]`",
      "*dance* `[dæns]`",
      "*fly a kite* `[flaɪ ə kaɪt]`"
    ],
    "a": 0,
    "e": "「畫畫」是 *draw*。",
    "w": [
      "",
      "*sing* 是唱歌。",
      "*dance* 是跳舞。",
      "*fly a kite* 是放風箏。"
    ]
  },
  {
    "sid": "review-jobs-abilities",
    "u": "Vocabulary Review・Jobs & Abilities",
    "d": "易",
    "q": "複習・職業與能力：「唱歌」的英文是哪一個？",
    "o": [
      "*sing* `[sɪŋ]`",
      "*dance* `[dæns]`",
      "*draw* `[drɔ]`",
      "*swim* `[swɪm]`"
    ],
    "a": 0,
    "e": "「唱歌」是 *sing*。",
    "w": [
      "",
      "*dance* 是跳舞。",
      "*draw* 是畫畫。",
      "*swim* 是游泳。"
    ]
  },
  {
    "sid": "review-jobs-abilities",
    "u": "Vocabulary Review・Jobs & Abilities",
    "d": "易",
    "q": "複習・職業與能力：「游泳」的英文是哪一個？",
    "o": [
      "*swim* `[swɪm]`",
      "*fly a kite* `[flaɪ ə kaɪt]`",
      "*ride a bike* `[raɪd ə baɪk]`",
      "*draw* `[drɔ]`"
    ],
    "a": 0,
    "e": "「游泳」是 *swim*。",
    "w": [
      "",
      "*fly a kite* 是放風箏。",
      "*ride a bike* 是騎腳踏車。",
      "*draw* 是畫畫。"
    ]
  },
  {
    "sid": "review-jobs-abilities",
    "u": "Vocabulary Review・Jobs & Abilities",
    "d": "易",
    "q": "複習・職業與能力：「放風箏」的英文是哪一個？",
    "o": [
      "*fly a kite* `[flaɪ ə kaɪt]`",
      "*ride a bike* `[raɪd ə baɪk]`",
      "*swim* `[swɪm]`",
      "*sing* `[sɪŋ]`"
    ],
    "a": 0,
    "e": "「放風箏」是 *fly a kite*。",
    "w": [
      "",
      "*ride a bike* 是騎腳踏車。",
      "*swim* 是游泳。",
      "*sing* 是唱歌。"
    ]
  },
  {
    "sid": "review-jobs-abilities",
    "u": "Vocabulary Review・Jobs & Abilities",
    "d": "易",
    "q": "複習・職業與能力：「騎腳踏車」的英文是哪一個？",
    "o": [
      "*ride a bike* `[raɪd ə baɪk]`",
      "*fly a kite* `[flaɪ ə kaɪt]`",
      "*dance* `[dæns]`",
      "*draw* `[drɔ]`"
    ],
    "a": 0,
    "e": "「騎腳踏車」是 *ride a bike*。",
    "w": [
      "",
      "*fly a kite* 是放風箏。",
      "*dance* 是跳舞。",
      "*draw* 是畫畫。"
    ]
  },
  {
    "sid": "review-jobs-abilities",
    "u": "Vocabulary Review・Jobs & Abilities",
    "d": "中",
    "q": "複習・職業與能力：*Is she a doctor?* 她是醫生，答句是哪一句？",
    "o": [
      "*Yes, she is.*",
      "*Yes, he is.*",
      "*No, she isn't.*",
      "*Yes, I am.*"
    ],
    "a": 0,
    "e": "她是醫生，答 *Yes, she is.*。",
    "w": [
      "",
      "題目問 *she*，要用 *she* 回答。",
      "她是醫生，所以要說 *Yes*。",
      "題目問 *she*，不是 *I*。"
    ]
  },
  {
    "sid": "review-jobs-abilities",
    "u": "Vocabulary Review・Jobs & Abilities",
    "d": "中",
    "q": "複習・職業與能力：*Can you dance?* 你會跳舞，答句是哪一句？",
    "o": [
      "*Yes, I can.*",
      "*Yes, I do.*",
      "*Yes, I am.*",
      "*No, I can.*"
    ],
    "a": 0,
    "e": "會跳舞，答 *Yes, I can.*。",
    "w": [
      "",
      "*Can* 開頭的問句要用 *can* 回答。",
      "*Can* 開頭的問句不能用 *am* 回答。",
      "*No* 和 *can* 前後矛盾。"
    ]
  },
  {
    "sid": "culture-halloween",
    "u": "Culture & Festivals・Halloween",
    "d": "中",
    "q": "萬聖節：*Trick or treat!* `[trɪk ɔr trit]` 是什麼意思？",
    "o": [
      "不給糖就搗蛋！",
      "謝謝招待！",
      "聖誕快樂！",
      "生日快樂！"
    ],
    "a": 0,
    "e": "*Trick or treat!* 是萬聖節「不給糖就搗蛋！」。",
    "w": [
      "",
      "這是萬聖節要糖果的口號。",
      "聖誕快樂是 *Merry Christmas!*",
      "生日快樂是 *Happy birthday!*"
    ]
  },
  {
    "sid": "culture-halloween",
    "u": "Culture & Festivals・Halloween",
    "d": "易",
    "q": "萬聖節：*Happy Halloween!* `[ˋhæpi ˏhæloˋin]` 是什麼意思？",
    "o": [
      "萬聖節快樂！",
      "新年快樂！",
      "聖誕快樂！",
      "生日快樂！"
    ],
    "a": 0,
    "e": "*Happy Halloween!* 是「萬聖節快樂！」。",
    "w": [
      "",
      "新年快樂是 *Happy New Year!*",
      "聖誕快樂是 *Merry Christmas!*",
      "生日快樂是 *Happy birthday!*"
    ]
  },
  {
    "sid": "culture-halloween",
    "u": "Culture & Festivals・Halloween",
    "d": "中",
    "q": "萬聖節：萬聖節時，小朋友會說什麼？",
    "o": [
      "*Trick or treat!*",
      "*Happy birthday!*",
      "*Merry Christmas!*",
      "*Good morning!*"
    ],
    "a": 0,
    "e": "萬聖節要糖果時說 *Trick or treat!*。",
    "w": [
      "",
      "這是生日祝福。",
      "這是聖誕節祝福。",
      "這是早上問候。"
    ]
  },
  {
    "sid": "culture-halloween",
    "u": "Culture & Festivals・Halloween",
    "d": "中",
    "q": "萬聖節：*Here's some candy.* `[hɪrz sʌm ˋkændi]` 是什麼意思？",
    "o": [
      "這裡有一些糖果",
      "這裡有一些餅乾",
      "這裡有一些水果",
      "這裡有一些玩具"
    ],
    "a": 0,
    "e": "*Here's some candy.* 是「這裡有一些糖果」。",
    "w": [
      "",
      "餅乾是 *cookies*。",
      "水果是 *fruit*。",
      "玩具是 *toys*。"
    ]
  },
  {
    "sid": "culture-halloween",
    "u": "Culture & Festivals・Halloween",
    "d": "易",
    "q": "萬聖節：哪一個是萬聖節的南瓜燈？",
    "o": [
      "*a jack-o'-lantern* `[ə ˋdʒæk ə ˏlæntɚn]`",
      "*a pencil* `[ə ˋpɛnsəl]`",
      "*a desk* `[ə dɛsk]`",
      "*a ruler* `[ə ˋrulɚ]`"
    ],
    "a": 0,
    "e": "南瓜燈是 *a jack-o'-lantern*。",
    "w": [
      "",
      "鉛筆是文具。",
      "書桌是家具。",
      "尺是文具。"
    ]
  },
  {
    "sid": "task-emergency",
    "u": "Task・Emergency Weather",
    "d": "中",
    "q": "防災任務：*Help! There's a fire!* `[hɛlp ðɛrz ə faɪr]` 是什麼意思？",
    "o": [
      "救命！失火了！",
      "救命！地震了！",
      "救命！停電了！",
      "救命！土石流了！"
    ],
    "a": 0,
    "e": "*Help! There's a fire!* 是「救命！失火了！」。",
    "w": [
      "",
      "地震是 *earthquake*。",
      "停電是 *blackout*。",
      "土石流是 *mudslide*。"
    ]
  },
  {
    "sid": "task-emergency",
    "u": "Task・Emergency Weather",
    "d": "中",
    "q": "防災任務：*It's dark now!* `[ɪts dɑrk naʊ]` 是什麼意思？",
    "o": [
      "現在天黑了／停電了",
      "現在很熱",
      "現在下雨",
      "現在很冷"
    ],
    "a": 0,
    "e": "*It's dark now!* 是「現在天黑了／停電了」。",
    "w": [
      "",
      "熱是 *hot*。",
      "下雨是 *rainy*。",
      "冷是 *cold*。"
    ]
  },
  {
    "sid": "task-emergency",
    "u": "Task・Emergency Weather",
    "d": "中",
    "q": "防災任務：*It's hot and windy now!* `[ɪts hɑt ænd ˋwɪndi naʊ]` 是什麼意思？",
    "o": [
      "現在又熱又有風",
      "現在又冷又下雨",
      "現在又熱又下雨",
      "現在又冷又有風"
    ],
    "a": 0,
    "e": "*It's hot and windy now!* 是「現在又熱又有風」。",
    "w": [
      "",
      "冷是 *cold*，下雨是 *rainy*。",
      "下雨是 *rainy*，不是 *windy*。",
      "冷是 *cold*，不是 *hot*。"
    ]
  },
  {
    "sid": "task-emergency",
    "u": "Task・Emergency Weather",
    "d": "中",
    "q": "防災任務：*Please hurry! I'm in Town.* `[pliz ˋhɝi aɪm ɪn taʊn]` 是什麼意思？",
    "o": [
      "請快一點！我在城鎮裡",
      "請慢一點！我在學校",
      "請快一點！我在山上",
      "請回家！我在城鎮裡"
    ],
    "a": 0,
    "e": "*Please hurry! I'm in Town.* 是「請快一點！我在城鎮裡」。",
    "w": [
      "",
      "慢一點是 *slow down*，學校是 *school*。",
      "山上不是 *Town*。",
      "回家是 *go home*。"
    ]
  },
  {
    "sid": "task-emergency",
    "u": "Task・Emergency Weather",
    "d": "易",
    "q": "防災任務：哪一個是「地震」？",
    "o": [
      "*earthquake* `[ˋɝθˏkwek]`",
      "*fire* `[faɪr]`",
      "*flood* `[flʌd]`",
      "*mudslide* `[ˋmʌdˏslaɪd]`"
    ],
    "a": 0,
    "e": "「地震」是 *earthquake*。",
    "w": [
      "",
      "*fire* 是火災。",
      "*flood* 是水災。",
      "*mudslide* 是土石流。"
    ]
  },
  {
    "sid": "task-emergency",
    "u": "Task・Emergency Weather",
    "d": "易",
    "q": "防災任務：哪一個是「土石流」？",
    "o": [
      "*mudslide* `[ˋmʌdˏslaɪd]`",
      "*earthquake* `[ˋɝθˏkwek]`",
      "*fire* `[faɪr]`",
      "*flood* `[flʌd]`"
    ],
    "a": 0,
    "e": "「土石流」是 *mudslide*。",
    "w": [
      "",
      "*earthquake* 是地震。",
      "*fire* 是火災。",
      "*flood* 是水災。"
    ]
  },
  {
    "sid": "task-emergency",
    "u": "Task・Emergency Weather",
    "d": "中",
    "q": "防災任務：哪一個是「停電」？",
    "o": [
      "*blackout* `[ˋblækaʊt]`",
      "*fire* `[faɪr]`",
      "*flood* `[flʌd]`",
      "*earthquake* `[ˋɝθˏkwek]`"
    ],
    "a": 0,
    "e": "「停電」是 *blackout*。",
    "w": [
      "",
      "*fire* 是火災。",
      "*flood* 是水災。",
      "*earthquake* 是地震。"
    ]
  },
  {
    "sid": "task-emergency",
    "u": "Task・Emergency Weather",
    "d": "易",
    "q": "防災任務：哪一個是天氣字？",
    "o": [
      "*rainy* `[ˋreni]`",
      "*earthquake* `[ˋɝθˏkwek]`",
      "*fire* `[faɪr]`",
      "*mudslide* `[ˋmʌdˏslaɪd]`"
    ],
    "a": 0,
    "e": "*rainy* 是天氣字，意思是「下雨的」。",
    "w": [
      "",
      "*earthquake* 是地震。",
      "*fire* 是火災。",
      "*mudslide* 是土石流。"
    ]
  },
  {
    "sid": "u1-phonics",
    "u": "Unit 1・Phonics e_e / ee",
    "d": "難",
    "q": "Unit 1 發音：下列哪一個單字的母音字母是 i，讀長母音 /i/，和 *Pete* 的母音相同？",
    "o": [
      "*Eve* `[iv]`",
      "*pet* `[pɛt]`",
      "*theme* `[θim]`",
      "*sea* `[si]`"
    ],
    "a": 0,
    "e": "*Eve* 的母音字母是 i，讀長母音 /i/，和 *Pete* 的母音一樣；*Pete*、*theme*、*sea* 則是 e_e 的拼法，母音字母是 e。",
    "w": [
      "",
      "*pet* 是短母音 /ɛ/，和 *Pete* 不同。",
      "*theme* 的母音字母是 e，屬於 e_e 的拼法。",
      "*sea* 的母音字母是 e，屬於 e_e 的拼法。"
    ]
  }
];

var PASSAGES = [
  {
    "id": "p01",
    "tag": "素養題組・Get Ready 生日卡片",
    "d": "易",
    "p": "*It is Dave's birthday.*\n今天是戴夫的生日。\n*Dave is sixteen today.*\n戴夫今天十六歲。\n*His sister makes a card for him.*\n他的姊妹做了一張卡片給他。\n*She draws a cap and a cake on the card.*\n她在卡片上畫了一頂帽子和一個蛋糕。\n*Dave says, 'Thank you! Let's eat cake!'*\n戴夫說：「謝謝！我們來吃蛋糕吧！」\n發音小辭典：*sixteen* `[ˏsɪksˋtin]`、*card* `[kɑrd]`、*cake* `[kek]`",
    "qs": [
      {
        "d": "易",
        "q": "戴夫今天幾歲？",
        "c": "16 歲",
        "ws": [
          [
            "15 歲",
            "文章說 *Dave is sixteen today.*"
          ],
          [
            "60 歲",
            "*sixteen* 是 16，不是 60。"
          ],
          [
            "17 歲",
            "*seventeen* 才是 17。"
          ]
        ],
        "e": "文章說 *Dave is sixteen today.*，所以是 16 歲。"
      },
      {
        "d": "易",
        "q": "戴夫的姊妹做了什麼給他？",
        "c": "一張卡片",
        "ws": [
          [
            "一個蛋糕",
            "蛋糕是卡片上的圖案，不是姊姊做的東西。"
          ],
          [
            "一頂帽子",
            "帽子是卡片上的圖案。"
          ],
          [
            "一隻風箏",
            "文章沒有提到風箏。"
          ]
        ],
        "e": "文章說 *His sister makes a card for him.*"
      },
      {
        "d": "易",
        "q": "卡片上有什麼圖案？",
        "c": "一頂帽子和一個蛋糕",
        "ws": [
          [
            "一隻貓和一隻狗",
            "文章沒有提到貓和狗。"
          ],
          [
            "一枝筆和一本書",
            "文章沒有提到筆和書。"
          ],
          [
            "一隻風箏和一台腳踏車",
            "文章沒有提到風箏和腳踏車。"
          ]
        ],
        "e": "文章說 *She draws a cap and a cake on the card.*"
      },
      {
        "d": "中",
        "q": "戴夫看到卡片後說了什麼？",
        "c": "*Thank you! Let's eat cake!*",
        "ws": [
          [
            "*Happy birthday!*",
            "這是祝福別人的話，不是戴夫說的話。"
          ],
          [
            "*I'm sorry.*",
            "戴夫沒有道歉。"
          ],
          [
            "*Goodbye!*",
            "戴夫沒有說再見。"
          ]
        ],
        "e": "文章最後說 *Dave says, 'Thank you! Let's eat cake!'*"
      },
      {
        "d": "中",
        "q": "哪一個單字含有 a_e 的長母音 /e/？",
        "c": "*cake* `[kek]`",
        "ws": [
          [
            "*cap* `[kæp]`",
            "*cap* 是短母音 /æ/。"
          ],
          [
            "*cat* `[kæt]`",
            "*cat* 是短母音 /æ/。"
          ],
          [
            "*card* `[kɑrd]`",
            "*card* 的母音是 /ɑ/。"
          ]
        ],
        "e": "*cake* 的 a_e 發長母音 /e/。"
      }
    ]
  },
  {
    "id": "p02",
    "tag": "素養題組・Unit 1 天氣預報",
    "d": "易",
    "p": "*Good morning. This is the weather report.*\n早安，這是天氣預報。\n*It is sunny in Taipei.*\n臺北是晴天。\n*It is cloudy in Taichung.*\n臺中是多雲。\n*It is rainy in Tainan.*\n臺南下雨。\n*It is windy in Taitung.*\n臺東有風。\n*It is cold in Yilan.*\n宜蘭很冷。\n發音小辭典：*sunny* `[ˋsʌni]`、*cloudy* `[ˋklaʊdi]`、*rainy* `[ˋreni]`、*windy* `[ˋwɪndi]`、*cold* `[kold]`",
    "qs": [
      {
        "d": "易",
        "q": "臺北的天氣怎麼樣？",
        "c": "晴天",
        "ws": [
          [
            "多雲",
            "臺中才是多雲。"
          ],
          [
            "下雨",
            "臺南才是下雨。"
          ],
          [
            "有風",
            "臺東才是有風。"
          ]
        ],
        "e": "文章說 *It is sunny in Taipei.*"
      },
      {
        "d": "易",
        "q": "哪一個城市是多雲？",
        "c": "臺中",
        "ws": [
          [
            "臺北",
            "臺北是晴天。"
          ],
          [
            "臺南",
            "臺南是下雨。"
          ],
          [
            "臺東",
            "臺東是有風。"
          ]
        ],
        "e": "文章說 *It is cloudy in Taichung.*"
      },
      {
        "d": "易",
        "q": "哪一個城市下雨？",
        "c": "臺南",
        "ws": [
          [
            "臺北",
            "臺北是晴天。"
          ],
          [
            "臺中",
            "臺中是多雲。"
          ],
          [
            "宜蘭",
            "宜蘭是很冷。"
          ]
        ],
        "e": "文章說 *It is rainy in Tainan.*"
      },
      {
        "d": "易",
        "q": "哪一個城市有風？",
        "c": "臺東",
        "ws": [
          [
            "臺北",
            "臺北是晴天。"
          ],
          [
            "臺南",
            "臺南是下雨。"
          ],
          [
            "臺中",
            "臺中是多雲。"
          ]
        ],
        "e": "文章說 *It is windy in Taitung.*"
      },
      {
        "d": "中",
        "q": "宜蘭很冷，出門最好穿什麼？",
        "c": "外套",
        "ws": [
          [
            "泳衣",
            "冷天不適合穿泳衣。"
          ],
          [
            "短褲",
            "短褲比較適合熱天。"
          ],
          [
            "拖鞋",
            "拖鞋不能保暖。"
          ]
        ],
        "e": "宜蘭很冷，所以應該穿保暖的外套。"
      }
    ]
  },
  {
    "id": "p03",
    "tag": "素養題組・Unit 1 The Big Wind",
    "d": "中",
    "p": "*Kevin and Boka go to the park.*\n凱文和波卡去公園。\n*It is sunny at first.*\n一開始是晴天。\n*Then it is cloudy and windy.*\n後來變成多雲又有風。\n*Oh no! My cap!* says Kevin.\n「糟了！我的帽子！」凱文說。\n*Boka runs after the cap.*\n波卡追著帽子跑。\n*I have your cap!* says Boka.\n「我拿到你的帽子了！」波卡說。\n發音小辭典：*park* `[pɑrk]`、*sunny* `[ˋsʌni]`、*cloudy* `[ˋklaʊdi]`、*windy* `[ˋwɪndi]`、*cap* `[kæp]`",
    "qs": [
      {
        "d": "易",
        "q": "凱文和波卡去哪裡？",
        "c": "公園",
        "ws": [
          [
            "學校",
            "文章說他們去公園。"
          ],
          [
            "市場",
            "文章沒有提到市場。"
          ],
          [
            "海邊",
            "海邊是另一篇故事。"
          ]
        ],
        "e": "文章說 *Kevin and Boka go to the park.*"
      },
      {
        "d": "易",
        "q": "一開始的天氣怎麼樣？",
        "c": "晴天",
        "ws": [
          [
            "下雨",
            "一開始是晴天。"
          ],
          [
            "下雪",
            "文章沒有提到下雪。"
          ],
          [
            "有風",
            "有風是後來才出現。"
          ]
        ],
        "e": "文章說 *It is sunny at first.*"
      },
      {
        "d": "中",
        "q": "凱文的帽子怎麼了？",
        "c": "被風吹走，波卡追回來",
        "ws": [
          [
            "被狗咬走",
            "文章沒有提到狗。"
          ],
          [
            "掉進水裡",
            "文章沒有提到水。"
          ],
          [
            "被媽媽收起來",
            "文章沒有提到媽媽。"
          ]
        ],
        "e": "風變大後凱文的帽子飛走，波卡追上去拿回來。"
      },
      {
        "d": "中",
        "q": "誰幫凱文拿到帽子？",
        "c": "波卡",
        "ws": [
          [
            "艾美",
            "艾美不在這篇故事裡。"
          ],
          [
            "老師",
            "文章沒有提到老師。"
          ],
          [
            "凱文自己",
            "是波卡追上去拿的。"
          ]
        ],
        "e": "文章說 *Boka runs after the cap.*"
      },
      {
        "d": "中",
        "q": "凱文最後的心情最可能是什麼？",
        "c": "感謝、開心",
        "ws": [
          [
            "生氣",
            "波卡幫他拿回帽子，他應該是感謝。"
          ],
          [
            "想睡覺",
            "文章沒有提到睡覺。"
          ],
          [
            "害怕",
            "文章沒有提到害怕。"
          ]
        ],
        "e": "波卡幫凱文拿回帽子，凱文應該很感謝。"
      }
    ]
  },
  {
    "id": "p04",
    "tag": "素養題組・Unit 1 下雨天",
    "d": "中",
    "p": "*It is rainy today.*\n今天下雨。\n*Amy is at home.*\n艾美在家。\n*She sees Ted and Eve at the sea on TV.*\n她在電視上看到泰德和伊芙在海邊。\n*They are wet.*\n他們淋濕了。\n*The sea is big,* says Amy.\n「大海好大。」艾美說。\n*Let's go when it is sunny,* says Mom.\n「等晴天我們再去。」媽媽說。\n發音小辭典：*rainy* `[ˋreni]`、*sea* `[si]`、*wet* `[wɛt]`、*sunny* `[ˋsʌni]`",
    "qs": [
      {
        "d": "易",
        "q": "今天的天氣怎麼樣？",
        "c": "下雨",
        "ws": [
          [
            "晴天",
            "文章說今天下雨。"
          ],
          [
            "下雪",
            "文章沒有提到下雪。"
          ],
          [
            "有風",
            "文章沒有提到風。"
          ]
        ],
        "e": "文章說 *It is rainy today.*"
      },
      {
        "d": "易",
        "q": "艾美在哪裡？",
        "c": "在家",
        "ws": [
          [
            "在海邊",
            "艾美是在電視上看到海邊。"
          ],
          [
            "在學校",
            "文章說她在家。"
          ],
          [
            "在公園",
            "文章沒有提到公園。"
          ]
        ],
        "e": "文章說 *Amy is at home.*"
      },
      {
        "d": "中",
        "q": "艾美在電視上看到誰？",
        "c": "泰德和伊芙",
        "ws": [
          [
            "凱文和波卡",
            "他們不在這篇故事裡。"
          ],
          [
            "媽媽和爸爸",
            "文章沒有說他們在海邊。"
          ],
          [
            "老師和同學",
            "文章沒有提到老師。"
          ]
        ],
        "e": "文章說 *She sees Ted and Eve at the sea on TV.*"
      },
      {
        "d": "中",
        "q": "艾美想做什麼？",
        "c": "去海邊",
        "ws": [
          [
            "去學校",
            "文章沒有提到學校。"
          ],
          [
            "去市場",
            "文章沒有提到市場。"
          ],
          [
            "去睡覺",
            "文章沒有提到睡覺。"
          ]
        ],
        "e": "艾美說 *The sea is big.*，她想去海邊。"
      },
      {
        "d": "中",
        "q": "哪一個單字含有 ee 或 e_e 的長母音 /i/？",
        "c": "*sea* `[si]`",
        "ws": [
          [
            "*Ted* `[tɛd]`",
            "*Ted* 是短母音 /ɛ/。"
          ],
          [
            "*wet* `[wɛt]`",
            "*wet* 是短母音 /ɛ/。"
          ],
          [
            "*big* `[bɪg]`",
            "*big* 是短母音 /ɪ/。"
          ]
        ],
        "e": "*sea* 的 ee 發長母音 /i/。"
      }
    ]
  },
  {
    "id": "p05",
    "tag": "素養題組・Unit 2 我的一天",
    "d": "易",
    "p": "*I get up at six thirty.*\n我六點三十分起床。\n*I have breakfast at seven.*\n我七點吃早餐。\n*I go to school at seven forty.*\n我七點四十分去上學。\n*School starts at eight.*\n學校八點開始上課。\n*I go home at four fifteen.*\n我四點十五分回家。\n*I go to bed at nine.*\n我九點睡覺。\n發音小辭典：*get up* `[gɛt ʌp]`、*breakfast* `[ˋbrɛkfəst]`、*school* `[skul]`、*bed* `[bɛd]`",
    "qs": [
      {
        "d": "易",
        "q": "「我」幾點起床？",
        "c": "6:30",
        "ws": [
          [
            "7:00",
            "七點是吃早餐。"
          ],
          [
            "8:00",
            "八點是開始上課。"
          ],
          [
            "9:00",
            "九點是睡覺。"
          ]
        ],
        "e": "文章說 *I get up at six thirty.*"
      },
      {
        "d": "易",
        "q": "「我」幾點吃早餐？",
        "c": "7:00",
        "ws": [
          [
            "6:30",
            "六點半是起床。"
          ],
          [
            "7:40",
            "七點四十是去上學。"
          ],
          [
            "8:00",
            "八點是開始上課。"
          ]
        ],
        "e": "文章說 *I have breakfast at seven.*"
      },
      {
        "d": "易",
        "q": "學校幾點開始上課？",
        "c": "8:00",
        "ws": [
          [
            "7:00",
            "七點是吃早餐。"
          ],
          [
            "7:40",
            "七點四十是去上學。"
          ],
          [
            "4:15",
            "四點十五是回家。"
          ]
        ],
        "e": "文章說 *School starts at eight.*"
      },
      {
        "d": "中",
        "q": "「我」幾點回家？",
        "c": "4:15",
        "ws": [
          [
            "4:50",
            "文章沒有說四點五十回家。"
          ],
          [
            "5:00",
            "文章沒有說五點回家。"
          ],
          [
            "9:00",
            "九點是睡覺。"
          ]
        ],
        "e": "文章說 *I go home at four fifteen.*"
      },
      {
        "d": "易",
        "q": "「我」幾點睡覺？",
        "c": "9:00",
        "ws": [
          [
            "8:00",
            "八點是開始上課。"
          ],
          [
            "7:00",
            "七點是吃早餐。"
          ],
          [
            "6:30",
            "六點半是起床。"
          ]
        ],
        "e": "文章說 *I go to bed at nine.*"
      }
    ]
  },
  {
    "id": "p06",
    "tag": "素養題組・Unit 2 Going Back Home",
    "d": "中",
    "p": "*Kevin and Boka are back.*\n凱文和波卡回來了。\n*It is four fifteen.*\n現在四點十五分。\n*We must go home,* says Kevin.\n「我們必須回家了。」凱文說。\n*It's the school bell.*\n是放學鐘聲。\n*They run home. It is four fifty.*\n他們跑回家，已經四點五十分。\n*Sorry, I'm late, Mom,* says Kevin.\n「對不起，我遲到了，媽媽。」凱文說。\n發音小辭典：*back* `[bæk]`、*school bell* `[skul bɛl]`、*late* `[let]`、*run* `[rʌn]`",
    "qs": [
      {
        "d": "易",
        "q": "凱文和波卡回來時幾點？",
        "c": "4:15",
        "ws": [
          [
            "4:50",
            "四點五十是他們跑回家的時間。"
          ],
          [
            "5:00",
            "文章沒有說五點。"
          ],
          [
            "3:30",
            "文章沒有說三點半。"
          ]
        ],
        "e": "文章說 *It is four fifteen.*"
      },
      {
        "d": "中",
        "q": "凱文為什麼說他們必須回家？",
        "c": "因為放學鐘聲響了",
        "ws": [
          [
            "因為下雨了",
            "文章沒有提到下雨。"
          ],
          [
            "因為肚子餓",
            "文章沒有提到肚子餓。"
          ],
          [
            "因為帽子飛走了",
            "帽子是 Unit 1 的故事。"
          ]
        ],
        "e": "文章說 *It's the school bell.*"
      },
      {
        "d": "中",
        "q": "他們跑到家時幾點？",
        "c": "4:50",
        "ws": [
          [
            "4:15",
            "四點十五是他們剛回來。"
          ],
          [
            "4:00",
            "文章沒有說四點。"
          ],
          [
            "5:00",
            "文章沒有說五點。"
          ]
        ],
        "e": "文章說 *They run home. It is four fifty.*"
      },
      {
        "d": "中",
        "q": "凱文為什麼跟媽媽說對不起？",
        "c": "因為他遲到了",
        "ws": [
          [
            "因為他打破杯子",
            "文章沒有提到杯子。"
          ],
          [
            "因為他忘記帶書",
            "文章沒有提到書。"
          ],
          [
            "因為他不想回家",
            "文章沒有這樣說。"
          ]
        ],
        "e": "文章說 *Sorry, I'm late, Mom.*"
      },
      {
        "d": "中",
        "q": "媽媽最可能怎麼回答？",
        "c": "*That's OK.*",
        "ws": [
          [
            "*Goodbye.*",
            "凱文剛回家，不是要再見。"
          ],
          [
            "*How old are you?*",
            "這和遲到無關。"
          ],
          [
            "*What's this?*",
            "這和遲到無關。"
          ]
        ],
        "e": "凱文道歉後，媽媽最可能說 *That's OK.*"
      }
    ]
  },
  {
    "id": "p07",
    "tag": "素養題組・Unit 2 放學鐘聲",
    "d": "易",
    "p": "*It is three thirty.*\n現在三點三十分。\n*The school bell rings.*\n學校鐘聲響了。\n*What time is it?* asks Amy.\n「現在幾點？」艾美問。\n*It's three thirty,* says Ben.\n「三點三十分。」班說。\n*Time to go home.*\n該回家了。\n*They walk home at four o'clock.*\n他們四點走路回家。\n發音小辭典：*school bell* `[skul bɛl]`、*ring* `[rɪŋ]`、*walk* `[wɔk]`、*home* `[hom]`",
    "qs": [
      {
        "d": "易",
        "q": "鐘聲響時幾點？",
        "c": "3:30",
        "ws": [
          [
            "4:00",
            "四點是走路回家的時間。"
          ],
          [
            "3:00",
            "文章說三點三十分。"
          ],
          [
            "4:30",
            "文章沒有說四點半。"
          ]
        ],
        "e": "文章說 *It is three thirty.*"
      },
      {
        "d": "易",
        "q": "誰問「現在幾點？」",
        "c": "艾美",
        "ws": [
          [
            "班",
            "班是回答的人。"
          ],
          [
            "凱文",
            "凱文不在這篇。"
          ],
          [
            "老師",
            "文章沒有提到老師。"
          ]
        ],
        "e": "文章說 *What time is it?* asks Amy."
      },
      {
        "d": "易",
        "q": "班說現在幾點？",
        "c": "3:30",
        "ws": [
          [
            "4:00",
            "四點是後來走路回家。"
          ],
          [
            "3:00",
            "文章說三點三十分。"
          ],
          [
            "4:15",
            "文章沒有說四點十五。"
          ]
        ],
        "e": "文章說 *It's three thirty,* says Ben."
      },
      {
        "d": "中",
        "q": "他們怎麼回家？",
        "c": "走路",
        "ws": [
          [
            "搭公車",
            "文章說他們走路。"
          ],
          [
            "搭火車",
            "文章沒有提到火車。"
          ],
          [
            "跑回家",
            "文章說走路，不是跑。"
          ]
        ],
        "e": "文章說 *They walk home at four o'clock.*"
      },
      {
        "d": "中",
        "q": "他們幾點走路回家？",
        "c": "4:00",
        "ws": [
          [
            "3:30",
            "三點半是鐘聲響的時間。"
          ],
          [
            "4:30",
            "文章沒有說四點半。"
          ],
          [
            "5:00",
            "文章沒有說五點。"
          ]
        ],
        "e": "文章說 *They walk home at four o'clock.*"
      }
    ]
  },
  {
    "id": "p08",
    "tag": "素養題組・Unit 3 Lost and Found",
    "d": "中",
    "p": "*Amy finds a pencil and an eraser.*\n艾美找到一枝鉛筆和一個橡皮擦。\n*Is this your pencil?* she asks Ben.\n「這是你的鉛筆嗎？」她問班。\n*No, it's not,* says Ben.\n「不是。」班說。\n*Let's take them to the Lost and Found.*\n「我們把它們送到失物招領處吧。」\n*The teacher says, 'Thank you!'*\n老師說：「謝謝！」\n發音小辭典：*find* `[faɪnd]`、*pencil* `[ˋpɛnsəl]`、*eraser* `[ɪˋresɚ]`、*Lost and Found* `[lɔst ænd faʊnd]`",
    "qs": [
      {
        "d": "易",
        "q": "艾美找到什麼？",
        "c": "一枝鉛筆和一個橡皮擦",
        "ws": [
          [
            "一本書和一把尺",
            "文章沒有提到書和尺。"
          ],
          [
            "一枝筆和一個袋子",
            "文章沒有提到袋子和筆。"
          ],
          [
            "一頂帽子和一個盒子",
            "文章沒有提到帽子和盒子。"
          ]
        ],
        "e": "文章說 *Amy finds a pencil and an eraser.*"
      },
      {
        "d": "中",
        "q": "那枝鉛筆是班的嗎？",
        "c": "不是",
        "ws": [
          [
            "是",
            "班說 *No, it's not.*"
          ],
          [
            "是艾美的",
            "文章沒有說鉛筆是艾美的。"
          ],
          [
            "是老師的",
            "文章沒有說鉛筆是老師的。"
          ]
        ],
        "e": "班說 *No, it's not.*"
      },
      {
        "d": "中",
        "q": "他們把東西送到哪裡？",
        "c": "失物招領處",
        "ws": [
          [
            "教室",
            "文章說送到 Lost and Found。"
          ],
          [
            "操場",
            "文章沒有提到操場。"
          ],
          [
            "書店",
            "文章沒有提到書店。"
          ]
        ],
        "e": "文章說 *Let's take them to the Lost and Found.*"
      },
      {
        "d": "易",
        "q": "老師說了什麼？",
        "c": "*Thank you!*",
        "ws": [
          [
            "*Goodbye!*",
            "老師是謝謝他們。"
          ],
          [
            "*I'm sorry.*",
            "老師沒有道歉。"
          ],
          [
            "*Be quiet!*",
            "文章沒有這樣說。"
          ]
        ],
        "e": "文章說 *The teacher says, 'Thank you!'*"
      },
      {
        "d": "中",
        "q": "*Lost and Found* 最接近哪一個意思？",
        "c": "失物招領處",
        "ws": [
          [
            "圖書館",
            "圖書館是 *library*。"
          ],
          [
            "福利社",
            "福利社是 *co-op*。"
          ],
          [
            "保健室",
            "保健室是 *health center*。"
          ]
        ],
        "e": "*Lost and Found* 是失物招領處。"
      }
    ]
  },
  {
    "id": "p09",
    "tag": "素養題組・Unit 3 Be Honest",
    "d": "中",
    "p": "*Ted finds a marker.*\n泰德找到一枝麥克筆。\n*Is this your marker?* he asks Eve.\n「這是你的麥克筆嗎？」他問伊芙。\n*No, it's not,* says Eve.\n「不是。」伊芙說。\n*Ted takes it to the Lost and Found.*\n泰德把它送到失物招領處。\n*Good job! You are honest,* says the teacher.\n「做得好！你很誠實。」老師說。\n發音小辭典：*marker* `[ˋmɑrkɚ]`、*honest* `[ˋɑnɪst]`、*teacher* `[ˋtitʃɚ]`",
    "qs": [
      {
        "d": "易",
        "q": "泰德找到什麼？",
        "c": "一枝麥克筆",
        "ws": [
          [
            "一個橡皮擦",
            "文章說是麥克筆。"
          ],
          [
            "一本書",
            "文章沒有提到書。"
          ],
          [
            "一把尺",
            "文章沒有提到尺。"
          ]
        ],
        "e": "文章說 *Ted finds a marker.*"
      },
      {
        "d": "中",
        "q": "那枝麥克筆是伊芙的嗎？",
        "c": "不是",
        "ws": [
          [
            "是",
            "伊芙說 *No, it's not.*"
          ],
          [
            "是泰德的",
            "文章沒有說麥克筆是泰德的。"
          ],
          [
            "是老師的",
            "文章沒有說麥克筆是老師的。"
          ]
        ],
        "e": "伊芙說 *No, it's not.*"
      },
      {
        "d": "中",
        "q": "泰德把麥克筆送到哪裡？",
        "c": "失物招領處",
        "ws": [
          [
            "自己的書包",
            "他沒有占為己有。"
          ],
          [
            "操場",
            "文章沒有提到操場。"
          ],
          [
            "辦公室",
            "文章說是 Lost and Found。"
          ]
        ],
        "e": "文章說 *Ted takes it to the Lost and Found.*"
      },
      {
        "d": "中",
        "q": "老師為什麼稱讚泰德？",
        "c": "因為他很誠實",
        "ws": [
          [
            "因為他跑得很快",
            "文章沒有提到跑步。"
          ],
          [
            "因為他會唱歌",
            "文章沒有提到唱歌。"
          ],
          [
            "因為他考試一百分",
            "文章沒有提到考試。"
          ]
        ],
        "e": "老師說 *You are honest.*"
      },
      {
        "d": "中",
        "q": "*honest* 最接近哪一個意思？",
        "c": "誠實的",
        "ws": [
          [
            "害怕的",
            "害怕是 *afraid*。"
          ],
          [
            "生氣的",
            "生氣是 *angry*。"
          ],
          [
            "疲倦的",
            "疲倦是 *tired*。"
          ]
        ],
        "e": "*honest* 是誠實的。"
      }
    ]
  },
  {
    "id": "p10",
    "tag": "素養題組・Unit 3 The Cool Eraser",
    "d": "中",
    "p": "*Ben has a new eraser.*\n班有一個新橡皮擦。\n*It is a robot eraser.*\n它是機器人橡皮擦。\n*Is this your eraser?* asks Amy.\n「這是你的橡皮擦嗎？」艾美問。\n*Yes, it is,* says Ben.\n「是的。」班說。\n*It's so cool! Can I use it?* asks Amy.\n「好酷！我可以使用它嗎？」\n*Sure. Here you are,* says Ben.\n「當然。這個給你。」班說。\n發音小辭典：*new* `[nju]`、*eraser* `[ɪˋresɚ]`、*robot* `[ˋrobət]`、*cool* `[kul]`",
    "qs": [
      {
        "d": "易",
        "q": "班有什麼新東西？",
        "c": "一個橡皮擦",
        "ws": [
          [
            "一本書",
            "文章說橡皮擦。"
          ],
          [
            "一枝筆",
            "文章沒有提到筆。"
          ],
          [
            "一把尺",
            "文章沒有提到尺。"
          ]
        ],
        "e": "文章說 *Ben has a new eraser.*"
      },
      {
        "d": "中",
        "q": "那個橡皮擦是什麼造型？",
        "c": "機器人",
        "ws": [
          [
            "動物",
            "文章說是機器人。"
          ],
          [
            "水果",
            "文章沒有提到水果。"
          ],
          [
            "汽車",
            "文章沒有提到汽車。"
          ]
        ],
        "e": "文章說 *It is a robot eraser.*"
      },
      {
        "d": "易",
        "q": "那個橡皮擦是誰的？",
        "c": "班的",
        "ws": [
          [
            "艾美的",
            "艾美問 *Is this your eraser?*"
          ],
          [
            "老師的",
            "文章沒有提到老師。"
          ],
          [
            "泰德的",
            "泰德不在這篇。"
          ]
        ],
        "e": "班說 *Yes, it is.*"
      },
      {
        "d": "中",
        "q": "艾美覺得橡皮擦怎麼樣？",
        "c": "很酷",
        "ws": [
          [
            "很舊",
            "艾美說 *It's so cool!*"
          ],
          [
            "很小",
            "文章沒有說很小。"
          ],
          [
            "很可怕",
            "文章沒有說可怕。"
          ]
        ],
        "e": "艾美說 *It's so cool!*"
      },
      {
        "d": "中",
        "q": "班最後說了什麼？",
        "c": "*Sure. Here you are.*",
        "ws": [
          [
            "*No, it's not.*",
            "班是答應借給艾美。"
          ],
          [
            "*I'm sorry.*",
            "班沒有道歉。"
          ],
          [
            "*Goodbye.*",
            "班沒有說再見。"
          ]
        ],
        "e": "班說 *Sure. Here you are.*，把橡皮擦借給艾美。"
      }
    ]
  },
  {
    "id": "p11",
    "tag": "素養題組・Unit 4 Where Is My Pen?",
    "d": "易",
    "p": "*Kevin is looking for his pen.*\n凱文在找他的筆。\n*Where's my pen?* he asks.\n「我的筆在哪裡？」他問。\n*It's on the desk,* says Amy.\n「在桌上。」艾美說。\n*No, it's not.*\n「不，不在。」\n*Is it under the chair?*\n「在椅子下面嗎？」\n*Yes! It's under the chair. Thank you!*\n「對！在椅子下面。謝謝你！」\n發音小辭典：*pen* `[pɛn]`、*desk* `[dɛsk]`、*chair* `[tʃɛr]`、*under* `[ˋʌndɚ]`",
    "qs": [
      {
        "d": "易",
        "q": "凱文在找什麼？",
        "c": "他的筆",
        "ws": [
          [
            "他的書",
            "文章說是筆。"
          ],
          [
            "他的帽子",
            "文章沒有提到帽子。"
          ],
          [
            "他的橡皮擦",
            "文章沒有提到橡皮擦。"
          ]
        ],
        "e": "文章說 *Kevin is looking for his pen.*"
      },
      {
        "d": "易",
        "q": "艾美第一次說筆在哪裡？",
        "c": "桌上",
        "ws": [
          [
            "椅子下面",
            "那是後來才找到的位置。"
          ],
          [
            "盒子裡",
            "文章沒有提到盒子。"
          ],
          [
            "書包裡",
            "文章沒有提到書包。"
          ]
        ],
        "e": "艾美說 *It's on the desk.*"
      },
      {
        "d": "中",
        "q": "筆真正在哪裡？",
        "c": "椅子下面",
        "ws": [
          [
            "桌上",
            "凱文說 *No, it's not.*"
          ],
          [
            "盒子裡",
            "文章沒有提到盒子。"
          ],
          [
            "門後面",
            "文章沒有提到門。"
          ]
        ],
        "e": "凱文說 *Yes! It's under the chair.*"
      },
      {
        "d": "易",
        "q": "誰幫凱文找筆？",
        "c": "艾美",
        "ws": [
          [
            "波卡",
            "波卡不在這篇。"
          ],
          [
            "老師",
            "文章沒有提到老師。"
          ],
          [
            "媽媽",
            "文章沒有提到媽媽。"
          ]
        ],
        "e": "是艾美回答凱文的問題。"
      },
      {
        "d": "中",
        "q": "*under* 是哪一個意思？",
        "c": "在……下面",
        "ws": [
          [
            "在……上面",
            "上面是 *on*。"
          ],
          [
            "在……裡面",
            "裡面是 *in*。"
          ],
          [
            "在……旁邊",
            "旁邊是 *by*。"
          ]
        ],
        "e": "*under* 是在……下面。"
      }
    ]
  },
  {
    "id": "p12",
    "tag": "素養題組・Unit 4 Earthquake Drill",
    "d": "中",
    "p": "*The school has an earthquake drill.*\n學校舉行地震演習。\n*Earthquake! Please take cover,* says the teacher.\n「地震！請掩護。」老師說。\n*Get under the desk.*\n「到桌子下面。」\n*The students get under their desks.*\n學生們到桌子下面。\n*Hold on!* says the teacher.\n「抓緊！」老師說。\n*Then they go outside.*\n然後他們到外面。\n發音小辭典：*earthquake* `[ˋɝθˏkwek]`、*drill* `[drɪl]`、*cover* `[ˋkʌvɚ]`、*outside* `[ˏaʊtˋsaɪd]`",
    "qs": [
      {
        "d": "易",
        "q": "學校在做什麼？",
        "c": "地震演習",
        "ws": [
          [
            "火災演習",
            "文章說是地震演習。"
          ],
          [
            "考試",
            "文章沒有提到考試。"
          ],
          [
            "運動會",
            "文章沒有提到運動會。"
          ]
        ],
        "e": "文章說 *The school has an earthquake drill.*"
      },
      {
        "d": "中",
        "q": "老師叫學生先做什麼？",
        "c": "到桌子下面掩護",
        "ws": [
          [
            "跑到操場",
            "那是後來的步驟。"
          ],
          [
            "背書包",
            "文章沒有提到書包。"
          ],
          [
            "打電話給媽媽",
            "文章沒有提到打電話。"
          ]
        ],
        "e": "老師說 *Earthquake! Please take cover.* 和 *Get under the desk.*"
      },
      {
        "d": "中",
        "q": "學生躲在哪裡？",
        "c": "桌子下面",
        "ws": [
          [
            "桌子上面",
            "老師說 *Get under the desk.*"
          ],
          [
            "椅子上",
            "文章沒有說椅子上。"
          ],
          [
            "門外",
            "那是後來的步驟。"
          ]
        ],
        "e": "文章說 *The students get under their desks.*"
      },
      {
        "d": "中",
        "q": "老師說 *Hold on!* 是什麼意思？",
        "c": "抓緊",
        "ws": [
          [
            "放手",
            "放手是 *let go*。"
          ],
          [
            "坐下",
            "坐下是 *sit down*。"
          ],
          [
            "站起來",
            "站起來是 *stand up*。"
          ]
        ],
        "e": "*Hold on!* 是抓緊。"
      },
      {
        "d": "中",
        "q": "為什麼他們後來要到外面？",
        "c": "比較安全",
        "ws": [
          [
            "因為要上體育課",
            "文章沒有提到體育課。"
          ],
          [
            "因為要回家",
            "文章沒有提到回家。"
          ],
          [
            "因為教室很熱",
            "文章沒有提到很熱。"
          ]
        ],
        "e": "地震演習時，到空曠的外面比較安全。"
      }
    ]
  },
  {
    "id": "p13",
    "tag": "素養題組・Unit 4 The Go Bag",
    "d": "中",
    "p": "*Amy has a go bag.*\n艾美有一個防災包。\n*It is under her desk.*\n它在她的桌子下面。\n*What's in the go bag?*\n防災包裡有什麼？\n*There is water, food, a flashlight, a radio, and a first aid kit.*\n裡面有水、食物、手電筒、收音機和急救包。\n*The go bag is ready,* says Amy.\n「防災包準備好了。」艾美說。\n發音小辭典：*go bag* `[go bæg]`、*flashlight* `[ˋflæʃˏlaɪt]`、*radio* `[ˋredɪo]`、*first aid kit* `[fɝst ed kɪt]`",
    "qs": [
      {
        "d": "易",
        "q": "艾美的防災包在哪裡？",
        "c": "桌子下面",
        "ws": [
          [
            "椅子上面",
            "文章說桌子下面。"
          ],
          [
            "書包裡",
            "文章沒有說在書包裡。"
          ],
          [
            "床上",
            "文章沒有提到床。"
          ]
        ],
        "e": "文章說 *It is under her desk.*"
      },
      {
        "d": "中",
        "q": "防災包裡沒有下列哪一樣？",
        "c": "風箏",
        "ws": [
          [
            "水",
            "文章說裡面有水。"
          ],
          [
            "手電筒",
            "文章說裡面有手電筒。"
          ],
          [
            "收音機",
            "文章說裡面有收音機。"
          ]
        ],
        "e": "文章列出水、食物、手電筒、收音機和急救包，沒有風箏。"
      },
      {
        "d": "中",
        "q": "防災包裡哪一樣東西可以照亮？",
        "c": "手電筒",
        "ws": [
          [
            "收音機",
            "收音機用來聽廣播。"
          ],
          [
            "水",
            "水不能發光。"
          ],
          [
            "急救包",
            "急救包用來包紮。"
          ]
        ],
        "e": "手電筒 *flashlight* 可以照亮。"
      },
      {
        "d": "中",
        "q": "誰說防災包準備好了？",
        "c": "艾美",
        "ws": [
          [
            "爸爸",
            "文章沒有說爸爸說這句話。"
          ],
          [
            "老師",
            "文章沒有提到老師。"
          ],
          [
            "班",
            "班不在這篇。"
          ]
        ],
        "e": "文章說 *The go bag is ready,* says Amy."
      },
      {
        "d": "中",
        "q": "防災包的主要用途是什麼？",
        "c": "緊急時使用",
        "ws": [
          [
            "上學背著玩",
            "防災包不是玩具。"
          ],
          [
            "裝零食去野餐",
            "文章強調的是防災。"
          ],
          [
            "當書包使用",
            "文章沒有說它是書包。"
          ]
        ],
        "e": "防災包 *go bag* 是在緊急情況時使用。"
      }
    ]
  },
  {
    "id": "p14",
    "tag": "素養題組・Culture & Festivals Halloween",
    "d": "易",
    "p": "*It is Halloween.*\n今天是萬聖節。\n*Amy is a witch.*\n艾美裝扮成女巫。\n*Ben is a vampire.*\n班裝扮成吸血鬼。\n*They go trick-or-treating.*\n他們去挨家挨戶要糖果。\n*Knock, knock, trick or treat!* they say.\n「叩叩，不給糖就搗蛋！」他們說。\n*The neighbor gives them candy.*\n鄰居給他們糖果。\n發音小辭典：*Halloween* `[ˏhæloˋin]`、*witch* `[wɪtʃ]`、*vampire* `[ˋvæmpaɪr]`、*candy* `[ˋkændi]`",
    "qs": [
      {
        "d": "易",
        "q": "今天是什麼節日？",
        "c": "萬聖節",
        "ws": [
          [
            "聖誕節",
            "文章說是 Halloween。"
          ],
          [
            "新年",
            "文章說是 Halloween。"
          ],
          [
            "生日",
            "文章說是 Halloween。"
          ]
        ],
        "e": "文章說 *It is Halloween.*"
      },
      {
        "d": "易",
        "q": "艾美裝扮成什麼？",
        "c": "女巫",
        "ws": [
          [
            "吸血鬼",
            "吸血鬼是班。"
          ],
          [
            "木乃伊",
            "文章沒有提到木乃伊。"
          ],
          [
            "南瓜",
            "文章沒有說艾美是南瓜。"
          ]
        ],
        "e": "文章說 *Amy is a witch.*"
      },
      {
        "d": "易",
        "q": "班裝扮成什麼？",
        "c": "吸血鬼",
        "ws": [
          [
            "女巫",
            "女巫是艾美。"
          ],
          [
            "鬼",
            "文章沒有說班是鬼。"
          ],
          [
            "機器人",
            "文章沒有提到機器人。"
          ]
        ],
        "e": "文章說 *Ben is a vampire.*"
      },
      {
        "d": "中",
        "q": "他們對鄰居說什麼？",
        "c": "*Trick or treat!*",
        "ws": [
          [
            "*Happy birthday!*",
            "這不是萬聖節要糖果的口號。"
          ],
          [
            "*Merry Christmas!*",
            "這是聖誕節。"
          ],
          [
            "*Good morning!*",
            "這是問候語。"
          ]
        ],
        "e": "文章說 *Knock, knock, trick or treat!*"
      },
      {
        "d": "易",
        "q": "鄰居給他們什麼？",
        "c": "糖果",
        "ws": [
          [
            "餅乾",
            "文章說是糖果。"
          ],
          [
            "水果",
            "文章沒有提到水果。"
          ],
          [
            "玩具",
            "文章沒有提到玩具。"
          ]
        ],
        "e": "文章說 *The neighbor gives them candy.*"
      }
    ]
  },
  {
    "id": "p15",
    "tag": "素養題組・Task 緊急情況",
    "d": "中",
    "p": "*It is hot and windy in Town.*\n城鎮裡又熱又有風。\n*There is a fire.*\n發生了火災。\n*Help! There's a fire!* says a man.\n「救命！失火了！」一名男子說。\n*Please hurry! I'm in Town.*\n「請快一點！我在城鎮裡。」\n*The firefighters put out the fire.*\n消防隊員把火撲滅了。\n*Everyone is safe.*\n每個人都安全。\n發音小辭典：*fire* `[faɪr]`、*firefighter* `[ˋfaɪrˏfaɪtɚ]`、*hurry* `[ˋhɝi]`、*safe* `[sef]`",
    "qs": [
      {
        "d": "易",
        "q": "城鎮裡的天氣怎麼樣？",
        "c": "又熱又有風",
        "ws": [
          [
            "又冷又下雨",
            "文章說又熱又有風。"
          ],
          [
            "下雪",
            "文章沒有提到下雪。"
          ],
          [
            "陰天",
            "文章沒有說陰天。"
          ]
        ],
        "e": "文章說 *It is hot and windy in Town.*"
      },
      {
        "d": "易",
        "q": "城鎮裡發生了什麼事？",
        "c": "火災",
        "ws": [
          [
            "地震",
            "文章說是火災。"
          ],
          [
            "水災",
            "文章說是火災。"
          ],
          [
            "土石流",
            "文章說是火災。"
          ]
        ],
        "e": "文章說 *There is a fire.*"
      },
      {
        "d": "中",
        "q": "那名男子說了什麼？",
        "c": "*Help! There's a fire!*",
        "ws": [
          [
            "*Help! There's a flood!*",
            "文章說是火災，不是水災。"
          ],
          [
            "*Help! There's an earthquake!*",
            "文章說是火災。"
          ],
          [
            "*Help! There's a mudslide!*",
            "文章說是火災。"
          ]
        ],
        "e": "文章說 *Help! There's a fire!*"
      },
      {
        "d": "中",
        "q": "誰來滅火？",
        "c": "消防隊員",
        "ws": [
          [
            "老師",
            "文章說是消防隊員。"
          ],
          [
            "醫生",
            "醫生是看病。"
          ],
          [
            "警察",
            "文章沒有提到警察。"
          ]
        ],
        "e": "文章說 *The firefighters put out the fire.*"
      },
      {
        "d": "中",
        "q": "最後大家怎麼樣？",
        "c": "都很安全",
        "ws": [
          [
            "受傷了",
            "文章說 *Everyone is safe.*"
          ],
          [
            "迷路了",
            "文章沒有說迷路。"
          ],
          [
            "還在火場裡",
            "火已經被撲滅了。"
          ]
        ],
        "e": "文章說 *Everyone is safe.*"
      }
    ]
  },
  {
    "id": "p16",
    "tag": "素養題組・Review 1 市場數字",
    "d": "中",
    "p": "*Mom and Amy are at the market.*\n媽媽和艾美在市場。\n*They need thirteen apples and thirty eggs.*\n他們需要十三顆蘋果和三十顆蛋。\n*How much?* asks Mom.\n「多少錢？」媽媽問。\n*Fifty dollars,* says the seller.\n「五十元。」賣家說。\n*Amy sees fifteen oranges.*\n艾美看到十五顆橘子。\n*Can we buy some?* she asks.\n「我們可以買一些嗎？」她問。\n發音小辭典：*thirteen* `[ˏθɝˋtin]`、*thirty* `[ˋθɝti]`、*fifteen* `[ˏfɪfˋtin]`、*fifty* `[ˋfɪfti]`",
    "qs": [
      {
        "d": "易",
        "q": "他們需要幾顆蘋果？",
        "c": "13 顆",
        "ws": [
          [
            "30 顆",
            "三十顆是蛋。"
          ],
          [
            "15 顆",
            "十五顆是橘子。"
          ],
          [
            "50 顆",
            "五十是價錢。"
          ]
        ],
        "e": "文章說 *They need thirteen apples.*"
      },
      {
        "d": "易",
        "q": "他們需要幾顆蛋？",
        "c": "30 顆",
        "ws": [
          [
            "13 顆",
            "十三顆是蘋果。"
          ],
          [
            "15 顆",
            "十五顆是橘子。"
          ],
          [
            "50 顆",
            "五十是價錢。"
          ]
        ],
        "e": "文章說 *thirty eggs*。"
      },
      {
        "d": "易",
        "q": "總共多少錢？",
        "c": "50 元",
        "ws": [
          [
            "13 元",
            "十三是蘋果的數量。"
          ],
          [
            "30 元",
            "三十是蛋的數量。"
          ],
          [
            "15 元",
            "十五是橘子的數量。"
          ]
        ],
        "e": "賣家說 *Fifty dollars.*"
      },
      {
        "d": "中",
        "q": "艾美看到幾顆橘子？",
        "c": "15 顆",
        "ws": [
          [
            "13 顆",
            "十三顆是蘋果。"
          ],
          [
            "30 顆",
            "三十顆是蛋。"
          ],
          [
            "50 顆",
            "五十是價錢。"
          ]
        ],
        "e": "文章說 *Amy sees fifteen oranges.*"
      },
      {
        "d": "中",
        "q": "*thirteen* 和 *thirty* 哪一個是 30？",
        "c": "*thirty* `[ˋθɝti]`",
        "ws": [
          [
            "*thirteen* `[ˏθɝˋtin]`",
            "*thirteen* 是 13。"
          ],
          [
            "*three* `[θri]`",
            "*three* 是 3。"
          ],
          [
            "*fifteen* `[ˏfɪfˋtin]`",
            "*fifteen* 是 15。"
          ]
        ],
        "e": "*thirty* 是 30，*thirteen* 是 13。"
      }
    ]
  },
  {
    "id": "p17",
    "tag": "素養題組・Review 2 音節遊戲",
    "d": "中",
    "p": "*Ms. Lee says, 'Clap the syllables.'*\n李老師說：「拍手數音節。」\n*Box has one syllable.*\nBox 有一個音節。\n*Under has two.*\nUnder 有兩個。\n*Octopus has three.*\nOctopus 有三個。\n*Amy claps three times for umbrella.*\n艾美為 umbrella 拍三次手。\n*Ben claps two times for ruler.*\n班為 ruler 拍兩次手。\n發音小辭典：*syllable* `[ˋsɪləbəl]`、*octopus* `[ˋɑktəpəs]`、*umbrella* `[ʌmˋbrɛlə]`、*ruler* `[ˋrulɚ]`",
    "qs": [
      {
        "d": "易",
        "q": "*box* 有幾個音節？",
        "c": "1 個",
        "ws": [
          [
            "2 個",
            "文章說 box 有一個音節。"
          ],
          [
            "3 個",
            "文章說 box 有一個音節。"
          ],
          [
            "4 個",
            "文章說 box 有一個音節。"
          ]
        ],
        "e": "文章說 *Box has one syllable.*"
      },
      {
        "d": "易",
        "q": "*under* 有幾個音節？",
        "c": "2 個",
        "ws": [
          [
            "1 個",
            "文章說 under 有兩個。"
          ],
          [
            "3 個",
            "文章說 under 有兩個。"
          ],
          [
            "4 個",
            "文章說 under 有兩個。"
          ]
        ],
        "e": "文章說 *Under has two.*"
      },
      {
        "d": "易",
        "q": "*octopus* 有幾個音節？",
        "c": "3 個",
        "ws": [
          [
            "1 個",
            "文章說 octopus 有三個。"
          ],
          [
            "2 個",
            "文章說 octopus 有三個。"
          ],
          [
            "4 個",
            "文章說 octopus 有三個。"
          ]
        ],
        "e": "文章說 *Octopus has three.*"
      },
      {
        "d": "中",
        "q": "艾美為 *umbrella* 拍幾次手？",
        "c": "3 次",
        "ws": [
          [
            "1 次",
            "文章說三次。"
          ],
          [
            "2 次",
            "文章說三次。"
          ],
          [
            "4 次",
            "文章說三次。"
          ]
        ],
        "e": "文章說 *Amy claps three times for umbrella.*"
      },
      {
        "d": "中",
        "q": "班為 *ruler* 拍幾次手？",
        "c": "2 次",
        "ws": [
          [
            "1 次",
            "文章說兩次。"
          ],
          [
            "3 次",
            "文章說兩次。"
          ],
          [
            "4 次",
            "文章說兩次。"
          ]
        ],
        "e": "文章說 *Ben claps two times for ruler.*"
      }
    ]
  },
  {
    "id": "p18",
    "tag": "素養題組・Classroom English 新同學",
    "d": "易",
    "p": "*A new student comes to class.*\n一位新同學來到班上。\n*The teacher says, 'Be quiet, please. This is Leo.'*\n老師說：「請安靜。這是里歐。」\n*Leo says, 'Hello! I'm Leo.'*\n里歐說：「大家好！我是里歐。」\n*Please turn to page 12,* says the teacher.\n「請翻到第 12 頁。」老師說。\n*Raise your hand if you have a question.*\n「有問題請舉手。」\n*Leo raises his hand.*\n里歐舉手。\n發音小辭典：*quiet* `[ˋkwaɪət]`、*page* `[pedʒ]`、*raise* `[rez]`、*question* `[ˋkwɛstʃən]`",
    "qs": [
      {
        "d": "易",
        "q": "誰是新同學？",
        "c": "里歐",
        "ws": [
          [
            "艾美",
            "艾美不是新同學。"
          ],
          [
            "凱文",
            "凱文不是新同學。"
          ],
          [
            "班",
            "班不是新同學。"
          ]
        ],
        "e": "老師說 *This is Leo.*"
      },
      {
        "d": "易",
        "q": "老師先請大家做什麼？",
        "c": "安靜",
        "ws": [
          [
            "唱歌",
            "老師說 *Be quiet.*"
          ],
          [
            "跑步",
            "老師說 *Be quiet.*"
          ],
          [
            "回家",
            "老師說 *Be quiet.*"
          ]
        ],
        "e": "老師說 *Be quiet, please.*"
      },
      {
        "d": "易",
        "q": "老師請大家翻到第幾頁？",
        "c": "第 12 頁",
        "ws": [
          [
            "第 2 頁",
            "老師說 page 12。"
          ],
          [
            "第 20 頁",
            "老師說 page 12。"
          ],
          [
            "第 21 頁",
            "老師說 page 12。"
          ]
        ],
        "e": "老師說 *Please turn to page 12.*"
      },
      {
        "d": "中",
        "q": "里歐做了什麼？",
        "c": "舉手",
        "ws": [
          [
            "站起來",
            "文章說他舉手。"
          ],
          [
            "離開教室",
            "文章說他舉手。"
          ],
          [
            "唱歌",
            "文章沒有說他唱歌。"
          ]
        ],
        "e": "文章說 *Leo raises his hand.*"
      },
      {
        "d": "中",
        "q": "*Raise your hand.* 是什麼意思？",
        "c": "舉手",
        "ws": [
          [
            "放下手",
            "放下手是 *Put down your hand.*"
          ],
          [
            "拍手",
            "拍手是 *clap*。"
          ],
          [
            "握手",
            "握手是 *shake hands*。"
          ]
        ],
        "e": "*Raise your hand.* 是舉手。"
      }
    ]
  },
  {
    "id": "p19",
    "tag": "素養題組・Characters 他是誰？",
    "d": "易",
    "p": "*This is Amy. She is nine years old.*\n這是艾美。她九歲。\n*She can fly a kite.*\n她會放風箏。\n*This is Kevin. He is ten.*\n這是凱文。他十歲。\n*He can sing.*\n他會唱歌。\n*This is Boka. He is two.*\n這是波卡。他兩歲。\n*He can't fly.*\n他不會飛。\n發音小辭典：*nine* `[naɪn]`、*ten* `[tɛn]`、*two* `[tu]`、*fly a kite* `[flaɪ ə kaɪt]`",
    "qs": [
      {
        "d": "易",
        "q": "誰九歲？",
        "c": "艾美",
        "ws": [
          [
            "凱文",
            "凱文十歲。"
          ],
          [
            "波卡",
            "波卡兩歲。"
          ],
          [
            "里歐",
            "里歐不在這篇。"
          ]
        ],
        "e": "文章說 *Amy... She is nine years old.*"
      },
      {
        "d": "易",
        "q": "誰會唱歌？",
        "c": "凱文",
        "ws": [
          [
            "艾美",
            "文章說艾美會放風箏。"
          ],
          [
            "波卡",
            "文章說波卡不會飛。"
          ],
          [
            "老師",
            "文章沒有提到老師。"
          ]
        ],
        "e": "文章說 *Kevin... He can sing.*"
      },
      {
        "d": "中",
        "q": "誰不會飛？",
        "c": "波卡",
        "ws": [
          [
            "艾美",
            "文章沒有說艾美不會飛。"
          ],
          [
            "凱文",
            "文章沒有說凱文不會飛。"
          ],
          [
            "里歐",
            "里歐不在這篇。"
          ]
        ],
        "e": "文章說 *Boka... He can't fly.*"
      },
      {
        "d": "易",
        "q": "波卡幾歲？",
        "c": "2 歲",
        "ws": [
          [
            "9 歲",
            "九歲是艾美。"
          ],
          [
            "10 歲",
            "十歲是凱文。"
          ],
          [
            "12 歲",
            "文章沒有說十二歲。"
          ]
        ],
        "e": "文章說 *Boka... He is two.*"
      },
      {
        "d": "易",
        "q": "凱文幾歲？",
        "c": "10 歲",
        "ws": [
          [
            "2 歲",
            "兩歲是波卡。"
          ],
          [
            "9 歲",
            "九歲是艾美。"
          ],
          [
            "12 歲",
            "文章沒有說十二歲。"
          ]
        ],
        "e": "文章說 *Kevin... He is ten.*"
      }
    ]
  },
  {
    "id": "p20",
    "tag": "素養題組・Around the World 世界時鐘",
    "d": "中",
    "p": "*Big Ben is in London.*\n大笨鐘在倫敦。\n*The Grand Central Station Clock is in New York.*\n中央車站時鐘在紐約。\n*The Cosmo Clock 21 is in Japan.*\nCosmo Clock 21 在日本。\n*A cuckoo clock is a clock with a bird.*\n布穀鳥鐘是有鳥的時鐘。\n*What time is it? It's eleven twenty-six.*\n現在幾點？十一點二十六分。\n發音小辭典：*Big Ben* `[bɪg bɛn]`、*London* `[ˋlʌndən]`、*cuckoo clock* `[ˋkʊku klɑk]`、*eleven twenty-six* `[ɪˋlɛvən ˏtwɛntiˋsɪks]`",
    "qs": [
      {
        "d": "易",
        "q": "*Big Ben* 在哪裡？",
        "c": "倫敦",
        "ws": [
          [
            "紐約",
            "紐約是 Grand Central Station Clock。"
          ],
          [
            "日本",
            "日本是 Cosmo Clock 21。"
          ],
          [
            "臺灣",
            "Big Ben 不在臺灣。"
          ]
        ],
        "e": "文章說 *Big Ben is in London.*"
      },
      {
        "d": "易",
        "q": "*Grand Central Station Clock* 在哪裡？",
        "c": "紐約",
        "ws": [
          [
            "倫敦",
            "倫敦是 Big Ben。"
          ],
          [
            "日本",
            "日本是 Cosmo Clock 21。"
          ],
          [
            "臺灣",
            "這個鐘不在臺灣。"
          ]
        ],
        "e": "文章說 *The Grand Central Station Clock is in New York.*"
      },
      {
        "d": "易",
        "q": "*Cosmo Clock 21* 在哪裡？",
        "c": "日本",
        "ws": [
          [
            "倫敦",
            "倫敦是 Big Ben。"
          ],
          [
            "紐約",
            "紐約是 Grand Central Station Clock。"
          ],
          [
            "臺灣",
            "這個鐘不在臺灣。"
          ]
        ],
        "e": "文章說 *The Cosmo Clock 21 is in Japan.*"
      },
      {
        "d": "中",
        "q": "*cuckoo clock* 裡有什麼？",
        "c": "一隻鳥",
        "ws": [
          [
            "一隻狗",
            "文章說有鳥。"
          ],
          [
            "一隻貓",
            "文章說有鳥。"
          ],
          [
            "一條魚",
            "文章說有鳥。"
          ]
        ],
        "e": "文章說 *A cuckoo clock is a clock with a bird.*"
      },
      {
        "d": "中",
        "q": "*It's eleven twenty-six.* 是幾點？",
        "c": "11:26",
        "ws": [
          [
            "11:36",
            "二十六分不是三十六分。"
          ],
          [
            "12:26",
            "十一點不是十二點。"
          ],
          [
            "11:20",
            "二十六分不是二十分。"
          ]
        ],
        "e": "*eleven twenty-six* 是 11 點 26 分。"
      }
    ]
  }
];

var SCOPE = {
  "source": "Wonder World 3（康軒）全冊：Get Ready、Units 1–4、Culture & Festivals、Task、Review 1–2、Picture Dictionary、Around the World、Word Hunt",
  "sections": [
    {
      "id": "gr-numbers",
      "u": "Get Ready・Numbers 16–20"
    },
    {
      "id": "gr-a-e",
      "u": "Get Ready・Phonics a_e"
    },
    {
      "id": "u1-vocab",
      "u": "Unit 1・Weather Vocabulary"
    },
    {
      "id": "u1-sent",
      "u": "Unit 1・Weather Sentences"
    },
    {
      "id": "u1-phonics",
      "u": "Unit 1・Phonics e_e / ee"
    },
    {
      "id": "u1-daily",
      "u": "Unit 1・The Big Wind"
    },
    {
      "id": "u2-vocab",
      "u": "Unit 2・Numbers & Time"
    },
    {
      "id": "u2-sent",
      "u": "Unit 2・Time Sentences"
    },
    {
      "id": "u2-phonics",
      "u": "Unit 2・Phonics i_e"
    },
    {
      "id": "u2-daily",
      "u": "Unit 2・Going Back Home"
    },
    {
      "id": "u3-vocab",
      "u": "Unit 3・School Supplies"
    },
    {
      "id": "u3-sent",
      "u": "Unit 3・Possessive Sentences"
    },
    {
      "id": "u3-phonics",
      "u": "Unit 3・Phonics o_e"
    },
    {
      "id": "u3-daily",
      "u": "Unit 3・Be Honest"
    },
    {
      "id": "u4-vocab",
      "u": "Unit 4・Position Words"
    },
    {
      "id": "u4-sent",
      "u": "Unit 4・Where Sentences"
    },
    {
      "id": "u4-phonics",
      "u": "Unit 4・Phonics u_e"
    },
    {
      "id": "u4-daily",
      "u": "Unit 4・Earthquake Drill"
    },
    {
      "id": "culture-halloween",
      "u": "Culture & Festivals・Halloween"
    },
    {
      "id": "task-emergency",
      "u": "Task・Emergency Weather"
    },
    {
      "id": "review1-teen-ty",
      "u": "Review 1・-teen / -ty"
    },
    {
      "id": "review2-syllables",
      "u": "Review 2・Syllables"
    },
    {
      "id": "classroom-characters",
      "u": "Classroom English & Characters"
    },
    {
      "id": "world-picture",
      "u": "Picture Dictionary & Around the World"
    },
    {
      "id": "review-family-animals",
      "u": "Vocabulary Review・Family & Animals"
    },
    {
      "id": "review-jobs-abilities",
      "u": "Vocabulary Review・Jobs & Abilities"
    }
  ],
  "vocab": [
    {
      "sid": "gr-numbers",
      "en": "eleven",
      "kk": "[ɪˋlɛvən]",
      "zh": "十一"
    },
    {
      "sid": "gr-numbers",
      "en": "twelve",
      "kk": "[twɛlv]",
      "zh": "十二"
    },
    {
      "sid": "gr-numbers",
      "en": "thirteen",
      "kk": "[ˏθɝˋtin]",
      "zh": "十三"
    },
    {
      "sid": "gr-numbers",
      "en": "fourteen",
      "kk": "[ˏfɔrˋtin]",
      "zh": "十四"
    },
    {
      "sid": "gr-numbers",
      "en": "fifteen",
      "kk": "[ˏfɪfˋtin]",
      "zh": "十五"
    },
    {
      "sid": "gr-numbers",
      "en": "sixteen",
      "kk": "[ˏsɪksˋtin]",
      "zh": "十六"
    },
    {
      "sid": "gr-numbers",
      "en": "seventeen",
      "kk": "[ˏsɛvənˋtin]",
      "zh": "十七"
    },
    {
      "sid": "gr-numbers",
      "en": "eighteen",
      "kk": "[eˋtin]",
      "zh": "十八"
    },
    {
      "sid": "gr-numbers",
      "en": "nineteen",
      "kk": "[ˏnaɪnˋtin]",
      "zh": "十九"
    },
    {
      "sid": "gr-numbers",
      "en": "twenty",
      "kk": "[ˋtwɛnti]",
      "zh": "二十"
    },
    {
      "sid": "u1-vocab",
      "en": "cloudy",
      "kk": "[ˋklaʊdi]",
      "zh": "多雲的"
    },
    {
      "sid": "u1-vocab",
      "en": "rainy",
      "kk": "[ˋreni]",
      "zh": "下雨的"
    },
    {
      "sid": "u1-vocab",
      "en": "sunny",
      "kk": "[ˋsʌni]",
      "zh": "晴朗的"
    },
    {
      "sid": "u1-vocab",
      "en": "windy",
      "kk": "[ˋwɪndi]",
      "zh": "有風的"
    },
    {
      "sid": "u1-vocab",
      "en": "cold",
      "kk": "[kold]",
      "zh": "寒冷的"
    },
    {
      "sid": "u1-vocab",
      "en": "hot",
      "kk": "[hɑt]",
      "zh": "炎熱的"
    },
    {
      "sid": "u2-vocab",
      "en": "fifteen",
      "kk": "[ˏfɪfˋtin]",
      "zh": "十五"
    },
    {
      "sid": "u2-vocab",
      "en": "twenty",
      "kk": "[ˋtwɛnti]",
      "zh": "二十"
    },
    {
      "sid": "u2-vocab",
      "en": "twenty-five",
      "kk": "[ˏtwɛntiˋfaɪv]",
      "zh": "二十五"
    },
    {
      "sid": "u2-vocab",
      "en": "thirty",
      "kk": "[ˋθɝti]",
      "zh": "三十"
    },
    {
      "sid": "u2-vocab",
      "en": "forty",
      "kk": "[ˋfɔrti]",
      "zh": "四十"
    },
    {
      "sid": "u2-vocab",
      "en": "fifty",
      "kk": "[ˋfɪfti]",
      "zh": "五十"
    },
    {
      "sid": "u3-vocab",
      "en": "book",
      "kk": "[bʊk]",
      "zh": "書"
    },
    {
      "sid": "u3-vocab",
      "en": "eraser",
      "kk": "[ɪˋresɚ]",
      "zh": "橡皮擦"
    },
    {
      "sid": "u3-vocab",
      "en": "marker",
      "kk": "[ˋmɑrkɚ]",
      "zh": "麥克筆"
    },
    {
      "sid": "u3-vocab",
      "en": "pen",
      "kk": "[pɛn]",
      "zh": "筆"
    },
    {
      "sid": "u3-vocab",
      "en": "pencil",
      "kk": "[ˋpɛnsəl]",
      "zh": "鉛筆"
    },
    {
      "sid": "u3-vocab",
      "en": "ruler",
      "kk": "[ˋrulɚ]",
      "zh": "尺"
    },
    {
      "sid": "u4-vocab",
      "en": "in",
      "kk": "[ɪn]",
      "zh": "在……裡面"
    },
    {
      "sid": "u4-vocab",
      "en": "on",
      "kk": "[ɑn]",
      "zh": "在……上面"
    },
    {
      "sid": "u4-vocab",
      "en": "under",
      "kk": "[ˋʌndɚ]",
      "zh": "在……下面"
    },
    {
      "sid": "u4-vocab",
      "en": "box",
      "kk": "[bɑks]",
      "zh": "盒子"
    },
    {
      "sid": "u4-vocab",
      "en": "chair",
      "kk": "[tʃɛr]",
      "zh": "椅子"
    },
    {
      "sid": "u4-vocab",
      "en": "desk",
      "kk": "[dɛsk]",
      "zh": "書桌"
    },
    {
      "sid": "culture-halloween",
      "en": "ghost",
      "kk": "[gost]",
      "zh": "鬼"
    },
    {
      "sid": "culture-halloween",
      "en": "jack-o'-lantern",
      "kk": "[ˋdʒæk ə ˏlæntɚn]",
      "zh": "南瓜燈"
    },
    {
      "sid": "culture-halloween",
      "en": "mummy",
      "kk": "[ˋmʌmi]",
      "zh": "木乃伊"
    },
    {
      "sid": "culture-halloween",
      "en": "vampire",
      "kk": "[ˋvæmpaɪr]",
      "zh": "吸血鬼"
    },
    {
      "sid": "culture-halloween",
      "en": "witch",
      "kk": "[wɪtʃ]",
      "zh": "女巫"
    },
    {
      "sid": "task-emergency",
      "en": "earthquake",
      "kk": "[ˋɝθˏkwek]",
      "zh": "地震"
    },
    {
      "sid": "task-emergency",
      "en": "fire",
      "kk": "[faɪr]",
      "zh": "火災"
    },
    {
      "sid": "task-emergency",
      "en": "flood",
      "kk": "[flʌd]",
      "zh": "水災"
    },
    {
      "sid": "task-emergency",
      "en": "mudslide",
      "kk": "[ˋmʌdˏslaɪd]",
      "zh": "土石流"
    },
    {
      "sid": "task-emergency",
      "en": "rainy",
      "kk": "[ˋreni]",
      "zh": "下雨的"
    },
    {
      "sid": "task-emergency",
      "en": "windy",
      "kk": "[ˋwɪndi]",
      "zh": "有風的"
    },
    {
      "sid": "task-emergency",
      "en": "cold",
      "kk": "[kold]",
      "zh": "寒冷的"
    },
    {
      "sid": "task-emergency",
      "en": "hot",
      "kk": "[hɑt]",
      "zh": "炎熱的"
    },
    {
      "sid": "task-emergency",
      "en": "dark",
      "kk": "[dɑrk]",
      "zh": "黑暗的"
    }
  ],
  "reviewVocab": [
    {
      "en": "grandfather",
      "kk": "[ˋgrænˏfɑðɚ]",
      "zh": "祖父",
      "group": "family"
    },
    {
      "en": "grandmother",
      "kk": "[ˋgrænˏmʌðɚ]",
      "zh": "祖母",
      "group": "family"
    },
    {
      "en": "father",
      "kk": "[ˋfɑðɚ]",
      "zh": "爸爸",
      "group": "family"
    },
    {
      "en": "mother",
      "kk": "[ˋmʌðɚ]",
      "zh": "媽媽",
      "group": "family"
    },
    {
      "en": "brother",
      "kk": "[ˋbrʌðɚ]",
      "zh": "兄弟",
      "group": "family"
    },
    {
      "en": "sister",
      "kk": "[ˋsɪstɚ]",
      "zh": "姊妹",
      "group": "family"
    },
    {
      "en": "me",
      "kk": "[mi]",
      "zh": "我",
      "group": "family"
    },
    {
      "en": "bird",
      "kk": "[bɝd]",
      "zh": "鳥",
      "group": "animals"
    },
    {
      "en": "cat",
      "kk": "[kæt]",
      "zh": "貓",
      "group": "animals"
    },
    {
      "en": "dog",
      "kk": "[dɔg]",
      "zh": "狗",
      "group": "animals"
    },
    {
      "en": "frog",
      "kk": "[frɔg]",
      "zh": "青蛙",
      "group": "animals"
    },
    {
      "en": "rabbit",
      "kk": "[ˋræbɪt]",
      "zh": "兔子",
      "group": "animals"
    },
    {
      "en": "ox",
      "kk": "[ɑks]",
      "zh": "公牛",
      "group": "animals"
    },
    {
      "en": "cook",
      "kk": "[kʊk]",
      "zh": "廚師",
      "group": "jobs"
    },
    {
      "en": "doctor",
      "kk": "[ˋdɑktɚ]",
      "zh": "醫生",
      "group": "jobs"
    },
    {
      "en": "nurse",
      "kk": "[nɝs]",
      "zh": "護士",
      "group": "jobs"
    },
    {
      "en": "student",
      "kk": "[ˋstudnt]",
      "zh": "學生",
      "group": "jobs"
    },
    {
      "en": "teacher",
      "kk": "[ˋtitʃɚ]",
      "zh": "老師",
      "group": "jobs"
    },
    {
      "en": "dance",
      "kk": "[dæns]",
      "zh": "跳舞",
      "group": "abilities"
    },
    {
      "en": "draw",
      "kk": "[drɔ]",
      "zh": "畫畫",
      "group": "abilities"
    },
    {
      "en": "sing",
      "kk": "[sɪŋ]",
      "zh": "唱歌",
      "group": "abilities"
    },
    {
      "en": "swim",
      "kk": "[swɪm]",
      "zh": "游泳",
      "group": "abilities"
    },
    {
      "en": "fly a kite",
      "kk": "[flaɪ ə kaɪt]",
      "zh": "放風箏",
      "group": "abilities"
    },
    {
      "en": "ride a bike",
      "kk": "[raɪd ə baɪk]",
      "zh": "騎腳踏車",
      "group": "abilities"
    }
  ],
  "phonics": [
    {
      "sid": "gr-a-e",
      "sound": "長母音 /e/（a_e）",
      "short": "短母音 /æ/",
      "words": [
        "cape",
        "tape",
        "mate",
        "cake",
        "cap",
        "tap",
        "mat",
        "hat"
      ]
    },
    {
      "sid": "u1-phonics",
      "sound": "長母音 /i/（e_e、ee）",
      "short": "短母音 /ɛ/",
      "words": [
        "Pete",
        "theme",
        "sea",
        "Eve",
        "pet",
        "Ted",
        "them",
        "less"
      ]
    },
    {
      "sid": "u2-phonics",
      "sound": "長母音 /aɪ/（i_e）",
      "short": "短母音 /ɪ/",
      "words": [
        "kite",
        "pine",
        "wine",
        "time",
        "kit",
        "pin",
        "win",
        "Tim"
      ]
    },
    {
      "sid": "u3-phonics",
      "sound": "長母音 /o/（o_e）",
      "short": "短母音 /ɑ/",
      "words": [
        "hope",
        "robe",
        "code",
        "note",
        "hop",
        "rob",
        "cod",
        "not"
      ]
    },
    {
      "sid": "u4-phonics",
      "sound": "長母音 u_e（/ju/ 或 /u/）",
      "short": "短母音 /ʌ/",
      "words": [
        "cute",
        "cube",
        "tube",
        "duke",
        "cut",
        "cub",
        "tub",
        "duck"
      ]
    }
  ],
  "passages": [
    {
      "id": "p01",
      "tag": "素養題組・Get Ready 生日卡片"
    },
    {
      "id": "p02",
      "tag": "素養題組・Unit 1 天氣預報"
    },
    {
      "id": "p03",
      "tag": "素養題組・Unit 1 The Big Wind"
    },
    {
      "id": "p04",
      "tag": "素養題組・Unit 1 下雨天"
    },
    {
      "id": "p05",
      "tag": "素養題組・Unit 2 我的一天"
    },
    {
      "id": "p06",
      "tag": "素養題組・Unit 2 Going Back Home"
    },
    {
      "id": "p07",
      "tag": "素養題組・Unit 2 放學鐘聲"
    },
    {
      "id": "p08",
      "tag": "素養題組・Unit 3 Lost and Found"
    },
    {
      "id": "p09",
      "tag": "素養題組・Unit 3 Be Honest"
    },
    {
      "id": "p10",
      "tag": "素養題組・Unit 3 The Cool Eraser"
    },
    {
      "id": "p11",
      "tag": "素養題組・Unit 4 Where Is My Pen?"
    },
    {
      "id": "p12",
      "tag": "素養題組・Unit 4 Earthquake Drill"
    },
    {
      "id": "p13",
      "tag": "素養題組・Unit 4 The Go Bag"
    },
    {
      "id": "p14",
      "tag": "素養題組・Culture & Festivals Halloween"
    },
    {
      "id": "p15",
      "tag": "素養題組・Task 緊急情況"
    },
    {
      "id": "p16",
      "tag": "素養題組・Review 1 市場數字"
    },
    {
      "id": "p17",
      "tag": "素養題組・Review 2 音節遊戲"
    },
    {
      "id": "p18",
      "tag": "素養題組・Classroom English 新同學"
    },
    {
      "id": "p19",
      "tag": "素養題組・Characters 他是誰？"
    },
    {
      "id": "p20",
      "tag": "素養題組・Around the World 世界時鐘"
    }
  ]
};

(function () {
  "use strict";

  var START = new Date(2026, 9, 19);
  var NDAYS = 19;
  var WEEK = ["日", "一", "二", "三", "四", "五", "六"];
  var COLORS = [
    "#2f6fed", "#7a5c9e", "#2f8f5b", "#c46a1f", "#3a7ca5",
    "#b5563f", "#a2506b", "#5b6cc4", "#0f766e", "#9a6a1f",
    "#4a7c59", "#c05a86", "#2b7a78", "#8c5a2b", "#3f6f9f",
    "#8a3f6f", "#567a2f", "#6f4a8a", "#0e7490"
  ];

  function pad2(n) { return (n < 10 ? "0" : "") + n; }
  function dayLabel(d) {
    var dt = new Date(START.getTime());
    dt.setDate(dt.getDate() + d);
    var m = dt.getMonth() + 1, dd = dt.getDate();
    return { md: m + "/" + dd, week: WEEK[dt.getDay()], iso: dt.getFullYear() + "-" + pad2(m) + "-" + pad2(dd) };
  }

  function lcg(seed) {
    var a = seed >>> 0;
    return function () {
      a = (a * 1664525 + 1013904223) >>> 0;
      return a;
    };
  }
  function makeSeq(seed, n) {
    var base = [];
    var counts = [13, 13, 12, 12];
    for (var i = 0; i < 4; i++) for (var j = 0; j < counts[i]; j++) base.push(i);
    var rnd = lcg(seed);
    for (var k = base.length - 1; k > 0; k--) {
      var j2 = rnd() % (k + 1);
      var t = base[k]; base[k] = base[j2]; base[j2] = t;
    }
    return base;
  }
  function okSeq(s) {
    for (var i = 2; i < s.length; i++) if (s[i] === s[i - 1] && s[i] === s[i - 2]) return false;
    return true;
  }
  function findSeq(seed, n) {
    for (var k = 0; k < 8000; k++) {
      var s = makeSeq(seed + k * 7919, n);
      if (okSeq(s)) return s;
    }
    return makeSeq(seed, n);
  }
  function placeTo(item, target) {
    var o = item.o.slice(), w = item.w.slice(), a = item.a;
    if (a !== target) {
      var t = o[a]; o[a] = o[target]; o[target] = t;
      var u = w[a]; w[a] = w[target]; w[target] = u;
    }
    return {
      g: 4,
      sid: item.sid,
      u: item.u,
      d: item.d,
      q: item.q,
      o: o,
      a: target,
      e: item.e,
      w: w,
      p: item.p
    };
  }

  var SELECT_BY_SID = {};
  SELECT.forEach(function (q) {
    if (!SELECT_BY_SID[q.sid]) SELECT_BY_SID[q.sid] = [];
    SELECT_BY_SID[q.sid].push(q);
  });

  var FLAT = [];
  SECTIONS.forEach(function (s) {
    SELECT_BY_SID[s.id].forEach(function (q) { FLAT.push(q); });
  });

  function coreFor(day) {
    var out = [];
    SECTIONS.forEach(function (s) {
      var arr = SELECT_BY_SID[s.id];
      out.push(arr[day % arr.length]);
    });
    return out;
  }

  function extrasFor(day, used) {
    var out = [];
    var offset = day % SECTIONS.length;
    for (var j = 0; j < SECTIONS.length && out.length < 14; j++) {
      var sec = SECTIONS[(offset + j) % SECTIONS.length];
      var arr = SELECT_BY_SID[sec.id];
      var start = (day * 3 + j) % arr.length;
      for (var k = 0; k < arr.length; k++) {
        var q = arr[(start + k) % arr.length];
        if (used[q.q]) continue;
        used[q.q] = 1;
        out.push(q);
        break;
      }
    }
    return out;
  }

  function passageQ(pg, q) {
    return {
      g: 4,
      sid: null,
      u: pg.tag,
      d: q.d,
      q: q.q,
      o: [q.c].concat(q.ws.map(function (x) { return x[0]; })),
      a: 0,
      e: q.e,
      w: [""].concat(q.ws.map(function (x) { return x[1]; })),
      p: pg.p
    };
  }

  var papers = [];
  for (var d = 0; d < NDAYS; d++) {
    var lab = dayLabel(d);
    var key = "eng-day-" + pad2(d + 1);
    var name = lab.md + " 英語文期中考／期末考";

    var core = coreFor(d);
    var used = {};
    core.forEach(function (q) { used[q.q] = 1; });
    var extras = extrasFor(d, used);
    var items = core.concat(extras);

    var p1 = PASSAGES[(d * 2) % PASSAGES.length];
    var p2 = PASSAGES[(d * 2 + 7) % PASSAGES.length];
    if (p2.id === p1.id) p2 = PASSAGES[(d * 2 + 8) % PASSAGES.length];

    var all = items.slice();
    p1.qs.forEach(function (q) { all.push(passageQ(p1, q)); });
    p2.qs.forEach(function (q) { all.push(passageQ(p2, q)); });

    var seq = findSeq(20261019 + d * 7919, 50);
    var qs = all.map(function (q, i) { return placeTo(q, seq[i]); });

    var note = "26 小節全涵蓋｜Get Ready＋Units 1–4＋Culture & Festivals＋Task＋Review 1–2＋Picture Dictionary／Around the World／Word Hunt";
    papers.push({
      key: key,
      name: name,
      short: lab.md,
      color: COLORS[d % COLORS.length],
      grades: "四年級",
      minutes: 50,
      note: note,
      q: qs
    });
  }

  window.EXAM = window.EXAM || {};
  window.EXAM.sections = SECTIONS;
  window.EXAM.scope = SCOPE;
  window.EXAM.stats = {
    select: SELECT.length,
    passages: PASSAGES.length,
    papers: papers.length,
    sections: SECTIONS.length
  };
  window.EXAM.papers = papers;
})();
