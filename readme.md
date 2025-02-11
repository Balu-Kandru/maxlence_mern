# A MERN Application

## Overview
A full-stack web application built with React (Vite), Node.js (Express), MySQL, and Redis. It features user authentication, role-based access control (RBAC), email verification, and efficient data handling with pagination and caching.

## **Tech Stack**
- **Frontend:** React.js (Vite), Tailwind CSS, React-Hook-Form, Axios
- **Backend:** Node.js (Express), MySQL (Sequelize ORM), Redis, JWT
- **Other Tools:** Multer (File Uploads), Express Validation, Morgan (Logging)

---

## **Prerequisites**
Before running the application, ensure the following services are set up:

### **1. Redis**
The application requires Redis to be running on port `ANY_PORT`. Start the Redis server using:
```bash
redis-server --port <ANY_PORT>
```

### **2. Create Actions and Roles**
Run the following command inside the `server` folder to create required actions and roles:
```bash
npm run push:roles-actions
```

### **3. Create API Master**
Run the following command inside the `server` folder:
```bash
npm run push:actionOperations
```

### **4. Create Admin User**
Run the following command inside the `server` folder:
```bash
npm run push:admin
```

---

## **Environment Variables**

### **Client `.env`**
```env
VITE_SERVER_BASE_URL=<SERVER_URL>
```

### **Server `.env`**
```env
PORT=<SERVER_PORT>
MORGAN=dev

DB_HOST=<YOUR_HOST>
DB_USER=<YOUR_DB_USER>
DB_PASSWORD=<YOUR_PASSWORD>
DB_PORT=<YOUR_DB_PORT>
DB_SCHEMA=<SCHEMA_NAME>

DOMAIN=http://localhost:3001

EMAIL_USER=YOUR_EMAIL
EMAIL_PASS=EMAIL_PASSWORD

JWT_SECRETKEY=<YOUR_KEY>

REDIS_HOST=localhost
REDIS_PORT=<PORT>

CLIENT_URL=http://localhost:5173
```

---

## **Features & Functionality**

### **1. User Registration and Authentication**
- Users can register with an email, password, and profile image.
- Backend sends an email verification link for validation.
- Users can log in after verifying their email.
- Implements JWT authentication with a refresh token.

### **2. Password Reset**
- Users can request a password reset via email.
- Backend sends a password reset link.
- Users can set a new password securely.

### **3. Role-Based Access Control (RBAC)**
- Users have assigned roles (Admin/User).
- Admins have extra privileges, such as managing users.
- Feature access is restricted based on roles.

<!-- ### **4. Pagination and Search**
- Data is paginated for better navigation.
- Users can search/filter data efficiently. -->
### **4. Image Upload with Preview**
- Users can upload profile images.
- Frontend previews the selected image before submission.

### **5. React-Hook-Form for Form Validation**
- Real-time form validation.
- Displays error messages for incorrect inputs.

### **6. Responsive Design**
- Works across desktops, tablets, and mobile devices.

---

## **Installation & Running the Project**

### **1. Clone the Repository**
```bash
git clone https://github.com/yourusername/MaxlenceMERN.git
cd MaxlenceMERN
```

### **2. Install Dependencies**
#### **Client**
```bash
cd client
npm install
```
#### **Server**
```bash
cd server
npm install
```

### **3. Start the Application**
#### **Start Backend**
```bash
cd server
npm start
```
#### **Start Frontend**
```bash
cd client
npm run dev
```

---

## **API Endpoints**
| Method | Endpoint | Description |
|--------|---------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Authenticate user |
| GET | `/api/auth/profile` | Get user profile |
| POST | `/api/auth/reset-password` | Request password reset |
| GET | `/api/users` | Get all users (Admin only) |
