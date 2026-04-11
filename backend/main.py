from fastapi import FastAPI, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import psycopg2
from contextlib import asynccontextmanager
import os
import time

# --- Configuration ---
DB_USER = os.getenv("DB_USER")
DB_PASS = os.getenv("DB_PASS")
DB_NAME = os.getenv("DB_NAME")
DB_HOST = os.getenv("DB_HOST", "db")
DB_PORT = os.getenv("DB_PORT", "5432")

DOMAIN = os.getenv("DOMAIN", "*")
ENVIRONMENT = os.getenv("ENVIRONMENT", "production")

# --- Database Functions ---
def get_db_connection():
    # Safer connection method using parameters instead of a DSN URL
    return psycopg2.connect(
        user=DB_USER,
        password=DB_PASS,
        host=DB_HOST,
        port=DB_PORT,
        dbname=DB_NAME
    )

def init_db():
    max_retries = 10
    for attempt in range(max_retries):
        try:
            conn = get_db_connection()
            cur = conn.cursor()
            cur.execute("""
                CREATE TABLE IF NOT EXISTS messages (
                    id SERIAL PRIMARY KEY,
                    name TEXT NOT NULL,
                    email TEXT NOT NULL,
                    message TEXT NOT NULL,
                    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            """)
            conn.commit()
            cur.close()
            conn.close()
            print("✅ Database (PostgreSQL) initialized successfully.")
            return
        except Exception as e:
            print(f"⚠️ Connection attempt {attempt + 1}/{max_retries} failed. Retrying...")
            time.sleep(3)
            
    print("❌ Could not connect to PostgreSQL. Check your credentials and network.")

def save_message(name, email, message):
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute(
            "INSERT INTO messages (name, email, message) VALUES (%s, %s, %s)",
            (name, email, message)
        )
        conn.commit()
        cur.close()
        conn.close()
    except Exception as e:
        print(f"❌ Error saving message: {e}")
        raise

# --- Lifespan ---
@asynccontextmanager
async def lifespan(app: FastAPI):
    if DB_USER and DB_PASS:
        init_db()
    else:
        print("⚠️ Database credentials not set. Skipping DB initialization.")
    yield

# --- FastAPI App ---
app = FastAPI(
    title="albperez", 
    lifespan=lifespan,
    docs_url=None if ENVIRONMENT == "production" else "/docs",
    redoc_url=None if ENVIRONMENT == "production" else "/redoc"
)

# --- Middleware ---
origins = [
    f"http://{DOMAIN}",
    f"https://{DOMAIN}",
] if DOMAIN != "*" else ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["POST"], # Only allow POST for the form
    allow_headers=["*"],
)

# --- Endpoints ---
@app.post("/api/submit_form")
async def submit_form(
    name: str = Form(...),
    email: str = Form(...),
    message: str = Form(...)
):
    save_message(name, email, message)
    return {"status": "success", "message": "Message received successfully."}

# --- Static Files ---
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FRONTEND_DIR = os.path.join(BASE_DIR, "frontend")

if os.path.exists(os.path.join(FRONTEND_DIR, "assets")):
    app.mount("/assets", StaticFiles(directory=os.path.join(FRONTEND_DIR, "assets")), name="assets")
if os.path.exists(os.path.join(FRONTEND_DIR, "data")):
    app.mount("/data", StaticFiles(directory=os.path.join(FRONTEND_DIR, "data")), name="data")

@app.get("/")
def serve_frontend():
    index_path = os.path.join(FRONTEND_DIR, "index.html")
    if os.path.exists(index_path):
        return FileResponse(index_path)
    return {"error": "Frontend files not found"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=False)