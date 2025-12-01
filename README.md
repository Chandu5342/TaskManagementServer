# Task Manager - Backend API

This is the **backend API** for the **Task Manager Application**, built using **Node.js**, **Express**, **MongoDB**, and **JWT authentication**.

It supports **user authentication**, **role-based access**, **task management**, and **file uploads**.

---

## Features

### **User Authentication**

* Register with email and password
* Login with JWT token
* Password hashing using bcryptjs
* Role-based access: `user` and `admin`
* Protected routes for authenticated users

### **Task Management**

* Create, update, delete tasks
* Assign tasks to users
* Track task status (`Pending`, `InProgress`, `Completed`)
* Set task priority (`Low`, `Medium`, `High`)
* Upload multiple documents (max 3 files per task)
* Admin can manage all tasks

### **Admin User Management**

* Create, update, delete users
* View all registered users
* Role-based route protection

### **Validation & Security**

* Input validation using **Zod**
* JWT authentication middleware
* Admin-only route middleware
* File upload handling with **Multer**
* Error handling with standardized responses

---

## Folder Structure

```
backend/
├── controllers/         # Business logic for API endpoints
│   ├── authController.js
│   ├── taskController.js
│   └── userController.js
│
├── models/              # MongoDB schemas
│   ├── Task.js
│   └── User.js
│
├── routes/              # Express route definitions
│   ├── auth.js
│   ├── task.js
│   └── user.js
│
├── validation/          # Zod validation schemas
│   ├── authValidation.js
│   ├── taskValidation.js
│   └── userValidation.js
│
├── middlewares/         # Custom middleware
│   ├── authMiddleware.js
│   └── validate.js
│
├── config/              # Configuration files
│   └── db.js            # MongoDB connection
│
├── uploads/             # Uploaded files (auto-created)
├── server.js            # Server entry point
├── package.json         # Dependencies
└── .env                 # Environment variables
```

---

## 🛠️ Tech Stack

* **Node.js + Express.js** – Backend framework
* **MongoDB + Mongoose** – Database and ODM
* **JWT (jsonwebtoken)** – Authentication
* **bcryptjs** – Password hashing
* **Zod** – Request validation
* **Multer** – File upload handling
* **CORS** – Frontend communication
* **dotenv** – Environment management

---

## Installation & Running

### Prerequisites

* Node.js v16+
* MongoDB (local or MongoDB Atlas)

### Install Dependencies

```bash
cd backend
npm install
```

### Run Development Server

```bash
npm run dev
```

Server runs on: `http://localhost:5000`

### Deployed on Render

Backend Live Link: `https://taskmanagementserver-d45z.onrender.com`

### Run Production Server

```bash
npm start
```

---

## API Endpoints

### **Authentication** (`/api/auth`)

| Method | Endpoint    | Description       | Auth Required |
| ------ | ----------- | ----------------- | ------------- |
| POST   | `/register` | Register new user | No            |
| POST   | `/login`    | Login & get JWT   | No            |

**Register Request Example:**

```json
{
  "email": "user@example.com",
  "password": "password123",
  "role": "user"
}
```

**Login Request Example:**

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

---

### **User Management** (`/api/users`) – Admin Only

| Method | Endpoint | Description       | Auth Required |
| ------ | -------- | ----------------- | ------------- |
| GET    | `/`      | Get all users     | Yes           |
| POST   | `/`      | Create a new user | Yes           |
| PUT    | `/:id`   | Update user       | Yes           |
| DELETE | `/:id`   | Delete user       | Yes           |

---

### **Task Management** (`/api/tasks`)

| Method | Endpoint    | Description                   | Auth Required |
| ------ | ----------- | ----------------------------- | ------------- |
| GET    | `/mytasks`  | Get tasks created by user     | Yes           |
| GET    | `/assigned` | Get tasks assigned to user    | Yes           |
| GET    | `/:id`      | Get task by ID                | Yes           |
| POST   | `/`         | Create new task (max 3 files) | Yes           |
| PUT    | `/:id`      | Update task (max 3 files)     | Yes           |
| DELETE | `/:id`      | Delete task                   | Yes           |

---

## Environment Variables

Create a `.env` file at the root:

```
MONGO_URI=<your_mongodb_connection_string>
PORT=5000
JWT_SECRET=<your_jwt_secret>
```

---

## Testing

* Use **Postman** test all routes.
* 🧪 Postman Testing

1️⃣ Register a User

POST http://localhost:5000/api/auth/register
<img width="1366" height="768" alt="Screenshot (1835)" src="https://github.com/user-attachments/assets/2fb98770-c9db-4f01-8bac-bef9190c18cb" />


2️⃣ Login User

POST http://localhost:5000/api/auth/login
<img width="1366" height="768" alt="Screenshot (1836)" src="https://github.com/user-attachments/assets/b043c8a3-0b83-44bc-a734-24270a01afc4" />


3️⃣ Get My Tasks

GET http://localhost:5000/api/tasks/mytasks

<img width="1366" height="768" alt="Screenshot (1843)" src="https://github.com/user-attachments/assets/619422da-740c-4113-aabb-89efa02fd490" />



4️⃣ Get Assigned Tasks

GET http://localhost:5000/api/tasks/assigned

<img width="1366" height="768" alt="Screenshot (1844)" src="https://github.com/user-attachments/assets/45126764-5ff0-4aa2-92d0-640a811771fb" />


5️⃣ Create a New Task

POST http://localhost:5000/api/tasks (use form-data for files)

<img width="1366" height="768" alt="Screenshot (1841)" src="https://github.com/user-attachments/assets/9fdbde5a-5041-4379-8f55-13a2f7baeb3d" />


6️⃣ Update a Task

PUT http://localhost:5000/api/tasks/:id

<img width="1366" height="768" alt="Screenshot (1846)" src="https://github.com/user-attachments/assets/c166e1ef-d880-40d6-aa7e-3e40f6840987" />


7️⃣ Delete a Task

DELETE http://localhost:5000/api/tasks/:id

<img width="1366" height="768" alt="Screenshot (1847)" src="https://github.com/user-attachments/assets/f0dc8186-eb96-4a2d-a1c5-b39c2697db65" />


8️⃣ Get All Users (Admin Only)

GET http://localhost:5000/api/users

<img width="1366" height="768" alt="Screenshot (1837)" src="https://github.com/user-attachments/assets/a403359f-ed8e-48c9-b033-d740963505f4" />


9️⃣ Create User (Admin Only)

POST http://localhost:5000/api/users

<img width="1366" height="768" alt="Screenshot (1838)" src="https://github.com/user-attachments/assets/612f1486-ee33-4ba8-acd8-5a35406bc503" />


10️⃣ Update User (Admin Only)

PUT http://localhost:5000/api/users/:id

<img width="1366" height="768" alt="Screenshot (1839)" src="https://github.com/user-attachments/assets/cb452d38-8576-44b0-9881-3a3d6e1c10a8" />


11️⃣ Delete User (Admin Only)

DELETE http://localhost:5000/api/users/:id

<img width="1366" height="768" alt="Screenshot (1840)" src="https://github.com/user-attachments/assets/fd62ef95-dd82-4292-ba09-139f5372e067" />

* Include `Authorization: Bearer <token>` for protected routes.

  

---


