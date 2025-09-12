# backend/manage_wait_for_db.py
import os, time, urllib.parse
import psycopg2

def main():
    url = os.environ.get("DATABASE_URL")
    if not url:
        # fallback to discrete envs
        db   = os.getenv("POSTGRES_DB", "appdb")
        user = os.getenv("POSTGRES_USER", "app")
        pwd  = os.getenv("POSTGRES_PASSWORD", "app")
        host = os.getenv("POSTGRES_HOST", "db")
        port = int(os.getenv("POSTGRES_PORT", "5432"))
    else:
        urllib.parse.uses_netloc.append("postgres")
        u = urllib.parse.urlparse(url)
        db, user, pwd, host, port = u.path[1:], u.username, u.password, u.hostname, u.port

    for _ in range(60):
        try:
            conn = psycopg2.connect(dbname=db, user=user, password=pwd, host=host, port=port)
            conn.close()
            print("DB is ready.")
            return
        except Exception as e:
            print(f"Waiting for DB... ({e})")
            time.sleep(1)
    raise SystemExit("DB not ready after 60s")

if __name__ == "__main__":
    main()
