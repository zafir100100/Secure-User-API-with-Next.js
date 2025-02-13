# Secure User API with Next.js

## Project Overview

This project implements a secure backend API using Next.js to manage users. It provides endpoints to handle basic user management tasks such as fetching all users, adding new users, and retrieving users by their ID. The API is secured with JWT (JSON Web Token) authentication to ensure that only authorized users can access certain routes.

Additionally, the project includes a webhook implementation to handle both signature generation and validation. The incoming data (eventType and data) is processed and stored in a JSON file, and a response is returned confirming receipt.

## Features

- **User Management API**:
  - **GET /api/users** – Fetch all users.
  - **POST /api/users** – Add a new user (with name, email, password fields).
  - **GET /api/users/:id** – Fetch a single user by ID.
  - **POST /api/users/login** – Authenticate a user and return a JWT token.

- **JWT Authentication**:
  - The API routes are secured with JWT-based authentication. Only authenticated users with a valid JWT can access the protected routes.

- **Webhook Implementation**:
  - **POST /api/webhook-signature** – Generates a signature for an incoming payload.
  - **POST /api/webhook** – Validates the signature and processes the incoming data.

## Tech Stack
- **Next.js**: A React framework for building server-side rendered applications.
- **JWT**: Used for authenticating users and securing API endpoints.
- **fs-extra**: A module for working with the filesystem, used to read/write to `db.json`.
- **crypto**: Built-in Node.js library used for generating and verifying signatures.

## Setup & Installation

1. **Clone the repository**:
   ```bash
   git clone <repository_url>
   cd <repository_name>
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the root of the project and add the following:
   ```env
   JWT_SECRET=your-secret-key
   ```

4. **Start the development server**:
   ```bash
   npm run dev
   ```

   This will start the Next.js server on `http://localhost:3000`.

## API Endpoints

### `/api/users`

- **GET**: Fetch all users
  - **Response**: Returns a list of all users.
  - **Authentication**: Required (JWT token in the `Authorization` header).

- **POST**: Add a new user
  - **Request Body**: 
    ```json
    {
      "name": "John Doe",
      "email": "john.doe@example.com",
      "password": "password123"
    }
    ```
  - **Response**: Returns the newly created user.
  - **Authentication**: Required (JWT token in the `Authorization` header).

- **GET /:id**: Fetch a user by ID
  - **Response**: Returns a single user based on the provided ID.
  - **Authentication**: Required (JWT token in the `Authorization` header).

- **POST /api/users/login**: User login and JWT token issuance
  - **Request Body**:
    ```json
    {
      "email": "john.doe@example.com",
      "password": "password123"
    }
    ```
  - **Response**:
    ```json
    {
      "token": "your_jwt_token"
    }
    ```
  - **Authentication**: Not required for this route, used to generate a JWT token.

### `/api/webhook-signature`

- **POST**: Generate a signature for an incoming payload
  - **Request Body**: 
    ```json
    {
      "eventType": "user_created",
      "data": {
        "userId": "123",
        "name": "John Doe",
        "email": "john.doe@example.com"
      }
    }
    ```
  - **Response**: 
    ```json
    {
      "signature": "generated_signature"
    }
    ```
  - **Description**: This route generates a signature using HMAC SHA-256 for a given payload.

### `/api/webhook`

- **POST**: Validate the incoming request’s signature and process the data
  - **Request Body**: 
    ```json
    {
      "eventType": "user_created",
      "data": {
        "userId": "123",
        "name": "John Doe",
        "email": "john.doe@example.com"
      }
    }
    ```
  - **Response**: 
    ```json
    {
      "success": true,
      "message": "Received"
    }
    ```
  - **Signature**: The request must include a valid signature in the `X-Signature` header, generated using HMAC SHA-256.
  - **Description**: This route validates the incoming request’s signature and processes the event data if the signature is valid.

## How It Works

### JWT Authentication:
- Users must authenticate by sending their credentials (email and password) to the `/api/users/login` route. If valid, they will receive a JWT token.
- The token is used in the `Authorization` header to access protected routes (`/api/users` and `/api/users/:id`).

### Webhook:
- The `/api/webhook-signature` endpoint generates a signature for a given payload using HMAC SHA-256.
- The `/api/webhook` endpoint validates the signature provided in the request header and processes the event data if the signature matches.

## Video Output

https://github.com/user-attachments/assets/85e62b76-6a15-4d25-aaf3-ad858a2110c2




