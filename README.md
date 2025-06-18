# RateReview - Product Rating System

A simple web application where users can view products and rate them. Users can see all products in a consistent order, and once they've rated a product, the rate button is replaced with a "You have already rated this product" message.

## Technology Stack

- **Frontend**: HTML, CSS, JavaScript (Vanilla)
- **Backend**: Node.js with TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT (JSON Web Tokens)

**[View Database Schema & ER Diagram](./DATABASE_SCHEMA.md)**

## Quick Start

### Prerequisites

Before you begin, make sure you have installed:
- [Node.js](https://nodejs.org/) (version 16 or higher)
- [PostgreSQL](https://www.postgresql.org/) database
- A code editor like VS Code

### Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone <your-repo-url>
   cd RateReview
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Setup Database**
   - Create a PostgreSQL database
   - Copy the environment file:
     ```bash
     cp .env.example .env
     ```
   - Edit `.env` file with your credentials:

4. **Run Database Migrations**
   ```bash
   npx prisma migrate dev
   ```

5. **Seed the Database with Test Data**
   ```bash
   npm run seed
   ```
   
   This creates:
   - **3 Test Users** (all with password: `password123`)
     - alice@example.com
     - bob@example.com  
     - charlie@example.com
   - **6 Products** with real images and descriptions
   - **5 Sample Reviews** to demonstrate the rating system

### Running the Application

1. **Start the Server**
   ```bash
   npm run dev
   ```

2. **Open Your Browser**
   - Navigate to `http://localhost:3000`
   - Login with any test user (e.g., `alice@example.com` / `password123`)

### Testing the Application

#### Manual Testing Steps

1. **Test Product Display**
   - Login to see all products
   - Notice products appear in consistent order (by creation date)

2. **Test Rating System**
   - Click "Rate Product" on any product
   - Give it a 1-5 star rating
   - Add an optional comment
   - Submit the rating

3. **Test Already-Rated Logic**
   - After rating a product, refresh the page
   - The "Rate Product" button should be replaced with "✓ You have already rated this product"

4. **Test Order Consistency**
   - Refresh the page multiple times
   - Products should always appear in the same order

#### API Testing (Optional)

If you want to test the API directly:

```bash
# Get all products (requires authentication)
curl -H "Authorization: Bearer YOUR_JWT_TOKEN" http://localhost:3000/api/products

# Submit a rating
curl -X POST \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"rating": 5, "comment": "Great product!"}' \
  http://localhost:3000/api/products/PRODUCT_ID/reviews
```

## Project Structure

```
RateReview/
├── public/                 # Frontend files
│   ├── index.html         # Main HTML page
│   ├── app.js            # Frontend JavaScript
│   └── styles.css        # Styling
├── src/                   # Backend source code
│   ├── controllers/       # Request handlers
│   ├── daos/             # Data access objects
│   ├── middleware/       # Authentication & error handling
│   ├── models/           # TypeScript interfaces
│   └── routers/          # API route definitions
├── prisma/               # Database schema and migrations
│   ├── schema.prisma     # Database schema
│   └── migrations/       # Database migration files
└── README.md            # This file
```
