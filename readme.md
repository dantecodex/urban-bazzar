# Urban Bazzar

## Overview

Urban Bazzar is a comprehensive e-commerce platform designed to facilitate online shopping and selling. It provides functionalities for users to browse products, add items to their cart, manage orders, and for sellers to list products and manage their inventory. The application ensures secure user authentication, integrates with Cloudinary for image uploads, and includes robust error handling mechanisms.

## Features

- **User Authentication**: Sign up, log in, and log out functionality for both users and sellers.
- **Product Management**: Sellers can add, edit, and delete products. Users can browse products and add them to their cart.
- **Shopping Cart**: Users can view their cart, update quantities, and proceed to checkout.
- **Order Management**: Users can view order history and track order status.
- **Seller Dashboard**: Sellers have access to a dashboard to manage listed products and sales.
- **Image Uploads**: Integration with Cloudinary for secure and efficient image uploads.
- **Email Notifications**: Confirmation emails for successful orders and password resets.
- **Responsive Design**: Ensures usability across various devices.

## Working of the Application

### User Authentication

1. **Sign Up**: New users can create accounts with their name, email, password, and address details.
2. **Log In**: Registered users and sellers can log in securely using their credentials.
3. **Log Out**: Users and sellers can log out to terminate their sessions.

### Product Management

1. **Adding Products**: Sellers can add new products, including uploading product images.
2. **Editing and Deleting**: Sellers can edit product details and delete products no longer in stock.

### Shopping Experience

1. **Browsing Products**: Users can browse available products listed by sellers.
2. **Adding to Cart**: Users can add products to their shopping cart for future purchase.
3. **Managing Cart**: Users can view their cart, update quantities, and remove items before checkout.
4. **Checkout**: Users can proceed to checkout, enter shipping details, and complete their purchase securely.

### Order Management

1. **Order History**: Users can view their order history, including order details and status updates.
2. **Tracking Orders**: Users can track the status of their orders from placement to delivery.

### Seller Dashboard

1. **Overview**: Sellers have a dashboard showing product sales, inventory management, and revenue insights.
2. **Product Listings**: Sellers can manage product listings, update product details, and monitor sales performance.

### Error Handling

- **Global Error Handling**: Comprehensive error handling ensures smooth user experience and operational continuity.

### Responsive Design

- **Mobile Compatibility**: The application is responsive, providing a seamless experience across desktops, tablets, and mobile devices.

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript (EJS templating)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (with Mongoose ODM)
- **Authentication**: JWT (JSON Web Tokens)
- **Image Uploads**: Cloudinary
- **Email Service**: Nodemailer
- **Error Handling**: Custom error handling middleware

## Setup and Installation

1. **Clone the repository**:
   ```sh
   git clone https://github.com/dantecodex/urban-bazzar.git
   cd urban-bazzar
   ```

2. **Install dependencies**:
   ```sh
   npm install
   ```

3. **Environment Variables**:
   Create a `.env` file in the project root directory and add the necessary environment variables. Refer to `envExample.txt` for the required variables.

4. **Run the application**:
   ```sh
   npm start
   ```

5. **Access the application**:
   Open your browser and navigate to `http://localhost:6969`.

## File Structure

```
/urban-bazzar
│
├── controllers/
│   ├── product_controller.js
│   ├── sellerAuth_controller.js
│   ├── sellerStatic_controller.js
│   ├── static_controller.js
│   ├── user_controller.js
│   └── userAuth_controller.js
│   
│
├── middleware/
│   ├── checkAuth.js
│   ├── checkSellerAuth.js
│   ├── globalErrorHandler.js
│   └── multer.js
│   
│
├── models/
│   ├── cart_models.js
│   ├── order_models.js
│   ├── product_models.js
│   ├── seller_models.js
│   └── user_models.js
│
├── public/
│   ├── css/
│   ├── script/
│   └── temp/
│
├── router/
│   ├── product_route.js
│   ├── sellerAuth_route.js
│   ├── sellerStatic_route.js
│   ├── static_route.js
│   ├── user.route.js
│   └── userAuth_route.js
│   
│
├── utils/
│   ├── asyncErrorHandler.js
│   ├── cloudinary.js
│   ├── customError.js
│   └── email.js
│   
│
├── views/
│   ├── browse_products.ejs
│   ├── checkout.ejs
│   ├── homepage.ejs
│   ├── login.ejs
│   ├── order_history.ejs
│   ├── payment_successfull.ejs
│   ├── seller_add_product.ejs
│   ├── seller_dashboard.ejs
│   ├── seller_homepage.ejs
│   ├── seller_listed_product.ejs
│   ├── seller_login.ejs
│   ├── seller_signup.ejs
│   ├── shopping_cart.ejs
│   ├── signup.ejs
│   └── user_address.ejs
│
├── app.js
├── cloudinary.js
├── customError.js
├── email.js
├── envExample.txt
├── package.json
└── server.js


```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## Connect with Me

Feel free to connect with me on LinkedIn:


[![LinkedIn](https://img.shields.io/badge/LinkedIn-Profile-blue)](https://www.linkedin.com/in/anshulrajput237)