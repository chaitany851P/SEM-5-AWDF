# Practical 3: API Integration and Data Rendering in React

## Objective
To consume a REST API in React and handle asynchronous data with loading and error states.

## Carried Forward from Practicals 1 & 2
- Built on top of the React Router single-page portfolio application.
- Uses `Projects.jsx` as the integration view.

## Key Additions
1. **Asynchronous Lifecycle (`useEffect`)**:
   - Fetches live repository data from the GitHub REST API (`https://api.github.com/users/<username>/repos`).
   - Dependency array `[]` ensures requests trigger strictly on component mount.
2. **Tri-State Management**:
   - `loading`: Displays an animated `<Spinner />` during network flight.
   - `error`: Catches network/HTTP errors and displays `<ErrorMessage />` with a retry trigger.
   - `data`: Renders cards when data resolves successfully.
3. **Supplementary Enhancements**:
   - Real-time search filter filtering repositories by title or description.
   - Stargazer count badge displayed on each repository card.
   - "Simulate API Error" toggle for testing and demonstrating error-handling viva criteria live.

## How to Run
1. Navigate to the project directory:
   ```bash
   cd Practical-03
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Navigate to the `/projects` page to observe the live API fetch in action.
