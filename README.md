# MERN Stack Farm Management and Produce Ordering System

## Project Overview

This project is a MERN (MongoDB, Express.js, React.js, Node.js) stack application for farm management and produce ordering. It features a user-friendly interface built with React, styled using Tailwind CSS and shadcn components, and powered by an Express.js backend.

## Link

- Deployed project: [here](https://farm-front.onrender.com)

## Features

- User Authentication (using Auth0)
- User Profile Management
- Farm Management
  - Create and update farm profiles
  - Manage produce items
- Produce Ordering System
  - Search and filter farms
  - Add items to cart
  - Checkout and payment (using Stripe)
- Order Management
  - View and update order status (for farm owners)
  - Track order status (for customers)

## Tech Stack

### Frontend:

- React.js
- Tailwind CSS
- shadcn UI components
- React Router for navigation
- Auth0 for authentication

### Backend:

- Node.js with Express.js
- MongoDB with Mongoose ORM
- JWT for API authentication
- Cloudinary for image uploads
- Stripe for payment processing

## Getting Started

1. Clone the repository:

   ```
   git clone https://github.com/emmanueluwa/petstays-front.git
   ```

2. Install dependencies:

   ```
   cd petstays-front
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the necessary environment variables (refer to `.env.example`).

4. Start the development server:
   ```
   npm run dev
   ```

## Related Repositories

- Backend API: [backend](https://github.com/emmanueluwa/farm_back)
- E2E Tests: [tests](https://github.com/emmanueluwa/petstays_e2e_tests)

## Deployment

This frontend is deployed on render. For deployment instructions, refer to the documentation of your chosen platform.

## Acknowledgements

- Auth0 for authentication services
- Stripe for payment processing
- Cloudinary for image management
- All other open-source libraries and tools used in this project
