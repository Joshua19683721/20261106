# 小考系統

給四年級兒子用的「短時間練習」：選一科 → 選 20／30／40 題 → 作答 → 交卷 → 爸爸收到通知 → 一起檢討 → 標記已檢討（下次不再抽到）。

---

## 兩個連結

| 誰 | 網址 | 用途 |
|---|---|---|
| 兒子 | `https://joshua19683721.github.io/20261106/小考/` | 選科目、作答 |
| 爸爸 | `https://joshua19683721.github.io/20261106/小考/admin.html` | 收通知、看錯題詳解、標記已檢討 |
| 設定 | `https://joshua19683721.github.io/20261106/小考/setup.html` | 一次性設定精靈 |

管理頁預設密碼 `2026`，可在 `config.js` 的 `ADMIN_PASSCODE` 修改。

---

## 一次性設定（約 10 分鐘）

1. **建立 Supabase 專案**（免費、不用信用卡）
   - <https://supabase.com/dashboard> → New project
   - Region 選 Singapore 或 Tokyo

2. **建立資料表**
   - SQL Editor → New query → 貼上 [`supabase.sql`](supabase.sql) 全部內容 → Run

3. **取得兩個值**
   - Project Settings → API
   - `Project URL`（`https://xxx.supabase.co`）
   - `anon public` key

4. **建立 ntfy 推播頻道**
   - 手機安裝 ntfy App → Subscribe to topic → 輸入頻道名稱
   - 電腦可開 `https://ntfy.sh/你的頻道名稱` 並允許通知
   - 頻道名稱請用隨機英數字，不要用姓名或電話

5. **填回 `config.js`**
   - 開 [`setup.html`](setup.html)，貼上三個值 → 測試 → 複製產生的 `config.js`
   - 到 GitHub 覆蓋 `小考/config.js` → Commit
   - 等 1 分鐘 Pages 重新部署

---

## 出題規則

- 題庫來源：該科既有的 19 張試卷，全部攤平後**去重**（同一道題在不同卷重複出現只算一題）。
- 題目 ID 用「題幹 + 選項集合（排序）+ 正確答案 + 短文」算雜湊，所以選項打散不影響 ID。
- 抽題優先序：
  1. 排除爸爸標記「已檢討」的題目
  2. 優先抽兒子**沒做過**的題目
  3. 依單元輪流抽，讓一份小考涵蓋多個單元
  4. 真的不夠才回頭抽做過但還沒檢討的題目
- 每題 45 秒（`SECONDS_PER_QUESTION`），時間到自動交卷。
- 選項順序沿用原試卷，不再二次打散。

---

## 兒子的畫面

- 作答中不顯示對錯。
- 交卷後只顯示「已通知爸爸」，**不顯示分數、答案與詳解**（可用 `SHOW_SCORE_TO_STUDENT: true` 改成顯示分數）。
- 支援手機、鍵盤（A/B/C/D、左右方向鍵）。

## 爸爸的畫面

- 每 20 秒自動輪詢；有新考卷會跳出提示、響聲與瀏覽器通知。
- 每份考卷顯示：分數、正確率、用時、待標記題數。
- 每題顯示：單元／小節、難度、出處卷、短文、題幹、四個選項（標出正解與兒子的選擇）、詳解、以及「兒子選的選項為什麼不對」。
- 可單題標記、整份錯題一次標記、或整份標記完成。
- 「已標記題目」頁可查看與取消標記。

---

## 資料表

`submissions`
- 每次交卷一列，`items` 存當下完整題目快照，所以之後題庫改版也看得到舊考卷的內容。

`done_questions`
- 已檢討題目，`id` 是穩定雜湊（主鍵），重複標記不會產生重複列。

---

## 常見問題

**Q：Supabase 免費專案會不會睡著？**
會，連續 7 天沒有使用會暫停。到 Supabase 後台按 Restore 即可，資料不會不見。兒子的頁面若讀不到資料會顯示錯誤訊息。

**Q：推播沒收到？**
- 確認 ntfy App 已訂閱同一個頻道名稱（大小寫、減號都要一樣）。
- 到 `setup.html` 按「測試推播」。
- 交卷仍然會寫進資料庫，管理頁照樣看得到，只是少了即時通知。

**Q：想改每題秒數？**
改 `config.js` 的 `SECONDS_PER_QUESTION`（例如 60）。

**Q：想讓兒子看到分數？**
改 `config.js` 的 `SHOW_SCORE_TO_STUDENT: true`。

**Q：題目不夠 20 題？**
代表該科大部分題目都被標記已檢討了。到管理頁「已標記題目」取消一些標記即可。

---

## 安全性說明

這是家用網站，沒有登入機制：

- Supabase 的 anon key 本來就是公開的，資料表透過 RLS 開放匿名讀寫。
- 也就是說，**知道網址的人可以讀取交卷紀錄、也可以標記題目**。
- 管理頁密碼只是擋一下，不是真正的資安防線。
- ntfy 頻道名稱同樣是「知道就能發訊息」。

若之後要更嚴格，可以改成 Supabase Auth 登入（爸爸一組帳號），並把 RLS 收緊到 `authenticated`。

---

## 檔案

```
小考/
  index.html      兒子入口（選科目與題數）
  quiz.html       作答頁
  admin.html      爸爸管理頁
  setup.html      設定精靈
  core.js         共用核心（題庫、抽題、API）
  config.js       設定值
  supabase.sql    資料表與 RLS
  README.md       本文件
```

> 本系統不修改任何既有科目頁面與題庫，只讀取 `window.EXAM.papers`。
