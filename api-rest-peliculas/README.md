# 🎬 API REST PELÍCULAS + FRONTEND

## 📌 Descripción
Este proyecto consiste en una aplicación web para la gestión de películas, desarrollada con:

- Backend: Node.js, Express y MongoDB
- Frontend: React JS

Permite realizar operaciones CRUD sobre géneros, directores, productoras, tipos y media (películas).

---

## 🛠️ Tecnologías utilizadas

### Backend
- Node.js
- Express
- MongoDB
- Mongoose

### Frontend
- React JS
- Axios
- React Router DOM
- Bootstrap

---

## 📁 Estructura del proyecto


api-rest-peliculas/
│
├── frontend/ # Aplicación React
├── src/ # Backend (rutas, controladores, modelos)
├── index.js # Punto de entrada backend
├── package.json
└── README.md


---

## 🚀 Instalación y ejecución

### 🔹 1. Clonar repositorio

git clone https://github.com/claudia-source/api-rest-peliculas.git


---

### 🔹 2. Backend


npm install
npm run dev


El backend corre en:

http://localhost:3000


---

### 🔹 3. Frontend


cd frontend
npm install
npm start


El frontend corre en:

http://localhost:3001


---

## 🔗 Endpoints principales

- GET /api/genero
- POST /api/genero
- PUT /api/genero/:id
- DELETE /api/genero/:id

- GET /api/media
- POST /api/media
- PUT /api/media/:id
- DELETE /api/media/:id

---

## ⚠️ Notas importantes

- El frontend se conecta al backend mediante:

http://localhost:3000/api


- Se utiliza MongoDB, por lo que los identificadores son `_id`

---

## 👨‍💻 Autor
[Claudia Cabrera, Kenneth Davila, Isai Narvaez]