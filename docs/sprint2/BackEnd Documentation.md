# BackEnd Documentation
For this project we used MERN stack, which we used mongoDB as our database, express and node.js enviroment.

## backend/server.js
This is the main file of the backend, it conenct with our mongoDB database and APIs. 
To start the server run "npm run dev" in the backend directory, make sure to install following modules: bcryptjs, colors, cookie-parser, cors, dotenv, express, express-async-handler, jsonwebtoken, and mongoose....

## backend/config/
### /db.js
This file is used to set up a connection with mongoDB, basically open a port and display the status of current server.

### /passport.js
This file is used to set up passport handler function, whenever passport Google Oauth is invoked, specific action will take placed based on this function.

## backend/controllers/
### /profileControllers.js
This fucntion contains all the functions that are used to handel profile requests, it should be imported into the userRoutes.js file, which is the concreate implement of each profile api call.
such as create a profile, delete a profile...

#### setProfile API
Purpose: setUp Profile for user\
URL: POST http//localhot:3000/api/setProfile\
Req: username, id {"username": "???", "id": "???"} \
Res: ProfileObject or Error\
Status:\
200 Succeed\
400 If req field is missing or Profile can't be created

#### getProfile API
Purpose: setUp Profile for user\
URL: GET http//localhot:3000/api/getProfile\
Req: username, id {"username": "???", "id": "???"} \
Res: ProfileObject or Error\
Status:\
200 Succeed\
400 If req field is missing\
404 Profile can't be found

#### deleteProfile API
Purpose: Delete Profile for user\
URL: DELETE http//localhot:3000/api/:id\
Req: param.id\
Res: ProfileObject or Error\
Status:\
200 Succeed\
400 If req field is missing\
404 Profile can't be found

#### updateProfile
Purpose: update Profile for user\
URL: DELETE http//localhot:3000/api/:id/:name\
Req: param.id, param.name\
Res: ProfileObject or Error\
Status:\
200 Succeed\
400 If req field is missing\
404 Profile can't be found

### /userControllers.js
This fucntion contains all the functions that are used to handel user account requests, it should be imported into the userRoutes.js file, which is the concreate implement of each user account api call, such as create an account, delete an account...
#### registerUser API
Purpose: register user with username, password, email\
URL: POST http//localhot:3000/api/user\
Req: username, password, email {"username": "???", "password": "???", "email": "???"}\
Res: UserObject or Error\
Status: \
200 Succeed/
400 If req field is missing or User can't be created\
404 User already exist

#### loginUser API
Purpose: Login user with correct username and password\
URL: POST http//localhot:3000/api/user/login\
Req: username, password {"username": "???", "password": "???"}\
Res: UserObject or Error\
Status:\
200 Succeed\
400 If req field is missing or User can't log in\
401 Password is incorrect\
404 User does not exist

#### getAllUser API
Purpose: Return all users in our database\
URL: GET http//localhot:3000/api/user\
Req: N/A\
Res: UserObject or Error\
Status:\
200 Succeed

#### getToken API
Purpose: Get current cookie token that stores user id\
URL: GET http//localhot:3000/api/user/getToken\
Req: N/A\
Res: UserObject or Error\
Status:\
200 Succeed\
401 Not Authorized\
404 User not found

#### changeUserInfo API
Purpose: Users can change their personal infomation\
URL:  PATCH http//localhot:3000/api/user/changePassword\
Req: id, password, username, email  {"id": "???", "username": "???", "password": "???", "email": "???"}\
Res: UserObject or Error\
Status:\
200 Succeed\
400 If req field is missing or User can't change info\
401 Password is incorrect\
404 Check if user has password field

#### getUser API
Purpose: get a specific user based on the given id\
URL:  PATCH http//localhot:3000/api/user/:id\
Req: param.id\
Res: UserObject or Error\
Status:\
200 Succeed\
404 User not found

#### logOut API
Purpose: Logout user by clean it's cache\
URL:  POST http//localhot:3000/api/user/logout\
Req: N/A\
Res: Message or Error\
Status:\
201 Succeed\
400 Fail to logout

### /questionControllers.js
This fucntion contains all the functions that are used to handel question requests, it should be imported into the questionRoutes.js file, which is the concreate implement of each question api call, such as create a question, delete a question...

### /currencyControllers.js
his fucntion contains all the functions that are used to handel currency requests, it should be imported into the currencyRoutes.js file, which is the concreate implement of each currency api call, such as create a currency, add currency...

#### setCurrency API
Purpose: Setup a user's currency\
URL:  POST http//localhot:3000/api/currency\
Req: id {"id": "???"}\
Res: CurrencyObject or Error\
Status:\
200 Succeed\
400 Fail to create currency

#### getCurrency API
Purpose: get a user's currency\
URL:  POST http//localhot:3000/api/currency/:userID\
Req: param.userID\
Res: CurrencyObject or Error\
Status:\
200 Succeed\
404 Can not found Currency

#### addCurrency API
Purpose: add money to account\
URL:  PATCH http//localhot:3000/api/currency/add/:userID\
Req: param.userID, amount\
Res: CurrencyObject or Error\
Status:\
200 Succeed\
404 Can not found Currency

#### subtractCurrency
Purpose: subtract money from account\
URL:  PATCH http//localhot:3000/api/currency/subtract/:userID\
Req: param.userID, amount\
Res: CurrencyObject or Error\
Status:\
200 Succeed\
404 Can not found Currency

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

### /currencyRouters.js
This file contains all currency apis, with this file you can see what apis are provided for currency feature without know how it's implemented. It should be imported from server.js.

### /googleRouters.js
This file contains all google apis, with this file you can see what apis are provided for google feature without know how it's implemented. It should be imported from server.js.

## backend/structure/
### /profileStructure.js
This file describe the mongo schema for profile, it tells the structure of a profile needed to be stored in database
### /userStructure.js
This file describe the mongo schema for user, it tells the structure of a user needed to be stored in database
### /questionStructure.js
This file describe the mongo schema for question, it tells the structure of a question needed to be stored in database
### /currencyStructure.js
This file describe the mongo schema for currency, it tells the structure of a question needed to be stored in database
