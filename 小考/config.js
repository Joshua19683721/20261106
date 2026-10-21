/* ============================================================
   小考系統 —— 設定檔
   ------------------------------------------------------------
   這裡的值會公開在網路上（GitHub Pages 是公開網站）。
   SUPABASE_URL / SUPABASE_ANON_KEY 本來就是設計給前端公開用的，
   真正保護資料的是 Supabase 的 RLS 政策（見 supabase.sql）。
   NTFY_TOPIC 是一組「頻道名稱」，知道的人可以對它發訊息，
   所以請用隨機、猜不到的英數字，不要用姓名或電話。

   要換 Supabase 專案或推播頻道時，改這個檔案就好。
   ============================================================ */
window.QCFG = {
  /* Supabase 專案網址 */
  SUPABASE_URL: "https://ndklidsvemmxbcsbyjlh.supabase.co",

  /* Supabase 的 anon public key（公開金鑰，安全性靠 RLS） */
  SUPABASE_ANON_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5ka2xpZHN2ZW1teGJjc2J5amxoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ0ODMzMTcsImV4cCI6MjA4MDA1OTMxN30.Y_8BSVrR-3qOoCtEqrA7JlvG2DdzvsmEittJA33KLM0",

  /* ntfy 頻道名稱（手機 ntfy App 訂閱同一組字串） */
  NTFY_TOPIC: "home-quiz-0c355463c973",

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
