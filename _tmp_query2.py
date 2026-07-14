import sqlite3, json

DB = r'C:\Users\ASUS\.local\share\mimocode\mimocode.db'
PID = '5baee63a-68a2-483c-a5f0-9a0a58370eb9'

conn = sqlite3.connect(DB)
conn.row_factory = sqlite3.Row
c = conn.cursor()

# 1. Schema of task table
print("=== TASK SCHEMA ===")
c.execute("PRAGMA table_info(task)")
for row in c.fetchall():
    print(f"  {row['name']} ({row['type']})")

# 2. Check tasks
print("\n=== TASKS ===")
c.execute("""
    SELECT * FROM task
    WHERE session_id IN (SELECT id FROM session WHERE project_id = ?)
    ORDER BY time_updated DESC
    LIMIT 20
""", (PID,))
for row in c.fetchall():
    print(f"  {dict(row)}")

# 3. Check task_event table
print("\n=== TASK EVENT SCHEMA ===")
c.execute("PRAGMA table_info(task_event)")
for row in c.fetchall():
    print(f"  {row['name']} ({row['type']})")

# 4. Check memory files in sessions
print("\n=== SESSION MEMORY FILES ===")
c.execute("""
    SELECT DISTINCT s.id, s.title, s.time_created
    FROM session s
    WHERE s.project_id = ?
    ORDER BY s.time_created DESC
    LIMIT 5
""", (PID,))
sessions = [dict(row) for row in c.fetchall()]
for s in sessions:
    print(f"\n  Session: {s['id']} | {s['title']}")

# 5. Look for user messages with keywords about rules/decisions
print("\n=== USER MESSAGES WITH KEYWORDS ===")
c.execute("""
    SELECT m.session_id, m.time_created, substr(json_extract(p.data, '$.text'), 1, 300) as text_preview
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
      )
    ORDER BY m.time_created DESC
    LIMIT 30
""", (PID,))
for row in c.fetchall():
    text = row['text_preview'] or ''
    if text.strip():
        print(f"  [{row['session_id']}] {text[:200]}")

conn.close()
