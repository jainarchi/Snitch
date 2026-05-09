# WearVerse

**A modern full-stack e-commerce platform for fashion and apparel**

WearVerse is a comprehensive online marketplace designed to provide seamless shopping experiences for customers while empowering sellers to manage their product catalogs and track their sales efficiently.

---

## 🎯 Features

### For Customers
- 🛍️ **Browse Products** - Explore a wide variety of fashion items
- 🔐 **Secure Authentication** - Sign up and login with email or Google
- 🛒 **Shopping Cart** - Add items to cart and manage quantities
- ❤️ **Wishlist** - Save favorite items for later
- 🔍 **Product Discovery** - Search and filter products by categories
- 📝 **Product Details** - View detailed product information with images and variants
- 💳 **Checkout** - Secure payment processing

### For Sellers
- 📊 **Dashboard** - Comprehensive seller dashboard with analytics
- 📦 **Product Management** - Create, edit, and manage product listings
- 📸 **Image Upload** - Upload and manage product images
- 📈 **Revenue Tracking** - Monitor sales and revenue
- 📋 **Order Management** - Track and manage customer orders
- ⚙️ **Settings** - Configure seller profile and preferences

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite
- **State Management**: Redux Toolkit
- **Styling**: CSS3
- **HTTP Client**: Axios

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **Authentication**: JWT & Google OAuth
- **Image Storage**: Cloud-based image service

---

## 📁 Project Structure

```
WearVerse/
├── Backend/
│   ├── src/
│   │   ├── app.js              # Express app setup
│   │   ├── config/             # Configuration files
│   │   ├── controllers/        # Route controllers
│   │   ├── middlewares/        # Custom middlewares
│   │   ├── models/             # Database models
│   │   ├── routes/             # API routes
│   │   ├── services/           # Business logic services
│   │   └── validation/         # Input validation
│   ├── server.js               # Server entry point
│   └── package.json
│
└── Frontend/
    ├── src/
    │   ├── app/                # App configuration & routing
    │   ├── features/           # Feature-based structure
    │   │   ├── auth/           # Authentication
    │   │   ├── products/       # Product features
    │   │   ├── cart/           # Shopping cart
    │   │   ├── wishlist/       # Wishlist
    │   │   ├── seller/         # Seller dashboard
    │   │   └── shared/         # Shared components
    │   ├── main.jsx            # Entry point
    │   └── index.css           # Global styles
    ├── index.html
    ├── vite.config.js
    └── package.json
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB instance (local or cloud)

### Installation

#### 1. Clone the Repository
```bash
git clone <repository-url>
cd WearVerse
```

#### 2. Backend Setup
```bash
cd Backend
npm install
```

Create a `.env` file in the Backend directory:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

#### 3. Frontend Setup
```bash
cd ../Frontend
npm install
```

Create a `.env` file in the Frontend directory:
```env
VITE_API_URL=http://localhost:5000
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

---

## 🏃 Running the Application

### Backend
```bash
cd Backend
npm start
# or for development with auto-reload
npm run dev
```
The backend will run on `http://localhost:5000`

### Frontend
```bash
cd Frontend
npm run dev
```
The frontend will run on `http://localhost:5173`

---

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product details
- `POST /api/products` - Create new product (seller)
- `PUT /api/products/:id` - Update product (seller)
- `DELETE /api/products/:id` - Delete product (seller)

### Cart
- `GET /api/cart` - Get user cart
- `POST /api/cart/add` - Add item to cart
- `PUT /api/cart/:id` - Update cart item
- `DELETE /api/cart/:id` - Remove item from cart

### Wishlist
- `GET /api/wishlist` - Get user wishlist
- `POST /api/wishlist/add` - Add item to wishlist
- `DELETE /api/wishlist/:id` - Remove item from wishlist

---

## 🔐 Authentication

WearVerse supports two authentication methods:
1. **Email & Password** - Traditional sign-up/login
2. **Google OAuth** - Single sign-on with Google

---

## 📝 Features in Detail

### Product Management
- Create products with multiple variants
- Upload product images
- Set pricing and inventory
- Manage product descriptions and specifications

### Seller Dashboard
- View order history and status
- Track revenue and sales analytics
- Manage product inventory
- Monitor seller ratings and reviews

### Shopping Experience
- Responsive design for all devices
- Fast product search and filtering
- Secure checkout process
- Order tracking

---


## 🙏 Acknowledgments

- React community for amazing libraries
- MongoDB for reliable database solutions
- Google Cloud for authentication services

---

**Happy Shopping with WearVerse! *
