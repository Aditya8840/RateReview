# Database Schema - RateReview System

This document explains how data is stored in the RateReview application database.

## Overview

The database has 3 main tables that store information about:
- **Users** - People who can log in and rate products
- **Products** - Items that can be rated
- **Reviews** - Ratings and comments given by users to products

## Entity Relationship (ER) Diagram

```
┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐
│     USERS       │       │    REVIEWS      │       │    PRODUCTS     │
├─────────────────┤       ├─────────────────┤       ├─────────────────┤
│ id (Primary)    │       │ id (Primary)    │       │ id (Primary)    │
│ name            │       │ rating          │       │ name            │
│ email (Unique)  │       │ comment         │       │ description     │
│ password        │       │ imageUrl        │       │ imageUrl        │
│ createdAt       │       │ userId (Foreign)│       │ price           │
│ updatedAt       │       │ productId (FK)  │       │ averageRating   │
└─────────────────┘       └─────────────────┘       │ numReviews      │
                                                    │ createdAt       │
                                                    │ updatedAt       │
                                                    └─────────────────┘

Relationships:
• One User can write Many Reviews (1:M)
• One Product can have Many Reviews (1:M)  
• One User can rate One Product only once (Unique constraint)
```

## Table Details

### 1. Users Table (`users`)

Stores information about people who can use the system.

| Column    | Type      | Description                           | Constraints           |
|-----------|-----------|---------------------------------------|-----------------------|
| id        | String    | Unique identifier for each user       | Primary Key, Auto-generated UUID |
| name      | String    | User's full name                      | Required              |
| email     | String    | User's email address                  | Required, Must be unique |
| password  | String    | Encrypted password                    | Required              |
| createdAt | DateTime  | When the account was created          | Auto-generated        |
| updatedAt | DateTime  | When the account was last updated     | Auto-updated          |

**Purpose**: Keep track of who can log in and use the system.

### 2. Products Table (`products`)

Stores information about items that can be rated.

| Column        | Type      | Description                           | Constraints           |
|---------------|-----------|---------------------------------------|-----------------------|
| id            | String    | Unique identifier for each product    | Primary Key, Auto-generated UUID |
| name          | String    | Product name                          | Required              |
| description   | String    | Product description                   | Required              |
| imageUrl      | String    | URL to product image                  | Required              |
| price         | Integer   | Product price (in cents)              | Required              |
| averageRating | Float     | Average rating from all reviews       | Default: 0            |
| numReviews    | Integer   | Total number of reviews               | Default: 0            |
| createdAt     | DateTime  | When the product was added            | Auto-generated        |
| updatedAt     | DateTime  | When the product was last updated     | Auto-updated          |

**Purpose**: Store all products that users can view and rate.

### 3. Reviews Table (`reviews`)

Stores ratings and comments given by users to products.

| Column    | Type      | Description                           | Constraints           |
|-----------|-----------|---------------------------------------|-----------------------|
| id        | String    | Unique identifier for each review     | Primary Key, Auto-generated UUID |
| rating    | Integer   | Star rating (1-5)                     | Required              |
| comment   | String    | Optional text comment                 | Optional              |
| imageUrl  | String    | Optional image with review            | Optional              |
| productId | String    | Which product this review is for      | Foreign Key to products.id |
| userId    | String    | Who wrote this review                 | Foreign Key to users.id |
| createdAt | DateTime  | When the review was submitted         | Auto-generated        |
| updatedAt | DateTime  | When the review was last updated      | Auto-updated          |

**Important Constraint**: Each user can only review each product once (Unique constraint on userId + productId).

**Purpose**: Store all ratings and comments users give to products.

## Relationships Explained

### User → Reviews (One-to-Many)
- One user can write many reviews
- Each review belongs to exactly one user
- When a user is deleted, all their reviews are also deleted

### Product → Reviews (One-to-Many)
- One product can have many reviews
- Each review is about exactly one product
- When a product is deleted, all its reviews are also deleted

### User + Product → Review (One-to-One)
- Each user can review each product only once
- This prevents spam and duplicate reviews
- The system enforces this with a unique constraint

## SQL Schema Summary

```sql
-- Users table
CREATE TABLE users (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Products table  
CREATE TABLE products (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    imageUrl TEXT NOT NULL,
    price INTEGER NOT NULL,
    averageRating DOUBLE PRECISION DEFAULT 0,
    numReviews INTEGER DEFAULT 0,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Reviews table
CREATE TABLE reviews (
    id TEXT PRIMARY KEY,
    rating INTEGER NOT NULL,
    comment TEXT,
    imageUrl TEXT,
    productId TEXT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    userId TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(userId, productId)
);
```
