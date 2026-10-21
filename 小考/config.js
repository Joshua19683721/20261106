/* ============================================================
   小考系統 —— 設定檔
   ------------------------------------------------------------
   這裡的值會公開在網路上（GitHub Pages 是公開網站）。
   SUPABASE_URL / SUPABASE_ANON_KEY 本來就是設計給前端公開用的，
   真正保護資料的是 Supabase 的 RLS 政策（見 supabase.sql）。
   NTFY_TOPIC 是一組「頻道名稱」，知道的人可以對它發訊息，
   所以請用隨機、猜不到的英數字，不要用姓名或電話。

   填入方式（兩種選一）：
   A. 把三個值貼給 AI，由 AI 幫你寫進這個檔案並部署。
   B. 自己在 GitHub 網頁上編輯這個檔案：
      repo → 小考/config.js → 右上鉛筆 → 貼上 → Commit changes
   ============================================================ */
window.QCFG = {
  /* Supabase 專案網址，例如 https://abcdefghijkl.supabase.co */
  SUPABASE_URL: "",

  /* Supabase 的 anon public key（Settings → API Keys → anon public） */
  SUPABASE_ANON_KEY: "",

  /* ntfy 頻道名稱，例如 joshua-home-quiz-7f3k9x2m */
  NTFY_TOPIC: "",

  /* 管理頁通關密碼（只是擋一下，不是真正的資安防線） */
  ADMIN_PASSCODE: "2026",

  /* 兒子的名字，會顯示在管理頁與通知裡 */
  STUDENT_NAME: "兒子",

  /* 每題給幾秒；20 題 × 45 秒 = 15 分鐘 */
  SECONDS_PER_QUESTION: 45,

  /* 交卷後兒子的畫面是否顯示分數。
     false = 只顯示「已通知爸爸」，分數留給你們一起看。 */
  SHOW_SCORE_TO_STUDENT: false
};
