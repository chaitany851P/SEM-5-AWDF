# Practical 2: State Management and Routing in React

## Objective
To implement reactive state management using `useState` and multi-page navigation using React Router v6 in the existing portfolio application.

## Carried Forward from Practical 1
- Modular component tree (`Header`, `About`, `Skills`, `Footer`) reused within page views.
- Extended with client-side routing and reactive UI states.

## Key Additions
1. **React Router v6 Integration**:
   - `BrowserRouter` wrapping the root in `main.jsx`.
   - `<Routes>` and `<Route>` declarations for `/`, `/projects`, `/contact`, and `*` (404 Fallback).
   - Single Page Application navigation with `<NavLink>` preventing full browser page reload.
2. **Reactive State (`useState`)**:
   - **Theme Toggle:** Dark/Light mode switcher dynamically toggles root CSS classes.
   - **Controlled Input:** Real-time form input capture in `Contact.jsx`.
   - **Live Character Counter:** Displays character length dynamically on keystroke.
   - **Visibility Toggle:** Interactive toggle for focus areas in `Home.jsx`.

## How to Run
1. Navigate to the project directory:
   ```bash
   cd Practical-02
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Test client-side routing at `http://localhost:5173`.
