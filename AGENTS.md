<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->


## กฎและข้อตกลงการทำงาน (Workflow Constraints)

1. **Git Commit:** หากต้องการจะทำการ `git commit` ทุกครั้ง **ต้องถามและขอการยืนยันจาก USER ก่อนเสมอ** ห้าม commit เองโดยพลการ
2. **สร้างไฟล์ ZIP:** การสร้างหรืออัปเดตไฟล์ zip **ต้องรอให้ USER สั่งการเท่านั้น** หาก USER ไม่ได้สั่งอย่างชัดเจน **ห้ามทำหรือคิดไปเองโดยเด็ดขาด**
