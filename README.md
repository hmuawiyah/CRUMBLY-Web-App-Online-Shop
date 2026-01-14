# CRUMBLY — Online Shop Web App

CRUMBLY is a web application for an online bakery that supports multiple payment methods with automatic verification to ensure all transactions are properly recorded.  
The application also provides order status tracking based on progress, authentication using JSON Web Token (JWT), profile management, a shopping cart for bulk orders, and a fully responsive interface for both mobile and desktop devices.

---

## Tech Stack
- React
- TypeScript
- Zustand
- Tailwind CSS
- shadcn/ui
- React Icons
- Express.js
- PostgreSQL
- Prisma
- JSON Web Token (JWT)

---

## Features

### User Capabilities
- Create orders
- Cancel orders
- Create orders with pending payment
- View order details
- Add multiple delivery addresses

### User Experience
- Bottom navigation bar for mobile layout to improve navigation
- Responsive design for mobile and desktop

### Authentication & Payment
- Authentication system using JSON Web Token (JWT)
- Multiple payment methods with automatic verification via Midtrans

### Order Management
- Order status filtering:
  - Waiting Payment
  - Processing
  - Shipped
  - Completed
  - Canceled

### Search
- Search feature to make it easier to find orders

---

## Development Duration
⏱️ Approximately **1 month**

---

## What I Learned
- As applications grow in complexity, backend security must receive greater attention
- Managing global state effectively using Zustand
- Designing and structuring database tables clearly according to application requirements

---

## Live Demo
👉 https://crumbly-bread.vercel.app/
