import sqlite3, json

DB = r'C:\Users\ASUS\.local\share\mimocode\mimocode.db'
PID = '5baee63a-68a2-483c-a5f0-9a0a58370eb9'

conn = sqlite3.connect(DB)
conn.row_factory = sqlite3.Row
c = conn.cursor()

# 1. List recent sessions for this project
print("=== RECENT SESSIONS ===")
c.execute("SELECT id, directory, title, time_created FROM session WHERE project_id = ? ORDER BY time_created DESC LIMIT 15", (PID,))
for row in c.fetchall():
    print(f"  {row['id']} | {row['time_created']} | {row['title']}")

# 2. For each session, count messages
print("\n=== MESSAGE COUNTS ===")
c.execute("""
    SELECT m.session_id, COUNT(*) as msg_count,
           SUM(CASE WHEN json_extract(m.data, '$.role') = 'user' THEN 1 ELSE 0 END) as user_msgs,
           SUM(CASE WHEN json_extract(m.data, '$.role') = 'assistant' THEN 1 ELSE 0 END) as asst_msgs
    FROM message m
    JOIN session s ON m.session_id = s.id
    WHERE s.project_id = ?
    GROUP BY m.session_id
    ORDER BY MAX(m.time_created) DESC
    LIMIT 15
""", (PID,))
for row in c.fetchall():
    print(f"  {row['session_id']} | total={row['msg_count']} user={row['user_msgs']} asst={row['asst_msgs']}")

# 3. Check task table
print("\n=== TASKS ===")
c.execute("""
    SELECT t.id, t.session_id, t.title, t.state, t.time_created, t.time_updated
    FROM task t
    JOIN session s ON t.session_id = s.id
    WHERE s.project_id = ?
    ORDER BY t.time_updated DESC
    LIMIT 20
""", (PID,))
for row in c.fetchall():
    print(f"  {row['id']} | session={row['session_id']} | state={row['state']} | {row['title']}")

# 4. Check actor_registry for subagents
print("\n=== ACTOR REGISTRY ===")
c.execute("""
    SELECT ar.id, ar.session_id, ar.actor_type, ar.name, ar.time_created
    FROM actor_registry ar
    JOIN session s ON ar.session_id = s.id
    WHERE s.project_id = ?
    ORDER BY ar.time_created DESC
    LIMIT 20
""", (PID,))
for row in c.fetchall():
    print(f"  {row['id']} | session={row['session_id']} | type={row['actor_type']} | name={row['name']}")

conn.close()
