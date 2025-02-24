Login Authentication with Vanilla JavaScript
A single-page application (SPA) built with vanilla JavaScript that implements user authentication and routing functionalities.

Features
Client-side routing without page refreshes
User authentication using JWT tokens
Protected routes
Modular component-based architecture
Dynamic page loading
Modern UI with CSS animations


Project Structure:

![image](https://github.com/user-attachments/assets/001cb841-4f57-4d48-af6c-63455b67edd7)







Getting Started

Install dependencies:
npm install

Start the development server:
node server.js

Open your browser and navigate to:
http://localhost:8080

Authentication
The application uses dummyjson.com as a mock authentication service. Login credentials are validated through their API, and the response includes a JWT token that's stored in the session storage.

Components
Auth: Handles user authentication
Home: Displays the authenticated user's dashboard
Router: Manages SPA navigation
User: Handles user data and JWT token management
Routes
/: Login page
/home: User dashboard
/test: Test page
/logout: Logout functionality
Technologies
Vanilla JavaScript (ES6+)
CSS3
HTML5
Connect (for development server)
JWT for authenticatio
