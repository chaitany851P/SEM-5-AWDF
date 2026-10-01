# Practical 1: Introduction to React and Component Architecture

## Objective
To set up a React development environment using Vite and build a static UI using independently structured, reusable components for a student portfolio page.

## Key Concepts Addressed
- Component-based architecture in React.
- JSX syntax and modular separation of concerns.
- Passing data unidirectionally from parent to child via `props`.
- Dynamic list rendering with unique `key` attributes.

## Project Structure
```
Practical-01/
├── index.html
├── package.json
├── vite.config.js
├── .gitignore
├── README.md
└── src/
    ├── main.jsx
    ├── index.css
    ├── App.jsx
    └── components/
        ├── Header.jsx       (Receives `name`, `title`, and inline `themeColor` props)
        ├── NavBar.jsx       (Active section highlight button bar)
        ├── About.jsx        (Receives `bio` prop)
        ├── Skills.jsx       (Receives `skillList` array prop and maps dynamically)
        └── Footer.jsx       (Receives `email` and `year` props)
```

## How to Run
1. Navigate to this directory:
   ```bash
   cd Practical-01
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. Open the browser at `http://localhost:5173`.
