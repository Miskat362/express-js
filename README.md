# Express.js Demo Project

This project is a small Express.js application that serves a static frontend and exposes a simple REST API for managing posts.

## Project overview

- Express server entry: `server.js`
- API routes: `routes/post.js`
- Business logic: `controllers/postController.js`
- Middleware: `middleware/`
- Static frontend: `public/`

## Features

- Serve static files from the `public` folder
- Handle JSON requests and URL-encoded form data
- Provide CRUD endpoints for posts at `/api/posts`
- Include custom logger, not-found handler, and error handler middleware

## Getting started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the app:
   ```bash
   npm start
   ```

The server listens on port `8000` by default, or the value of `PORT` from your environment.

## API endpoints

### `GET /api/posts`
Returns all posts.

Optional query param:

```bash
GET /api/posts?limit=2
```

### `GET /api/posts/:id`
Returns a single post by its ID.

### `POST /api/posts`
Creates a new post.

Request body example:

```json
{
  "title": "New Post",
  "content": "This is the content"
}
```

### `PUT /api/posts/:id`
Updates a post by ID.

### `DELETE /api/posts/:id`
Deletes a post by ID.

## Folder structure

```text
.
├── controllers/
│   └── postController.js
├── middleware/
│   ├── error.js
│   ├── logger.js
│   └── notFound.js
├── public/
│   ├── index.html
│   ├── about.html
│   └── js/
├── routes/
│   └── post.js
├── .env
├── .gitignore
├── package.json
├── server.js
└── README.md
```

## Notes

- This is a simple demonstration app and uses an in-memory array for posts.
- Data is not persisted to a database.
- The app is intended for local development and learning purposes.
