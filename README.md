# React Todo App - Frontend

A modern Todo application built with React, Vite, and Tailwind CSS.

🚀 **Live**: [https://todo-frontui.netlify.app/](https://todo-frontui.netlify.app/)

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
