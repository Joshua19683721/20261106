-- ============================================================
--  小考系統 —— Supabase 資料表
--  用法：Supabase → SQL Editor → 貼上整份 → Run
--  可以重複執行，不會壞掉。
-- ============================================================

create extension if not exists pgcrypto;

-- ------------------------------------------------------------
-- 交卷紀錄
-- items 存的是「當下完整題目快照」，所以之後題庫改版，
-- 舊考卷的題目、選項、詳解仍然看得到。
-- ------------------------------------------------------------
create table if not exists public.submissions (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  student       text        not null default '兒子',
  subject       text        not null,
  subject_dir   text        not null,
  subject_name  text        not null,
  requested     int         not null,
  total         int         not null,
  correct       int         not null,
  elapsed_sec   int         not null,
  ids           text[]      not null default '{}',
  items         jsonb       not null default '[]'::jsonb,
  reviewed      boolean     not null default false
);

-- ------------------------------------------------------------
-- 已檢討題目（下次出卷會跳過）
-- id 是「題幹＋選項＋答案」算出來的穩定雜湊，不是資料庫流水號
-- ------------------------------------------------------------
create table if not exists public.done_questions (
  id          text primary key,
  subject     text not null,
  label       text not null default '',
  unit        text not null default '',
  created_at  timestamptz not null default now()
);

create index if not exists submissions_created_idx on public.submissions (created_at desc);
create index if not exists submissions_subject_idx on public.submissions (subject);
create index if not exists done_questions_subject_idx on public.done_questions (subject);

-- ------------------------------------------------------------
-- 再考題目（爸爸討論過後，把錯題放回下次小考優先抽）
-- 和 done_questions 相反：這裡的題目會被「優先」出卷
-- ------------------------------------------------------------
create table if not exists public.retry_questions (
  id          text primary key,
  subject     text not null,
  label       text not null default '',
  unit        text not null default '',
  created_at  timestamptz not null default now()
);
create index if not exists retry_questions_subject_idx on public.retry_questions (subject);

-- ------------------------------------------------------------
-- 權限：這是家用網站，兒子那一端不需要登入，
-- 所以開放 anon 角色讀寫。網址本身是唯一門檻。
-- 若之後要更嚴格，可改用 Supabase Auth 登入後再寫入。
-- ------------------------------------------------------------
grant select, insert, update, delete on public.submissions      to anon;
grant select, insert, delete on public.done_questions           to anon;
grant select, insert, delete on public.retry_questions          to anon;

alter table public.submissions      enable row level security;
alter table public.done_questions   enable row level security;
alter table public.retry_questions  enable row level security;

drop policy if exists "qc submissions read"   on public.submissions;
drop policy if exists "qc submissions insert" on public.submissions;
drop policy if exists "qc submissions update" on public.submissions;
drop policy if exists "qc submissions delete" on public.submissions;
drop policy if exists "qc done read"          on public.done_questions;
drop policy if exists "qc done insert"        on public.done_questions;
drop policy if exists "qc done delete"        on public.done_questions;
drop policy if exists "qc retry read"         on public.retry_questions;
drop policy if exists "qc retry insert"       on public.retry_questions;
drop policy if exists "qc retry delete"       on public.retry_questions;

create policy "qc submissions read"   on public.submissions for select to anon using (true);
create policy "qc submissions insert" on public.submissions for insert to anon with check (true);
create policy "qc submissions update" on public.submissions for update to anon using (true) with check (true);
-- delete 只給設定精靈清掉自己寫入的測試列用
create policy "qc submissions delete" on public.submissions for delete to anon using (true);

create policy "qc done read"   on public.done_questions for select to anon using (true);
create policy "qc done insert" on public.done_questions for insert to anon with check (true);
create policy "qc done delete" on public.done_questions for delete to anon using (true);

create policy "qc retry read"   on public.retry_questions for select to anon using (true);
create policy "qc retry insert" on public.retry_questions for insert to anon with check (true);
create policy "qc retry delete" on public.retry_questions for delete to anon using (true);

-- ------------------------------------------------------------
-- 完成後回傳目前筆數，確認有建立成功
-- ------------------------------------------------------------
select
  (select count(*) from public.submissions)     as submissions,
  (select count(*) from public.done_questions)  as done_questions,
  (select count(*) from public.retry_questions) as retry_questions;
