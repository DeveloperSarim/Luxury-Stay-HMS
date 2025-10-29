# Luxury Stay HMS Backend API

Hotel Management System ka backend API - Express.js aur MongoDB ke saath banaya gaya hai.

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Setup
`.env` file banayein:
```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/luxury-stay-hms
JWT_SECRET=your_super_secret_key_here
PORT=3000
API_BASE_URL=http://localhost:3000
```

### 3. Run Server
```bash
# Development mode
npm run dev

# Production mode
npm start
```

## 📚 API Documentation

Swagger UI available at: `http://localhost:3000/api-docs`

## 🔐 Authentication

### Register New User
```bash
POST /api/auth/register
Content-Type: application/json

{
  "email": "john@hotel.com",
  "password": "password123",
  "role": "manager"
}
```

### Login
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@luxurystay.com",
  "password": "password123"
}
```

Response:
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "email": "john@hotel.com",
    "role": "manager"
  }
}
```

## 👥 User Roles

- **admin**: Full system access
- **manager**: Hotel management access
- **receptionist**: Front desk operations
- **housekeeping**: Room cleaning tasks
- **guest**: Basic guest access

## 🏨 Main Features

### 1. User Management
- Staff account creation/management
- Role-based access control
- Account activation/deactivation

### 2. Room Management
- Room inventory
- Room status updates (available, occupied, cleaning, maintenance)
- Room pricing

### 3. Booking System
- Room reservations
- Check-in/Check-out
- Booking status management

### 4. Housekeeping
- Task assignment
- Room cleaning status
- Task completion tracking

### 5. Maintenance
- Maintenance requests
- Issue tracking
- Resolution status

### 6. Billing & Invoicing
- Invoice generation
- Payment tracking
- Service charges

### 7. Guest Services
- Service requests
- Guest feedback
- Additional services

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Users (Admin/Manager only)
- `GET /api/users` - List all users
- `POST /api/users` - Create new user
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `PATCH /api/users/:id/deactivate` - Deactivate user

### Rooms
- `GET /api/rooms` - List all rooms
- `POST /api/rooms` - Create new room
- `PUT /api/rooms/:id` - Update room
- `PATCH /api/rooms/:id/status` - Update room status

### Bookings
- `GET /api/bookings` - List all bookings
- `POST /api/bookings` - Create new booking
- `PATCH /api/bookings/:id/check-in` - Check-in guest
- `PATCH /api/bookings/:id/check-out` - Check-out guest
- `PATCH /api/bookings/:id/cancel` - Cancel booking

### Housekeeping
- `GET /api/housekeeping` - List tasks
- `POST /api/housekeeping` - Create task
- `PATCH /api/housekeeping/:id/complete` - Complete task

### Maintenance
- `GET /api/maintenance` - List requests
- `POST /api/maintenance` - Create request
- `PATCH /api/maintenance/:id/resolve` - Resolve request

### Invoices
- `GET /api/invoices` - List invoices
- `POST /api/invoices` - Generate invoice

### Feedback
- `GET /api/feedback` - List feedback
- `POST /api/feedback` - Submit feedback

### Services
- `GET /api/services` - List service requests
- `POST /api/services` - Create service request
- `PUT /api/services/:id` - Update service request

### Settings
- `GET /api/settings/:key` - Get setting
- `PUT /api/settings/:key` - Set setting

### Notifications
- `GET /api/notifications` - List notifications
- `PATCH /api/notifications/:id/read` - Mark as read

## 🔒 Security

- JWT token authentication
- Password encryption with bcrypt
- Role-based access control
- CORS enabled
- Request validation

## 📝 Example Usage

### 1. Create Admin User
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@hotel.com",
    "password": "admin123",
    "role": "admin"
  }'
```

### 2. Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@hotel.com",
    "password": "admin123"
  }'
```

### 3. Create Room (with token)
```bash
curl -X POST http://localhost:3000/api/rooms \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "number": "101",
    "type": "Deluxe",
    "price": 5000,
    "status": "available"
  }'
```

## 🛠️ Development

### Project Structure
```
backend/
├── config/
│   └── db.js          # MongoDB connection
├── controllers/       # Business logic
├── models/           # Database models
├── routes/           # API routes
├── index.js          # Main server file
└── package.json
```

### Adding New Features
1. Create model in `models/`
2. Add controller in `controllers/`
3. Create routes in `routes/`
4. Add Swagger documentation
5. Wire routes in `index.js`

## 🐛 Troubleshooting

### Common Issues
1. **MongoDB Connection Error**: Check `MONGO_URI` in `.env`
2. **JWT Error**: Check `JWT_SECRET` in `.env`
3. **Port Already in Use**: Change `PORT` in `.env`

### Health Check
```bash
curl http://localhost:3000/health
```

## 📞 Support

Agar koi problem ho to:
1. Check console logs
2. Verify environment variables
3. Check MongoDB connection
4. Review API documentation at `/api-docs`
