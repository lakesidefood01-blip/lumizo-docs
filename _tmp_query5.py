import sqlite3, json

DB = r'C:\Users\ASUS\.local\share\mimocode\mimocode.db'
PID = '5baee63a-68a2-483c-a5f0-9a0a58370eb9'

conn = sqlite3.connect(DB)
conn.row_factory = sqlite3.Row
c = conn.cursor()

# Search for error/fix related text in assistant messages
print("=== ASSISTANT TEXT WITH ERROR/FIX PATTERNS ===")
c.execute("""
    SELECT m.session_id, m.time_created, substr(json_extract(p.data, '$.text'), 1, 500) as text_preview
    FROM message m
    JOIN part p ON p.message_id = m.id
    JOIN session s ON m.session_id = s.id
    WHERE s.project_id = ?
      AND json_extract(m.data, '$.role') = 'assistant'
      AND json_extract(p.data, '$.type') = 'text'
      AND (
        json_extract(p.data, '$.text') LIKE '%error%'
        OR json_extract(p.data, '$.text') LIKE '%fix%'
        OR json_extract(p.data, '$.text') LIKE '%workaround%'
        OR json_extract(p.data, '$.text') LIKE '%gotcha%'
        OR json_extract(p.data, '$.text') LIKE '%pitfall%'
        OR json_extract(p.data, '$.text') LIKE '%note%'
        OR json_extract(p.data, '$.text') LIKE '%important%'
        OR json_extract(p.data, '$.text') LIKE '%decision%'
        OR json_extract(p.data, '$.text') LIKE '%reason%'
      )
    ORDER BY m.time_created DESC
    LIMIT 30
""", (PID,))
for row in c.fetchall():
    text = row['text_preview'] or ''
    if text.strip() and len(text) > 50:
        print(f"\n  [{row['session_id']}] {text[:400]}")
        print()

# Search for user directives about contact email change
print("\n=== USER DIRECTIVES ABOUT EMAIL ===")
c.execute("""
    SELECT m.session_id, m.time_created, substr(json_extract(p.data, '$.text'), 1, 500) as text_preview
    FROM message m
    JOIN part p ON p.message_id = m.id
    JOIN session s ON m.session_id = s.id
    WHERE s.project_id = ?
      AND json_extract(m.data, '$.role') = 'user'
      AND json_extract(p.data, '$.type') = 'text'
      AND (
        json_extract(p.data, '$.text') LIKE '%email%'
        OR json_extract(p.data, '$.text') LIKE '%contact%'
        OR json_extract(p.data, '$.text') LIKE '%rizal%'
      )
    ORDER BY m.time_created DESC
    LIMIT 10
""", (PID,))
for row in c.fetchall():
    text = row['text_preview'] or ''
    if text.strip():
        print(f"  [{row['session_id']}] {text[:300]}")
        print()

# Check for Slip Gaji creation details
print("\n=== SLIP GAJI CREATION ===")
c.execute("""
    SELECT m.session_id, m.time_created, substr(json_extract(p.data, '$.text'), 1, 500) as text_preview
    FROM message m
    JOIN part p ON p.message_id = m.id
    JOIN session s ON m.session_id = s.id
    WHERE s.project_id = ?
      AND json_extract(m.data, '$.role') = 'assistant'
      AND json_extract(p.data, '$.type') = 'text'
      AND (
        json_extract(p.data, '$.text') LIKE '%slip gaji%'
        OR json_extract(p.data, '$.text') LIKE '%SlipGaji%'
        OR json_extract(p.data, '$.text') LIKE '%payslip%'
      )
    ORDER BY m.time_created DESC
    LIMIT 10
""", (PID,))
for row in c.fetchall():
    text = row['text_preview'] or ''
    if text.strip():
        print(f"  [{row['session_id']}] {text[:400]}")
        print()

conn.close()
