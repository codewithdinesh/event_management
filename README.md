# Event Management API

A comprehensive REST API for managing events, user registrations, and analytics. This system allows organizers to create and manage events while users can browse and register for events.

## API Documentation
[![Run in Postman](https://run.pstmn.io/button.svg)](https://documenter.getpostman.com/view/28173999/2sAYQXptdE)

## Tech Stack

- **Node.js & Express.js** - Backend server and REST API framework
- **MongoDB** - Database for storing users, events, and registrations
- **JWT** - Authentication and authorization
- **Mongoose** - MongoDB object modeling
- **bcryptjs** - Password hashing

## Key Features

- User authentication (register/login)
- Event creation and management
- Event registration system
- Admin dashboard capabilities
- Search and pagination
- Analytics and reporting
- Role-based access control (Admin, Organizer, User)


## Quick Start

1. **Clone and Install**
```bash
# Clone repository
git clone https://github.com/codewithdinesh/event_management

# Install dependencies
cd cd event_management
npm install
```

2. **Environment Setup**
Create a `.env` file in the root directory:
```env
MONGODB_URI=mongodb://localhost:27017/event-management
JWT_SECRET=your_secret_key
PORT=3000
```

3. **Start Server**
```bash
# Development
npm run dev

# Production
npm start
```

## API Endpoints Overview

### Auth Routes
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - User login

### Event Routes
- `POST /api/events` - Create event
- `GET /api/events` - List all events
- `GET /api/events/:id` - Get event details
- `PUT /api/events/:id` - Update event
- `DELETE /api/events/:id` - Delete event

### Registration Routes
- `POST /api/events/:id/register` - Register for event
- `DELETE /api/events/:id/register` - Cancel registration
- `GET /api/events/:id/attendees` - List event attendees

### Admin Routes
- `GET /api/admin/users` - List all users
- `GET /api/admin/events` - List all events with stats
- `DELETE /api/admin/users/:id` - Delete user

### Analytics Routes
- `GET /api/analytics/events/popular` - Get popular events
- `GET /api/analytics/users/active` - Get active users
- `GET /api/analytics/events/:id/stats` - Get event statistics

## Authentication

API uses JWT tokens for authentication. Include the token in requests:
```http
Authorization: Bearer <your_jwt_token>
```

## Role-Based Access

- **Admin:** Full system access
- **Organizer:** Can create and manage events
- **User:** Can view and register for events
