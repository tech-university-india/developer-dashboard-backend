# developer-dashboard-backend

This is the backend for the manager/developer dashboard developed by Team 1 CodeAcademy '23. It is a simple node.js server that serves the dashboard frontend and provides a REST API for the frontend to interact with.

## Setup

1. Install [Node.js](https://nodejs.org/en/download/)
2. Install PostgreSQL and create a database `developer_dashboard` for the dashboard

## Running

1. Clone the repository
2. Run `npm install` to install dependencies
3. Run `npm start` to start the server

## Configuration

The server can be configured using environment variables. The following variables are available:

- `PORT` - The port to run the server on. Defaults to `3000`.
- `DATABASE_URL` - The URL of the database to connect to. Defaults to `postgres://localhost/developer_dashboard`.


## API


### GET /api/commits