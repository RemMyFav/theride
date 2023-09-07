# BackEnd Documentation
For this project we used MERN stack, which we used mongoDB as our database, express and node.js enviroment.

## backend/server.js
This is the main file of the backend, it conenct with our mongoDB database and APIs. 
To start the server run "npm run dev" in the backend directory, make sure to install following modules: bcryptjs, colors, cookie-parser, cors, dotenv, express, express-async-handler, jsonwebtoken, and mongoose.

## backend/config/db.js
This file is used to set up a connection with mongoDB, basically open a port and display the status of current server.

## backend/controllers/
### /profileControllers.js
This fucntion contains all the functions that are used to handel profile requests, it should be imported into the userRoutes.js file, which is the concreate implement of each profile api call.
such as create a profile, delete a profile...
### /userControllers.js
This fucntion contains all the functions that are used to handel user account requests, it should be imported into the userRoutes.js file, which is the concreate implement of each user account api call, such as create an account, delete an account...
### /questionControllers.js
This fucntion contains all the functions that are used to handel question requests, it should be imported into the questionRoutes.js file, which is the concreate implement of each question api call, such as create a question, delete a question...

## backend/middleware/
### /errorHandler.js
This is an replacement of javascript default error message, it provides much more details about error.

## backend/routers/
### /profileRouters.js
This file contains all profile apis, with this file you can see what apis are provided for profile feature without know how it's implemented. It should be imported from server.js.

### /userRouters.js
This file contains all user apis, with this file you can see what apis are provided for user feature without know how it's implemented. It should be imported from server.js.

### /questionRouters.js
This file contains all question apis, with this file you can see what apis are provided for question feature without know how it's implemented. It should be imported from server.js.

## backend/structure/
### /profileStructure.js
This file describe the mongo schema for profile, it tells the structure of a profile needed to be stored in database
### /userStructure.js
This file describe the mongo schema for user, it tells the structure of a user needed to be stored in database
### /questionStructure.js
This file describe the mongo schema for question, it tells the structure of a question needed to be stored in database