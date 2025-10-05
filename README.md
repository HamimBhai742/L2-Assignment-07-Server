# Personal Portfolio Backend API

A robust backend API for managing personal portfolio websites with authentication, project showcase, blog management, and analytics.

## 🚀 Live Demo
- **API Base URL**: `https://assignment-07-server.vercel.app`
- **Frontend**: `https://assignment-07-gamma.vercel.app`

## 📋 Overview

This is a full-featured backend API built for personal portfolio websites. It provides comprehensive user management, project portfolio showcase, blog content management, and authentication system with role-based access control.

## 🛠️ Tech Stack

- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT + Passport.js (Local Strategy)
- **File Storage**: Cloudinary
- **Validation**: Zod
- **Session Management**: Express Sessions + Cookies
- **Deployment**: Vercel

## ✨ Features

### 🔐 Authentication System
- JWT-based authentication
- Role-based access control (USER/ADMIN)
- Secure session management
- Password encryption with bcrypt

### 👤 User Management
- Complete profile management
- Social media links integration
- Skills and experience tracking
- Professional information

### 💼 Portfolio Management
- Project showcase with thumbnails
- Technology stack tracking
- Live demo and GitHub links
- Project status management
- Category-based organization

### 📝 Blog System
- Rich content management
- SEO-friendly slug generation
- Category and tag system
- View analytics
- Draft/Published status

### 📊 Analytics & Stats
- User engagement metrics
- Content performance tracking
- Dashboard statistics

## 🔗 API Endpoints

### Authentication
```
POST /api/a7/auth/login          # User login
POST /api/a7/auth/verify         # Verify user (Admin only)
POST /api/a7/auth/logout         # User logout
```

### User Management
```
GET  /api/a7/user/me             # Get current user profile (Admin)
GET  /api/a7/user                # Get public user info
GET  /api/a7/user/about          # Get about information
PUT  /api/a7/user/update-profile # Update profile (Admin)
```

### Projects
```
GET  /api/a7/projects            # Get all projects
POST /api/a7/projects            # Create project (Admin)
PUT  /api/a7/projects/:id        # Update project (Admin)
DELETE /api/a7/projects/:id      # Delete project (Admin)
```

### Blog
```
GET  /api/a7/blog                # Get all blogs
GET  /api/a7/blog/:slug          # Get blog by slug
POST /api/a7/blog                # Create blog (Admin)
PUT  /api/a7/blog/:id            # Update blog (Admin)
DELETE /api/a7/blog/:id          # Delete blog (Admin)
```

### Statistics
```
GET  /api/a7/stats               # Get dashboard statistics
```

## 🚀 Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL database

### 1. Clone Repository
```bash
git clone <repository-url>
cd assignment-07-server
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
Create `.env` file in root directory:
```env
# Database
DATABASE_URL=postgresql://username:password@host:port/database?sslmode=require

# Server
NODE_ENV=production
SERVER_PORT=5000

# Authentication
BCRYPTJS_SALT=10
JWT_SECRET=your-jwt-secret-key
JWT_EXPIRES_IN=1d
EXPRESS_SESSION_SECRET=your-session-secret

# Admin Credentials
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=admin-password

# Cloudinary
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

### 4. Database Setup
```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate deploy

# (Optional) View database in Prisma Studio
npx prisma studio
```

### 5. Start Development Server
```bash
npm run dev
```

The server will start on `http://localhost:5000`

### 6. Production Build
```bash
npm run build
npm start
```

## 📁 Project Structure

```
src/
├── app.ts                    # Express app configuration
├── server.ts                 # Server startup & DB connection
├── config/                   # Configuration files
│   ├── env.ts               # Environment variables
│   ├── passport.ts          # Passport authentication
│   └── prisma.db.ts         # Prisma client
├── models/                   # Feature modules
│   ├── auth/                # Authentication logic
│   ├── user/                # User management
│   ├── projects/            # Project portfolio
│   ├── blog/                # Blog management
│   └── stats/               # Analytics
├── middleware/               # Custom middleware
│   ├── jwt.verify.ts        # JWT authentication
│   ├── global.error.ts      # Error handling
│   └── validation.sachem.ts # Request validation
├── utils/                    # Utility functions
└── routes/                   # Route aggregation
```

## 🔒 Security Features

- JWT token-based authentication
- Password hashing with bcrypt
- Role-based access control
- CORS configuration
- Input validation with Zod
- SQL injection prevention with Prisma
- Secure session management


### CORS Configuration
The API accepts requests from:
- `http://localhost:3000` (Development)
- `https://assignment-07-gamma.vercel.app` (Production)

### File Upload
- Images are stored on Cloudinary
- Automatic optimization and CDN delivery
- Support for multiple image formats

### Database
- Uses PostgreSQL with Neon hosting
- Prisma ORM for type-safe database operations
- Automatic migrations and schema management

## 👨‍💻 Author

**Hamim**
- Email: mdhamim5088@gmail.com
- GitHub: https://github.com/HamimBhai742
- LinkedIn: https://www.linkedin.com/in/md-hamim42

---

