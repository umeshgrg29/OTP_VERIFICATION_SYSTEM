# User Authentication System

This repository contains the code for a user authentication system implemented using Node.js, Express.js, and React. The system allows users to register, send and validate OTP (One Time Password) for email verification, and retrieve user profiles after successful authentication.

## Table of Contents

- #prerequisites
- #installation
- #usage
- #api-endpoints
- #frontend


## Prerequisites

Before you begin, ensure you have the following installed on your local machine:

- Node.js and npm - [Download & Install Node.js](https://nodejs.org/)
- MongoDB - [Download & Install MongoDB](https://www.mongodb.com/try/download/community)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/user-authentication-system.git
   cd user-authentication-system
   ```

2. Install backend dependencies:

   ```bash
   cd backend
   npm install
   ```

3. Install frontend dependencies:

   ```bash
   cd frontend
   npm install
   ```

4. Create a `.env` file in the `backend` directory and set the following environment variables:

   ```
   PORT=3000
   MONGODB_URI =your-mongodb-uri
   JWT_SECRET=your-secret-key
   SMTP_HOST=your-smtp-host
   SMTP_PORT=your-smtp-port
   SMTP_USER=your-smtp-username
   SMTP_PASS=your-smtp-password
   FromEmail=your-email@example.com
   ```

   Replace `your-secret-key`, `your-smtp-host`, `your-smtp-port`, `your-smtp-username`, `your-smtp-password`, and `your-email@example.com` with appropriate values.

## Usage

1. Start the backend server:

   ```bash
   cd backend
   npm start
   ```

   The backend server will run on `http://localhost:3000`.

2. Start the frontend development server:

   ```bash
   cd frontend
   npm start
   ```

## API Endpoints

- `POST /api/register`: Register a new user. Requires `username`, `email`, and `password` in the request body.

- `POST /api/sendotp`: Send OTP to the user's email for verification. Requires `email` in the request body.

- `POST /api/validate-otp`: Validate the OTP sent to the user's email. Requires `email` and `otp` in the request body.

- `GET /api/profile`: Get the authenticated user's profile. Requires a valid JWT token in the `Authorization` header.

## Frontend

The frontend of the application is built using React. It includes a user interface for registration, sending OTP, validating OTP, and fetching user profile information.

Feel free to customize the README according to your specific needs and add any additional information that might be relevant for users and contributors.
