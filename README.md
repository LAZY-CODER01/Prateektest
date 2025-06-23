# Mudrika International Fullstack E-commerce Platform

## Overview

This project is a fullstack e-commerce platform featuring a modern React frontend (with Vite, Redux, Tailwind, and MUI) and a Node.js/Express backend with MongoDB. It supports user authentication, product browsing, cart, checkout, admin management, and more.

---

## Tech Stack

### Frontend (client)

- React 19 + Vite
- Redux Toolkit
- Tailwind CSS & DaisyUI
- Material UI (MUI)
- Radix UI
- Framer Motion
- Firebase (for auth or storage)
- Axios

### Backend (server)

- Node.js + Express
- MongoDB (via Mongoose)
- JWT Auth
- Cloudinary (image upload)
- Razorpay (payments)
- Nodemailer (emails)

---

## Folder Structure

```
final-draft/
  client/      # React frontend
  server/      # Node.js/Express backend
```

---

## Setup Instructions

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn
- MongoDB instance (local or Atlas)

### 1. Clone the repository

```bash
git clone <repo-url>
cd final-draft
```

### 2. Install dependencies

#### Frontend

```bash
cd client
npm install
```

#### Backend

```bash
cd ../server
npm install
```

### 3. Environment Variables

Create a `.env` file in `server/` with the following variables:

```
MONGODB_URI=<your-mongodb-uri>
PORT=5000
CLIENT_BASE_URL=http://localhost:5173
JWT_SECRET=<your-secret>
CLOUDINARY_CLOUD_NAME=<cloudinary-name>
CLOUDINARY_API_KEY=<cloudinary-key>
CLOUDINARY_API_SECRET=<cloudinary-secret>
RAZORPAY_KEY_ID=<razorpay-key>
RAZORPAY_KEY_SECRET=<razorpay-secret>
```

### 4. Running the app

#### Start Backend

```bash
cd server
npm run dev
```

#### Start Frontend

```bash
cd ../client
npm run dev
```

---

## Scripts

### Frontend (`client/package.json`)

- `npm run dev` - Start Vite dev server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Lint code

### Backend (`server/package.json`)

- `npm run dev` - Start server with nodemon
- `npm start` - Start server

---

## Main Features

- **User Authentication**: Secure signup, login, and OTP verification with JWT and Firebase support.
- **Product Catalog**: Browse, search, and filter products by category, price, rating, and more. Detailed product pages with images, descriptions, and reviews.
- **Shopping Cart**: Add, update, or remove products from the cart. Cart persists across sessions for logged-in users.
- **Checkout & Payments**: Seamless checkout process with address selection, order summary, and Razorpay payment integration.
- **Order Management**: View order history, order details, and real-time order status updates for users. Admins can manage and update order statuses.
- **Address Book**: Save, edit, and manage multiple shipping addresses for faster checkout.
- **Wishlist**: Add products to a wishlist for future purchase (coming soon).
- **Product Reviews & Ratings**: Users can rate and review products. Reviews are displayed on product pages with star ratings.
- **Admin Dashboard**: Powerful admin panel to manage products, orders, and users. Includes analytics and quick actions.
- **Image Upload**: Upload product images securely via Cloudinary with real-time previews.
- **Email Notifications**: Automated emails for order confirmations, password resets, and important updates using Nodemailer.

- **Role-based Access Control**: Separate views and permissions for admins and regular users.
- **Analytics & Reporting**: Admins can view sales, user, and product analytics (basic version, extensible).
- **Product Inventory Management**: Track stock levels, update inventory, and receive low-stock alerts (admin).
- **Search Functionality**: Fast, fuzzy product search with suggestions and filters.
- **Secure API**: All backend APIs are protected with JWT authentication and input validation.
- **Performance Optimizations**: Lazy loading, code splitting, and optimized assets for fast load times.
- **Modern UI/UX**: Built with Tailwind, MUI, Radix UI, and Framer Motion for a delightful user experience.

---

## Planned/Upcoming Features

- **Wishlist Functionality**: Allow users to save favorite products for later.
- **Product Comparison**: Compare multiple products side by side.
- **Discounts & Coupons**: Apply promo codes and discounts at checkout.
- **Push Notifications**: Real-time notifications (phone) for order updates and promotions.
- **Internationalization (i18n)**: Support for multiple languages and currencies.
- **Advanced Analytics**: More detailed sales, traffic, and user analytics for admins.
- **User Activity Logs**: Track user actions for security and insights.
- **Accessibility Improvements**: Enhanced support for screen readers and keyboard navigation.
- **Live Chat Support**: In-app customer support chat.
- **Responsive Design**: Fully responsive UI for mobile, tablet, and desktop devices.

---

## API Endpoints (Backend)

- `/api/auth/*` - Auth routes
- `/api/admin/products` - Admin product management
- `/api/admin/orders` - Admin order management
- `/api/admin/users` - Admin user management
- `/api/shop/products` - Product listing and details
- `/api/shop/cart` - Cart operations
- `/api/shop/address` - Address management
- `/api/shop/order` - Order operations
- `/api/shop/search` - Product search
- `/api/shop/review` - Product reviews

---

## Frontend Routing (Sample)

- `/auth/login`, `/auth/signup`, `/auth/verify-otp`
- `/admin/dashboard`, `/admin/orders`, `/admin/products`, `/admin/profile`
- `/shop/home`, `/shop/listing`, `/shop/product/:id`, `/shop/cart`, `/shop/checkout`, `/shop/profile`, `/shop/about`, `/shop/terms`, `/shop/search`

---

## Development Notes

- Frontend uses path alias `@/` for `src/` (see `jsconfig.json`)
- Update environment variables as needed for your deployment
- For production, build the frontend and serve it via a static server or integrate with the backend

---

## License
 Mudrika International

---
# About Me

Hey Everyone, My name is Prateek Khare. Currently I am pursuing Electrical Engineering from Madan Mohan Malaviya University of Technology, Gorakhpur.

I am a dedicated Full Stack Developer with hands-on experience in building scalable web applications using MERN (MongoDB, Express.js, React.js, Node.js) stack and modern front-end tools like Tailwind CSS and ShadCN UI. Currently, I am expanding my expertise into the fields of Machine Learning and Artificial Intelligence, focusing on applying data-driven solutions to real-world problems.

I have completed the AWS Cloud Practitioner certification (via GeeksforGeeks), gaining a solid understanding of cloud computing principles, AWS services, and cloud architecture — enabling me to build and deploy applications in cloud-native environments.
