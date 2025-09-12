FROM python:3.12-slim

WORKDIR /app

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

RUN apt-get update && apt-get install -y build-essential curl libpq-dev && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# tiny helper to wait for DB
RUN printf '%s\n' \
"from time import sleep" \
"import os, sys" \
"import psycopg2, urllib.parse" \
"def main():" \
"  url=os.environ.get('DATABASE_URL')" \
"  for _ in range(60):" \
"    try:" \
"      urllib.parse.uses_netloc.append('postgres')" \
"      u=urllib.parse.urlparse(url)" \
"      conn=psycopg2.connect(dbname=u.path[1:], user=u.username, password=u.password, host=u.hostname, port=u.port)" \
"      conn.close(); return" \
"    except Exception as e: sleep(1)" \
"  sys.exit('DB not ready')" \
"if __name__=='__main__': main()" \
> manage_wait_for_db.py

RUN printf '%s\n' \
"from django.core.management.base import BaseCommand" \
"import subprocess, sys" \
"class Command(BaseCommand):" \
"  help='Wait for DB to be ready'" \
"  def handle(self, *args, **kwargs):" \
"    sys.exit(subprocess.call(['python','manage_wait_for_db.py']))" \
> app/management/commands/wait_for_db.py || true
