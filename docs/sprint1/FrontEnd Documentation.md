# frontend documentation
Let the home directory in this documentation be ./frontend
Here is a list of files in the ./frontend folder and their respective usage.

## ./index.html
This main HTML file lets the browser recognize and render the web page.

##./package.json
This file is used to record all the information about the frontend, including the name, version and dependencies. 

##./postcss.config.cjs
This is the default configuration file for postcss.

##./tailwind.config.cjs
This is the default configuration file for tailwindcss we used to style the web page, and we specify our own rules about some stylings.
##./src/assets
This folder stores the assets of the website, including the logos we used on our page.
## ./src/app/store.ts
This file stores the states about the user’s data and other state variables that are needed to manage the user login/register operations by using React-Redux.
## ./src/components/Dashboard.tsx
This is used to render the welcome page with “Welcome back” and the user's name after the user login.
## ./src/components/Login.tsx
This is used to render the login page with a form for the user to enter and sends/receive the information to the backend using the backend’s APIs.
## ./src/components/Nav.tsx
This is used to render the navigation bar applied at the top of every webpage.
## ./src/components/Register.tsx
This is used to render the register page with a different form for the first-time user to sign up.
## ./src/feature/auth/authService.ts
This file defines the login and register functions to send the post request by using Axios when users require login or register operations.
## ./src/feature/auth/authSlice.ts
This file creates the state variables specified with different data type required when the user login or register. Also, this file handles the different behaviours when a user login or register.