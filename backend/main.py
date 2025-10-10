from fastapi import FastAPI, Form
from fastapi.middleware.cors import CORSMiddleware
import sqlite3
from contextlib import asynccontextmanager


# Crear la aplicación FastAPI
app = FastAPI()

# Permitir peticiones desde cualquier origen (útil para pruebas locales)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Funciones de base de datos ---
DB_PATH = "responses.db"

def init_db():
    conn = sqlite3.connect(DB_PATH)
    conn.execute("""
        CREATE TABLE IF NOT EXISTS messages (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            message TEXT NOT NULL,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    """)
    conn.close()

def save_message(name, email, message):
    conn = sqlite3.connect(DB_PATH)
    conn.execute(
        "INSERT INTO messages (name, email, message) VALUES (?, ?, ?)",
        (name, email, message)
    )
    conn.commit()
    conn.close()

# --- Lifespan: reemplazo moderno de on_event ---
@asynccontextmanager
async def lifespan(app: FastAPI):
    print("🔧 Initializing database...")
    init_db()
    yield
    print("🛑 Shutting down FastAPI app...")

# --- Endpoint principal ---
@app.post("/submit_form")
async def submit_form(
    name: str = Form(...),
    email: str = Form(...),
    message: str = Form(...)
):
    save_message(name, email, message)
    return {"status": "success", "message": "Message received sucessfully."}


# --- Punto de entrada opcional ---
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)