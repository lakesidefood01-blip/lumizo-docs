import sqlite3, json

DB = r'C:\Users\ASUS\.local\share\mimocode\mimocode.db'
PID = '5baee63a-68a2-483c-a5f0-9a0a58370eb9'

conn = sqlite3.connect(DB)
conn.row_factory = sqlite3.Row
c = conn.cursor()

# 1. Check tasks
print("=== TASKS ===")
c.execute("""
    SELECT t.id, t.session_id, t.status, t.summary, t.created_at, t.last_event_at, t.owner
    FROM task t
    JOIN session s ON t.session_id = s.id
    WHERE s.project_id = ?
    ORDER BY t.last_event_at DESC
    LIMIT 20
""", (PID,))
for row in c.fetchall():
    print(f"  {row['id']} | session={row['session_id']} | status={row['status']} | owner={row['owner']}")
    print(f"    summary: {(row['summary'] or '')[:200]}")

# 2. Look for user messages with keywords about rules/decisions
print("\n=== USER MESSAGES WITH KEYWORDS ===")
c.execute("""
    SELECT m.session_id, m.time_created, substr(json_extract(p.data, '$.text'), 1, 400) as text_preview
    FROM message m
    JOIN part p ON p.message_id = m.id
    JOIN session s ON m.session_id = s.id
    WHERE s.project_id = ?
      AND json_extract(m.data, '$.role') = 'user'
      AND json_extract(p.data, '$.type') = 'text'
      AND (
        json_extract(p.data, '$.text') LIKE '%always%'
        OR json_extract(p.data, '$.text') LIKE '%never%'
        OR json_extract(p.data, '$.text') LIKE '%remember%'
        OR json_extract(p.data, '$.text') LIKE '%rule%'
        OR json_extract(p.data, '$.text') LIKE '%decision%'
        OR json_extract(p.data, '$.text') LIKE '%decided%'
        OR json_extract(p.data, '$.text') LIKE '%workflow%'
        OR json_extract(p.data, '$.text') LIKE '%repeat%'
        OR json_extract(p.data, '$.text') LIKE '%error%'
        OR json_extract(p.data, '$.text') LIKE '%bug%'
        OR json_extract(p.data, '$.text') LIKE '%fix%'
        OR json_extract(p.data, '$.text') LIKE '%ganti%'
        OR json_extract(p.data, '$.text') LIKE '%tambah%'
        OR json_extract(p.data, '$.text') LIKE '%hapus%'
        OR json_extract(p.data, '$.text') LIKE '%ubah%'
        OR json_extract(p.data, '$.text') LIKE '%jangan%'
        OR json_extract(p.data, '$.text') LIKE '%selalu%'
        OR json_extract(p.data, '$.text') LIKE '%setiap%'
      )
    ORDER BY m.time_created DESC
    LIMIT 30
""", (PID,))
for row in c.fetchall():
    text = row['text_preview'] or ''
    if text.strip():
        print(f"  [{row['session_id']}] {text[:300]}")
        print()

# 3. Check the main work sessions (non-checkpoint-writer)
print("\n=== MAIN WORK SESSIONS ===")
c.execute("""
    SELECT s.id, s.title, s.time_created
    FROM session s
    WHERE s.project_id = ?
      AND s.title NOT LIKE 'checkpoint-writer%'
    ORDER BY s.time_created DESC
    LIMIT 10
""", (PID,))
for row in c.fetchall():
    print(f"  {row['id']} | {row['time_created']} | {row['title']}")

conn.close()
