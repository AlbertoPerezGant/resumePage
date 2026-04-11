# Usamos una imagen oficial y ligera de Python
FROM python:3.10-slim

# Establecemos el directorio de trabajo base en el contenedor
WORKDIR /app

# Copiamos el archivo de dependencias primero (para cachear capas en Docker)
COPY requirements.txt .

# Instalamos las dependencias
RUN pip install --no-cache-dir -r requirements.txt

# Copiamos tanto el frontend como el backend en el contenedor
COPY backend/ ./backend/
COPY frontend/ ./frontend/

# Exponemos el puerto 8000 en el contenedor
EXPOSE 8000

# Cambiamos al directorio del backend para lanzar el servidor
WORKDIR /app/backend

# Comando para ejecutar la aplicación en producción
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
