# Mee-Shop - Full Stack E-Commerce Application

A modern, fully functional e-commerce web application built with React (Vite) frontend and Express.js backend.

## 🚀 Features

### Frontend
- **Modern UI** with Tailwind CSS and dark mode support
- **Product Catalog** with dynamic loading from backend API
- **Shopping Cart** with persistent storage (localStorage)
- **User Authentication** (Register/Login/Logout)
- **Responsive Design** optimized for mobile, tablet, and desktop
- **Smooth Animations** using AOS (Animate On Scroll)
- **React Router** for seamless navigation
- **Product Categories** and filtering
- **Order Management** system

### Backend
- **RESTful API** built with Express.js
- **CORS enabled** for cross-origin requests
- **User Authentication** with bcrypt password hashing
- **Product Management** CRUD operations
- **Order Processing** system
- **Category Management**
- **In-memory data storage** (easily replaceable with database)

## 📦 Tech Stack

### Frontend
- React 18
- React Router DOM
- Tailwind CSS
- AOS (Animate On Scroll)
- React Slick (Carousel)
- React Icons
- Vite (Build Tool)

### Backend
- Node.js
- Express.js
- bcryptjs (Password Hashing)
- cors
- body-parser

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Backend Setup

1. Navigate to server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173` (or another port if 5173 is busy)

## 📁 Project Structure

```
Mee-Shop/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── contexts/       # React Context (Auth, Cart)
│   │   ├── pages/          # Page components
│   │   ├── assets/         # Images and static files
│   │   ├── api.js          # API integration layer
│   │   ├── App.jsx         # Main App component
│   │   └── main.jsx        # Entry point
│   ├── public/             # Public assets
│   └── package.json
│
└── server/                 # Backend Express application
    ├── data/               # In-memory data storage
    ├── routes/             # API routes
    ├── index.js            # Server entry point
    └── package.json
```

## 🔌 API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create new product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Categories
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create new category

### Users
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - Login user

### Orders
- `GET /api/orders` - Get all orders
- `POST /api/orders` - Create new order

## 🎨 Features Breakdown

### Shopping Cart
- Add/Remove products
- Update quantities
- Persistent storage using localStorage
- Real-time cart count in navbar
- Beautiful cart page with product images

### Authentication
- User registration with password hashing
- Login/Logout functionality
- Protected routes
- User session management

### Product Display
- Dynamic product loading from API
- Product cards with hover effects
- Add to cart functionality
- Category-based organization
- Responsive grid layout

## 🔧 Environment Variables

Create a `.env` file in the client directory:

```env
VITE_API_URL=http://localhost:5000/api
```

## 🚀 Deployment

### Frontend (Vercel/Netlify)
1. Build the production version:
```bash
cd client
npm run build
```

2. Deploy the `dist` folder to your hosting service

### Backend (Heroku/Railway/Render)
1. Add a `Procfile`:
```
web: node index.js
```

2. Deploy to your preferred service

## 📝 Future Enhancements

- [ ] Database integration (MongoDB/PostgreSQL)
- [ ] Payment gateway integration (Stripe/PayPal)
- [ ] Product search and filters
- [ ] User profile management
- [ ] Order history
- [ ] Product reviews and ratings
- [ ] Wishlist functionality
- [ ] Admin dashboard
- [ ] Email notifications
- [ ] Image upload for products

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

Created with ❤️ by ujalasingh904

## 🙏 Acknowledgments

- React Documentation
- Tailwind CSS
- Express.js Community
- All open-source contributors
