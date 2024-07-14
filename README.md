# Overview
The application presents a list of products and when clicked, we go to the product page where we can edit the product. No features for adding or removing product or product properties are added
Application built with React for the frontend and Express for the backend. Jest and React Testing library are used to testing.

# Setup
1. Clone the Repository
2. Install Dependencies
Navigate to both the project root and the server directory to install dependencies.

- In the project root:
```
npm install
# or
yarn install
```
- In the server directory:

```
cd server
npm install
# or
yarn install
cd ..
```
# Development
1. Run the Frontend
Start the frontend development server using Vite.
```
npm run dev
# or
yarn dev
```
2. Run the Backend
Start the backend server.
```
cd server
node server.mjs
```

The application should now be running on:

Frontend: http://http://127.0.0.1:5173
Backend: http://localhost:3000/api/products

# Production
1. Build the Frontend
Build the frontend for production.
```
npm run build
# or
yarn build
```
This will generate static files in the dist directory.

2. Start the Backend Server
Run the server to serve the built frontend files and provide the API.
```
cd server
node server.mjs
```
The application should now be running on:

Frontend: http://localhost:3000
Backend: http://localhost:3000/api/products

# Running tests

1. To run tests, use
```
npm test
```
