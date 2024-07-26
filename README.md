

---

# Social Media CRUD Application

## Overview

This project is a social media CRUD application built using Node.js, Express, and MongoDB. It includes functionality for user management, post management, and admin control. Users can create, update, delete posts and follow or unfollow other users. Admins have additional capabilities to manage users and oversee the application.

## Features

- **User Authentication**: Register and authenticate users.
- **User Management**: Create, update, and delete users.
- **Post Management**: Create, update, delete, and like/dislike posts.
- **Admin Management**: Admins can create other admins, delete users, and view all users.

## Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/yourusername/socialmedia-crud.git
    ```

2. **Navigate into the project directory:**

    ```bash
    cd socialmedia-crud
    ```

3. **Install dependencies:**

    ```bash
    npm install
    ```

4. **Create a `.env` file in the root directory and add your environment variables:**

    ```env
    DB_URL=mongodb://localhost:27017/socialmedia
    PORT=3000
    ```

5. **Start the server:**

    ```bash
    npm start
    ```

## API Endpoints

### Authentication

- **Register User**

  - `POST /api/auth/register`
  - Request Body:
    ```json
    {
      "username": "string",
      "email": "string",
      "password": "string"
    }
    ```
  - Response:
    ```json
    {
      "message": "User created",
      "user": { ... }
    }
    ```

### User Management

- **Create User** (Admin only)

  - `POST /api/users/create`
  - Request Body:
    ```json
    {
      "username": "string",
      "email": "string",
      "password": "string"
    }
    ```
  - Response:
    ```json
    {
      "message": "User created",
      "user": { ... }
    }
    ```

- **Get User**

  - `GET /api/users/:id`
  - Response:
    ```json
    {
      "_id": "string",
      "username": "string",
      "email": "string",
      "password": "string",
      "followers": [ "string" ],
      "createdAt": "string",
      "updatedAt": "string"
    }
    ```

- **Update User**

  - `PUT /api/users/:id`
  - Request Body:
    ```json
    {
      "username": "string",
      "email": "string",
      "password": "string" // optional
    }
    ```
  - Response:
    ```json
    {
      "message": "User updated",
      "user": { ... }
    }
    ```

- **Delete User** (Admin only)

  - `DELETE /api/users/:id`
  - Response:
    ```json
    {
      "message": "User deleted"
    }
    ```

- **Follow User**

  - `POST /api/users/:id/follow`
  - Request Body:
    ```json
    {
      "currentUserId": "string"
    }
    ```
  - Response:
    ```json
    {
      "message": "User followed"
    }
    ```

- **Unfollow User**

  - `POST /api/users/:id/unfollow`
  - Request Body:
    ```json
    {
      "currentUserId": "string"
    }
    ```
  - Response:
    ```json
    {
      "message": "User unfollowed"
    }
    ```

### Post Management

- **Create Post**

  - `POST /api/posts`
  - Request Body:
    ```json
    {
      "userId": "string",
      "desc": "string",
      "image": "string" // optional
    }
    ```
  - Response:
    ```json
    {
      "message": "Post created and saved",
      "post": { ... }
    }
    ```

- **Get Post**

  - `GET /api/posts/:id`
  - Response:
    ```json
    {
      "_id": "string",
      "userId": "string",
      "desc": "string",
      "image": "string",
      "likes": [ "string" ],
      "createdAt": "string",
      "updatedAt": "string"
    }
    ```

- **Update Post**

  - `PUT /api/posts/:id`
  - Request Body:
    ```json
    {
      "desc": "string",
      "image": "string" // optional
    }
    ```
  - Response:
    ```json
    {
      "message": "Post updated",
      "post": { ... }
    }
    ```

- **Delete Post**

  - `DELETE /api/posts/:id`
  - Response:
    ```json
    {
      "message": "Post deleted"
    }
    ```

- **Like Post**

  - `POST /api/posts/:id/like`
  - Request Body:
    ```json
    {
      "userId": "string"
    }
    ```
  - Response:
    ```json
    {
      "message": "Post liked"
    }
    ```

- **Dislike Post**

  - `POST /api/posts/:id/dislike`
  - Request Body:
    ```json
    {
      "userId": "string"
    }
    ```
  - Response:
    ```json
    {
      "message": "Post disliked"
    }
    ```

### Admin Management

- **Create Admin**

  - `POST /api/admin/create`
  - Request Body:
    ```json
    {
      "username": "string",
      "email": "string",
      "password": "string"
    }
    ```
  - Response:
    ```json
    {
      "message": "Admin created",
      "admin": { ... }
    }
    ```

- **Delete User** (Admin only)

  - `DELETE /api/admin/user/:id`
  - Response:
    ```json
    {
      "message": "User deleted"
    }
    ```

- **Get All Users** (Admin only)

  - `GET /api/admin/users`
  - Response:
    ```json
    [
      { ... },
      { ... }
    ]
    ```

## Technologies Used

- Node.js
- Express
- MongoDB
- Mongoose
- dotenv
- cors
- helmet
- bcrypt

## Contributing

Feel free to open an issue or a pull request if you have suggestions or improvements. 

## License

This project is licensed under the MIT License.

---

