# Node.js and Express.js Backend Application

This repository contains a Node.js and Express.js backend application for performing CRUD operations on a MongoDB database for a User resource. The project is structured for scalability and maintainability.

## Project Structure

|-- app.js
|-- package-lock.json
|-- package.json
|
|-- src
| |-- config
| | |-- Constants.js
| | |-- Database.js
| | |-- default.json
| |
| |-- helpers
| | |-- Auth.helpers.js
| |
| |-- middleware
| | |-- Auth.middleware.js
| | |-- LoggerMiddleware.js
| | |-- Validation.middleware.js
| |
| └── v1
| |-- controllers
| | |-- User.controller.js
| |
| |-- models
| | |-- User.model.js
| |
| |-- routes
| | |-- Common.routes.js
| | |-- User.routes.js
| |
| └── services
| |-- User.services.js

# User Resource Fields

- **id**: Unique identifier for the user.
- **name**: The name of the user.
- **email**: Email address of the user (unique).
- **phone**: Phone number of the user (unique).
- **password**: Password of the user.
- **role**: Role of the user (e.g., 'user' or 'admin').

These fields define the structure of the User resource within the application. Each user has a unique identifier (`id`), a name, an email address, a phone number, a password, and a role indicating their level of access or authority within the system. The uniqueness of email and phone numbers is enforced for data integrity.

# Features

- **Input Validation and Error Handling**: Proper input validation and error handling are implemented to ensure data integrity.

- **Authentication Middleware**: Incorporates authentication middleware to secure sensitive operations (update and delete).

# REST API Endpoints

- `GET /users`: Returns a list of all users.
- `GET /users/:id`: Returns the user with the specified ID.
- `POST /users`: Creates a new user with the specified data.
- `PUT /users/:id`: Updates the user with the specified ID with the new data.
- `DELETE /users/:id`: Deletes the user with the specified ID.

# Libraries Used

- **Express.js**: Web application framework for Node.js.
- **Mongoose**: MongoDB object modeling for Node.js.
- **express-validator**: Express.js middleware for input validation.
- **jsonwebtoken**: JSON Web Token implementation for authentication.
- **bcrypt**: Library for hashing passwords securely.

# Usage

1. **Install Dependencies:**

   npm install

# Run the Application:

    node app.js

# Access the API:

The API will be available at http://localhost:3000/v1/users.
