# Node.js Authentication & Task Management System

A robust backend application built with Node.js, Express, and MongoDB that implements user authentication using sessions and allows authenticated users to manage their personal tasks.

## 🚀 Features

- **User Authentication**:
  - User signup with password hashing using `bcrypt`.
  - Secure login and session-based authentication.
  - User logout functionality with session destruction.
- **Task Management**:
  - Create personal tasks (Title and Description).
  - Retrieve a list of tasks associated with the logged-in user.
  - Tasks are sorted by creation date (newest first).
- **Security**:
  - Middleware-based session validation to protect private routes.
  - Environment variable management for sensitive data (DB URIs, Session Secrets).

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (via Mongoose ODM)
- **Authentication**: `express-session` & `bcrypt`
- **Environment**: `dotenv`

## 📂 Project Structure

```text
├── config/             # Database connection configuration
├── controllers/        # Request handlers (User & Task logic)
├── middlewares/        # Custom middlewares (Session validation)
├── models/             # Mongoose schemas (User & Task)
├── routes/             # API endpoint definitions
├── services/           # Business logic layer (Database operations)
├── index.js             # Application entry point
└── package.json        # Dependencies and scripts
```

## ⚙️ Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd authentication
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Environment Configuration**:
   Create a `.env` file in the root directory and add the following:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   SESSION_SECRET=your_random_session_secret
   ```

4. **Run the application**:
   ```bash
   # Development mode (with nodemon)
   npm run dev
   ```

## 🛣️ API Endpoints

### User Endpoints (`/api/user`)

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| POST | `/signup` | Register a new user | ❌ |
| POST | `/login` | Authenticate user & create session | ❌ |
| POST | `/logout` | Destroy session & clear cookies | ✅ |

### Task Endpoints (`/api/task`)

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| POST | `/` | Create a new task | ✅ |
| GET | `/` | Fetch all tasks for the logged-in user | ✅ |

## 🔐 Session Management

The app uses `express-session` to maintain user state. Upon successful login, the `userId` is stored in the session. The `validateSession` middleware ensures that only authenticated users can access the task endpoints.

- **Session Duration**: 10 minutes (configurable in `index.js`).
- **Cookie Name**: `connect.sid` (default).
