# MongoDB Server

Backend-only REST API built with **Node.js**, **Express**, and **MongoDB (Mongoose)**.

This project is intentionally focused on **server architecture practices**: clear separation of concerns, modular routing, controller/service layering, and maintainable data modeling.

## Project Overview

The API models a simple car marketplace domain:
- Manage cars
- Manage users
- Purchase and sell cars
- Expose health and availability endpoints

The goal is not frontend delivery, but a clean backend foundation that can scale and stay easy to maintain.

## Tech Stack

- Node.js (ES Modules)
- Express 5
- MongoDB + Mongoose
- dotenv

## Architecture

This codebase follows a layered backend structure:

- **Routes** define endpoint paths and map requests to handlers.
- **Controllers** handle HTTP concerns (`req`, `res`, status codes, response shape).
- **Services** contain business logic and model operations.
- **Models** define Mongoose schemas and persistence rules.
- **Config** centralizes infrastructure concerns like DB connection lifecycle.

### Why this design

- Keeps HTTP logic separate from business logic.
- Makes services easier to test and reuse.
- Reduces tight coupling between route layer and data layer.
- Improves readability and maintainability as features grow.

## Folder Structure

```txt
config/
	db.js
controllers/
	cars.controller.js
	health.controller.js
	purchase.controller.js
	users.controller.js
models/
	cars.model.js
	users.model.js
routes/
	cars.routes.js
	health.route.js
	purchase.route.js
	users.route.js
services/
	cars.service.js
	purchase.service.js
	users.service.js
app.js
index.js
```

## Request Lifecycle

1. Request enters via a route in `/routes`
2. Controller validates/transforms request and calls service
3. Service executes business/data logic via models
4. Controller returns consistent HTTP response

## API Base Path

All routes are mounted under:

```txt
/api
```

## Endpoint Summary

### Health
- `GET /api/health` – service and DB readiness check

### Cars
- `GET /api/test`
- `GET /api/cars`
- `GET /api/cars/model/:model`
- `GET /api/cars/make/:make`
- `GET /api/cars/year/:year`
- `POST /api/cars`
- `POST /api/cars/bulk`

### Users
- `GET /api/users`
- `GET /api/users/:id`
- `GET /api/users/email/:email`
- `POST /api/users`
- `POST /api/users/batch`

### Purchases
- `GET /api/available`
- `GET /api/purchases`
- `GET /api/sold`
- `GET /api/purchases/:userId`
- `POST /api/purchases`
- `POST /api/sell`

## Data Model 

### Car
- `make`, `model`, `year`, `color`
- `isSold` (boolean)
- `owner` (ObjectId ref `User`, nullable)

### User
- `name`, `email`
- `ownedCars` (ObjectId ref `Car`)
- `createdAt`

## Getting Started

### 1) Install dependencies

```bash
npm install
```

### 2) Configure environment variables

Create a `.env` file in the project root:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

### 3) Run the server

Development (watch mode):

```bash
npm run dev
```

Production:

```bash
npm start
```

## Operational Practices Included

- Graceful shutdown handling (`SIGINT`, `SIGTERM`)
- Centralized DB connect/disconnect flow
- Mongoose connection event logging
- Health endpoint with DB readiness state

## Project Intent

This repository is a backend architecture learning/build project.

It demonstrates how to organize an Express + MongoDB codebase for clarity, separation of concerns, and long-term maintainability.