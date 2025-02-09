# Credit Report Management System

📌 Project Overview:

The Credit Report Management System is a full-stack application designed to fetch, store, and display credit reports in a structured and professional manner. The system consists of a React.js frontend and an Express.js + MongoDB backend, ensuring seamless user experience and efficient data management.

🚀 Features

✅ Frontend (React.js)

- Fetch and display credit report details in an organized and intuitive UI.

- Modern Tailwind CSS styling for a professional look.

- Display basic user details, report summary, and credit accounts.

- Credit accounts are shown in a sortable table format.

- Error handling for failed API requests.

✅ Backend (Express.js + MongoDB)

- RESTful API to store, update, and fetch credit report data.

- Mongoose schema validation to maintain data consistency.

- JWT authentication for secure access control.

- Middleware for error handling and request validation.

- MongoDB Atlas or local database support.

## Tech Stack

### Frontend:

- React.js

- Tailwind CSS

- Axios

- React Router

### Backend

- Node.js

- Express.js

- MongoDB & Mongoose

- JWT Authentication

- CORS

- Dotenv

## Installation & Setup:

1️. Clone the Repository

```
git clone https://github.com/mishrabhi/creditsea-assignment

cd creditsea-assignments
```

2. Backend Setup

```
cd backend
npm install
```

4. Configure Environment Variables (.env)

- Create a .env file in the backend directory and add:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

5. Run backend Server:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### Frontend Setup:

```
cd ../frontend
npm install
```

Run the frontend App:

```
npm start
```
