/* ============================================================
   英語文期中考／期末考 題庫（2026 年 11 月）
   依 108 課綱第二學習階段 英語文 命題（原創自編，非官方試題）
   範圍：第1單元 語言能力(聽)、第3單元 語言能力(讀)、
         第7單元 學習方法與策略、第8單元 文化理解、
         第9單元 邏輯思考、判斷與創造力
   ------------------------------------------------------------
   文字標記（index.html 會自動轉換）：
     *英文*        → 可點擊的英文，點一下用 en-US 語音發音
     `[音標]`      → 以淺灰小字顯示的 KK 音標
     其餘文字      → 一般中文
   ============================================================ */
(function () {
  "use strict";

  /* ==================== 一、語音（聽辨音）資料 ====================
     每組：
       u  : 子題代號與名稱
       s  : 本組要辨識的發音
       wt : 對照單字的發音說明
       y  : 含有本組發音的單字
       n  : 不含本組發音的對照單字
     單字 = [英文, KK音標, 中文]
  */
  var PHONICS = [
    { u: "1-2-1 語音 a_e / a", s: "長母音 /e/（a_e）", wt: "短母音 /æ/",
      y: [["cake", "[kek]", "蛋糕"], ["name", "[nem]", "名字"], ["game", "[gem]", "遊戲"], ["gate", "[get]", "大門"]],
      n: [["cat", "[kæt]", "貓"], ["hat", "[hæt]", "帽子"], ["map", "[mæp]", "地圖"], ["bag", "[bæg]", "書包"]] },
    { u: "1-2-2 語音 ee / e_e / e", s: "長母音 /i/（ee、e_e）", wt: "短母音 /ɛ/",
      y: [["tree", "[tri]", "樹"], ["green", "[grin]", "綠色的"], ["bee", "[bi]", "蜜蜂"], ["sleep", "[slip]", "睡覺"]],
      n: [["bed", "[bɛd]", "床"], ["pen", "[pɛn]", "筆"], ["ten", "[tɛn]", "十"], ["red", "[rɛd]", "紅色的"]] },
    { u: "1-2-3 語音 i_e / i", s: "長母音 /aɪ/（i_e）", wt: "短母音 /ɪ/",
      y: [["bike", "[baɪk]", "腳踏車"], ["five", "[faɪv]", "五"], ["kite", "[kaɪt]", "風箏"], ["nine", "[naɪn]", "九"]],
      n: [["big", "[bɪg]", "大的"], ["pig", "[pɪg]", "豬"], ["six", "[sɪks]", "六"], ["sit", "[sɪt]", "坐"]] },
    { u: "1-2-4 語音 o_e / o", s: "長母音 /o/（o_e）", wt: "短母音 /ɑ/",
      y: [["nose", "[noz]", "鼻子"], ["home", "[hom]", "家"], ["rose", "[roz]", "玫瑰"], ["hope", "[hop]", "希望"]],
      n: [["dog", "[dɔg]", "狗"], ["box", "[bɑks]", "盒子"], ["hot", "[hɑt]", "熱的"], ["pot", "[pɑt]", "鍋子"]] },
    { u: "1-2-5 語音 u_e / u", s: "長母音 /ju/（u_e）", wt: "短母音 /ʌ/",
      y: [["cute", "[kjut]", "可愛的"], ["cube", "[kjub]", "方塊"], ["mule", "[mjul]", "騾"], ["tube", "[tjub]", "管子"]],
      n: [["cup", "[kʌp]", "杯子"], ["bus", "[bʌs]", "公車"], ["sun", "[sʌn]", "太陽"], ["cut", "[kʌt]", "切"]] },
    { u: "1-2-6 語音 Bb / Pp", s: "子音 /b/（Bb）", wt: "子音 /p/",
      y: [["book", "[bʊk]", "書"], ["ball", "[bɔl]", "球"], ["bird", "[bɝd]", "鳥"], ["banana", "[bəˋnænə]", "香蕉"]],
      n: [["pen", "[pɛn]", "筆"], ["pig", "[pɪg]", "豬"], ["pencil", "[ˋpɛnsəl]", "鉛筆"], ["panda", "[ˋpændə]", "貓熊"]] },
    { u: "1-2-7 語音 Xx", s: "子音 /ks/（Xx）", wt: "不含 /ks/ 的音",
      y: [["box", "[bɑks]", "盒子"], ["six", "[sɪks]", "六"], ["fox", "[fɑks]", "狐狸"], ["taxi", "[ˋtæksi]", "計程車"]],
      n: [["sun", "[sʌn]", "太陽"], ["cat", "[kæt]", "貓"], ["dog", "[dɔg]", "狗"], ["bag", "[bæg]", "書包"]] },
    { u: "1-2-8 語音 Ll / Rr", s: "子音 /l/（Ll）", wt: "子音 /r/",
      y: [["lion", "[ˋlaɪən]", "獅子"], ["lemon", "[ˋlɛmən]", "檸檬"], ["leaf", "[lif]", "葉子"], ["light", "[laɪt]", "燈光"]],
      n: [["rain", "[ren]", "雨"], ["rabbit", "[ˋræbɪt]", "兔子"], ["red", "[rɛd]", "紅色的"], ["rice", "[raɪs]", "米飯"]] },
    { u: "1-2-9 語音 ng", s: "子音 /ŋ/（ng）", wt: "不含 /ŋ/ 的音",
      y: [["sing", "[sɪŋ]", "唱歌"], ["song", "[sɔŋ]", "歌曲"], ["ring", "[rɪŋ]", "戒指"], ["king", "[kɪŋ]", "國王"]],
      n: [["sun", "[sʌn]", "太陽"], ["hand", "[hænd]", "手"], ["milk", "[mɪlk]", "牛奶"], ["red", "[rɛd]", "紅色的"]] },
    { u: "1-2-10 語音 th", s: "子音 /θ/（th）", wt: "不含 /θ/ 的音",
      y: [["three", "[θri]", "三"], ["thank", "[θæŋk]", "謝謝"], ["thin", "[θɪn]", "瘦的"], ["bath", "[bæθ]", "洗澡"]],
      n: [["tree", "[tri]", "樹"], ["sink", "[sɪŋk]", "水槽"], ["sing", "[sɪŋ]", "唱歌"], ["ten", "[tɛn]", "十"]] },
    { u: "1-2-11 語音 sh", s: "子音 /ʃ/（sh）", wt: "不含 /ʃ/ 的音",
      y: [["ship", "[ʃɪp]", "船"], ["shop", "[ʃɑp]", "商店"], ["fish", "[fɪʃ]", "魚"], ["shoe", "[ʃu]", "鞋子"]],
      n: [["sip", "[sɪp]", "小口喝"], ["chip", "[tʃɪp]", "洋芋片"], ["sit", "[sɪt]", "坐"], ["six", "[sɪks]", "六"]] },
    { u: "1-2-12 語音 ch", s: "子音 /tʃ/（ch）", wt: "不含 /tʃ/ 的音",
      y: [["chair", "[tʃɛr]", "椅子"], ["cheese", "[tʃiz]", "起司"], ["chicken", "[ˋtʃɪkɪn]", "雞"], ["lunch", "[lʌntʃ]", "午餐"]],
      n: [["shop", "[ʃɑp]", "商店"], ["ship", "[ʃɪp]", "船"], ["cat", "[kæt]", "貓"], ["sock", "[sɑk]", "襪子"]] },
    { u: "1-2-13 語音 wh", s: "子音 /hw/（wh）", wt: "不含 /hw/ 的音",
      y: [["what", "[hwɑt]", "什麼"], ["when", "[hwɛn]", "什麼時候"], ["white", "[hwaɪt]", "白色的"], ["wheel", "[hwil]", "輪子"]],
      n: [["wet", "[wɛt]", "濕的"], ["win", "[wɪn]", "贏"], ["wood", "[wʊd]", "木頭"], ["water", "[ˋwɔtɚ]", "水"]] },
    { u: "1-2-14 語音 長母音 /e/", s: "長母音 /e/（a_e、ai、ay、eigh）", wt: "短母音 /æ/",
      y: [["cake", "[kek]", "蛋糕"], ["rain", "[ren]", "雨"], ["play", "[ple]", "玩"], ["eight", "[et]", "八"]],
      n: [["cat", "[kæt]", "貓"], ["hat", "[hæt]", "帽子"], ["bag", "[bæg]", "書包"], ["map", "[mæp]", "地圖"]] },
    { u: "1-2-15 語音 長母音 /i/", s: "長母音 /aɪ/（i_e、i、igh、ie、y）", wt: "短母音 /ɪ/",
      y: [["light", "[laɪt]", "燈光"], ["pie", "[paɪ]", "派"], ["my", "[maɪ]", "我的"], ["kite", "[kaɪt]", "風箏"]],
      n: [["pig", "[pɪg]", "豬"], ["six", "[sɪks]", "六"], ["big", "[bɪg]", "大的"], ["sit", "[sɪt]", "坐"]] },
    { u: "1-2-16 語音 長母音 /o/", s: "長母音 /o/（oe、oa、ow、o_e）", wt: "短母音 /ɔ/、/ɑ/",
      y: [["toe", "[to]", "腳趾"], ["boat", "[bot]", "船"], ["snow", "[sno]", "雪"], ["coat", "[kot]", "外套"]],
      n: [["dog", "[dɔg]", "狗"], ["box", "[bɑks]", "盒子"], ["hot", "[hɑt]", "熱的"], ["sock", "[sɑk]", "襪子"]] },
    { u: "1-2-17 語音 -en / -ell", s: "韻尾 /ɛn/ 或 /ɛl/", wt: "不含 /ɛn/、/ɛl/ 的音",
      y: [["pen", "[pɛn]", "筆"], ["ten", "[tɛn]", "十"], ["bell", "[bɛl]", "鈴"], ["well", "[wɛl]", "水井"]],
      n: [["sun", "[sʌn]", "太陽"], ["cow", "[kaʊ]", "牛"], ["hat", "[hæt]", "帽子"], ["dog", "[dɔg]", "狗"]] },
    { u: "1-2-18 語音 Pp / Tt", s: "子音 /t/（Tt）", wt: "子音 /p/",
      y: [["ten", "[tɛn]", "十"], ["top", "[tɑp]", "陀螺"], ["turtle", "[ˋtɝtəl]", "烏龜"], ["tea", "[ti]", "茶"]],
      n: [["pig", "[pɪg]", "豬"], ["pen", "[pɛn]", "筆"], ["park", "[pɑrk]", "公園"], ["panda", "[ˋpændə]", "貓熊"]] }
  ];

  /* ==================== 二、單字／片語資料 ====================
     每個子題 items 的排列順序有特別安排：
       items[0] → 出「中文選英文」題
       items[1] → 出「英文選中文」題
       items[2] → 出「音標選單字」題
     其餘單字則當作誘答選項（同一子題內的其他單字）。
  */
  var VOCAB = [
    { u: "1-7-1 食物・健康飲料", items: [
      ["apple juice", "[ˋæpəl dʒus]", "蘋果汁"], ["grape juice", "[grep dʒus]", "葡萄汁"],
      ["orange juice", "[ˋɔrɪndʒ dʒus]", "柳橙汁"], ["guava juice", "[ˋgwɑvə dʒus]", "芭樂汁"],
      ["banana milk", "[bəˋnænə mɪlk]", "香蕉牛奶"], ["papaya milk", "[pəˋpaɪə mɪlk]", "木瓜牛奶"] ] },
    { u: "1-7-2 食物・水果農場", items: [
      ["pineapple", "[ˋpaɪnæpəl]", "鳳梨"], ["blueberry", "[ˋbluˏbɛri]", "藍莓"],
      ["watermelon", "[ˋwɔtɚˏmɛlən]", "西瓜"], ["dragon fruit", "[ˋdrægən frut]", "火龍果"],
      ["star fruit", "[stɑr frut]", "楊桃"], ["strawberry", "[ˋstrɔˏbɛri]", "草莓"] ] },
    { u: "1-7-3 生活・Make a wish!", items: [
      ["eat", "[it]", "吃"], ["walk", "[wɔk]", "走路"], ["sleep", "[slip]", "睡覺"],
      ["drink", "[drɪŋk]", "喝"], ["run", "[rʌn]", "跑步"] ] },
    { u: "1-7-4 能力・才藝表演", items: [
      ["dance", "[dæns]", "跳舞"], ["jump", "[dʒʌmp]", "跳"], ["read", "[rid]", "閱讀"],
      ["write", "[raɪt]", "寫字"], ["sing", "[sɪŋ]", "唱歌"], ["swim", "[swɪm]", "游泳"] ] },
    { u: "1-7-5 房間・家中的角落", items: [
      ["living room", "[ˋlɪvɪŋ rum]", "客廳"], ["dining room", "[ˋdaɪnɪŋ rum]", "餐廳"],
      ["kitchen", "[ˋkɪtʃɪn]", "廚房"], ["bedroom", "[ˋbɛdˏrum]", "臥房"], ["bathroom", "[ˋbæθˏrum]", "浴室"] ] },
    { u: "1-7-6 算數・飢餓的猴子", items: [
      ["thirteen", "[ˏθɝˋtin]", "十三"], ["fourteen", "[ˏfɔrˋtin]", "十四"], ["fifteen", "[ˏfɪfˋtin]", "十五"],
      ["sixteen", "[ˏsɪksˋtin]", "十六"], ["eighteen", "[eˋtin]", "十八"], ["nineteen", "[ˏnaɪnˋtin]", "十九"] ] },
    { u: "1-7-7 購物・買點心去遠足", items: [
      ["ten", "[tɛn]", "十"], ["twenty", "[ˋtwɛnti]", "二十"], ["thirty", "[ˋθɝti]", "三十"],
      ["forty", "[ˋfɔrti]", "四十"], ["fifty", "[ˋfɪfti]", "五十"] ] },
    { u: "1-7-8 位置・亂糟糟的書桌", items: [
      ["by", "[baɪ]", "在……旁邊"], ["in", "[ɪn]", "在……裡面"],
      ["on", "[ɑn]", "在……上面"], ["under", "[ˋʌndɚ]", "在……下面"] ] },
    { u: "1-7-9 物品・教室裡的椅子", items: [
      ["window", "[ˋwɪndo]", "窗戶"], ["table", "[ˋtebəl]", "桌子"], ["door", "[dɔr]", "門"],
      ["blackboard", "[ˋblækˏbɔrd]", "黑板"], ["chair", "[tʃɛr]", "椅子"] ] },
    { u: "1-7-10 動物・農場上的動物", items: [
      ["horse", "[hɔrs]", "馬"], ["duck", "[dʌk]", "鴨子"], ["cow", "[kaʊ]", "牛"],
      ["pig", "[pɪg]", "豬"], ["chicken", "[ˋtʃɪkɪn]", "雞"] ] },
    { u: "1-7-11 天氣・臺灣早安", items: [
      ["sunny", "[ˋsʌni]", "晴朗的"], ["rainy", "[ˋreni]", "下雨的"], ["snowy", "[ˋsnoi]", "下雪的"],
      ["windy", "[ˋwɪndi]", "有風的"], ["cloudy", "[ˋklaʊdi]", "多雲的"] ] },
    { u: "1-7-12 食物・果汁吧點餐", items: [
      ["hot coffee", "[hɑt ˋkɔfi]", "熱咖啡"], ["hot tea", "[hɑt ti]", "熱紅茶"], ["milk tea", "[mɪlk ti]", "奶茶"],
      ["water", "[ˋwɔtɚ]", "水"], ["apple juice", "[ˋæpəl dʒus]", "蘋果汁"], ["orange juice", "[ˋɔrɪndʒ dʒus]", "柳橙汁"] ] },
    { u: "3-2-1 食物・水果小知識(1)", items: [
      ["apple", "[ˋæpəl]", "蘋果"], ["banana", "[bəˋnænə]", "香蕉"], ["papaya", "[pəˋpaɪə]", "木瓜"],
      ["grape", "[grep]", "葡萄"], ["orange", "[ˋɔrɪndʒ]", "柳橙"], ["guava", "[ˋgwɑvə]", "芭樂"] ] },
    { u: "3-2-2 食物・水果小知識(2)", items: [
      ["strawberry", "[ˋstrɔˏbɛri]", "草莓"], ["dragon fruit", "[ˋdrægən frut]", "火龍果"],
      ["star fruit", "[stɑr frut]", "楊桃"], ["pineapple", "[ˋpaɪnæpəl]", "鳳梨"],
      ["watermelon", "[ˋwɔtɚˏmɛlən]", "西瓜"], ["blueberry", "[ˋbluˏbɛri]", "藍莓"] ] },
    { u: "3-2-3 生活・動物喜歡做的事", items: [
      ["run", "[rʌn]", "跑步"], ["drink", "[drɪŋk]", "喝"], ["eat", "[it]", "吃"],
      ["sleep", "[slip]", "睡覺"], ["walk", "[wɔk]", "走路"] ] },
    { u: "3-2-4 能力・家人喜歡做的事", items: [
      ["sing", "[sɪŋ]", "唱歌"], ["swim", "[swɪm]", "游泳"], ["write", "[raɪt]", "寫字"],
      ["jump", "[dʒʌmp]", "跳"], ["read", "[rid]", "閱讀"], ["dance", "[dæns]", "跳舞"] ] },
    { u: "3-2-5 房間・房子裡的家", items: [
      ["bedroom", "[ˋbɛdˏrum]", "臥房"], ["bathroom", "[ˋbæθˏrum]", "浴室"], ["living room", "[ˋlɪvɪŋ rum]", "客廳"],
      ["kitchen", "[ˋkɪtʃɪn]", "廚房"], ["dining room", "[ˋdaɪnɪŋ rum]", "餐廳"] ] },
    { u: "3-2-6 自我介紹・交新朋友", items: [
      ["thirteen", "[ˏθɝˋtin]", "十三歲"], ["seventeen", "[ˏsɛvənˋtin]", "十七歲"], ["sixteen", "[ˏsɪksˋtin]", "十六歲"],
      ["fourteen", "[ˏfɔrˋtin]", "十四歲"], ["fifteen", "[ˏfɪfˋtin]", "十五歲"],
      ["eighteen", "[eˋtin]", "十八歲"], ["nineteen", "[ˏnaɪnˋtin]", "十九歲"] ] },
    { u: "3-2-7 時間・我的一天", items: [
      ["o'clock", "[əˋklɑk]", "……點鐘"], ["forty", "[ˋfɔrti]", "四十"], ["fifty", "[ˋfɪfti]", "五十"],
      ["ten", "[tɛn]", "十"], ["twenty", "[ˋtwɛnti]", "二十"], ["thirty", "[ˋθɝti]", "三十"] ] },
    { u: "3-2-8 位置・尋找彩蛋", items: [
      ["in", "[ɪn]", "在……裡面"], ["under", "[ˋʌndɚ]", "在……下面"],
      ["by", "[baɪ]", "在……旁邊"], ["on", "[ɑn]", "在……上面"] ] },
    { u: "3-2-9 物品・從髒亂到整齊", items: [
      ["chair", "[tʃɛr]", "椅子"], ["blackboard", "[ˋblækˏbɔrd]", "黑板"], ["window", "[ˋwɪndo]", "窗戶"],
      ["table", "[ˋtebəl]", "桌子"], ["door", "[dɔr]", "門"] ] },
    { u: "3-2-10 動物・動物的家", items: [
      ["pig", "[pɪg]", "豬"], ["chicken", "[ˋtʃɪkɪn]", "雞"], ["horse", "[hɔrs]", "馬"],
      ["cow", "[kaʊ]", "牛"], ["duck", "[dʌk]", "鴨子"] ] },
    { u: "3-2-11 天氣・祝你美好的一天", items: [
      ["windy", "[ˋwɪndi]", "有風的"], ["cloudy", "[ˋklaʊdi]", "多雲的"], ["sunny", "[ˋsʌni]", "晴朗的"],
      ["rainy", "[ˋreni]", "下雨的"], ["snowy", "[ˋsnoi]", "下雪的"] ] },
    { u: "3-2-12 食物・飲料點餐", items: [
      ["coffee", "[ˋkɔfi]", "咖啡"], ["soda", "[ˋsodə]", "汽水"], ["milk", "[mɪlk]", "牛奶"],
      ["tea", "[ti]", "茶"], ["water", "[ˋwɔtɚ]", "水"] ] }
  ];

  /* ==================== 三、手寫選擇題 ==================== */
  var HAND = [
  /* ---------- 1-Ⅱ-8 能聽懂簡易的教室用語 ---------- */
  { u: "1-8-1 教室用語・Can You Help Me?", d: "易", q: "老師說 *Can you help me?* `[kæn ju hɛlp mi]`，是什麼意思？", o: ["你能幫我一下嗎？", "你要回家了嗎？", "你今年幾歲？", "你想吃什麼？"], a: 0, e: "*Can you help me?* 是請人幫忙的說法，意思是「你能幫我一下嗎？」。", w: ["", "問回家要用 *Are you going home?*。", "問年齡要用 *How old are you?*。", "問吃什麼要用 *What do you want to eat?*。"] },
  { u: "1-8-1 教室用語・Can You Help Me?", d: "中", q: "你想請同學幫忙，英文要怎麼說？", o: ["*Can you help me?*", "*Can I help you?*", "*Are you OK?*", "*How are you?*"], a: 0, e: "「你能幫我嗎？」是 *Can you help me?*。", w: ["", "*Can I help you?* 是「我能幫你嗎？」，方向剛好相反。", "*Are you OK?* 是問對方好不好。", "*How are you?* 是見面問候語。"] },
  { u: "1-8-2 教室用語・Follow Me", d: "易", q: "老師說 *Follow me.* `[ˋfɑlo mi]`，要大家做什麼？", o: ["跟著老師走", "坐下來", "把書收起來", "大聲唱歌"], a: 0, e: "*Follow me.* 是「跟著我、跟我來」。", w: ["", "坐下是 *Sit down.*。", "收書是 *Put away your books.*。", "唱歌是 *Sing a song.*。"] },
  { u: "1-8-2 教室用語・Follow Me", d: "中", q: "下列哪一句是「請跟我來」？", o: ["*Follow me, please.*", "*Help me, please.*", "*Thank you.*", "*Good job.*"], a: 0, e: "*Follow me, please.* 是「請跟我來」。", w: ["", "*Help me.* 是「幫幫我」。", "*Thank you.* 是「謝謝」。", "*Good job.* 是「做得好」。"] },
  { u: "1-8-3 教室用語・Ready, Go & Stop", d: "易", q: "老師喊 *Ready? Go!* `[ˋrɛdi go]`，是什麼意思？", o: ["預備，開始！", "請安靜", "請排隊", "再試一次"], a: 0, e: "*Ready? Go!* 是活動開始前的口令，意思是「預備，開始！」。", w: ["", "請安靜是 *Be quiet, please.*。", "排隊是 *Line up, please.*。", "再試一次是 *Try again.*。"] },
  { u: "1-8-3 教室用語・Ready, Go & Stop", d: "易", q: "老師喊 *Stop!* `[stɑp]` 的時候，應該怎麼做？", o: ["立刻停下來", "繼續往前走", "大聲回答老師", "跑去問老師"], a: 0, e: "*Stop!* 就是「停下來」。", w: ["", "繼續走就沒有遵守指令。", "應該先停下來聽老師說話。", "應該先停下來聽老師說話。"] },
  { u: "1-8-4 教室用語・Repeat After Me", d: "易", q: "*Repeat after me.* `[rɪˋpit ˋæftɚ mi]` 是什麼意思？", o: ["跟著我念一遍", "把我寫的字擦掉", "再算一次", "把課本打開"], a: 0, e: "*Repeat after me.* 是「跟著我念一遍」。", w: ["", "擦字是 *Clean the board.*。", "再算一次是 *Try again.*。", "打開課本是 *Open your books.*。"] },
  { u: "1-8-4 教室用語・Repeat After Me", d: "中", q: "老師說 *Repeat after me. Apple.* 你要做什麼？", o: ["念一遍 *apple*", "畫一顆蘋果", "吃一顆蘋果", "把 *apple* 抄十遍"], a: 0, e: "老師要你跟著念，所以是念一遍 *apple*。", w: ["", "老師沒有要你畫圖。", "老師沒有要你吃東西。", "老師只說念一遍，不是抄十遍。"] },
  { u: "1-8-5 教室用語・Let's Count!", d: "易", q: "*Let's count!* `[lɛts kaʊnt]` 是什麼意思？", o: ["我們來數數看！", "我們來畫圖！", "我們來唱歌！", "我們來打掃！"], a: 0, e: "*count* 是「數」，*Let's count!* 是「我們來數數看！」。", w: ["", "畫圖是 *draw*。", "唱歌是 *sing*。", "打掃是 *clean*。"] },
  { u: "1-8-5 教室用語・Let's Count!", d: "中", q: "*Let's count from one to ten.* `[frəm wʌn tu tɛn]` 是要從哪裡數到哪裡？", o: ["從 1 數到 10", "從 10 數到 1", "從 1 數到 100", "從 10 數到 20"], a: 0, e: "*from one to ten* 是「從一數到十」。", w: ["", "題目是從 1 到 10，不是倒著數。", "*to ten* 是到十，不是一百。", "題目的終點是 *ten*（10）。"] },
  { u: "1-8-6 教室用語・Try Again. Good Job!", d: "易", q: "你答錯了，老師說 *Try again.* `[traɪ əˋgɛn]`，是什麼意思？", o: ["再試一次", "你答對了", "請坐下", "下課了"], a: 0, e: "*Try again.* 是「再試一次」。", w: ["", "答對是 *Good job!*。", "坐下是 *Sit down.*。", "下課是 *Class is over.*。"] },
  { u: "1-8-6 教室用語・Try Again. Good Job!", d: "易", q: "你答對了，老師說 *Good job!* `[gʊd dʒɑb]`，是什麼意思？", o: ["做得好！", "再試一次", "請安靜", "小心一點"], a: 0, e: "*Good job!* 是讚美，意思是「做得好！」。", w: ["", "再試一次是 *Try again.*。", "請安靜是 *Be quiet.*。", "小心是 *Be careful.*。"] },
  { u: "1-8-7 教室用語・Here You Are.", d: "易", q: "你把東西遞給同學時說 *Here you are.* `[hɪr ju ɑr]`，這句話是什麼意思？", o: ["這個給你", "你在哪裡", "你在做什麼", "謝謝你"], a: 0, e: "*Here you are.* 是遞東西給別人時說的「這個給你」。", w: ["", "*Where are you?* 才是「你在哪裡」。", "*What are you doing?* 才是「你在做什麼」。", "謝謝你是 *Thank you.*。"] },
  { u: "1-8-7 教室用語・Here You Are.", d: "中", q: "老師說 *Here you are. Your new book.* 老師在做什麼？", o: ["把新書交給學生", "請學生把書收起來", "請學生去買書", "叫學生自己看書"], a: 0, e: "*Here you are.* 是把東西交給對方，所以是「把新書給學生」。", w: ["", "收書是 *Put away your book.*。", "買書是 *buy a book*。", "自己看書是 *Read by yourself.*。"] },
  { u: "1-8-8 教室用語・See You Again.", d: "易", q: "放學時同學說 *See you again.* `[si ju əˋgɛn]`，是什麼意思？", o: ["再見，下次見", "早安", "請進", "對不起"], a: 0, e: "*See you again.* 是道別時說的「再見、下次見」。", w: ["", "早安是 *Good morning.*。", "請進是 *Come in.*。", "對不起是 *Sorry.*。"] },
  { u: "1-8-8 教室用語・See You Again.", d: "中", q: "下列哪一句最適合用在放學道別？", o: ["*See you again.*", "*Good morning.*", "*Here you are.*", "*Bless you!*"], a: 0, e: "道別時說 *See you again.*。", w: ["", "*Good morning.* 用在早上打招呼。", "*Here you are.* 用在拿東西給別人。", "*Bless you!* 用在有人打噴嚏時。"] },
  { u: "1-8-9 教室用語・Line Up, Please.", d: "易", q: "老師說 *Line up, please.* `[laɪn ʌp pliz]`，要大家做什麼？", o: ["排隊", "坐好", "舉手", "擦黑板"], a: 0, e: "*Line up* 是「排隊」。", w: ["", "坐好是 *Sit down.*。", "舉手是 *Raise your hand.*。", "擦黑板是 *Clean the blackboard.*。"] },
  { u: "1-8-9 教室用語・Line Up, Please.", d: "中", q: "句子裡加上 *please* `[pliz]`，最主要的作用是什麼？", o: ["讓語氣更有禮貌", "把句子變成命令句", "把句子變成過去式", "把句子變成問句"], a: 0, e: "*please* 讓請求聽起來更客氣、有禮貌。", w: ["", "*please* 反而讓命令變客氣，不是更兇。", "過去式要改變動詞，不是加 *please*。", "問句要把 be 動詞或助動詞移到前面。"] },
  { u: "1-8-10 教室用語・Bless You!", d: "易", q: "同學打噴嚏，你說 *Bless you!* `[blɛs ju]`，這句話的意思是？", o: ["祝福你（保重）", "你好棒", "請讓一讓", "請再說一次"], a: 0, e: "有人打噴嚏時說 *Bless you!*，是祝福對方。", w: ["", "讚美是 *Good job!*。", "請讓一讓是 *Excuse me.*。", "請再說一次是 *Say it again, please.*。"] },
  { u: "1-8-10 教室用語・Bless You!", d: "中", q: "什麼時候適合說 *Bless you!*？", o: ["有人打噴嚏時", "有人生日時", "有人受傷時", "有人考一百分時"], a: 0, e: "*Bless you!* 用在有人打噴嚏時。", w: ["", "生日要說 *Happy birthday!*。", "有人受傷要問 *Are you OK?*。", "考得好要說 *Good job!*。"] },
  { u: "1-8-11 教室用語・Sorry, I'm late.", d: "易", q: "你遲到了，進教室時說 *Sorry, I'm late.* `[ˋsɑri aɪm let]`，是什麼意思？", o: ["對不起，我遲到了", "對不起，我忘了帶書", "謝謝你等我", "我可以進來嗎"], a: 0, e: "*Sorry, I'm late.* 是為遲到道歉。", w: ["", "忘了帶書要說 *Sorry, I forgot my book.*。", "謝謝是 *Thank you.*。", "請求進入要說 *May I come in?*。"] },
  { u: "1-8-11 教室用語・Sorry, I'm late.", d: "中", q: "老師回答 *That's OK. Come in.* `[ðæts oˋke kʌm ɪn]` 是什麼意思？", o: ["沒關係，進來吧", "你遲到了，要處罰", "請你先回家", "請坐好不要說話"], a: 0, e: "*That's OK.* 是「沒關係」，*Come in.* 是「進來吧」。", w: ["", "老師說的是「沒關係」。", "*Come in* 是要你進教室，不是回家。", "老師沒有說 *Sit down and be quiet.*。"] },
  { u: "1-8-12 教室用語・Can you give me a hand?", d: "中", q: "*Can you give me a hand?* `[kæn ju gɪv mi ə hænd]` 是什麼意思？", o: ["你能幫我一下嗎？", "你能借我一支筆嗎？", "你能跟我握手嗎？", "你能給我你的手套嗎？"], a: 0, e: "*give me a hand* 是「幫我一下」的常用說法。", w: ["", "借筆要說 *May I borrow your pencil?*。", "握手是 *shake hands*。", "手套是 *gloves*，不是 *hand*。"] },
  { u: "1-8-12 教室用語・Can you give me a hand?", d: "中", q: "下列哪一句和 *Can you help me?* 意思最接近？", o: ["*Can you give me a hand?*", "*Can you see me?*", "*Can you swim?*", "*Can you call me?*"], a: 0, e: "*give me a hand* 和 *help me* 都是請別人幫忙。", w: ["", "*see me* 是「看見我」。", "*swim* 是「游泳」。", "*call me* 是「打電話給我」。"] },
  /* ---------- 1-Ⅱ-9 能聽懂簡易的日常生活用語 ---------- */
  { u: "1-9-1 問候・Please. Thank You. Sorry.", d: "易", q: "別人送你禮物，你要說什麼？", o: ["*Thank you.*", "*Sorry.*", "*Please.*", "*Here you are.*"], a: 0, e: "收到東西要說 *Thank you.*（謝謝）。", w: ["", "*Sorry.* 是「對不起」。", "*Please.* 是「請」。", "*Here you are.* 是「這個給你」。"] },
  { u: "1-9-1 問候・Please. Thank You. Sorry.", d: "易", q: "你不小心撞到同學，要說什麼？", o: ["*Sorry.*", "*Thank you.*", "*Please.*", "*Good job.*"], a: 0, e: "撞到人要說 *Sorry.*（對不起）。", w: ["", "*Thank you.* 是道謝。", "*Please.* 用在提出請求時。", "*Good job.* 是讚美。"] },
  { u: "1-9-2 生活・May I Go to the Restroom?", d: "中", q: "上課中你想上廁所，英文要怎麼說？", o: ["*May I go to the restroom?*", "*May I go home?*", "*May I have a cup of tea?*", "*May I close the door?*"], a: 0, e: "*restroom* 是廁所，*May I go to the restroom?* 是「我可以去上廁所嗎？」。", w: ["", "*go home* 是「回家」。", "*a cup of tea* 是「一杯茶」。", "*close the door* 是「關門」。"] },
  { u: "1-9-2 生活・May I Go to the Restroom?", d: "中", q: "老師回答 *Yes, you may.* `[jɛs ju me]` 是什麼意思？", o: ["好的，你可以去", "不行，你不可以去", "你先等一下", "你去問別人"], a: 0, e: "*Yes, you may.* 是同意，意思是「好的，你可以去」。", w: ["", "同意要用 *Yes*，不是 *No*。", "老師沒有叫你等一下。", "老師沒有叫你去問別人。"] },
  { u: "1-9-3 問候・Are You OK?", d: "中", q: "同學看起來不太舒服，你問 *Are you OK?* `[ɑr ju oˋke]` 是什麼意思？", o: ["你還好嗎？", "你是誰？", "你要去哪裡？", "你幾歲？"], a: 0, e: "*Are you OK?* 是關心別人「你還好嗎？」。", w: ["", "問人是 *Who are you?*。", "問去哪裡是 *Where are you going?*。", "問年齡是 *How old are you?*。"] },
  { u: "1-9-3 問候・Are You OK?", d: "難", q: "*What's wrong?* `[hwɑts rɔŋ]` 和下列哪一句意思最接近？", o: ["*What's the matter?*", "*How are you?*", "*Where are you?*", "*What time is it?*"], a: 0, e: "*What's wrong?* 和 *What's the matter?* 都是問「怎麼了？」。", w: ["", "*How are you?* 是見面問候語。", "*Where are you?* 是問在哪裡。", "*What time is it?* 是問時間。"] },
  { u: "1-9-4 生活・May I Borrow Your Pencil?", d: "中", q: "你想借同學的鉛筆，英文要怎麼說？", o: ["*May I borrow your pencil?*", "*May I give you a pencil?*", "*May I draw a pencil?*", "*May I buy your pencil?*"], a: 0, e: "*borrow* 是「借入」，*May I borrow your pencil?* 是「我可以借你的鉛筆嗎？」。", w: ["", "*give you* 是「給你」，方向剛好相反。", "*draw* 是畫圖，不能這樣用。", "*buy* 是「買」，不是借。"] },
  { u: "1-9-4 生活・May I Borrow Your Pencil?", d: "中", q: "同學回答 *Sure. Here you are.* `[ʃʊr hɪr ju ɑr]` 是什麼意思？", o: ["當然，這個給你", "不行，我自己要用", "我自己也沒有", "請你自己去買"], a: 0, e: "*Sure.* 是「當然」，*Here you are.* 是「這個給你」。", w: ["", "同學說的是 *Sure*，是同意。", "同學沒有說 *I don't have one.*。", "同學沒有叫你去買。"] },
  { u: "1-9-5 家人・This is my family.", d: "易", q: "*This is my family.* `[ðɪs ɪz maɪ ˋfæməli]` 是什麼意思？", o: ["這是我的家人", "這是我的家", "這是我的書", "這是我的朋友"], a: 0, e: "*family* 是「家人」。", w: ["", "「我家」是 *my house* 或 *my home*。", "書是 *book*。", "朋友是 *friend*。"] },
  { u: "1-9-5 家人・This is my family.", d: "中", q: "你要介紹爸爸給同學認識，英文要怎麼說？", o: ["*This is my father.*", "*This is my mother.*", "*This is my sister.*", "*This is my teacher.*"], a: 0, e: "介紹爸爸要說 *This is my father.*（這是我爸爸）。", w: ["", "*mother* 是媽媽。", "*sister* 是姊妹。", "*teacher* 是老師。"] },
  { u: "1-9-6 情緒・I'm Happy.", d: "易", q: "*I'm happy.* `[aɪm ˋhæpi]` 是什麼意思？", o: ["我很快樂", "我很生氣", "我很累", "我很餓"], a: 0, e: "*happy* 是「快樂的」。", w: ["", "生氣是 *angry*。", "累是 *tired*。", "餓是 *hungry*。"] },
  { u: "1-9-6 情緒・I'm Happy.", d: "易", q: "你很難過，英文要怎麼說？", o: ["*I'm sad.*", "*I'm happy.*", "*I'm angry.*", "*I'm tired.*"], a: 0, e: "難過是 *sad*，所以要說 *I'm sad.*。", w: ["", "*happy* 是快樂。", "*angry* 是生氣。", "*tired* 是累。"] },
  { u: "1-9-7 常用語・Have fun.", d: "易", q: "同學要去校外教學，你說 *Have fun!* `[hæv fʌn]`，是什麼意思？", o: ["玩得開心！", "祝你生日快樂！", "小心一點！", "記得早點回來！"], a: 0, e: "*Have fun!* 是祝福別人「玩得開心！」。", w: ["", "生日要說 *Happy birthday!*。", "小心是 *Be careful.*。", "提醒早回是 *Come back early.*。"] },
  { u: "1-9-7 常用語・Have fun.", d: "中", q: "下列哪一句最適合用在「祝福別人玩得愉快」？", o: ["*Have fun!*", "*Have a seat.*", "*Have a cup of tea.*", "*Have a try.*"], a: 0, e: "*Have fun!* 用來祝福別人玩得開心。", w: ["", "*Have a seat.* 是請對方坐下。", "*Have a cup of tea.* 是請對方喝茶。", "*Have a try.* 是請對方試試看。"] },
  { u: "1-9-8 食物・It's yummy.", d: "易", q: "*It's yummy.* `[ɪts ˋjʌmi]` 是在形容什麼？", o: ["食物很好吃", "天氣很好", "音樂很好聽", "地方很好玩"], a: 0, e: "*yummy* 是「好吃的」，用來形容食物。", w: ["", "天氣好是 *It's a nice day.*。", "音樂好聽是 *It sounds good.*。", "地方好玩是 *It's fun.*。"] },
  { u: "1-9-8 食物・It's yummy.", d: "易", q: "「這個蛋糕很好吃。」英文要怎麼說？", o: ["*The cake is yummy.*", "*The cake is yucky.*", "*The cake is big.*", "*The cake is cold.*"], a: 0, e: "好吃是 *yummy*，所以說 *The cake is yummy.*。", w: ["", "*yucky* 是「難吃」，意思相反。", "*big* 是「大」。", "*cold* 是「冷」。"] },
  { u: "1-9-9 常用語・Follow me.", d: "中", q: "參觀校園時，老師說 *Follow me, please.* `[ˋfɑlo mi pliz]`，老師要大家做什麼？", o: ["跟在老師後面走", "自己逛自己的", "回教室坐好", "大聲喊口號"], a: 0, e: "*Follow me, please.* 是請大家跟著老師走。", w: ["", "老師請大家跟著走，不是各自行動。", "老師沒有要大家回教室。", "老師沒有要大家喊口號。"] },
  { u: "1-9-9 常用語・Follow me.", d: "中", q: "哪一個場合最適合說 *Follow me.*？", o: ["老師帶隊參觀時", "同學受傷時", "放學說再見時", "有人打噴嚏時"], a: 0, e: "帶隊前進時會說 *Follow me.*（跟著我）。", w: ["", "同學受傷要問 *Are you OK?*。", "道別要說 *See you again.*。", "有人打噴嚏要說 *Bless you!*。"] },
  { u: "1-9-10 常用語・It's over there.", d: "易", q: "*It's over there.* `[ɪts ˋovɚ ðɛr]` 是什麼意思？", o: ["在那邊", "在這裡", "在桌上", "在下面"], a: 0, e: "*over there* 是「在那邊」。", w: ["", "在這裡是 *It's here.*。", "在桌上要說 *on the table*。", "在下面是 *under*。"] },
  { u: "1-9-10 常用語・It's over there.", d: "中", q: "同學問 *Where is the library?* 你指著遠方，英文要怎麼說？", o: ["*It's over there.*", "*It's here.*", "*It's mine.*", "*It's yummy.*"], a: 0, e: "指著遠處要說 *It's over there.*。", w: ["", "*here* 是「這裡」，距離不對。", "*mine* 是「我的」。", "*yummy* 是「好吃」。"] },
  { u: "1-9-11 常用語・How about you?", d: "中", q: "同學說 *I like apples. How about you?* `[haʊ əˋbaʊt ju]` 最後一句是什麼意思？", o: ["那你呢？", "你幾歲？", "你要幾個？", "你是誰？"], a: 0, e: "*How about you?* 是「那你呢？」。", w: ["", "問年齡是 *How old are you?*。", "問數量是 *How many?*。", "問人是 *Who are you?*。"] },
  { u: "1-9-11 常用語・How about you?", d: "難", q: "同學說 *I'm happy.* 接著問 *How about you?*，他在問什麼？", o: ["問你的心情如何", "問你住在哪裡", "問你要不要吃東西", "問你幾點回家"], a: 0, e: "*How about you?* 是把同樣的問題反問對方，這裡是問心情。", w: ["", "問住哪裡是 *Where do you live?*。", "問要不要吃是 *Do you want some?*。", "問時間是 *What time?*。"] },
  { u: "1-9-12 常用語・This is my cup of tea.", d: "中", q: "*This is my cup of tea.* `[ðɪs ɪz maɪ kʌp əv ti]` 是什麼意思？", o: ["這是我的一杯茶", "這是我的一杯咖啡", "這是我的杯子", "這是我買的茶葉"], a: 0, e: "*a cup of tea* 是「一杯茶」。", w: ["", "咖啡是 *coffee*。", "只說杯子的話只有 *cup*，沒有 *of tea*。", "茶葉是 *tea leaves*。"] },
  { u: "1-9-12 常用語・This is my cup of tea.", d: "中", q: "哪一句話最適合用來「介紹自己的東西」？", o: ["*This is my cup of tea.*", "*This is your bag.*", "*That is a cat.*", "*Is this your book?*"], a: 0, e: "*This is my cup of tea.* 是在介紹「這是我的（東西）」。", w: ["", "*your bag* 是「你的書包」，不是自己的。", "*That is a cat.* 是在介紹一隻貓。", "*Is this your book?* 是問句，不是介紹。"] },
  { u: "1-9-13 常用語・Wait a minute!", d: "易", q: "*Wait a minute!* `[wet ə ˋmɪnɪt]` 是什麼意思？", o: ["等一下！", "快一點！", "過來！", "回家吧！"], a: 0, e: "*Wait a minute!* 是「等一下！」。", w: ["", "快一點是 *Hurry up!*。", "過來是 *Come here.*。", "回家是 *Go home.*。"] },
  { u: "1-9-13 常用語・Wait a minute!", d: "中", q: "同學一直催你快一點，你想請他等一下，英文要怎麼說？", o: ["*Wait a minute, please.*", "*Hurry up, please.*", "*Go away, please.*", "*Come in, please.*"], a: 0, e: "請對方等一下要說 *Wait a minute, please.*。", w: ["", "*Hurry up* 是催人快一點，意思相反。", "*Go away* 是叫對方走開，很沒有禮貌。", "*Come in* 是請對方進來。"] },
  /* ---------- 1-Ⅱ-10 能聽懂簡易句型的句子 ---------- */
  { u: "1-10-1 時間・What time is it? (1)", d: "易", q: "*What time is it?* `[hwɑt taɪm ɪz ɪt]` 是什麼意思？", o: ["現在幾點？", "今天星期幾？", "你幾歲？", "現在在哪裡？"], a: 0, e: "*What time is it?* 是問「現在幾點？」。", w: ["", "問星期是 *What day is it?*。", "問年齡是 *How old are you?*。", "問在哪裡是 *Where is it?*。"] },
  { u: "1-10-1 時間・What time is it? (1)", d: "中", q: "「現在三點。」英文要怎麼說？", o: ["*It's three o'clock.*", "*It's three years.*", "*I'm three.*", "*Three, please.*"], a: 0, e: "整點要說 *It's three o'clock.*。", w: ["", "*years* 是「年」，不能用來報時。", "*I'm three.* 是「我三歲」。", "*Three, please.* 不是報時的句型。"] },
  { u: "1-10-2 時間・What time is it? (2)", d: "中", q: "「現在六點三十分。」英文要怎麼說？", o: ["*It's six thirty.*", "*It's six thirteen.*", "*It's sixteen.*", "*It's thirty six.*"], a: 0, e: "六點三十分是 *It's six thirty.*。", w: ["", "*six thirteen* 是六點十三分。", "*It's sixteen.* 是「十六」。", "*thirty six* 是三十六，時和分順序錯了。"] },
  { u: "1-10-2 時間・What time is it? (2)", d: "中", q: "*It's seven fifteen.* `[ɪts ˋsɛvən ˋfɪftin]` 是幾點幾分？", o: ["七點十五分", "七點五十分", "五點十七分", "十七點五分"], a: 0, e: "*seven* 是時、*fifteen* 是分，所以是七點十五分。", w: ["", "五十分是 *fifty*。", "五點十七分是時和分顛倒了。", "十七點五分是時和分顛倒了。"] },
  { u: "1-10-3 地點・Where are you?", d: "易", q: "*Where are you?* `[hwɛr ɑr ju]` 是什麼意思？", o: ["你在哪裡？", "你是誰？", "你在做什麼？", "你幾歲？"], a: 0, e: "*Where are you?* 是問「你在哪裡？」。", w: ["", "問人是 *Who are you?*。", "問做什麼是 *What are you doing?*。", "問年齡是 *How old are you?*。"] },
  { u: "1-10-3 地點・Where are you?", d: "中", q: "「我在教室。」英文要怎麼說？", o: ["*I'm in the classroom.*", "*I'm a classroom.*", "*I like the classroom.*", "*The classroom is big.*"], a: 0, e: "在教室裡要說 *I'm in the classroom.*。", w: ["", "少了一個介系詞 *in*。", "*like* 是「喜歡」。", "這句的主詞是教室，不是「我」。"] },
  { u: "1-10-4 地點・Where is he/she?", d: "易", q: "*Where is she?* `[hwɛr ɪz ʃi]` 是什麼意思？", o: ["她在哪裡？", "她是誰？", "她幾歲？", "她好嗎？"], a: 0, e: "*Where is she?* 是問「她在哪裡？」。", w: ["", "問人是 *Who is she?*。", "問年齡是 *How old is she?*。", "問好不好是 *Is she OK?*。"] },
  { u: "1-10-4 地點・Where is he/she?", d: "中", q: "「他在公園。」英文要怎麼說？", o: ["*He is in the park.*", "*He is a park.*", "*She is in the park.*", "*He likes the park.*"], a: 0, e: "「他在公園」要說 *He is in the park.*。", w: ["", "少了一個介系詞 *in*。", "主詞是 *She*，和「他」不同。", "*likes* 是「喜歡」，不是「在」。"] },
  { u: "1-10-5 食物・Do you like ...?", d: "易", q: "*Do you like cake?* `[du ju laɪk kek]` 是什麼意思？", o: ["你喜歡蛋糕嗎？", "你會做蛋糕嗎？", "你要買蛋糕嗎？", "蛋糕多少錢？"], a: 0, e: "*Do you like ...?* 是問「你喜歡……嗎？」。", w: ["", "會不會做要問 *Can you make a cake?*。", "要不要買要問 *Do you want to buy a cake?*。", "問價錢是 *How much is the cake?*。"] },
  { u: "1-10-5 食物・Do you like ...?", d: "中", q: "你不喜歡牛奶，要怎麼回答 *Do you like milk?*？", o: ["*No, I don't.*", "*Yes, I do.*", "*No, I like milk.*", "*Yes, I don't.*"], a: 0, e: "不喜歡要回答 *No, I don't.*。", w: ["", "*Yes, I do.* 是「喜歡」。", "前後矛盾，*No* 後面不能接 *I like milk.*。", "英文不能說 *Yes, I don't.*。"] },
  { u: "1-10-6 能力・Can you ...?", d: "易", q: "*Can you swim?* `[kæn ju swɪm]` 是什麼意思？", o: ["你會游泳嗎？", "你要去游泳嗎？", "你喜歡游泳嗎？", "你昨天游泳了嗎？"], a: 0, e: "*Can you ...?* 是問「你會……嗎？」。", w: ["", "要去游泳是 *Are you going to swim?*。", "喜歡是 *Do you like swimming?*。", "問過去是 *Did you swim?*。"] },
  { u: "1-10-6 能力・Can you ...?", d: "中", q: "你會跳舞，要怎麼回答 *Can you dance?*？", o: ["*Yes, I can.*", "*Yes, I do.*", "*No, I can't.*", "*Yes, I am.*"], a: 0, e: "*Can* 開頭的問句要用 *can* 回答：*Yes, I can.*。", w: ["", "*do* 是用來回答 *Do you ...?* 的問句。", "*No, I can't.* 是「不會」。", "*am* 是用來回答 *Are you ...?* 的問句。"] },
  { u: "1-10-7 食物・What do you want?", d: "易", q: "*What do you want?* `[hwɑt du ju wɑnt]` 是什麼意思？", o: ["你想要什麼？", "你要去哪裡？", "你是誰？", "現在幾點？"], a: 0, e: "*What do you want?* 是問「你想要什麼？」。", w: ["", "問去哪裡是 *Where do you want to go?*。", "問人是 *Who are you?*。", "問時間是 *What time is it?*。"] },
  { u: "1-10-7 食物・What do you want?", d: "中", q: "「我想要一個漢堡。」英文要怎麼說？", o: ["*I want a hamburger.*", "*I want an hamburger.*", "*I like a hamburger.*", "*I have a hamburger.*"], a: 0, e: "*hamburger* 的發音以子音開頭，前面要用 *a*。", w: ["", "*hamburger* 以子音開頭，要用 *a* 而不是 *an*。", "*like* 是「喜歡」。", "*have* 是「有」，不是「想要」。"] },
  { u: "1-10-8 食物・What does he/she want?", d: "中", q: "*What does he want?* `[hwɑt dʌz hi wɑnt]` 是什麼意思？", o: ["他想要什麼？", "他會做什麼？", "他幾歲？", "他住在哪裡？"], a: 0, e: "*What does he want?* 是問「他想要什麼？」。", w: ["", "問會做什麼是 *What can he do?*。", "問年齡是 *How old is he?*。", "問住哪裡是 *Where does he live?*。"] },
  { u: "1-10-8 食物・What does he/she want?", d: "難", q: "「她想要一些湯。」英文要怎麼說？", o: ["*She wants some soup.*", "*She want some soup.*", "*He wants some soup.*", "*She wants some soap.*"], a: 0, e: "主詞是 *She*，第三人稱單數的動詞要加 s。", w: ["", "主詞是第三人稱單數，動詞要加 s。", "主詞是 *He*，和「她」不同。", "*soap* 是「肥皂」，不是湯。"] },
  { u: "1-10-9 生活・What are you doing?", d: "易", q: "*What are you doing?* `[hwɑt ɑr ju ˋduɪŋ]` 是什麼意思？", o: ["你正在做什麼？", "你要去哪裡？", "你喜歡什麼？", "你要吃什麼？"], a: 0, e: "*What are you doing?* 是問「你正在做什麼？」。", w: ["", "問去哪裡是 *Where are you going?*。", "喜歡是 *What do you like?*。", "吃什麼是 *What do you want to eat?*。"] },
  { u: "1-10-9 生活・What are you doing?", d: "中", q: "「我正在看書。」英文要怎麼說？", o: ["*I am reading.*", "*I am read.*", "*I read now.*", "*I am a book.*"], a: 0, e: "正在做的事要用 *be* 動詞加 V-ing：*I am reading.*。", w: ["", "*be* 動詞後面要接 V-ing。", "現在進行式要說 *I am reading now.*。", "這句變成「我是一本書」。"] },
  { u: "1-10-10 能力・What is he/she doing in the park?", d: "中", q: "*What is he doing in the park?* `[hwɑt ɪz hi ˋduɪŋ ɪn ðə pɑrk]` 是什麼意思？", o: ["他正在公園裡做什麼？", "他去公園了嗎？", "公園在哪裡？", "他喜歡公園嗎？"], a: 0, e: "*What is he doing in the park?* 是問「他正在公園裡做什麼？」。", w: ["", "問去了沒是 *Did he go to the park?*。", "問公園在哪是 *Where is the park?*。", "問喜歡是 *Does he like the park?*。"] },
  { u: "1-10-10 能力・What is he/she doing in the park?", d: "難", q: "「她正在騎腳踏車。」英文要怎麼說？", o: ["*She is riding a bike.*", "*She is ride a bike.*", "*She rides a bike now.*", "*She is a bike.*"], a: 0, e: "進行式要用 *be* 動詞加 V-ing：*She is riding a bike.*。", w: ["", "*be* 動詞後面要接 V-ing。", "進行式一定要有 *be* 動詞。", "這句變成「她是一台腳踏車」。"] },
  { u: "1-10-11 食物・How many do you need?", d: "中", q: "*How many apples do you need?* `[haʊ ˋmɛni ˋæpəlz du ju nid]` 是什麼意思？", o: ["你需要幾顆蘋果？", "你喜歡蘋果嗎？", "蘋果多少錢？", "蘋果在哪裡？"], a: 0, e: "*How many ...?* 是用來問數量的。", w: ["", "問喜歡是 *Do you like apples?*。", "問價錢是 *How much are the apples?*。", "問在哪是 *Where are the apples?*。"] },
  { u: "1-10-11 食物・How many do you need?", d: "中", q: "「我需要三顆蛋。」英文要怎麼說？", o: ["*I need three eggs.*", "*I need three egg.*", "*I need egg three.*", "*I need three egges.*"], a: 0, e: "三顆要用複數 *three eggs*。", w: ["", "三顆要用複數 *eggs*。", "數量要放在名詞前面。", "*egg* 的複數是 *eggs*，不是 *egges*。"] },
  { u: "1-10-12 位置・Where's my yo-yo?", d: "易", q: "*Where's my yo-yo?* `[hwɛrz maɪ ˋjojo]` 是什麼意思？", o: ["我的溜溜球在哪裡？", "這是我的溜溜球嗎？", "我的溜溜球多少錢？", "你的溜溜球在哪裡？"], a: 0, e: "*Where's ...?* 是問「……在哪裡？」。", w: ["", "問「是不是」要用 *Is this my yo-yo?*。", "問價錢是 *How much is my yo-yo?*。", "*your* 是「你的」，不是「我的」。"] },
  { u: "1-10-12 位置・Where's my yo-yo?", d: "中", q: "「它在椅子下面。」英文要怎麼說？", o: ["*It's under the chair.*", "*It's on the chair.*", "*It's in the chair.*", "*It's by the chair.*"], a: 0, e: "「在……下面」是 *under*。", w: ["", "*on* 是「在……上面」。", "*in* 是「在……裡面」。", "*by* 是「在……旁邊」。"] },
  { u: "1-10-13 情緒・Are you happy?", d: "易", q: "*Are you happy?* `[ɑr ju ˋhæpi]` 是什麼意思？", o: ["你快樂嗎？", "你很餓嗎？", "你累了嗎？", "你生氣了嗎？"], a: 0, e: "*happy* 是「快樂的」。", w: ["", "餓是 *hungry*。", "累是 *tired*。", "生氣是 *angry*。"] },
  { u: "1-10-13 情緒・Are you happy?", d: "中", q: "你現在很累，要怎麼回答 *Are you tired?*？", o: ["*Yes, I am.*", "*Yes, I do.*", "*No, I am.*", "*Yes, I can.*"], a: 0, e: "*Are you ...?* 的問句要用 *be* 動詞回答：*Yes, I am.*。", w: ["", "*do* 用來回答 *Do you ...?* 的問句。", "*No* 後面不能再接 *I am*。", "*can* 用來回答 *Can you ...?* 的問句。"] },
  { u: "1-10-14 動物・Do you like bears?", d: "易", q: "*Do you like bears?* `[du ju laɪk bɛrz]` 是什麼意思？", o: ["你喜歡熊嗎？", "你怕熊嗎？", "你看過熊嗎？", "熊在哪裡？"], a: 0, e: "*Do you like ...?* 是問「你喜歡……嗎？」。", w: ["", "怕不怕要問 *Are you afraid of bears?*。", "看過沒要問 *Have you seen bears?*。", "問在哪是 *Where are the bears?*。"] },
  { u: "1-10-14 動物・Do you like bears?", d: "中", q: "你很喜歡熊，要怎麼回答 *Do you like bears?*？", o: ["*Yes, I do.*", "*Yes, I am.*", "*Yes, I can.*", "*No, I don't.*"], a: 0, e: "*Do you ...?* 的問句要用 *do* 回答：*Yes, I do.*。", w: ["", "*am* 用來回答 *Are you ...?* 的問句。", "*can* 用來回答 *Can you ...?* 的問句。", "*No, I don't.* 是「不喜歡」。"] },
  { u: "1-10-15 文具・Is this your pencil?", d: "中", q: "*Is this your pencil?* `[ɪz ðɪs jʊr ˋpɛnsəl]` 是什麼意思？", o: ["這是你的鉛筆嗎？", "這是我的鉛筆嗎？", "你的鉛筆在哪裡？", "你有幾枝鉛筆？"], a: 0, e: "*your* 是「你的」，整句是「這是你的鉛筆嗎？」。", w: ["", "*my* 才是「我的」。", "問在哪是 *Where is your pencil?*。", "問數量是 *How many pencils do you have?*。"] },
  { u: "1-10-15 文具・Is this your pencil?", d: "難", q: "那枝鉛筆是你的，要怎麼回答 *Is this your pencil?*？", o: ["*Yes, it is.*", "*Yes, I am.*", "*Yes, I do.*", "*Yes, they are.*"], a: 0, e: "*Is this ...?* 的問句要用 *it* 回答：*Yes, it is.*。", w: ["", "*I am* 用來回答 *Are you ...?* 的問句。", "*I do* 用來回答 *Do you ...?* 的問句。", "*they are* 要用在複數 *Are these ...?* 的問句。"] },
  { u: "1-10-16 動物・Do you have a turtle?", d: "中", q: "*Do you have a turtle?* `[du ju hæv ə ˋtɝtəl]` 是什麼意思？", o: ["你有養烏龜嗎？", "你喜歡烏龜嗎？", "烏龜在哪裡？", "烏龜要吃什麼？"], a: 0, e: "*Do you have ...?* 是問「你有……嗎？」。", w: ["", "問喜歡是 *Do you like turtles?*。", "問在哪是 *Where is the turtle?*。", "問吃什麼是 *What do turtles eat?*。"] },
  { u: "1-10-16 動物・Do you have a turtle?", d: "中", q: "你沒有養兔子，要怎麼回答 *Do you have a rabbit?*？", o: ["*No, I don't.*", "*No, I'm not.*", "*No, it isn't.*", "*No, I can't.*"], a: 0, e: "*Do you have ...?* 要用 *do* 回答：*No, I don't.*。", w: ["", "*I'm not* 用來回答 *Are you ...?* 的問句。", "*it isn't* 用來回答 *Is it ...?* 的問句。", "*I can't* 用來回答 *Can you ...?* 的問句。"] },
  { u: "1-10-17 食物・Do you want some juice?", d: "中", q: "*Do you want some juice?* `[du ju wɑnt sʌm dʒus]` 是什麼意思？", o: ["你要喝點果汁嗎？", "你喜歡果汁嗎？", "果汁在哪裡？", "果汁多少錢？"], a: 0, e: "*Do you want ...?* 是問「你要……嗎？」。", w: ["", "問喜歡是 *Do you like juice?*。", "問在哪是 *Where is the juice?*。", "問價錢是 *How much is the juice?*。"] },
  { u: "1-10-17 食物・Do you want some juice?", d: "難", q: "你想喝果汁，要怎麼回答 *Do you want some juice?*？", o: ["*Yes, please.*", "*Yes, I like.*", "*No, please.*", "*Yes, I am.*"], a: 0, e: "接受別人給的東西時，可以說 *Yes, please.*。", w: ["", "*like* 後面要接接受詞，不能單獨使用。", "*No* 是拒絕，和「想喝」相反。", "*I am* 不是回答 *Do you want ...?* 的用法。"] },
  /* ---------- 3-Ⅱ-3 能看懂課堂中所學的句子 ---------- */
  { u: "3-3-1 天氣・How's the weather?", d: "易", q: "*How's the weather?* `[haʊz ðə ˋwɛðɚ]` 是什麼意思？", o: ["天氣怎麼樣？", "現在幾點？", "你今天好嗎？", "今天星期幾？"], a: 0, e: "*How's the weather?* 是問天氣。", w: ["", "問時間是 *What time is it?*。", "問好是 *How are you?*。", "問星期是 *What day is it?*。"] },
  { u: "3-3-1 天氣・How's the weather?", d: "中", q: "「今天下雨。」英文要怎麼說？", o: ["*It's rainy today.*", "*It's sunny today.*", "*It's windy today.*", "*I'm rainy today.*"], a: 0, e: "天氣的主詞要用 *It*：*It's rainy today.*。", w: ["", "*sunny* 是晴天。", "*windy* 是有風。", "天氣的主詞要用 *It*，不是 *I*。"] },
  { u: "3-3-2 食物・What Do You Want for Lunch?", d: "中", q: "*What do you want for lunch?* `[hwɑt du ju wɑnt fɚ lʌntʃ]` 是什麼意思？", o: ["你午餐想吃什麼？", "你午餐吃了什麼？", "你幾點吃午餐？", "午餐好吃嗎？"], a: 0, e: "*What do you want for lunch?* 是問「你午餐想吃什麼？」。", w: ["", "問吃了什麼是 *What did you eat for lunch?*。", "問時間是 *What time do you have lunch?*。", "問好不好吃是 *Is the lunch yummy?*。"] },
  { u: "3-3-2 食物・What Do You Want for Lunch?", d: "中", q: "「我午餐想吃熱狗。」英文要怎麼說？", o: ["*I want hot dogs for lunch.*", "*I want hot dogs for dinner.*", "*I eat hot dogs for lunch.*", "*I am hot dogs for lunch.*"], a: 0, e: "「午餐想吃」要說 *I want ... for lunch.*。", w: ["", "*dinner* 是晚餐。", "*eat* 是「吃」，不是「想吃」。", "*I am hot dogs* 會變成「我是熱狗」。"] },
  { u: "3-3-3 位置・Where's my yo-yo?", d: "中", q: "讀一讀：*My yo-yo is under the table.* `[ˋʌndɚ ðə ˋtebəl]` 溜溜球在哪裡？", o: ["桌子下面", "桌子上面", "桌子旁邊", "桌子裡面"], a: 0, e: "*under the table* 是「在桌子下面」。", w: ["", "*on* 才是上面。", "*by* 才是旁邊。", "*in* 才是裡面。"] },
  { u: "3-3-3 位置・Where's my yo-yo?", d: "易", q: "讀一讀：*The ball is in the box.* `[ðə bɔl ɪz ɪn ðə bɑks]` 球在哪裡？", o: ["盒子裡面", "盒子外面", "盒子上面", "盒子旁邊"], a: 0, e: "*in the box* 是「在盒子裡面」。", w: ["", "外面要說 *outside the box*。", "上面是 *on*。", "旁邊是 *by*。"] },
  { u: "3-3-4 生活・What are you doing?", d: "中", q: "讀一讀：*I am sleeping.* `[aɪ æm ˋslipɪŋ]` 我在做什麼？", o: ["我在睡覺", "我在跑步", "我在寫字", "我在看書"], a: 0, e: "*sleeping* 是「睡覺」。", w: ["", "跑步是 *running*。", "寫字是 *writing*。", "看書是 *reading*。"] },
  { u: "3-3-4 生活・What are you doing?", d: "中", q: "讀一讀：*She is writing.* `[ʃi ɪz ˋraɪtɪŋ]` 她在做什麼？", o: ["她在寫字", "她在看書", "她在跑步", "她在睡覺"], a: 0, e: "*writing* 是「寫字」。", w: ["", "看書是 *reading*。", "跑步是 *running*。", "睡覺是 *sleeping*。"] },
  { u: "3-3-5 能力・Can You Draw?", d: "中", q: "*Can you draw?* `[kæn ju drɔ]` 是什麼意思？", o: ["你會畫畫嗎？", "你喜歡畫畫嗎？", "你在畫什麼？", "你要不要畫圖？"], a: 0, e: "*Can you draw?* 是問「你會畫畫嗎？」。", w: ["", "問喜歡是 *Do you like drawing?*。", "問畫什麼是 *What are you drawing?*。", "問要不要畫是 *Do you want to draw?*。"] },
  { u: "3-3-5 能力・Can You Draw?", d: "中", q: "你不會溜冰，要怎麼回答 *Can you skate?*？", o: ["*No, I can't.*", "*No, I don't.*", "*No, I'm not.*", "*Yes, I can.*"], a: 0, e: "*Can* 開頭的問句要用 *can* 回答：*No, I can't.*。", w: ["", "*don't* 用來回答 *Do you ...?*。", "*I'm not* 用來回答 *Are you ...?*。", "*Yes, I can.* 是「會」，意思相反。"] },
  { u: "3-3-6 房間・Where Are You?", d: "中", q: "讀一讀：*I am in the kitchen.* `[aɪ æm ɪn ðə ˋkɪtʃɪn]` 我在哪裡？", o: ["我在廚房", "我在臥房", "我在浴室", "我在客廳"], a: 0, e: "*kitchen* 是「廚房」。", w: ["", "臥房是 *bedroom*。", "浴室是 *bathroom*。", "客廳是 *living room*。"] },
  { u: "3-3-6 房間・Where Are You?", d: "中", q: "「我正在餐廳吃飯。」英文要怎麼說？", o: ["*I am eating in the dining room.*", "*I am eating in the bedroom.*", "*I am eating in the bathroom.*", "*I am sleeping in the dining room.*"], a: 0, e: "餐廳是 *dining room*，吃飯是 *eating*。", w: ["", "*bedroom* 是臥房。", "*bathroom* 是浴室。", "*sleeping* 是睡覺，不是在吃飯。"] },
  { u: "3-3-7 食物・Food and drinks", d: "中", q: "讀一讀：*I want some juice and bread.* `[aɪ wɑnt sʌm dʒus ænd brɛd]` 我想要什麼？", o: ["果汁和麵包", "牛奶和蛋糕", "果汁和蛋糕", "麵包和牛奶"], a: 0, e: "*juice* 是果汁，*bread* 是麵包。", w: ["", "*milk* 是牛奶、*cake* 是蛋糕。", "蛋糕是 *cake*。", "內容和順序都不對。"] },
  { u: "3-3-7 食物・Food and drinks", d: "易", q: "下列哪一個是「蛋糕」？", o: ["*cake* `[kek]`", "*milk* `[mɪlk]`", "*bread* `[brɛd]`", "*juice* `[dʒus]`"], a: 0, e: "*cake* 是「蛋糕」。", w: ["", "*milk* 是牛奶。", "*bread* 是麵包。", "*juice* 是果汁。"] },
  { u: "3-3-8 情緒・Are You Happy / Sad / Angry / Tired?", d: "中", q: "讀一讀：*I'm tired.* `[aɪm ˋtaɪɚd]` 我怎麼了？", o: ["我很累", "我很快樂", "我很生氣", "我很難過"], a: 0, e: "*tired* 是「累的」。", w: ["", "快樂是 *happy*。", "生氣是 *angry*。", "難過是 *sad*。"] },
  { u: "3-3-8 情緒・Are You Happy / Sad / Angry / Tired?", d: "中", q: "讀一讀：*She is angry.* `[ʃi ɪz ˋæŋgri]` 她怎麼了？", o: ["她很生氣", "她很難過", "她很快樂", "她很累"], a: 0, e: "*angry* 是「生氣的」。", w: ["", "難過是 *sad*。", "快樂是 *happy*。", "累是 *tired*。"] },
  { u: "3-3-9 時間・What Time Is It?", d: "中", q: "讀一讀：*It's eight o'clock.* `[ɪts et əˋklɑk]` 現在幾點？", o: ["八點", "七點", "九點", "八點半"], a: 0, e: "*eight o'clock* 是「八點整」。", w: ["", "七點是 *seven*。", "九點是 *nine*。", "八點半是 *eight thirty*。"] },
  { u: "3-3-9 時間・What Time Is It?", d: "中", q: "讀一讀：*It's ten twenty.* `[ɪts tɛn ˋtwɛnti]` 現在幾點幾分？", o: ["十點二十分", "十二點十分", "二點十分", "十點十二分"], a: 0, e: "*ten* 是時、*twenty* 是分，所以是十點二十分。", w: ["", "十二點十分是 *twelve ten*。", "二點十分是 *two ten*。", "十點十二分是 *ten twelve*。"] },
  { u: "3-3-10 算術・What's Ten Plus Five?", d: "中", q: "*What's ten plus five?* `[hwɑts tɛn plʌs faɪv]` 是什麼意思？", o: ["十加五是多少？", "十減五是多少？", "十乘五是多少？", "十五加十是多少？"], a: 0, e: "*plus* 是「加」。", w: ["", "*minus* 才是減。", "*times* 才是乘。", "數字和順序都不對。"] },
  { u: "3-3-10 算術・What's Ten Plus Five?", d: "中", q: "讀一讀：*Ten plus five is fifteen.* `[ˏfɪfˋtin]` 答案是多少？", o: ["15", "5", "50", "10"], a: 0, e: "10＋5＝15，*fifteen* 就是 15。", w: ["", "5 是加數。", "50 是 *fifty*。", "10 是被加數。"] },
  { u: "3-3-11 衣物・Is This Your Cap?", d: "中", q: "*Is this your cap?* `[ɪz ðɪs jʊr kæp]` 是什麼意思？", o: ["這是你的帽子嗎？", "這是你的外套嗎？", "你的帽子在哪裡？", "你喜歡這頂帽子嗎？"], a: 0, e: "*cap* 是「（有帽簷的）帽子」。", w: ["", "外套是 *coat*。", "問在哪是 *Where is your cap?*。", "問喜歡是 *Do you like this cap?*。"] },
  { u: "3-3-11 衣物・Is This Your Cap?", d: "難", q: "那不是你的帽子，要怎麼回答 *Is this your cap?*？", o: ["*No, it isn't.*", "*No, I'm not.*", "*No, I don't.*", "*No, they aren't.*"], a: 0, e: "*Is this ...?* 的問句要用 *it* 回答：*No, it isn't.*。", w: ["", "*I'm not* 用來回答 *Are you ...?*。", "*I don't* 用來回答 *Do you ...?*。", "*they aren't* 用來回答 *Are these ...?*。"] },
  { u: "3-3-12 食物・What are These / Those?", d: "中", q: "*What are these?* `[hwɑt ɑr ðiz]` 是什麼意思？", o: ["這些是什麼？", "那些是什麼？", "這是什麼？", "它們在哪裡？"], a: 0, e: "*these* 是「這些」（靠近的複數）。", w: ["", "那些是 *those*。", "單數是 *What is this?*。", "問在哪是 *Where are they?*。"] },
  { u: "3-3-12 食物・What are These / Those?", d: "中", q: "讀一讀：*These are apples.* `[ðiz ɑr ˋæpəlz]` 這些是什麼？", o: ["這些是蘋果", "那些是蘋果", "這是香蕉", "這些是橘子"], a: 0, e: "*apples* 是「蘋果」的複數。", w: ["", "那些要說 *Those are ...*。", "香蕉是 *bananas*。", "橘子是 *oranges*。"] },
  { u: "3-3-13 食物・What do you want?", d: "中", q: "讀一讀：*I want a sandwich.* `[aɪ wɑnt ə ˋsænwɪtʃ]` 我想要什麼？", o: ["一個三明治", "一個漢堡", "一顆蛋", "一顆蘋果"], a: 0, e: "*sandwich* 是「三明治」。", w: ["", "漢堡是 *hamburger*。", "蛋是 *egg*。", "蘋果是 *apple*。"] },
  { u: "3-3-13 食物・What do you want?", d: "難", q: "讀一讀：*I want an apple.* `[aɪ wɑnt ən ˋæpəl]` 為什麼這裡用 *an* 而不用 *a*？", o: ["因為 *apple* 的發音以母音開頭", "因為蘋果很好吃", "因為這裡只有一顆蘋果", "因為 *apple* 是比較長的單字"], a: 0, e: "*apple* 的發音以母音 /æ/ 開頭，所以用 *an*。", w: ["", "好不好吃和選用 *a* 或 *an* 無關。", "數量是一個，但重點是發音的開頭。", "單字長短和 *a*／*an* 無關。"] },
  /* ---------- 第7單元 學習方法與策略 ---------- */
  { u: "7-2-1 非語言訊息・Body Language", d: "中", q: "外國朋友對你 *wave*（揮手）並微笑，這通常表示什麼？", o: ["友善地打招呼", "生氣想吵架", "請你馬上離開", "他非常害怕"], a: 0, e: "*wave*（揮手）加上微笑，是友善打招呼的表現。", w: ["", "生氣通常會皺眉、大聲說話。", "揮手是打招呼，不是趕人。", "害怕的表情和微笑不一樣。"] },
  { u: "7-2-1 非語言訊息・Body Language", d: "中", q: "有人對你 *shrug*（聳肩）並攤開雙手，通常表示什麼？", o: ["他不知道或沒有辦法", "他非常生氣", "他開心極了", "他想跟你握手"], a: 0, e: "*shrug*（聳肩）常常表示「不知道、沒辦法」。", w: ["", "生氣時還會有其他表情和語氣。", "開心通常會笑、眼睛發亮。", "握手要伸出手來。"] },
  { u: "7-2-2 非語言訊息・手勢的意義", d: "易", q: "有人對你比出 *thumbs-up* `[θʌmz ʌp]`（豎起大拇指），表示什麼？", o: ["很好、很棒", "很糟糕", "請安靜", "再見"], a: 0, e: "*thumbs-up* 的意思是讚美、很好。", w: ["", "很糟是 *thumbs-down*（大拇指朝下）。", "請安靜是 *shh*。", "再見通常是揮手。"] },
  { u: "7-2-2 非語言訊息・手勢的意義", d: "易", q: "把手放在嘴前發出 *shh* `[ʃ]`，是什麼意思？", o: ["請安靜", "請過來", "請坐下", "請快一點"], a: 0, e: "*shh* 是請人安靜的聲音。", w: ["", "請過來是 *Come here.*。", "請坐下是 *Sit down, please.*。", "快一點是 *Hurry up.*。"] },
  { u: "7-2-3 非語言訊息・Clothing", d: "中", q: "圖片中的人穿著 *a suit and a tie* `[ə sut ænd ə taɪ]`（西裝與領帶），他最可能在什麼場合？", o: ["正式場合，例如婚禮", "海邊游泳", "在家睡覺", "操場上跑步"], a: 0, e: "西裝與領帶是正式服裝，適合婚禮等正式場合。", w: ["", "游泳要穿泳衣。", "睡覺要穿睡衣。", "運動要穿運動服。"] },
  { u: "7-2-3 非語言訊息・Clothing", d: "中", q: "夏天到海邊玩，穿什麼最合適？", o: ["*a T-shirt and shorts*（T 恤和短褲）", "*a suit and a tie*（西裝和領帶）", "*a sweater and a coat*（毛衣和大衣）", "*boots and gloves*（靴子和手套）"], a: 0, e: "海邊炎熱，穿 T 恤和短褲最舒服。", w: ["", "西裝領帶太正式也太熱。", "毛衣大衣是冬天穿的。", "靴子和手套是天冷時穿的。"] },
  { u: "7-2-4 非語言訊息・Signs", d: "中", q: "看到路邊紅色的標誌 *STOP* `[stɑp]`，表示什麼？", o: ["必須停下來再走", "可以快速通過", "這裡有廁所", "這裡可以停車過夜"], a: 0, e: "紅色的 *STOP* 標誌是「停車再走」。", w: ["", "看到 *STOP* 不能直接衝過去。", "廁所的標誌不是 *STOP*。", "*STOP* 不是停車場的意思。"] },
  { u: "7-2-4 非語言訊息・Signs", d: "中", q: "看到標誌 *No Smoking* `[no ˋsmokɪŋ]`，表示什麼？", o: ["這裡禁止吸菸", "這裡可以吸菸", "這裡在賣香菸", "這裡的空氣很香"], a: 0, e: "*No* 加上動作表示「禁止」，*No Smoking* 是禁止吸菸。", w: ["", "*No* 是禁止，不是允許。", "*No* 不是「賣」的意思。", "*smoking* 和「香」的意思無關。"] },
  { u: "7-2-5 非語言訊息・Read Unhappy Faces", d: "中", q: "有人 *frowns* `[fraʊnz]`（皺眉）而且嘴角往下，他最可能的心情是什麼？", o: ["難過或不開心", "非常興奮", "很驚訝", "很無聊想睡覺"], a: 0, e: "皺眉、嘴角往下是難過的表情。", w: ["", "興奮通常會笑、眼睛發亮。", "驚訝會張大眼睛和嘴巴。", "想睡通常會打呵欠、眼睛半閉。"] },
  { u: "7-2-5 非語言訊息・Read Unhappy Faces", d: "中", q: "有人 *cries* `[kraɪz]`（哭了），我們最適合怎麼做？", o: ["問他 *Are you OK?*", "大聲笑他", "假裝沒看到就走開", "只叫他不要哭"], a: 0, e: "朋友哭了要關心他，可以問 *Are you OK?*。", w: ["", "笑別人很沒有禮貌。", "假裝沒看到就沒辦法幫忙。", "只叫他不要哭，並沒有關心他。"] },
  { u: "7-2-6 語氣・Tone of Voice", d: "中", q: "說話時聲音 *loud* `[laʊd]`（很大聲）又說得很快，通常讓人覺得？", o: ["生氣或著急", "溫柔有禮", "傷心難過", "疲倦想睡"], a: 0, e: "又大聲又快通常表示生氣或著急。", w: ["", "溫柔會是輕柔、慢慢的。", "傷心通常是聲音低而慢。", "疲倦通常是聲音小又慢。"] },
  { u: "7-2-6 語氣・Tone of Voice", d: "中", q: "同一句話 *Can you help me?* 用什麼語氣說最有禮貌？", o: ["輕柔、慢慢的語氣", "又大聲又生氣的語氣", "又快又急的語氣", "冷冷平平的語氣"], a: 0, e: "輕柔、慢慢的語氣聽起來最有禮貌。", w: ["", "大聲生氣會讓人害怕。", "又快又急會顯得沒有耐心。", "冷冷平平會讓人覺得不友善。"] },
  { u: "7-2-7 非語言訊息・Read the Map", d: "中", q: "地圖上寫著 *Library* `[ˋlaɪˏbrɛri]`，是什麼地方？", o: ["圖書館", "餐廳", "醫院", "郵局"], a: 0, e: "*Library* 是圖書館。", w: ["", "餐廳是 *restaurant*。", "醫院是 *hospital*。", "郵局是 *post office*。"] },
  { u: "7-2-7 非語言訊息・Read the Map", d: "中", q: "地圖上寫著 *Restroom* `[ˋriˏstrum]`，你可以去那裡做什麼？", o: ["上廁所", "借書", "買東西", "看醫生"], a: 0, e: "*Restroom* 是洗手間，可以上廁所。", w: ["", "借書要去 *library*。", "買東西要去 *store*。", "看醫生要去 *hospital*。"] },
  { u: "7-2-8 非語言訊息・Read Face and Voice", d: "中", q: "媽媽微笑著說 *Dinner is ready.* `[ˋdɪnɚ ɪz ˋrɛdi]`，她最可能在表達什麼？", o: ["開心地叫你去吃飯", "生氣地罵你", "難過地哭著", "害怕地問你"], a: 0, e: "微笑加上這句話，是開心地叫你去吃飯。", w: ["", "罵人的時候通常不會微笑。", "哭和微笑的表情完全不同。", "害怕的聲音會發抖、表情緊張。"] },
  { u: "7-2-8 非語言訊息・Read Face and Voice", d: "難", q: "同學說 *I'm fine.* `[aɪm faɪn]` 但聲音很小、眼睛紅紅的，我們可以怎麼想？", o: ["他可能其實不太好", "他一定非常快樂", "他一定是說謊騙人", "他一定是要請你吃飯"], a: 0, e: "聲音小、眼睛紅等非語言訊息透露他可能其實不太好。", w: ["", "聲音小、眼睛紅不像快樂的樣子。", "可以先關心他，不必急著說他說謊。", "這句話和請客沒有關係。"] },
  { u: "7-2-9 非語言訊息・Read Colors", d: "中", q: "十字路口的紅燈 *red light* `[rɛd laɪt]` 表示什麼？", o: ["停止，不能通過", "可以通過", "要加速通過", "可以迴轉"], a: 0, e: "紅燈表示停止。", w: ["", "綠燈才是可以通過。", "看到紅燈要停下來，不是加速。", "紅燈時不能迴轉。"] },
  { u: "7-2-9 非語言訊息・Read Colors", d: "中", q: "綠色的標誌 *green* `[grin]` 通常讓人想到什麼？", o: ["自然、環保、安全", "危險、禁止", "警告、注意", "悲傷、難過"], a: 0, e: "綠色常代表自然、環保，也用來表示安全。", w: ["", "危險和禁止常用紅色。", "警告常用黃色或紅色。", "顏色標誌和悲傷的情緒無關。"] },
  { u: "7-2-10 聽與讀・Fillers", d: "中", q: "說話時出現 *um* `[ʌm]` 或 *well* `[wɛl]` 這類小詞，通常是因為？", o: ["他一時在想接下來要說什麼", "他在罵人", "他要掛電話", "他在唱歌"], a: 0, e: "*um*、*well* 是填補詞，表示說話的人正在思考。", w: ["", "罵人會用別的詞語。", "要掛電話時會說 *Goodbye.*。", "唱歌不會用 *um*。"] },
  { u: "7-2-10 聽與讀・Fillers", d: "中", q: "老師說 *OK, let's start.* `[oˋke lɛts stɑrt]`，*OK* 在這裡的功能是什麼？", o: ["表示要開始的轉接語", "表示拒絕", "表示一個數字", "表示過去式"], a: 0, e: "這裡的 *OK* 是轉換話題、準備開始的用語。", w: ["", "拒絕要說 *No*。", "*OK* 不是數字。", "過去式要用動詞變化。"] },
  /* ---------- 第8單元 文化理解 ---------- */
  { u: "8-1-1 問候・Hello & Goodbye", d: "中", q: "西班牙語的 *Hola* `[ˋola]` 相當於英語的哪一句？", o: ["*Hello*", "*Goodbye*", "*Thank you*", "*Sorry*"], a: 0, e: "*Hola* 是西班牙語的「你好」，等於 *Hello*。", w: ["", "再見的西班牙語是 *Adiós*。", "謝謝的西班牙語是 *Gracias*。", "對不起的西班牙語是 *Perdón*。"] },
  { u: "8-1-1 問候・Hello & Goodbye", d: "中", q: "法語的 *Bonjour* `[bɔ̃ˋʒur]` 是什麼意思？", o: ["你好", "再見", "謝謝", "對不起"], a: 0, e: "*Bonjour* 是法語的「你好」。", w: ["", "再見是 *Au revoir*。", "謝謝是 *Merci*。", "對不起是 *Pardon*。"] },
  { u: "8-1-2 問候・Have a Nice Day!", d: "易", q: "外國店員結帳時說 *Have a nice day!* `[hæv ə naɪs de]`，是什麼意思？", o: ["祝你有美好的一天", "祝你生日快樂", "今天天氣很好", "今天要上班"], a: 0, e: "*Have a nice day!* 是祝福對方有美好的一天。", w: ["", "生日要說 *Happy birthday!*。", "這句是在祝福對方，不是在講天氣。", "這句和上班沒有關係。"] },
  { u: "8-1-2 問候・Have a Nice Day!", d: "難", q: "美國人見面說 *How are you?* `[haʊ ɑr ju]` 時，最常期待的回答是哪一個？", o: ["*Good, thanks. And you?*", "從頭到尾說自己的病痛", "不回答就直接走掉", "*How old are you?*"], a: 0, e: "*How are you?* 多半是問候，簡短回答並反問最合適。", w: ["", "太長的抱怨不適合當問候的回答。", "不回答會顯得沒有禮貌。", "*How old are you?* 是問年齡。"] },
  { u: "8-2-1 節慶・Food and Celebrations", d: "中", q: "中秋節常吃的 *moon cakes*（月餅）和 *pomelos*（柚子），對應哪一個節慶？", o: ["中秋節（Mid-Autumn Festival）", "端午節（Dragon Boat Festival）", "春節（Chinese New Year）", "聖誕節（Christmas）"], a: 0, e: "月餅和柚子是中秋節的應景食物。", w: ["", "端午節吃粽子。", "春節會圍爐、吃年糕。", "聖誕節在冬天，不吃月餅。"] },
  { u: "8-2-1 節慶・Food and Celebrations", d: "中", q: "過年時長輩會給小孩 *red envelopes*（紅包），這代表什麼？", o: ["祝福與好運", "考試成績", "一張車票", "一種名牌"], a: 0, e: "紅包代表長輩的祝福與好運。", w: ["", "紅包不是成績單。", "紅包不是車票。", "紅包和名牌沒有關係。"] },
  { u: "8-2-2 節慶・Zhongyuan Pudu", d: "中", q: "中元普渡時，人們在門口擺放食物並點 *incense*（香），主要是為了什麼？", o: ["祭拜好兄弟、祈求平安", "慶祝生日", "歡迎新同學", "舉辦運動會"], a: 0, e: "中元普渡是祭拜好兄弟、祈求平安。", w: ["", "慶生會吹蠟燭、唱生日歌。", "歡迎新同學是在教室裡進行。", "運動會是體育活動。"] },
  { u: "8-2-2 節慶・Zhongyuan Pudu", d: "中", q: "中元節的英文常說 *Ghost Festival* `[gost ˋfɛstəvəl]`，其中 *ghost* 是什麼意思？", o: ["鬼", "客人", "國王", "糖果"], a: 0, e: "*ghost* 是「鬼」，*Ghost Festival* 就是中元節。", w: ["", "客人是 *guest*。", "國王是 *king*。", "糖果是 *candy*。"] },
  { u: "8-3-1 節慶・Christmas Decorations", d: "易", q: "聖誕節常見的裝飾 *a Christmas tree* `[ə ˋkrɪsməs tri]` 是什麼？", o: ["聖誕樹", "聖誕卡片", "聖誕老公公", "聖誕禮物"], a: 0, e: "*Christmas tree* 是聖誕樹。", w: ["", "卡片是 *Christmas card*。", "聖誕老公公是 *Santa Claus*。", "禮物是 *gift*。"] },
  { u: "8-3-1 節慶・Christmas Decorations", d: "中", q: "*Santa Claus* `[ˋsæntə klɔz]` 是什麼人？", o: ["聖誕老公公", "聖誕樹", "聖誕歌", "聖誕卡片"], a: 0, e: "*Santa Claus* 是聖誕老公公。", w: ["", "聖誕樹是 *Christmas tree*。", "聖誕歌是 *Christmas song*。", "聖誕卡片是 *Christmas card*。"] },
  { u: "8-3-2 節慶・Father's Day", d: "易", q: "父親節時，你可以對爸爸說哪一句？", o: ["*Happy Father's Day!*", "*Happy Mother's Day!*", "*Happy New Year!*", "*Merry Christmas!*"], a: 0, e: "父親節要說 *Happy Father's Day!*。", w: ["", "*Mother's Day* 是母親節。", "*Happy New Year!* 是新年。", "*Merry Christmas!* 是聖誕節。"] },
  { u: "8-3-2 節慶・Father's Day", d: "中", q: "美國的 *Father's Day* `[ˋfɑðɚz de]` 大多在哪一個月？", o: ["六月", "五月", "十二月", "一月"], a: 0, e: "美國的父親節在六月（第三個星期日）。", w: ["", "五月是母親節（*Mother's Day*）。", "十二月有聖誕節。", "一月是新年。"] },
  /* ---------- 第9單元 邏輯思考、判斷與創造力 ---------- */
  { u: "9-1-1 食物分類・Food Groups", d: "中", q: "*apple*、*banana* 和 *orange* 都屬於哪一類食物？", o: ["*fruits*（水果）", "*grains*（穀類）", "*dairy*（乳製品）", "*protein*（蛋白質）"], a: 0, e: "蘋果、香蕉、柳橙都是水果。", w: ["", "*grains* 是米飯、麵包等。", "*dairy* 是牛奶、起司等。", "*protein* 是肉、蛋、豆類等。"] },
  { u: "9-1-1 食物分類・Food Groups", d: "中", q: "*milk* 和 *cheese* 屬於哪一類食物？", o: ["*dairy*（乳製品）", "*fruits*（水果）", "*vegetables*（蔬菜）", "*grains*（穀類）"], a: 0, e: "牛奶和起司都是乳製品。", w: ["", "水果是 *apples*、*bananas*。", "蔬菜是 *carrots*、*broccoli*。", "穀類是 *rice*、*bread*。"] },
  { u: "9-1-2 食物分類・Whole Foods vs. Processed Foods", d: "中", q: "下列哪一個是 *whole food*（天然食物）？", o: ["*an apple*（蘋果）", "*a hot dog*（熱狗）", "*a cookie*（餅乾）", "*a soda*（汽水）"], a: 0, e: "蘋果沒有經過加工，是 *whole food*。", w: ["", "熱狗是加工食品。", "餅乾是加工食品。", "汽水是加工飲料。"] },
  { u: "9-1-2 食物分類・Whole Foods vs. Processed Foods", d: "中", q: "下列哪一個是 *processed food*（加工食品）？", o: ["*a cookie*（餅乾）", "*a banana*（香蕉）", "*a tomato*（番茄）", "*an egg*（蛋）"], a: 0, e: "餅乾經過加工，是 *processed food*。", w: ["", "香蕉是天然食物。", "番茄是天然食物。", "蛋是天然食物。"] },
  { u: "9-1-3 食物分類・Fruit & Vegetables vs. Grains", d: "中", q: "*broccoli*（花椰菜）和 *carrots*（紅蘿蔔）屬於哪一類？", o: ["*vegetables*（蔬菜）", "*fruits*（水果）", "*grains*（穀類）", "*dairy*（乳製品）"], a: 0, e: "花椰菜和紅蘿蔔都是蔬菜。", w: ["", "水果通常是甜的、有種子。", "穀類是米、麥做的食物。", "乳製品來自牛奶。"] },
  { u: "9-1-3 食物分類・Fruit & Vegetables vs. Grains", d: "中", q: "*rice*（米飯）和 *bread*（麵包）屬於哪一類？", o: ["*grains*（穀類）", "*vegetables*（蔬菜）", "*fruits*（水果）", "*protein*（蛋白質）"], a: 0, e: "米飯和麵包由穀物做成，屬於穀類。", w: ["", "蔬菜是 *carrots*、*broccoli*。", "水果是 *apples*、*grapes*。", "蛋白質是 *meat*、*eggs*。"] },
  { u: "9-1-4 動物分類・Herbivore, Omnivore, Carnivore", d: "中", q: "只吃植物的動物叫做什麼？", o: ["*herbivore*（草食動物）", "*carnivore*（肉食動物）", "*omnivore*（雜食動物）", "*dinosaur*（恐龍）"], a: 0, e: "*herbivore* 是只吃植物的草食動物。", w: ["", "*carnivore* 是吃肉。", "*omnivore* 是植物和肉都吃。", "*dinosaur* 是恐龍，不是分類名稱。"] },
  { u: "9-1-4 動物分類・Herbivore, Omnivore, Carnivore", d: "中", q: "*a lion*（獅子）主要吃肉，牠是哪一類動物？", o: ["*carnivore*（肉食動物）", "*herbivore*（草食動物）", "*omnivore*（雜食動物）", "*vegetarian*（素食者）"], a: 0, e: "獅子主要吃肉，是 *carnivore*。", w: ["", "草食動物只吃植物，例如牛。", "雜食動物兩者都吃，例如豬。", "*vegetarian* 通常用來指不吃肉的人。"] },
/*__HAND__*/
  ];

  /* ==================== 四、素養題組 ==================== */
  var PASSAGE = [
  /* ===== 第1單元 素養題組 ===== */
  { id: "e-01", tag: "素養題組・果汁吧點餐", p: "*Amy and Ben are at the juice bar.*\n艾美和班在果汁吧。\n*Amy: What do you want, Ben?*\n艾美：班，你想要什麼？\n*Ben: I want apple juice. How about you?*\n班：我想要蘋果汁。你呢？\n*Amy: I want grape juice and banana milk.*\n艾美：我想要葡萄汁和香蕉牛奶。　發音小辭典：*apple juice* `[ˋæpəl dʒus]`、*grape juice* `[grep dʒus]`、*banana milk* `[bəˋnænə mɪlk]`", qs: [
    { d: "易", q: "他們在哪裡？", o: ["果汁吧", "學校操場", "圖書館", "動物園"], a: 0, e: "開頭就說 *Amy and Ben are at the juice bar.*，所以他們在果汁吧。", w: ["", "文章沒有提到操場。", "圖書館是 *library*。", "文章沒有提到動物園。"] },
    { d: "中", q: "*Ben* 想要什麼？", o: ["*apple juice*（蘋果汁）", "*grape juice*（葡萄汁）", "*banana milk*（香蕉牛奶）", "*hot tea*（熱紅茶）"], a: 0, e: "*Ben: I want apple juice.*（班：我想要蘋果汁。）", w: ["", "葡萄汁是 Amy 想要的。", "香蕉牛奶也是 Amy 點的。", "文章沒有提到熱紅茶。"] },
    { d: "中", q: "*Amy* 點了哪一些飲料？", o: ["*grape juice and banana milk*", "*apple juice and grape juice*", "*banana milk and orange juice*", "*only apple juice*（只有蘋果汁）"], a: 0, e: "*Amy: I want grape juice and banana milk.*", w: ["", "蘋果汁是 Ben 想要的。", "她沒有點柳橙汁。", "她點了兩樣，不只蘋果汁。"] },
    { d: "難", q: "這家果汁吧最可能還賣什麼？", o: ["*orange juice*（柳橙汁）", "*a pencil*（鉛筆）", "*a school bus*（校車）", "*a blackboard*（黑板）"], a: 0, e: "果汁吧賣飲料，*orange juice* 也是常見的果汁。", w: ["", "鉛筆是文具。", "校車不是飲料。", "黑板不是飲料。"] },
    { d: "難", q: "如果 *Amy* 想有禮貌地問價錢，她可以說哪一句？", o: ["*How much is it?*", "*How old are you?*", "*Where are you?*", "*What time is it?*"], a: 0, e: "問價錢要說 *How much is it?*。", w: ["", "*How old* 是問年齡。", "*Where* 是問地點。", "*What time* 是問時間。"] }
  ] },
  { id: "e-02", tag: "素養題組・才藝表演", p: "*It is the Talent Show day.*\n今天是才藝表演日。\n*Ken: Can you dance, Mia?*\n肯：米雅，你會跳舞嗎？\n*Mia: No, I can't. But I can sing.*\n米雅：我不會。但是我會唱歌。\n*Ken: Great! I can play the drums.*\n肯：太棒了！我會打鼓。　發音小辭典：*dance* `[dæns]`、*sing* `[sɪŋ]`、*drums* `[drʌmz]`", qs: [
    { d: "易", q: "今天是什麼日子？", o: ["才藝表演日", "運動會", "校外教學", "期中考"], a: 0, e: "第一句說 *It is the Talent Show day.*", w: ["", "運動會是 *Sports Day*。", "校外教學是 *a field trip*。", "期中考是 *the midterm exam*。"] },
    { d: "中", q: "*Mia* 不會做什麼？", o: ["跳舞", "唱歌", "打鼓", "畫畫"], a: 0, e: "Ken 問 *Can you dance, Mia?*，Mia 回答 *No, I can't.*", w: ["", "她說 *I can sing.*，所以她會唱歌。", "打鼓的是 Ken。", "文章沒有提到畫畫。"] },
    { d: "中", q: "*Mia* 會做什麼？", o: ["*sing*（唱歌）", "*dance*（跳舞）", "*play the drums*（打鼓）", "*swim*（游泳）"], a: 0, e: "*Mia: But I can sing.*", w: ["", "她自己說不會跳舞。", "打鼓的是 Ken。", "文章沒有提到游泳。"] },
    { d: "中", q: "*Ken* 會做什麼？", o: ["*play the drums*（打鼓）", "*sing*（唱歌）", "*dance*（跳舞）", "*cook*（煮飯）"], a: 0, e: "*Ken: I can play the drums.*", w: ["", "唱歌是 Mia 才藝。", "Ken 只是問 Mia 會不會跳舞。", "文章沒有提到煮飯。"] },
    { d: "難", q: "如果 *Ken* 想問 *Mia* 會不會游泳，他應該說哪一句？", o: ["*Can you swim?*", "*Do you like swimming?*", "*Are you swimming?*", "*Where do you swim?*"], a: 0, e: "問「會不會」要用 *Can you ...?*。", w: ["", "*Do you like* 是問喜不喜歡。", "*Are you swimming?* 是問「你正在游泳嗎？」。", "*Where* 是問在哪裡游泳。"] }
  ] },
  { id: "e-03", tag: "素養題組・教室英語", p: "*It is English class.*\n現在是英語課。\n*Teacher: Line up, please. We are going to the library.*\n老師：請排隊，我們要去圖書館。\n*Teacher: Follow me. Walk quietly.*\n老師：跟著我，安靜地走。\n*Sam: Oops! Sorry, I'm late.*\n山姆：哎呀！對不起，我遲到了。\n*Teacher: That's OK. Come in.*\n老師：沒關係，進來吧。　發音小辭典：*line up* `[laɪn ʌp]`、*library* `[ˋlaɪˏbrɛri]`、*quietly* `[ˋkwaɪətli]`", qs: [
    { d: "易", q: "老師要大家先做什麼？", o: ["排隊", "打掃教室", "唱英文歌", "交作業"], a: 0, e: "*Teacher: Line up, please.*（老師：請排隊。）", w: ["", "老師沒有提到打掃。", "老師沒有要大家唱歌。", "老師沒有要大家交作業。"] },
    { d: "易", q: "他們要去哪裡？", o: ["圖書館", "操場", "廚房", "醫院"], a: 0, e: "*We are going to the library.*（我們要去圖書館。）", w: ["", "文章沒有提到操場。", "廚房是 *kitchen*。", "醫院是 *hospital*。"] },
    { d: "中", q: "*Sam* 發生什麼事？", o: ["他遲到了", "他忘了帶書", "他跌倒了", "他打破了杯子"], a: 0, e: "*Sam: Sorry, I'm late.*（山姆：對不起，我遲到了。）", w: ["", "忘了帶書要說 *I forgot my book.*。", "跌倒要說 *I fell down.*。", "打破杯子要說 *I broke the cup.*。"] },
    { d: "中", q: "老師怎麼回答 *Sam*？", o: ["*That's OK. Come in.*", "*Be quiet!*", "*Good job!*", "*See you again.*"], a: 0, e: "*Teacher: That's OK. Come in.*（老師：沒關係，進來吧。）", w: ["", "*Be quiet!* 是要求安靜。", "*Good job!* 是讚美。", "*See you again.* 是道別。"] },
    { d: "難", q: "*Walk quietly.* 裡的 *quietly* 是什麼意思？", o: ["安靜地", "很快地", "大聲地", "高興地"], a: 0, e: "*quietly* 是「安靜地」，來自 *quiet*（安靜的）。", w: ["", "很快地是 *quickly*。", "大聲地是 *loudly*。", "高興地是 *happily*。"] }
  ] },
  { id: "e-04", tag: "素養題組・忙碌的早晨", p: "*It is Monday morning.*\n星期一的早晨。\n*Mom: What time is it?*\n媽媽：現在幾點？\n*Dad: It's seven fifteen.*\n爸爸：現在七點十五分。\n*Mom: Oh no! I'm late. Where is my bag?*\n媽媽：糟了！我快遲到了。我的袋子在哪裡？\n*Dad: It's on the chair.*\n爸爸：它在椅子上。　發音小辭典：*seven fifteen* `[ˋsɛvən ˏfɪfˋtin]`、*late* `[let]`、*chair* `[tʃɛr]`", qs: [
    { d: "易", q: "現在幾點？", o: ["七點十五分", "七點五十分", "五點七分", "十七點五分"], a: 0, e: "*Dad: It's seven fifteen.*", w: ["", "五十分是 *fifty*。", "五點七分是時和分顛倒。", "十七點五分是時和分顛倒。"] },
    { d: "易", q: "媽媽的袋子在哪裡？", o: ["椅子上", "桌子下", "門後面", "廚房裡"], a: 0, e: "*Dad: It's on the chair.*", w: ["", "*under* 才是「在……下面」。", "文章沒有提到門後面。", "文章沒有提到廚房。"] },
    { d: "中", q: "媽媽為什麼著急？", o: ["她快要遲到了", "她找不到鞋子", "她肚子很餓", "她忘了帶傘"], a: 0, e: "*Mom: Oh no! I'm late.*", w: ["", "文章沒有提到鞋子。", "文章沒有提到肚子餓。", "文章沒有提到雨傘。"] },
    { d: "中", q: "媽媽問 *Where is ...?* 是在問什麼？", o: ["東西在哪裡", "現在幾點", "東西是誰的", "東西多少錢"], a: 0, e: "*Where is ...?* 是問「……在哪裡？」。", w: ["", "問時間是 *What time is it?*。", "問是誰的用 *Whose ...?*。", "問價錢用 *How much ...?*。"] },
    { d: "難", q: "媽媽想問爸爸「我的外套在哪裡？」，應該怎麼說？", o: ["*Where is my coat?*", "*Where is my cap?*", "*What is my coat?*", "*Who is my coat?*"], a: 0, e: "外套是 *coat*，問位置要用 *Where is ...?*。", w: ["", "帽子是 *cap*。", "*What* 是問「是什麼」。", "*Who* 是問「是誰」。"] }
  ] },
  /* ===== 第3單元 素養題組 ===== */
  { id: "e-05", tag: "素養題組・水果小知識", p: "*Fun Facts About Fruits*\n水果小知識\n*Apples are red, green, or yellow.*\n蘋果有紅色、綠色和黃色。\n*Bananas are long and yellow. Monkeys love them.*\n香蕉長長的、黃黃的，猴子很愛。\n*Papayas are sweet and orange inside.*\n木瓜很甜，切開是橘色的。\n*Grapes are small and round.*\n葡萄小小圓圓的。　發音小辭典：*bananas* `[bəˋnænəz]`、*papayas* `[pəˋpaɪəz]`、*grapes* `[greps]`", qs: [
    { d: "易", q: "蘋果可能有哪一些顏色？", o: ["紅、綠、黃", "只有黑色", "只有紫色", "只有白色"], a: 0, e: "*Apples are red, green, or yellow.*", w: ["", "文章沒有說黑色。", "紫色是葡萄的顏色。", "文章沒有說白色。"] },
    { d: "中", q: "哪一種水果「長長的、黃黃的」？", o: ["*bananas*（香蕉）", "*grapes*（葡萄）", "*apples*（蘋果）", "*papayas*（木瓜）"], a: 0, e: "*Bananas are long and yellow.*", w: ["", "葡萄是 *small and round*。", "蘋果是紅、綠或黃色，不是長長的。", "木瓜是甜的、裡面是橘色。"] },
    { d: "中", q: "*Monkeys love them.* 的 *them* 是指哪一種水果？", o: ["*bananas*（香蕉）", "*apples*（蘋果）", "*grapes*（葡萄）", "*papayas*（木瓜）"], a: 0, e: "前一句是 *Bananas ... Monkeys love them.*，所以 *them* 指的是香蕉。", w: ["", "前一句講的是香蕉。", "前一句講的是香蕉。", "前一句講的是香蕉。"] },
    { d: "中", q: "木瓜切開以後，裡面是什麼顏色？", o: ["橘色", "藍色", "黑色", "白色"], a: 0, e: "*Papayas are sweet and orange inside.*（木瓜裡面是橘色。）", w: ["", "文章沒有說藍色。", "文章沒有說黑色。", "文章沒有說白色。"] },
    { d: "難", q: "哪一種水果是「小小圓圓的」？", o: ["*grapes*（葡萄）", "*watermelons*（西瓜）", "*bananas*（香蕉）", "*pineapples*（鳳梨）"], a: 0, e: "*Grapes are small and round.*", w: ["", "西瓜很大。", "香蕉長長的。", "鳳梨有刺刺的外皮，不小也不圓。"] }
  ] },
  { id: "e-06", tag: "素養題組・我的一天", p: "*My Daily Life*\n我的一天\n*I get up at six thirty.*\n我六點三十分起床。\n*I have breakfast at seven.*\n我七點吃早餐。\n*I go to school at seven forty.*\n我七點四十分去上學。\n*I do my homework at eight in the evening.*\n我晚上八點寫功課。　發音小辭典：*get up* `[gɛt ʌp]`、*breakfast* `[ˋbrɛkfəst]`、*homework* `[ˋhomˏwɝk]`", qs: [
    { d: "易", q: "我幾點起床？", o: ["六點三十分", "七點", "七點四十分", "八點"], a: 0, e: "*I get up at six thirty.*", w: ["", "七點是吃早餐。", "七點四十分是去上學。", "八點是晚上寫功課。"] },
    { d: "易", q: "我幾點吃早餐？", o: ["七點", "六點三十分", "七點四十分", "八點"], a: 0, e: "*I have breakfast at seven.*", w: ["", "六點三十分是起床。", "七點四十分是去上學。", "八點是寫功課。"] },
    { d: "中", q: "我什麼時候寫功課？", o: ["晚上八點", "早上六點三十分", "早上七點", "早上七點四十分"], a: 0, e: "*at eight in the evening* 是「晚上八點」。", w: ["", "早上六點三十分是起床。", "早上七點是吃早餐。", "早上七點四十分是去上學。"] },
    { d: "中", q: "*have breakfast* 是什麼意思？", o: ["吃早餐", "吃午餐", "吃晚餐", "喝水"], a: 0, e: "*breakfast* 是早餐，*have breakfast* 是吃早餐。", w: ["", "午餐是 *lunch*。", "晚餐是 *dinner*。", "喝水是 *drink water*。"] },
    { d: "難", q: "如果我想說「我晚上九點睡覺」，應該怎麼說？", o: ["*I go to bed at nine in the evening.*", "*I go to bed at nine in the morning.*", "*I get up at nine in the evening.*", "*I have breakfast at nine in the evening.*"], a: 0, e: "睡覺是 *go to bed*，晚上是 *in the evening*。", w: ["", "*in the morning* 是早上。", "*get up* 是起床。", "*have breakfast* 是吃早餐。"] }
  ] },
  { id: "e-07", tag: "素養題組・東西在哪裡", p: "*Where Is It?*\n東西在哪裡？\n*The cat is under the table.*\n貓在桌子下面。\n*My cap is on the chair.*\n我的帽子在椅子上。\n*The pencil box is in the bag.*\n鉛筆盒在書包裡。\n*The ball is by the door.*\n球在門旁邊。　發音小辭典：*under* `[ˋʌndɚ]`、*on* `[ɑn]`、*in* `[ɪn]`、*by* `[baɪ]`", qs: [
    { d: "易", q: "貓在哪裡？", o: ["桌子下面", "椅子上", "書包裡", "門旁邊"], a: 0, e: "*The cat is under the table.*", w: ["", "椅子上是帽子。", "書包裡是鉛筆盒。", "門旁邊是球。"] },
    { d: "易", q: "我的帽子在哪裡？", o: ["椅子上", "桌子下面", "書包裡", "門旁邊"], a: 0, e: "*My cap is on the chair.*", w: ["", "桌子下面是貓。", "書包裡是鉛筆盒。", "門旁邊是球。"] },
    { d: "中", q: "鉛筆盒在哪裡？", o: ["書包裡", "椅子上", "桌子下面", "門旁邊"], a: 0, e: "*The pencil box is in the bag.*", w: ["", "椅子上是帽子。", "桌子下面是貓。", "門旁邊是球。"] },
    { d: "中", q: "球在哪裡？", o: ["門旁邊", "書包裡", "椅子上", "桌子下面"], a: 0, e: "*The ball is by the door.*", w: ["", "書包裡是鉛筆盒。", "椅子上是帽子。", "桌子下面是貓。"] },
    { d: "難", q: "課本放在書包裡面，應該怎麼說？", o: ["*The book is in the bag.*", "*The book is on the bag.*", "*The book is under the bag.*", "*The book is by the bag.*"], a: 0, e: "「在……裡面」要用 *in*。", w: ["", "*on* 是「在……上面」。", "*under* 是「在……下面」。", "*by* 是「在……旁邊」。"] }
  ] },
  { id: "e-08", tag: "素養題組・給媽媽的紙條", p: "*A Note to Mom*\n給媽媽的紙條\n*Dear Mom,*\n親愛的媽媽：\n*I am at the library. I want some bread and milk.*\n我在圖書館，我想要一些麵包和牛奶。\n*I am hungry. I have ten dollars.*\n我肚子餓了，我有十元。\n*Love, Ben*\n愛你的 班　發音小辭典：*library* `[ˋlaɪˏbrɛri]`、*bread* `[brɛd]`、*hungry* `[ˋhʌŋgri]`", qs: [
    { d: "易", q: "這張紙條是誰寫的？", o: ["*Ben*（班）", "*Mom*（媽媽）", "*the teacher*（老師）", "*a doctor*（醫生）"], a: 0, e: "紙條最後寫 *Love, Ben*，所以是班寫的。", w: ["", "媽媽是收信人。", "文章沒有提到老師。", "文章沒有提到醫生。"] },
    { d: "易", q: "*Ben* 在哪裡？", o: ["圖書館", "學校廚房", "超市", "醫院"], a: 0, e: "*I am at the library.*", w: ["", "文章沒有提到廚房。", "文章沒有提到超市。", "文章沒有提到醫院。"] },
    { d: "中", q: "*Ben* 想要什麼？", o: ["麵包和牛奶", "果汁和蛋糕", "米飯和蛋", "水和餅乾"], a: 0, e: "*I want some bread and milk.*", w: ["", "果汁和蛋糕是 *juice and cake*。", "米飯和蛋是 *rice and eggs*。", "水和餅乾是 *water and cookies*。"] },
    { d: "中", q: "*Ben* 為什麼想要吃東西？", o: ["他肚子餓了", "他很渴", "他很累", "他很冷"], a: 0, e: "*I am hungry.*（我肚子餓了。）", w: ["", "口渴是 *thirsty*。", "疲倦是 *tired*。", "冷是 *cold*。"] },
    { d: "難", q: "*Ben* 的 *ten dollars* 是多少錢？", o: ["十元", "一元", "一百元", "五元"], a: 0, e: "*ten* 是「十」，*dollars* 是「元」。", w: ["", "一元是 *one dollar*。", "一百元是 *one hundred dollars*。", "五元是 *five dollars*。"] }
  ] },
  /* ===== 第7單元 素養題組 ===== */
  { id: "e-09", tag: "素養題組・肢體語言", p: "*Body Language*\n肢體語言\n*People smile when they are happy.*\n人們開心的時候會微笑。\n*They frown when they are sad or angry.*\n難過或生氣的時候會皺眉。\n*A nod means yes. A shake means no.*\n點頭表示「是」，搖頭表示「不」。\n*People wave to say hello or goodbye.*\n揮手可以打招呼，也可以說再見。　發音小辭典：*smile* `[smaɪl]`、*frown* `[fraʊn]`、*nod* `[nɑd]`、*wave* `[wev]`", qs: [
    { d: "易", q: "人們開心的時候會有什麼表情？", o: ["微笑", "皺眉", "大哭", "瞪人"], a: 0, e: "*People smile when they are happy.*", w: ["", "皺眉是難過或生氣。", "文章沒有說大哭。", "開心不會瞪人。"] },
    { d: "易", q: "皺眉 *frown* 通常表示什麼？", o: ["難過或生氣", "非常開心", "想睡覺", "想喝水"], a: 0, e: "*They frown when they are sad or angry.*", w: ["", "開心會微笑。", "文章沒有提到想睡。", "文章沒有提到喝水。"] },
    { d: "中", q: "點頭 *a nod* 表示什麼？", o: ["「是」", "「不」", "「再見」", "「請安靜」"], a: 0, e: "*A nod means yes.*", w: ["", "「不」是 *a shake*（搖頭）。", "再見是 *wave*。", "請安靜是 *shh*。"] },
    { d: "中", q: "揮手 *wave* 可以用來做什麼？", o: ["打招呼或說再見", "表示生氣", "表示肚子餓", "表示數字十"], a: 0, e: "*People wave to say hello or goodbye.*", w: ["", "生氣通常會皺眉。", "肚子餓和揮手沒有關係。", "數字十通常用兩手的手指表示。"] },
    { d: "難", q: "有人對你點頭，他最可能在表示什麼？", o: ["同意（是）", "拒絕（不）", "他聽不見", "他非常傷心"], a: 0, e: "點頭表示同意、是。", w: ["", "搖頭才表示拒絕。", "點頭和聽不聽見沒有關係。", "傷心通常會皺眉。"] }
  ] },
  { id: "e-10", tag: "素養題組・標誌與顏色", p: "*Signs and Colors*\n標誌與顏色\n*Red means stop. Green means go.*\n紅色表示停止，綠色表示前進。\n*The sign No Smoking means you can't smoke here.*\n標誌 No Smoking 表示這裡不能吸菸。\n*The sign Restroom shows where the restroom is.*\n標誌 Restroom 指出廁所在哪裡。\n*Yellow means be careful.*\n黃色表示要小心。　發音小辭典：*red* `[rɛd]`、*green* `[grin]`、*yellow* `[ˋjɛlo]`、*careful* `[ˋkɛrfəl]`", qs: [
    { d: "易", q: "哪一個顏色表示「停止」？", o: ["紅色", "綠色", "黃色", "藍色"], a: 0, e: "*Red means stop.*", w: ["", "綠色表示前進。", "黃色表示要小心。", "文章沒有提到藍色。"] },
    { d: "易", q: "綠燈 *green* 表示什麼？", o: ["可以前進", "一定要停下來", "要小心", "不能通過"], a: 0, e: "*Green means go.*", w: ["", "停下來是紅色。", "要小心是黃色。", "不能通過是紅色。"] },
    { d: "中", q: "看到 *No Smoking* 標誌時，應該怎麼做？", o: ["不能在這裡吸菸", "可以在這裡吸菸", "可以在這裡買菸", "要在這裡點火"], a: 0, e: "*The sign No Smoking means you can't smoke here.*", w: ["", "*No* 是禁止的意思。", "這個標誌不是商店招牌。", "點火吸菸是不被允許的。"] },
    { d: "中", q: "想找廁所時，可以看哪一個標誌？", o: ["*Restroom*", "*Library*", "*No Smoking*", "*STOP*"], a: 0, e: "*The sign Restroom shows where the restroom is.*", w: ["", "*Library* 是圖書館。", "*No Smoking* 是禁止吸菸。", "*STOP* 是停止。"] },
    { d: "難", q: "黃色標誌通常表示什麼？", o: ["要小心、要注意", "可以快速通過", "這裡是廁所", "這裡可以睡覺"], a: 0, e: "*Yellow means be careful.*", w: ["", "黃色是要人注意，不是加速。", "廁所的標誌是 *Restroom*。", "文章沒有提到睡覺。"] }
  ] },
  { id: "e-11", tag: "素養題組・語氣與地圖", p: "*Tone of Voice and Maps*\n語氣與地圖\n*When Mom says Dinner is ready with a smile, she is happy.*\n媽媽微笑著說晚餐好了，表示她很開心。\n*When a friend says I'm fine in a small voice, he may be sad.*\n朋友小聲說我很好，可能其實很難過。\n*On a map, Library is next to the park.*\n地圖上，圖書館在公園旁邊。\n*The restroom is on the first floor.*\n廁所在一樓。　發音小辭典：*voice* `[vɔɪs]`、*map* `[mæp]`、*next to* `[nɛkst tu]`、*restroom* `[ˋriˏstrum]`", qs: [
    { d: "中", q: "媽媽微笑著說 *Dinner is ready.* 表示什麼？", o: ["她很開心", "她很生氣", "她很害怕", "她很傷心"], a: 0, e: "*When Mom says Dinner is ready with a smile, she is happy.*", w: ["", "生氣的時候不會微笑。", "害怕的表情和微笑不同。", "傷心的表情和微笑不同。"] },
    { d: "中", q: "朋友小聲說 *I'm fine.* 可能表示什麼？", o: ["他可能其實很難過", "他一定非常快樂", "他說話很大聲", "他非常餓"], a: 0, e: "*When a friend says I'm fine in a small voice, he may be sad.*", w: ["", "小聲而且表情不對時，不一定快樂。", "小聲不是大聲。", "文章沒有提到餓。"] },
    { d: "中", q: "地圖上，圖書館在公園的哪裡？", o: ["旁邊", "裡面", "下面", "對面"], a: 0, e: "*Library is next to the park.*（*next to* 是「在……旁邊」。）", w: ["", "「裡面」是 *in*。", "「下面」是 *under*。", "文章沒有說在對面。"] },
    { d: "中", q: "廁所在幾樓？", o: ["一樓", "二樓", "三樓", "地下室"], a: 0, e: "*The restroom is on the first floor.*（*the first floor* 是一樓。）", w: ["", "二樓是 *the second floor*。", "三樓是 *the third floor*。", "地下室是 *the basement*。"] },
    { d: "難", q: "想問「廁所在哪裡？」應該怎麼說？", o: ["*Where is the restroom?*", "*What is the restroom?*", "*Who is the restroom?*", "*How is the restroom?*"], a: 0, e: "問位置要用 *Where is ...?*。", w: ["", "*What* 是問「是什麼」。", "*Who* 是問「是誰」。", "*How* 是問「如何」。"] }
  ] },
  { id: "e-12", tag: "素養題組・填補詞與語氣", p: "*Fillers*\n填補詞\n*Sometimes we say um or well when we think.*\n有時候我們在思考時會說 um 或 well。\n*These words are fillers. They are OK.*\n這些詞是填補詞，是沒問題的。\n*When we are not sure, we say maybe.*\n不確定的時候，我們會說 maybe。\n*When we want to start, we say OK, let's start.*\n要開始的時候，我們會說 OK, let's start。　發音小辭典：*fillers* `[ˋfɪlɚz]`、*maybe* `[ˋmebi]`、*start* `[stɑrt]`", qs: [
    { d: "中", q: "說話時說 *um* 或 *well*，通常是因為？", o: ["正在思考", "非常生氣", "肚子很餓", "很想睡覺"], a: 0, e: "*Sometimes we say um or well when we think.*", w: ["", "文章沒有說生氣。", "文章沒有說肚子餓。", "文章沒有說想睡。"] },
    { d: "中", q: "文章認為使用填補詞 *fillers* 怎麼樣？", o: ["是正常的，可以接受", "非常沒有禮貌", "一定是不會英文", "一定要處罰"], a: 0, e: "*These words are fillers. They are OK.*", w: ["", "文章說 *They are OK.*。", "文章沒有這樣說。", "文章沒有提到處罰。"] },
    { d: "中", q: "不確定某件事時，可以說哪一個字？", o: ["*maybe*", "*always*", "*never*", "*stop*"], a: 0, e: "*When we are not sure, we say maybe.*", w: ["", "*always* 是「總是」。", "*never* 是「從不」。", "*stop* 是「停止」。"] },
    { d: "中", q: "要開始活動時，老師常說哪一句？", o: ["*OK, let's start.*", "*Goodbye.*", "*I'm sorry.*", "*How old are you?*"], a: 0, e: "*When we want to start, we say OK, let's start.*", w: ["", "*Goodbye.* 是道別。", "*I'm sorry.* 是道歉。", "*How old are you?* 是問年齡。"] },
    { d: "難", q: "*maybe* 是什麼意思？", o: ["也許、可能", "一定", "從來不", "非常"], a: 0, e: "*maybe* 是「也許、可能」，表示不確定。", w: ["", "「一定」是 *sure*。", "「從來不」是 *never*。", "「非常」是 *very*。"] }
  ] },
  /* ===== 第8單元 素養題組 ===== */
  { id: "e-13", tag: "素養題組・世界打招呼", p: "*Hello Around the World*\n世界各地怎麼打招呼\n*In the USA, people say Hello and shake hands.*\n在美國，人們說 Hello 並且握手。\n*In Spain, people say Hola.*\n在西班牙，人們說 Hola。\n*In France, people say Bonjour.*\n在法國，人們說 Bonjour。\n*In Taiwan, many people say Ni Hao and wave.*\n在臺灣，很多人會說「你好」並揮手。　發音小辭典：*Hola* `[ˋola]`、*Bonjour* `[bɔ̃ˋʒur]`、*shake hands* `[ʃek hændz]`", qs: [
    { d: "易", q: "在美國，人們見面常說什麼？", o: ["*Hello*", "*Hola*", "*Bonjour*", "*Gracias*"], a: 0, e: "*In the USA, people say Hello and shake hands.*", w: ["", "*Hola* 是西班牙語。", "*Bonjour* 是法語。", "*Gracias* 是西班牙語的「謝謝」。"] },
    { d: "中", q: "*Hola* 是哪一個國家的問候語？", o: ["西班牙", "美國", "法國", "日本"], a: 0, e: "*In Spain, people say Hola.*", w: ["", "美國說 *Hello*。", "法國說 *Bonjour*。", "文章沒有提到日本。"] },
    { d: "中", q: "在法國，人們用什麼問候？", o: ["*Bonjour*", "*Hola*", "*Hello*", "*Ni Hao*"], a: 0, e: "*In France, people say Bonjour.*", w: ["", "*Hola* 是西班牙語。", "*Hello* 是英語。", "*Ni Hao* 是中文。"] },
    { d: "中", q: "在臺灣，很多人問候時會怎麼做？", o: ["說「你好」並揮手", "只握手不說話", "說 *Bonjour*", "說 *Gracias*"], a: 0, e: "*In Taiwan, many people say Ni Hao and wave.*", w: ["", "文章說會說「你好」並揮手。", "*Bonjour* 是法語。", "*Gracias* 是西班牙語的「謝謝」。"] },
    { d: "難", q: "*shake hands* 是什麼意思？", o: ["握手", "揮手", "拍手", "舉手"], a: 0, e: "*shake hands* 是「握手」。", w: ["", "揮手是 *wave*。", "拍手是 *clap*。", "舉手是 *raise your hand*。"] }
  ] },
  { id: "e-14", tag: "素養題組・祝你美好的一天", p: "*Have a Nice Day!*\n祝你美好的一天\n*In the USA, a clerk may say Have a nice day! when you leave.*\n在美國，店員在你離開時可能會說 Have a nice day!。\n*It is a friendly goodbye.*\n這是友善的道別。\n*People often answer Thank you. You too!*\n人們通常會回答 Thank you. You too!。\n*How are you? is often just a greeting.*\nHow are you? 常常只是一句問候。　發音小辭典：*clerk* `[klɝk]`、*friendly* `[ˋfrɛndli]`、*greeting* `[ˋgritɪŋ]`", qs: [
    { d: "中", q: "在美國，店員可能什麼時候說 *Have a nice day!*？", o: ["客人離開時", "客人剛出生的時候", "客人吵架的時候", "客人考試的時候"], a: 0, e: "*a clerk may say Have a nice day! when you leave.*", w: ["", "文章沒有提到出生。", "文章沒有提到吵架。", "文章沒有提到考試。"] },
    { d: "中", q: "*Have a nice day!* 是什麼樣的道別？", o: ["友善的道別", "生氣的道別", "傷心的道別", "命令別人的句子"], a: 0, e: "*It is a friendly goodbye.*", w: ["", "文章說它是 *friendly*。", "文章說它是 *friendly*。", "這是祝福，不是命令。"] },
    { d: "中", q: "聽到 *Have a nice day!* 時，最適合回答什麼？", o: ["*Thank you. You too!*", "*No, I can't.*", "*I'm ten.*", "*Where is the door?*"], a: 0, e: "*People often answer Thank you. You too!*", w: ["", "*No, I can't.* 是回答 *Can you ...?*。", "*I'm ten.* 是回答年齡。", "*Where is the door?* 是在問路。"] },
    { d: "中", q: "文章說 *How are you?* 常常是什麼？", o: ["只是一句問候", "一個數學題", "一個命令", "一個道歉"], a: 0, e: "*How are you? is often just a greeting.*", w: ["", "它不是數學題。", "它不是命令。", "它不是道歉。"] },
    { d: "難", q: "*You too!* 是什麼意思？", o: ["你也是！", "你兩歲！", "你太慢了！", "你有兩個！"], a: 0, e: "*You too!* 是「你也是！」，用來回應別人的祝福。", w: ["", "*two*（兩）和 *too*（也）意思不同。", "文章沒有提到太慢。", "文章沒有提到數量。"] }
  ] },
  { id: "e-15", tag: "素養題組・臺灣的節慶", p: "*Celebrations in Taiwan*\n臺灣的節慶\n*At the Mid-Autumn Festival, families eat moon cakes and pomelos.*\n中秋節時，家人一起吃月餅和柚子。\n*At the Dragon Boat Festival, people eat rice dumplings.*\n端午節時，人們吃粽子。\n*At Chinese New Year, children get red envelopes.*\n過年時，小孩會拿到紅包。\n*At the Ghost Festival, people put out food and incense.*\n中元節時，人們擺出食物和香。　發音小辭典：*moon cakes* `[mun keks]`、*pomelos* `[ˋpɑməˏloz]`、*rice dumplings* `[raɪs ˋdʌmplɪŋz]`、*red envelopes* `[rɛd ˋɛnvəˏlops]`", qs: [
    { d: "易", q: "中秋節時，家人會吃什麼？", o: ["月餅和柚子", "粽子和西瓜", "麵包和牛奶", "熱狗和薯條"], a: 0, e: "*At the Mid-Autumn Festival, families eat moon cakes and pomelos.*", w: ["", "粽子是端午節吃的。", "文章沒有提到麵包和牛奶。", "文章沒有提到熱狗和薯條。"] },
    { d: "易", q: "端午節時，人們吃什麼？", o: ["粽子", "月餅", "年夜飯", "湯圓"], a: 0, e: "*At the Dragon Boat Festival, people eat rice dumplings.*", w: ["", "月餅是中秋節吃的。", "年夜飯是過年吃的。", "文章沒有提到湯圓。"] },
    { d: "中", q: "過年時，小孩會拿到什麼？", o: ["紅包", "月餅", "粽子", "香"], a: 0, e: "*At Chinese New Year, children get red envelopes.*", w: ["", "月餅是中秋節的。", "粽子是端午節的。", "香是中元節的。"] },
    { d: "中", q: "中元節時，人們會擺出什麼？", o: ["食物和香", "蛋糕和汽球", "書本和鉛筆", "球和跳繩"], a: 0, e: "*At the Ghost Festival, people put out food and incense.*", w: ["", "蛋糕和汽球是生日派對。", "書本和鉛筆是上課用品。", "球和跳繩是運動用品。"] },
    { d: "難", q: "哪一個節慶的英文是 *Ghost Festival*？", o: ["中元節", "中秋節", "端午節", "聖誕節"], a: 0, e: "*Ghost Festival* 就是中元節。", w: ["", "中秋節是 *Mid-Autumn Festival*。", "端午節是 *Dragon Boat Festival*。", "聖誕節是 *Christmas*。"] }
  ] },
  { id: "e-16", tag: "素養題組・聖誕節與父親節", p: "*Christmas and Father's Day*\n聖誕節與父親節\n*At Christmas, people put up a Christmas tree and give gifts.*\n聖誕節時，人們布置聖誕樹並且送禮物。\n*Santa Claus brings gifts to children.*\n聖誕老公公會帶禮物給孩子。\n*Father's Day is in June in the USA.*\n美國的父親節在六月。\n*On Father's Day, children say Happy Father's Day!*\n父親節時，孩子會說 Happy Father's Day!。　發音小辭典：*Christmas tree* `[ˋkrɪsməs tri]`、*gifts* `[gɪfts]`、*Santa Claus* `[ˋsæntə klɔz]`", qs: [
    { d: "易", q: "聖誕節時，人們會做什麼？", o: ["布置聖誕樹並且送禮物", "吃月餅和柚子", "划龍舟", "拿紅包"], a: 0, e: "*At Christmas, people put up a Christmas tree and give gifts.*", w: ["", "月餅和柚子是中秋節。", "划龍舟是端午節。", "拿紅包是過年。"] },
    { d: "易", q: "*Santa Claus* 會做什麼？", o: ["帶禮物給孩子", "划龍舟", "賣月餅", "教英文"], a: 0, e: "*Santa Claus brings gifts to children.*", w: ["", "划龍舟是端午節的活動。", "月餅是中秋節的食物。", "文章沒有提到教英文。"] },
    { d: "中", q: "美國的父親節在幾月？", o: ["六月", "十二月", "五月", "一月"], a: 0, e: "*Father's Day is in June in the USA.*", w: ["", "十二月有聖誕節。", "五月是母親節。", "一月是新年。"] },
    { d: "中", q: "父親節時，孩子會說什麼？", o: ["*Happy Father's Day!*", "*Happy Mother's Day!*", "*Merry Christmas!*", "*Happy New Year!*"], a: 0, e: "*On Father's Day, children say Happy Father's Day!*", w: ["", "*Mother's Day* 是母親節。", "*Merry Christmas!* 是聖誕節。", "*Happy New Year!* 是新年。"] },
    { d: "難", q: "*gifts* 是什麼意思？", o: ["禮物", "卡片", "燈泡", "糖果"], a: 0, e: "*gifts* 是「禮物」。", w: ["", "卡片是 *cards*。", "燈泡是 *light bulbs*。", "糖果是 *candy*。"] }
  ] },
  /* ===== 第9單元 素養題組 ===== */
  { id: "e-17", tag: "素養題組・食物分類", p: "*Food Groups*\n食物分類\n*There are five food groups.*\n食物分成五大類。\n*Fruits and vegetables are in two groups.*\n水果和蔬菜是兩大類。\n*Grains are rice, bread, and noodles.*\n穀類是米飯、麵包和麵條。\n*Dairy is milk and cheese. Protein is meat and eggs.*\n乳製品是牛奶和起司，蛋白質是肉和蛋。　發音小辭典：*grains* `[grenz]`、*dairy* `[ˋdɛri]`、*protein* `[ˋprotin]`、*noodles* `[ˋnudəlz]`", qs: [
    { d: "易", q: "食物分成幾大類？", o: ["五類", "兩類", "十類", "一類"], a: 0, e: "*There are five food groups.*", w: ["", "水果和蔬菜只是其中兩類。", "文章沒有說十類。", "文章說有五類。"] },
    { d: "中", q: "米飯 *rice* 屬於哪一類？", o: ["*grains*（穀類）", "*fruits*（水果）", "*dairy*（乳製品）", "*protein*（蛋白質）"], a: 0, e: "*Grains are rice, bread, and noodles.*", w: ["", "水果例如 *apples*、*bananas*。", "乳製品例如 *milk*、*cheese*。", "蛋白質例如 *meat*、*eggs*。"] },
    { d: "中", q: "牛奶和起司屬於哪一類？", o: ["*dairy*（乳製品）", "*grains*（穀類）", "*vegetables*（蔬菜）", "*fruits*（水果）"], a: 0, e: "*Dairy is milk and cheese.*", w: ["", "穀類是 *rice*、*bread*。", "蔬菜是 *carrots*、*broccoli*。", "水果是 *apples*、*grapes*。"] },
    { d: "中", q: "*meat* 和 *eggs* 屬於哪一類？", o: ["*protein*（蛋白質）", "*dairy*（乳製品）", "*grains*（穀類）", "*fruits*（水果）"], a: 0, e: "*Protein is meat and eggs.*", w: ["", "乳製品是牛奶和起司。", "穀類是米飯和麵包。", "水果是蘋果和葡萄。"] },
    { d: "難", q: "*noodles* 是什麼？", o: ["麵條", "米飯", "麵包", "餅乾"], a: 0, e: "*noodles* 是「麵條」。", w: ["", "米飯是 *rice*。", "麵包是 *bread*。", "餅乾是 *cookies*。"] }
  ] },
  { id: "e-18", tag: "素養題組・天然與加工食物", p: "*Whole Foods and Processed Foods*\n天然食物與加工食物\n*Whole foods come from farms. An apple is a whole food.*\n天然食物來自農場，蘋果就是天然食物。\n*A banana and an egg are whole foods, too.*\n香蕉和蛋也是天然食物。\n*Processed foods are made in factories, like cookies and soda.*\n加工食物在工廠製造，例如餅乾和汽水。\n*Whole foods are usually better for us.*\n天然食物通常對我們比較好。　發音小辭典：*whole food* `[hol fud]`、*processed* `[ˋprɑsɛst]`、*farm* `[fɑrm]`、*factory* `[ˋfæktəri]`", qs: [
    { d: "中", q: "*whole foods* 通常來自哪裡？", o: ["農場", "工廠", "電視廣告", "學校"], a: 0, e: "*Whole foods come from farms.*", w: ["", "工廠是做加工食物的地方。", "廣告不是食物的來源。", "文章沒有提到學校。"] },
    { d: "中", q: "下列哪一個是 *whole food*？", o: ["*an apple*（蘋果）", "*a cookie*（餅乾）", "*a soda*（汽水）", "*a hot dog*（熱狗）"], a: 0, e: "*An apple is a whole food.*", w: ["", "餅乾是加工食物。", "汽水是加工食物。", "熱狗是加工食物。"] },
    { d: "中", q: "*cookies* 和 *soda* 屬於哪一類食物？", o: ["*processed foods*（加工食物）", "*whole foods*（天然食物）", "*fruits*（水果）", "*vegetables*（蔬菜）"], a: 0, e: "*Processed foods are made in factories, like cookies and soda.*", w: ["", "天然食物來自農場。", "餅乾和汽水不是水果。", "餅乾和汽水不是蔬菜。"] },
    { d: "中", q: "文章說哪一種食物通常對我們比較好？", o: ["天然食物", "加工食物", "餅乾", "汽水"], a: 0, e: "*Whole foods are usually better for us.*", w: ["", "文章說天然食物比較好。", "餅乾是加工食物。", "汽水是加工食物。"] },
    { d: "難", q: "*factories* 是什麼意思？", o: ["工廠", "農場", "教室", "醫院"], a: 0, e: "*factories* 是「工廠」。", w: ["", "農場是 *farms*。", "教室是 *classrooms*。", "醫院是 *hospitals*。"] }
  ] },
  { id: "e-19", tag: "素養題組・蔬菜穀類與草食動物", p: "*Fruits, Vegetables, and Grains*\n水果、蔬菜和穀類\n*Broccoli and carrots are vegetables.*\n花椰菜和紅蘿蔔是蔬菜。\n*Rice and bread are grains.*\n米飯和麵包是穀類。\n*Some animals only eat plants.*\n有些動物只吃植物。\n*Cows eat grass. They are herbivores.*\n牛吃草，牠們是草食動物。　發音小辭典：*broccoli* `[ˋbrɑkəli]`、*carrots* `[ˋkærəts]`、*grass* `[græs]`", qs: [
    { d: "易", q: "花椰菜和紅蘿蔔屬於哪一類？", o: ["蔬菜", "水果", "穀類", "乳製品"], a: 0, e: "*Broccoli and carrots are vegetables.*", w: ["", "水果例如蘋果、香蕉。", "穀類例如米飯、麵包。", "乳製品例如牛奶、起司。"] },
    { d: "易", q: "米飯和麵包屬於哪一類？", o: ["穀類", "蔬菜", "水果", "蛋白質"], a: 0, e: "*Rice and bread are grains.*", w: ["", "蔬菜例如花椰菜、紅蘿蔔。", "水果例如蘋果、葡萄。", "蛋白質例如肉、蛋。"] },
    { d: "中", q: "*Cows eat grass.* 所以牛是哪一類動物？", o: ["*herbivore*（草食動物）", "*carnivore*（肉食動物）", "*omnivore*（雜食動物）", "*vegetarian*（素食者）"], a: 0, e: "*Cows eat grass. They are herbivores.*", w: ["", "*carnivore* 是吃肉。", "*omnivore* 是兩者都吃。", "*vegetarian* 通常指不吃肉的人。"] },
    { d: "中", q: "*Some animals only eat plants.* 的 *plants* 是什麼意思？", o: ["植物", "動物", "石頭", "水"], a: 0, e: "*plants* 是「植物」。", w: ["", "動物是 *animals*。", "石頭是 *stones*。", "水是 *water*。"] },
    { d: "難", q: "只吃植物的動物叫做什麼？", o: ["*herbivore*（草食動物）", "*carnivore*（肉食動物）", "*omnivore*（雜食動物）", "*dinosaur*（恐龍）"], a: 0, e: "只吃植物的動物是 *herbivore*（草食動物）。", w: ["", "*carnivore* 是吃肉。", "*omnivore* 是植物和肉都吃。", "*dinosaur* 是恐龍，不是分類名稱。"] }
  ] },
  { id: "e-20", tag: "素養題組・動物吃什麼", p: "*What Animals Eat*\n動物吃什麼\n*Herbivores eat plants. Rabbits are herbivores.*\n草食動物吃植物，兔子是草食動物。\n*Carnivores eat meat. Lions are carnivores.*\n肉食動物吃肉，獅子是肉食動物。\n*Omnivores eat plants and meat. Pigs are omnivores.*\n雜食動物吃植物也吃肉，豬是雜食動物。\n*People are omnivores, too.*\n人也是雜食動物。　發音小辭典：*herbivores* `[ˋhɝbəˏvɔrz]`、*carnivores* `[ˋkɑrnəˏvɔrz]`、*omnivores* `[ˋɑmnəˏvɔrz]`、*plants* `[plænts]`", qs: [
    { d: "易", q: "*rabbits*（兔子）是哪一類動物？", o: ["*herbivore*（草食動物）", "*carnivore*（肉食動物）", "*omnivore*（雜食動物）", "*dairy*（乳製品）"], a: 0, e: "*Herbivores eat plants. Rabbits are herbivores.*", w: ["", "*carnivore* 是吃肉。", "*omnivore* 是兩者都吃。", "*dairy* 是食物分類，不是動物分類。"] },
    { d: "中", q: "*lions*（獅子）是哪一類動物？", o: ["*carnivore*（肉食動物）", "*herbivore*（草食動物）", "*omnivore*（雜食動物）", "*vegetable*（蔬菜）"], a: 0, e: "*Carnivores eat meat. Lions are carnivores.*", w: ["", "草食動物只吃植物。", "雜食動物兩者都吃。", "*vegetable* 是蔬菜，不是動物分類。"] },
    { d: "中", q: "*pigs*（豬）吃植物也吃肉，牠們是哪一類？", o: ["*omnivore*（雜食動物）", "*herbivore*（草食動物）", "*carnivore*（肉食動物）", "*fruits*（水果）"], a: 0, e: "*Omnivores eat plants and meat. Pigs are omnivores.*", w: ["", "草食動物只吃植物。", "肉食動物只吃肉。", "*fruits* 是水果，不是動物分類。"] },
    { d: "中", q: "文章說人類是哪一類？", o: ["*omnivore*（雜食動物）", "*herbivore*（草食動物）", "*carnivore*（肉食動物）", "文章沒有提到"], a: 0, e: "*People are omnivores, too.*", w: ["", "人不是只吃植物。", "人不是只吃肉。", "文章最後一句有說 *People are omnivores, too.*。"] },
    { d: "難", q: "*eat* 是什麼意思？", o: ["吃", "喝", "跑", "看"], a: 0, e: "*eat* 是「吃」。", w: ["", "喝是 *drink*。", "跑是 *run*。", "看是 *look* 或 *read*。"] }
  ] },

  ];

  /* ==================== 五、由資料產生選擇題 ==================== */
  var SELECT = [];

  /* *字* `音標` */
  function eo(it, withKK) {
    return "*" + it[0] + "*" + (withKK === false ? "" : " `" + it[1] + "`");
  }
  /* 音標（中文） */
  function kz(it) {
    return "`" + it[1] + "`（" + it[2] + "）";
  }

  /* 手寫與素養題的英文補音標對照表
     （只補在原本沒有音標的欄位；已含音標者不動） */
  var KK2 = {
    "Can I help you?": "[kæn aɪ hɛlp ju]",
    "Can you help me?": "[kæn ju hɛlp mi]",
    "Are you OK?": "[ɑr ju oˋke]",
    "How are you?": "[haʊ ɑr ju]",
    "Help me, please.": "[hɛlp mi pliz]",
    "Thank you.": "[θæŋk ju]",
    "Follow me, please.": "[ˋfɑlo mi pliz]",
    "Good job.": "[gʊd dʒɑb]",
    "Repeat after me. Apple.": "[rɪˋpit ˋæftɚ mi ˋæpəl]",
    "apple": "[ˋæpəl]",
    "Here you are. Your new book.": "[hɪr ju ɑr jʊr nju bʊk]",
    "Good morning.": "[gʊd ˋmɔrnɪŋ]",
    "Here you are.": "[hɪr ju ɑr]",
    "See you again.": "[si ju əˋgɛn]",
    "Bless you!": "[blɛs ju]",
    "Can you see me?": "[kæn ju si mi]",
    "Can you give me a hand?": "[kæn ju gɪv mi ə hænd]",
    "Can you swim?": "[kæn ju swɪm]",
    "Can you call me?": "[kæn ju kɔl mi]",
    "Sorry.": "[ˋsɑri]",
    "Please.": "[pliz]",
    "May I go to the restroom?": "[me aɪ go tu ðə ˋriˏstrum]",
    "May I go home?": "[me aɪ go hom]",
    "May I have a cup of tea?": "[me aɪ hæv ə kʌp əv ti]",
    "May I close the door?": "[me aɪ kloz ðə dɔr]",
    "May I give you a pencil?": "[me aɪ gɪv ju ə ˋpɛnsəl]",
    "May I borrow your pencil?": "[me aɪ ˋbɑro jʊr ˋpɛnsəl]",
    "May I draw a pencil?": "[me aɪ drɔ ə ˋpɛnsəl]",
    "May I buy your pencil?": "[me aɪ baɪ jʊr ˋpɛnsəl]",
    "This is my mother.": "[ðɪs ɪz maɪ ˋmʌðɚ]",
    "This is my father.": "[ðɪs ɪz maɪ ˋfɑðɚ]",
    "This is my sister.": "[ðɪs ɪz maɪ ˋsɪstɚ]",
    "This is my teacher.": "[ðɪs ɪz maɪ ˋtitʃɚ]",
    "I'm happy.": "[aɪm ˋhæpi]",
    "I'm angry.": "[aɪm ˋæŋgri]",
    "I'm sad.": "[aɪm sæd]",
    "I'm tired.": "[aɪm ˋtaɪɚd]",
    "Have a seat.": "[hæv ə sit]",
    "Have a cup of tea.": "[hæv ə kʌp əv ti]",
    "Have fun!": "[hæv fʌn]",
    "Have a try.": "[hæv ə traɪ]",
    "The cake is yucky.": "[ðə kek ɪz ˋjʌki]",
    "The cake is yummy.": "[ðə kek ɪz ˋjʌmi]",
    "The cake is big.": "[ðə kek ɪz bɪg]",
    "The cake is cold.": "[ðə kek ɪz kold]",
    "Follow me.": "[ˋfɑlo mi]",
    "Where is the library?": "[hwɛr ɪz ðə ˋlaɪˏbrɛri]",
    "It's here.": "[ɪts hɪr]",
    "It's over there.": "[ɪts ˋovɚ ðɛr]",
    "It's mine.": "[ɪts maɪn]",
    "It's yummy.": "[ɪts ˋjʌmi]",
    "How about you?": "[haʊ əˋbaʊt ju]",
    "This is your bag.": "[ðɪs ɪz jʊr bæg]",
    "That is a cat.": "[ðæt ɪz ə kæt]",
    "This is my cup of tea.": "[ðɪs ɪz maɪ kʌp əv ti]",
    "Is this your book?": "[ɪz ðɪs jʊr bʊk]",
    "Wait a minute, please.": "[wet ə ˋmɪnɪt pliz]",
    "Hurry up, please.": "[ˋhɝi ʌp pliz]",
    "Go away, please.": "[go əˋwe pliz]",
    "Come in, please.": "[kʌm ɪn pliz]",
    "It's three o'clock.": "[ɪts θri əˋklɑk]",
    "It's three years.": "[ɪts θri jɪrz]",
    "I'm three.": "[aɪm θri]",
    "Three, please.": "[θri pliz]",
    "It's six thirty.": "[ɪts sɪks ˋθɝti]",
    "It's six thirteen.": "[ɪts sɪks ˏθɝˋtin]",
    "It's sixteen.": "[ɪts ˏsɪksˋtin]",
    "It's thirty six.": "[ɪts ˋθɝti sɪks]",
    "I'm a classroom.": "[aɪm ə ˋklæsˏrum]",
    "I like the classroom.": "[aɪ laɪk ðə ˋklæsˏrum]",
    "I'm in the classroom.": "[aɪm ɪn ðə ˋklæsˏrum]",
    "The classroom is big.": "[ðə ˋklæsˏrum ɪz bɪg]",
    "He is a park.": "[hi ɪz ə pɑrk]",
    "She is in the park.": "[ʃi ɪz ɪn ðə pɑrk]",
    "He is in the park.": "[hi ɪz ɪn ðə pɑrk]",
    "He likes the park.": "[hi laɪks ðə pɑrk]",
    "Do you like milk?": "[du ju laɪk mɪlk]",
    "Yes, I do.": "[jɛs aɪ du]",
    "No, I like milk.": "[no aɪ laɪk mɪlk]",
    "Yes, I don't.": "[jɛs aɪ dont]",
    "No, I don't.": "[no aɪ dont]",
    "Can you dance?": "[kæn ju dæns]",
    "Yes, I can.": "[jɛs aɪ kæn]",
    "No, I can't.": "[no aɪ kænt]",
    "Yes, I am.": "[jɛs aɪ æm]",
    "I want a hamburger.": "[aɪ wɑnt ə ˋhæmbɝgɚ]",
    "I want an hamburger.": "[aɪ wɑnt ən ˋhæmbɝgɚ]",
    "I like a hamburger.": "[aɪ laɪk ə ˋhæmbɝgɚ]",
    "I have a hamburger.": "[aɪ hæv ə ˋhæmbɝgɚ]",
    "She want some soup.": "[ʃi wɑnt sʌm sup]",
    "She wants some soup.": "[ʃi wɑnts sʌm sup]",
    "He wants some soup.": "[hi wɑnts sʌm sup]",
    "She wants some soap.": "[ʃi wɑnts sʌm sop]",
    "I am reading.": "[aɪ æm ˋridɪŋ]",
    "I am read.": "[aɪ æm rid]",
    "I read now.": "[aɪ rid naʊ]",
    "I am a book.": "[aɪ æm ə bʊk]",
    "She is ride a bike.": "[ʃi ɪz raɪd ə baɪk]",
    "She rides a bike now.": "[ʃi raɪdz ə baɪk naʊ]",
    "She is a bike.": "[ʃi ɪz ə baɪk]",
    "She is riding a bike.": "[ʃi ɪz ˋraɪdɪŋ ə baɪk]",
    "I need three egg.": "[aɪ nid θri ɛg]",
    "I need egg three.": "[aɪ nid ɛg θri]",
    "I need three egges.": "[aɪ nid θri ɛgz]",
    "I need three eggs.": "[aɪ nid θri ɛgz]",
    "It's on the chair.": "[ɪts ɑn ðə tʃɛr]",
    "It's in the chair.": "[ɪts ɪn ðə tʃɛr]",
    "It's by the chair.": "[ɪts baɪ ðə tʃɛr]",
    "It's under the chair.": "[ɪts ˋʌndɚ ðə tʃɛr]",
    "Are you tired?": "[ɑr ju ˋtaɪɚd]",
    "No, I am.": "[no aɪ æm]",
    "Do you like bears?": "[du ju laɪk bɛrz]",
    "Is this your pencil?": "[ɪz ðɪs jʊr ˋpɛnsəl]",
    "Yes, they are.": "[jɛs ðe ɑr]",
    "Yes, it is.": "[jɛs ɪt ɪz]",
    "Do you have a rabbit?": "[du ju hæv ə ˋræbɪt]",
    "No, I'm not.": "[no aɪm nɑt]",
    "No, it isn't.": "[no ɪt ˋɪzənt]",
    "Do you want some juice?": "[du ju wɑnt sʌm dʒus]",
    "Yes, I like.": "[jɛs aɪ laɪk]",
    "No, please.": "[no pliz]",
    "Yes, please.": "[jɛs pliz]",
    "It's sunny today.": "[ɪts ˋsʌni təˋde]",
    "It's windy today.": "[ɪts ˋwɪndi təˋde]",
    "It's rainy today.": "[ɪts ˋreni təˋde]",
    "I'm rainy today.": "[aɪm ˋreni təˋde]",
    "I want hot dogs for dinner.": "[aɪ wɑnt hɑt dɔgz fɚ ˋdɪnɚ]",
    "I want hot dogs for lunch.": "[aɪ wɑnt hɑt dɔgz fɚ lʌntʃ]",
    "I eat hot dogs for lunch.": "[aɪ it hɑt dɔgz fɚ lʌntʃ]",
    "I am hot dogs for lunch.": "[aɪ æm hɑt dɔgz fɚ lʌntʃ]",
    "Can you skate?": "[kæn ju sket]",
    "I am eating in the bedroom.": "[aɪ æm ˋitɪŋ ɪn ðə ˋbɛdˏrum]",
    "I am eating in the dining room.": "[aɪ æm ˋitɪŋ ɪn ðə ˋdaɪnɪŋ rum]",
    "I am eating in the bathroom.": "[aɪ æm ˋitɪŋ ɪn ðə ˋbæθˏrum]",
    "I am sleeping in the dining room.": "[aɪ æm ˋslipɪŋ ɪn ðə ˋdaɪnɪŋ rum]",
    "Is this your cap?": "[ɪz ðɪs jʊr kæp]",
    "No, they aren't.": "[no ðe ɑrnt]",
    "wave": "[wev]",
    "shrug": "[ʃrʌg]",
    "a suit and a tie": "[ə sut ænd ə taɪ]",
    "a sweater and a coat": "[ə ˋswɛtɚ ænd ə kot]",
    "boots and gloves": "[buts ænd glʌvz]",
    "a T-shirt and shorts": "[ə ˋtiˏʃɝt ænd ʃɔrts]",
    "moon cakes": "[mun keks]",
    "pomelos": "[ˋpɑməˏloz]",
    "red envelopes": "[rɛd ˋɛnvəˏlops]",
    "incense": "[ˋɪnsɛns]",
    "Happy Mother's Day!": "[ˋhæpi ˋmʌðɚz de]",
    "Happy New Year!": "[ˋhæpi nju jɪr]",
    "Merry Christmas!": "[ˋmɛri ˋkrɪsməs]",
    "Happy Father's Day!": "[ˋhæpi ˋfɑðɚz de]",
    "banana": "[bəˋnænə]",
    "orange": "[ˋɔrɪndʒ]",
    "fruits": "[fruts]",
    "grains": "[grenz]",
    "dairy": "[ˋdɛri]",
    "protein": "[ˋprotin]",
    "milk": "[mɪlk]",
    "cheese": "[tʃiz]",
    "vegetables": "[ˋvɛdʒtəbəlz]",
    "whole food": "[hol fud]",
    "a hot dog": "[ə hɑt dɔg]",
    "a cookie": "[ə ˋkʊki]",
    "a soda": "[ə ˋsodə]",
    "an apple": "[ən ˋæpəl]",
    "processed food": "[ˋprɑsɛst fud]",
    "a banana": "[ə bəˋnænə]",
    "a tomato": "[ə təˋmeto]",
    "an egg": "[ən ɛg]",
    "broccoli": "[ˋbrɑkəli]",
    "carrots": "[ˋkærəts]",
    "rice": "[raɪs]",
    "bread": "[brɛd]",
    "herbivore": "[ˋhɝbəˏvɔr]",
    "carnivore": "[ˋkɑrnəˏvɔr]",
    "omnivore": "[ˋɑmnəˏvɔr]",
    "dinosaur": "[ˋdaɪnəˏsɔr]",
    "a lion": "[ə ˋlaɪən]",
    "vegetarian": "[ˏvɛdʒəˋtɛriən]"
  };

  /* 為沒有音標的欄位補上 `[音標]`（已含音標的欄位保持原樣） */
  function kkFix(txt) {
    if (txt == null || txt.indexOf("`") >= 0) return txt;
    var vs = txt.split("*");
    if (vs.length < 3) return txt;
    var out = vs[0];
    for (var i = 1; i < vs.length; i += 2) {
      var ph = vs[i];
      out += "*" + ph + "*" + (KK2[ph] ? " `" + KK2[ph] + "`" : "");
      if (i + 1 < vs.length) out += vs[i + 1];
    }
    return out;
  }

  HAND.forEach(function (it) { it.q = kkFix(it.q); it.o = it.o.map(kkFix); });
  PASSAGE.forEach(function (g) {
    g.qs.forEach(function (qq) { qq.q = kkFix(qq.q); qq.o = qq.o.map(kkFix); });
  });

  function pushPhonics() {
    PHONICS.forEach(function (g) {
      var Y = g.y, N = g.n;
      SELECT.push({
        u: g.u, d: "易",
        q: "聽一聽、看一看，下列哪一個單字的發音含有" + g.s + "？",
        o: [eo(Y[0]), eo(N[0]), eo(N[1]), eo(N[2])], a: 0,
        e: eo(Y[0]) + "（" + Y[0][2] + "）含有" + g.s + "。",
        w: ["", kz(N[0]) + "是" + g.wt + "，不含" + g.s + "。",
            kz(N[1]) + "是" + g.wt + "，不含" + g.s + "。",
            kz(N[2]) + "是" + g.wt + "，不含" + g.s + "。"]
      });
      SELECT.push({
        u: g.u, d: "中",
        q: "聽一聽、看一看，下列哪一個單字的發音「不含」" + g.s + "？",
        o: [eo(N[0]), eo(Y[0]), eo(Y[1]), eo(Y[2])], a: 0,
        e: kz(N[0]) + "是" + g.wt + "，不含" + g.s + "。",
        w: ["", kz(Y[0]) + "含有" + g.s + "。",
            kz(Y[1]) + "含有" + g.s + "。", kz(Y[2]) + "含有" + g.s + "。"]
      });
      SELECT.push({
        u: g.u, d: "難",
        q: "音標 `" + Y[1][1] + "` 對應的單字是哪一個？",
        o: [eo(Y[1], false), eo(N[0], false), eo(N[1], false), eo(N[2], false)], a: 0,
        e: "`" + Y[1][1] + "` 是 " + eo(Y[1], false) + "（" + Y[1][2] + "）。",
        w: ["", kz(N[0]) + "是 " + eo(N[0], false) + "。",
            kz(N[1]) + "是 " + eo(N[1], false) + "。", kz(N[2]) + "是 " + eo(N[2], false) + "。"]
      });
    });
  }

  function pushVocab() {
    VOCAB.forEach(function (g) {
      var L = g.items, n = L.length;
      var a1 = L[1 % n], a2 = L[2 % n], a3 = L[3 % n];
      SELECT.push({
        u: g.u, d: "易",
        q: "「" + L[0][2] + "」的英文是哪一個？",
        o: [eo(L[0]), eo(a1), eo(a2), eo(a3)], a: 0,
        e: "「" + L[0][2] + "」是 " + eo(L[0]) + "。",
        w: ["", eo(a1) + " 是「" + a1[2] + "」。", eo(a2) + " 是「" + a2[2] + "」。",
            eo(a3) + " 是「" + a3[2] + "」。"]
      });
      var b1 = L[2 % n], b2 = L[3 % n], b3 = L[4 % n];
      SELECT.push({
        u: g.u, d: "中",
        q: "點一下可聽發音：" + eo(L[1]) + " 的中文意思是什麼？",
        o: [L[1][2], b1[2], b2[2], b3[2]], a: 0,
        e: eo(L[1]) + " 的意思是「" + L[1][2] + "」。",
        w: ["", "「" + b1[2] + "」是 " + eo(b1, false) + "。", "「" + b2[2] + "」是 " + eo(b2, false) + "。",
            "「" + b3[2] + "」是 " + eo(b3, false) + "。"]
      });
      var c1 = L[3 % n], c2 = L[4 % n], c3 = L[5 % n];
      SELECT.push({
        u: g.u, d: "難",
        q: "音標 `" + L[2][1] + "` 對應的單字是哪一個？",
        o: [eo(L[2], false), eo(c1, false), eo(c2, false), eo(c3, false)], a: 0,
        e: "`" + L[2][1] + "` 是 " + eo(L[2], false) + "（" + L[2][2] + "）。",
        w: ["", kz(c1) + "是 " + eo(c1, false) + "。", kz(c2) + "是 " + eo(c2, false) + "。",
            kz(c3) + "是 " + eo(c3, false) + "。"]
      });
    });
  }

  pushPhonics();
  pushVocab();
  Array.prototype.push.apply(SELECT, HAND);

  /* ==================== 六、出卷器 ==================== */
  function lcg(seed) {
    var s = seed >>> 0;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }
  function makeSeq(seed, len, n) {
    var rnd = lcg(seed);
    var base = Math.floor(len / n), rem = len % n;
    var counts = [];
    for (var i = 0; i < n; i++) counts.push(base);
    for (var j = 0; j < rem; j++) counts[j]++;
    var pool = [];
    counts.forEach(function (c, k) { for (var i = 0; i < c; i++) pool.push(k); });
    for (var t = pool.length - 1; t > 0; t--) {
      var r = Math.floor(rnd() * (t + 1));
      var tmp = pool[t]; pool[t] = pool[r]; pool[r] = tmp;
    }
    return pool;
  }
  function okSeq(seq) {
    var c = [0, 0, 0, 0];
    seq.forEach(function (v) { c[v]++; });
    if (Math.max.apply(null, c) - Math.min.apply(null, c) > 1) return false;
    for (var i = 0; i + 2 < seq.length; i++) {
      if (seq[i] === seq[i + 1] && seq[i] === seq[i + 2]) return false;
    }
    return true;
  }
  function findSeq(seed, len) {
    for (var s = seed; s < seed + 400000; s++) {
      var seq = makeSeq(s, len, 4);
      if (okSeq(seq)) return seq;
    }
    return makeSeq(seed, len, 4);
  }
  /* 把正解搬到 target 位置，其餘選項與解析一起搬 */
  function placeTo(item, target) {
    var correct = item.o[item.a];
    var pairs = [];
    item.o.forEach(function (opt, k) { if (k !== item.a) pairs.push({ opt: opt, exp: item.w[k] }); });
    var o = [], w = [];
    for (var k = 0; k < 4; k++) {
      if (k === target) { o.push(correct); w.push(""); }
      else { var pr = pairs.shift(); o.push(pr.opt); w.push(pr.exp); }
    }
    return { o: o, w: w, a: target };
  }
  function pickD(it, i) {
    var DEF = ["中", "易", "中", "難", "中"];
    return ["易", "中", "難"].indexOf(it.d) >= 0 ? it.d : DEF[i % DEF.length];
  }
  function pad2(n) { return (n < 10 ? "0" : "") + n; }

  var WEEK = ["日", "一", "二", "三", "四", "五", "六"];
  var START = new Date(2026, 9, 19); /* 2026-10-19 */
  var NDAYS = 19;
  var COLORS = [
    "#2f6fed", "#7a5c9e", "#2f8f5b", "#c46a1f", "#3a7ca5",
    "#b5563f", "#a2506b", "#5b6cc4", "#0f766e", "#9a6a1f",
    "#4a7c59", "#c05a86", "#2b7a78", "#8c5a2b", "#3f6f9f",
    "#8a3f6f", "#567a2f", "#6f4a8a", "#0e7490"
  ];

  function dayLabel(d) {
    var dt = new Date(START.getTime());
    dt.setDate(dt.getDate() + d);
    var m = dt.getMonth() + 1, dd = dt.getDate();
    return { md: m + "/" + dd, week: WEEK[dt.getDay()],
      iso: dt.getFullYear() + "-" + pad2(m) + "-" + pad2(dd) };
  }

  var papers = [];
  var NSEL = SELECT.length, NP = PASSAGE.length;

  for (var d = 0; d < NDAYS; d++) {
    var lab = dayLabel(d);
    var key = "eng-day-" + pad2(d + 1);
    var name = lab.md + " 英語文期中考／期末考";

    /* 40 題選擇：輪替窗格取出 */
    var picks = [];
    if (NSEL > 0) {
      var start = (d * 40) % NSEL;
      for (var k = 0; k < 40; k++) picks.push(SELECT[(start + k) % NSEL]);
    }

    /* 10 題素養：每天 2 組，每組 5 小題 */
    var blocks = [{ seed: d * 977 + 31, items: picks }];
    if (NP > 0) {
      var p1 = PASSAGE[(d * 2) % NP];
      var p2 = PASSAGE[(d * 2 + 1) % NP];
      if (p2 === p1) p2 = PASSAGE[(d * 2 + 2) % NP];
      blocks.push({ seed: d * 1451 + 89, items: p1.qs, passage: p1.p, tag: p1.tag || "素養題組" });
      blocks.push({ seed: d * 1831 + 47, items: p2.qs, passage: p2.p, tag: p2.tag || "素養題組" });
    }

    var out = [], units = {};
    for (var bi = 0; bi < blocks.length; bi++) {
      var blk = blocks[bi];
      var seq = findSeq(blk.seed, blk.items.length);
      for (var ii = 0; ii < blk.items.length; ii++) {
        var it = blk.items[ii];
        var put = placeTo(it, seq[ii]);
        var q = {
          g: 4,
          u: blk.passage ? blk.tag : it.u,
          d: blk.passage ? pickD(it, ii) : it.d,
          q: it.q, o: put.o, a: put.a, e: it.e, w: put.w
        };
        if (blk.passage) q.p = blk.passage;
        out.push(q);
        units[q.u] = (units[q.u] || 0) + 1;
      }
    }

    var names = Object.keys(units).map(function (u) { return u + " " + units[u]; });
    var note = "第 " + (d + 1) + " 天（" + lab.md + "，週" + lab.week + "）｜" +
      (names.length > 12 ? names.slice(0, 12).join("、") + " 等 " + names.length + " 類" : names.join("、"));

    papers.push({
      key: key, name: name, short: lab.md,
      color: COLORS[d % COLORS.length], grades: "四年級", minutes: 50,
      note: note, q: out
    });
  }

  window.EXAM = window.EXAM || { papers: [] };
  Array.prototype.push.apply(window.EXAM.papers, papers);
})();
