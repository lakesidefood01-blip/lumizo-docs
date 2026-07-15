import sqlite3, json

DB = r'C:\Users\ASUS\.local\share\mimocode\mimocode.db'

conn = sqlite3.connect(DB)
conn.row_factory = sqlite3.Row
c = conn.cursor()

# Session 1: ses_0a0cad6eefferKxaQ1HFapXcbL (most recent, 289 messages)
print("=== SESSION ses_0a0cad6eefferKxaQ1HFapXcbL - ASSISTANT TOOL CALLS ===")
c.execute("""
    SELECT m.id, m.time_created,
           json_extract(p.data, '$.type') as part_type,
           json_extract(p.data, '$.tool') as tool,
           substr(p.data, 1, 1000) as preview
    FROM message m
    JOIN part p ON p.message_id = m.id
    WHERE m.session_id = 'ses_0a0cad6eefferKxaQ1HFapXcbL'
      AND json_extract(m.data, '$.role') = 'assistant'
      AND json_extract(p.data, '$.type') = 'tool'
    ORDER BY m.time_created, p.time_created
    LIMIT 80
""", ())
for row in c.fetchall():
    tool = row['tool'] or ''
    preview = row['preview'] or ''
    # Extract relevant info from tool calls
    if tool in ('write', 'edit', 'bash', 'read', 'glob', 'grep'):
        print(f"  [{row['time_created']}] {tool}: {preview[:300]}")
        print()

# Session 2: ses_0a5427a9bffefXEKfv7185F5PD (210 messages)
print("\n=== SESSION ses_0a5427a9bffefXEKfv7185F5PD - ASSISTANT TOOL CALLS ===")
c.execute("""
    SELECT m.id, m.time_created,
           json_extract(p.data, '$.type') as part_type,
           json_extract(p.data, '$.tool') as tool,
           substr(p.data, 1, 1000) as preview
    FROM message m
    JOIN part p ON p.message_id = m.id
    WHERE m.session_id = 'ses_0a5427a9bffefXEKfv7185F5PD'
      AND json_extract(m.data, '$.role') = 'assistant'
      AND json_extract(p.data, '$.type') = 'tool'
    ORDER BY m.time_created, p.time_created
    LIMIT 80
""", ())
for row in c.fetchall():
    tool = row['tool'] or ''
    preview = row['preview'] or ''
    if tool in ('write', 'edit', 'bash', 'read', 'glob', 'grep'):
        print(f"  [{row['time_created']}] {tool}: {preview[:300]}")
        print()

conn.close()
