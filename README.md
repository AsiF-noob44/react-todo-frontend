# React Todo App - Frontend

A modern Todo application built with React, Vite, and Tailwind CSS.

## Features

- Create, read, update, and delete todos
- Responsive design with Tailwind CSS
- Modal-based form for adding/editing todos
- Connected to backend API

## Tech Stack

- React 19
- Vite
- Tailwind CSS 4
- React Icons

## Development Setup

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file in the root directory (copy from `.env.example`):

```bash
VITE_API_URL=http://localhost:5000/api/todos
```

3. Start the development server:

```bash
npm run dev
```

## Deployment to Netlify

### Prerequisites

- Your backend deployed to Render (or another platform)
- A GitHub account (for continuous deployment)

### Steps to Deploy

1. **Push your code to GitHub** (if not already done)

2. **Log in to Netlify**

   - Go to [netlify.com](https://netlify.com)
   - Sign up/Login with GitHub

3. **Import your project**

   - Click "Add new site" → "Import an existing project"
   - Choose "Deploy with GitHub"
   - Select your repository

4. **Configure build settings** (should auto-detect from `netlify.toml`):

   - Build command: `npm run build`
   - Publish directory: `dist`

5. **Set environment variables**

   - Go to Site settings → Environment variables
   - Add: `VITE_API_URL` = `https://your-backend.onrender.com/api/todos`
   - Replace with your actual Render backend URL

6. **Deploy**

   - Click "Deploy site"
   - Wait for build to complete

7. **Get your frontend URL**
   - After deployment, you'll get a URL like: `https://your-app.netlify.app`
   - Copy this URL - you'll need it for your backend's CORS configuration

### Important Notes

- The `netlify.toml` file configures SPA routing redirects
- Environment variables in Netlify must start with `VITE_` to be exposed to the app
- Update your backend's CORS settings to allow your Netlify domain
- Any push to your GitHub repository will trigger an automatic redeployment

## Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist` folder.

## Environment Variables

- `VITE_API_URL`: Backend API endpoint URL

## Project Structure

```
src/
├── App.jsx              # Main application component
├── main.jsx             # Entry point
├── index.css            # Global styles
└── components/
    ├── ModalForm.jsx    # Modal form for add/edit
    ├── TodoItem.jsx     # Individual todo item
    └── TodoList.jsx     # List of todos
```
