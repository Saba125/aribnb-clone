This project is a Next.js web application built with TypeScript, Prisma, MongoDB, and React. It allows users to view and manage their favorite listings.

## Features

- Display a list of favorite listings
- User authentication and current user data fetching
- Responsive design using Tailwind CSS

## Tech Stack

- **Next.js** (App Router)
- **TypeScript**
- **Prisma** (with MongoDB)
- **React** 
- **Tailwind CSS**

## Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- Node.js (v14 or higher)
- npm or Yarn
- MongoDB database (MongoDB Atlas or local instance)

### Installation

1. **Clone the repository**:

   
   git clone https://github.com/yourusername/favorite-listings-app.git


2.Navigate to the project directory:
cd favorite-listings-app

Install the dependencies

npm install

Set up environment variables:

Create a .env file in the root directory based on the .env.example file and configure your MongoDB connection string:

DATABASE_URL="mongodb+srv://your-credentials"
NEXTAUTH_SECRET=your-nextauth-secret
NEXTAUTH_URL=http://localhost:3000
Generate Prisma client:

npx prisma generate

Start the server:

npm run dev

Visit the app:

Open http://localhost:3000 in your browser
