# 🎮 Vagabond - Gaming Platform

A modern full-stack web application, game studio website for Vagabond — showcasing our games, merchandise store, gaming news, job listings, and studio updates.

![React](https://img.shields.io/badge/React-19.0.0-blue.svg)
![Node.js](https://img.shields.io/badge/Node.js-Express-green.svg)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-brightgreen.svg)
![License](https://img.shields.io/badge/License-MIT-yellow.svg)

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Usage](#usage)
- [API Routes](#api-routes)
- [Authentication](#authentication)
- [Screenshots](#screenshots)
- [License](#license)

## ✨ Features

### 🎯 Core Features
- **Game Catalog**: Browse and explore a comprehensive collection of games
- **Game Details**: View detailed information about each game with rich media
- **Wishlist System**: Save favorite games for later
- **Shopping Cart**: Full e-commerce functionality for merchandise
- **Secure Checkout**: Integrated Stripe payment processing
- **Gaming News**: Stay updated with the latest gaming industry news
- **Job Board**: Explore career opportunities in the gaming industry
- **Contact System**: Get in touch with the team
- **Admin Dashboard**: Manage content, products, and site data

### 🔐 Security Features
- JWT-based authentication
- Bcrypt password hashing
- Protected admin routes
- Secure cookie handling

### 🎨 UI/UX Features
- Responsive design for all devices
- Interactive carousels and cards
- Background video integration
- Modern, clean interface
- Bootstrap 5 styling

## 🛠️ Tech Stack

### Frontend
- **React 19.0.0** - UI framework
- **React Router DOM** - Navigation and routing
- **Bootstrap 5** - CSS framework
- **Font Awesome** - Icons
- **Stripe React** - Payment processing

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB

### Additional Tools
- **Axios** - HTTP client
- **JWT** - Authentication tokens
- **Bcrypt** - Password encryption
- **Multer** - File uploads
- **CORS** - Cross-origin resource sharing
- **Cookie Parser** - Cookie handling

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **MongoDB** (local or Atlas account)
- **Stripe Account** (for payment processing)

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Server Configuration
PORT=5000

# MongoDB
MONGODB_URI=your_mongodb_connection_string

# JWT Secret
JWT_SECRET=your_jwt_secret_key

# Stripe
STRIPE_SECRET_KEY=your_stripe_secret_key
REACT_APP_STRIPE_PUBLIC_KEY=your_stripe_public_key

# Admin Credentials
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your_hashed_password
```

## 📥 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/vagabond.git
   cd vagabond/my-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   - Copy `.env.example` to `.env`
   - Fill in your configuration values

4. **Start MongoDB**
   - Ensure MongoDB is running locally, or
   - Use MongoDB Atlas cloud database

## 💻 Usage

### Development Mode

1. **Start the backend server**
   ```bash
   npm node server.js
   ```
   Server will run on `http://localhost:5000`

2. **Start the React development server** (in a new terminal)
   ```bash
   npm start
   ```
   App will open at `http://localhost:3000`


## 🔌 API Routes

### Public Routes
- `GET /` - Home page
- `GET /games` - Browse games
- `GET /games/:id` - Game details
- `GET /news` - Browse news articles
- `GET /news/:id` - News article details
- `GET /merch` - Browse merchandise
- `GET /merch/:id` - Product details
- `GET /hiring` - Job listings
- `GET /jobs/:id` - Job details
- `GET /contact` - Contact page

### Protected Routes
- `GET /wishlist` - User's wishlist
- `GET /dashboard` - Admin dashboard (requires authentication)

### Authentication
- `POST /admin-login` - Admin login
- `POST /logout` - Logout

## 🔐 Authentication

The application uses JWT (JSON Web Tokens) for authentication:

1. Admin logs in via `/admin-login`
2. Server validates credentials and issues a JWT
3. Token is stored in HTTP-only cookies
4. Protected routes verify the token before granting access
5. Tokens expire after a set duration for security

Passwords are hashed using bcrypt before storage.

## 📸 Screenshots
<img width="2482" height="1399" alt="image" src="https://github.com/user-attachments/assets/5f74c542-9c5a-4549-a708-b2321fcc8cb6" />
<img width="2500" height="3252" alt="image" src="https://github.com/user-attachments/assets/bc81ae87-1ed6-401b-a931-df532998c416" />
<img width="2482" height="4422" alt="image" src="https://github.com/user-attachments/assets/2ef2ff7b-274b-4d22-b23e-4ca3564d7135" />




## 📝 Future Enhancements

- [ ] User registration and profiles
- [ ] Game reviews and ratings
- [ ] Social features (comments, likes)
- [ ] Email notifications
- [ ] Advanced search and filtering
- [ ] Multiple payment options
- [ ] Mobile app version
- [ ] Dark mode

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

⭐ **If you like this project, please give it a star!** ⭐

Made with ❤️ by Radhi
