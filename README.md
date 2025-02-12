# Full Stack Developer Assignment - Login & Signup App

## Overview

This project is a full-stack authentication application built using **React.js, Node.js, and JWT**. The goal is to implement secure user authentication for a fictional social media platform called **Connectverse** and create a visually appealing **MelodyVerse** login and signup interface. The project adheres to best practices in security, validation, and responsive design.

## Tech Stack 🚀

### Frontend:

- **React.js** (with TypeScript) - Component-based UI development
- **React Router** - Client-side routing
- **Tailwind CSS** - Styling for responsive design
- **ShadCN** - UI components
- **Framer Motion** - Animations and microinteractions

### Backend:

- **Node.js** - Server runtime
- **Express.js** - Web framework for API development
- **TypeScript** - Type safety and maintainability
- **Prisma** - ORM for PostgreSQL database interactions
- **PostgreSQL** - Relational database
- **express-rate-limit** - Rate limiting for security
- **jsonwebtoken (JWT)** - Authentication mechanism
- **bcrypt** - Password hashing
- **crypto** - Secure token generation
- **nodemailer** - Email integration (for potential verification/password reset)
- **validator** - Input validation and sanitization

## Features 🌟

### Backend (API Endpoints):

- **POST /signup 📝**
  - Registers users with username, email, and password
  - Validates input fields and ensures uniqueness
  - Hashes passwords securely before storing them
  - Returns a JWT token upon successful registration

- **POST /login 🔑**
  - Authenticates users via username/email and password
  - Checks credentials against the database
  - Generates and returns a JWT token upon successful authentication
  - Returns error messages for incorrect credentials

- **JWT Implementation 🔄**
  - Secure JWT token generation with expiration
  - Token validation in protected routes
  - Optional: Implement refresh token mechanism

### Frontend (UI Screens):

- **Login Screen 🔐**
  - Fields for username/email and password
  - Input validation with error messages
  - "Remember Me" option using local storage or cookies
  - "Forgot Password" link (placeholder for now)
  - Redirect to the homepage on successful login

- **Signup Screen 📝**
  - Fields for username, email, password, and profile details
  - Password confirmation and validation
  - Terms and conditions checkbox
  - Success and error messages for feedback
  - Simulated welcome email notification
  - Redirect to login screen on successful signup

### General Features:

- Responsive design using **Tailwind CSS**
- Theme and styling aligned with **MelodyVerse** brand
- Proper input validation and sanitization to prevent vulnerabilities
- Secure password storage with **bcrypt**
- Protection against common attacks (SQL Injection, XSS, brute force)
- Environment variables used for sensitive information
- Middleware-based authentication and authorization
- Clear error handling with meaningful messages

## Bonus Features (Implemented):

- Email verification during signup
- Rate limiting to prevent brute force attacks
- Password visibility toggle
- Remember me feature
- Microinteractions and animations using **Framer Motion**
- Accessibility features (keyboard navigation, alt text)

## Installation & Setup

### Prerequisites:

- **Node.js** (v18+ recommended)
- **PostgreSQL** database setup

### Backend Setup:

```sh
cd backend
pnpm install
cp .env.example .env  # Update environment variables
npx prisma generate
npx prisma migrate dev
pnpm run dev
```

### Frontend Setup:

```sh
cd frontend
pnpm install
pnpm start
```

## Environment Variables

Create a `.env` file in the backend with the following:

```sh
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
JWT_SECRET=your_secret_key
SMTP_USER=your_email@example.com
SMTP_PASS=your_email_password
```

## Running the Application

1. Start PostgreSQL database.
2. Run the backend (`npm run dev` in the backend folder).
3. Run the frontend (`npm start` in the frontend folder).
4. Open the app in your browser.

## Folder Structure

```.
├── backend
│   ├── src
│   │   ├── controllers
│   │   ├── middleware
│   │   ├── models
│   │   ├── routes
│   │   ├── services
│   │   ├── utils
│   │   ├── index.ts
│   ├── .env.example
│   ├── package.json
│   ├── prisma
│   │   ├── schema.prisma
│   ├── tsconfig.json
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── styles
│   │   ├── App.tsx
│   │   ├── main.tsx
│   ├── public
│   ├── package.json
│   ├── tailwind.config.js
```

## Best Practices Followed

- **Security**: Strong hashing, input validation, and XSS protection
- **Code Quality**: TypeScript for type safety, structured code
- **Performance**: Optimized queries with Prisma ORM
- **Scalability**: Modular architecture with middleware and controllers

## License

This project is licensed under the **MIT License**.

---
