# Installation
To run frontend go to frontend directoy and type:

```sh
npm install
npm run dev
```

The terminal will tell you the port number, the default port number is 3000. To access frontend, go to browser and enter the base url:
```
localhost:3000
```
# List of components
## App - decides what pages to display
import App from './App'
| Name        | Type   | Default | Description                        |
| ----------- | ------ | ------- | ---------------------------------- |
| currState| String || current state of user  to send to backend   |
|isLogin|boolean||state of user login or not|
|isLoading|boolean||state of the user loading or not|
|mainPage|elementType||base on state, render the correct page|

## Nav - display a nav bar
import Nav from "./components/Nav";
| Name        | Type   | Default | Description                        |
| ----------- | ------ | ------- | ---------------------------------- |
| user| Object |         | User object get from current state  |
|isLogin|boolean||whether user is logged in|
## Login - login user
import Login from "./components/Login";
| Name        | Type   | Default | Description                        |
| ----------- | ------ | ------- | ---------------------------------- |
| username          | String |         | username of user  to send to backend   |
| password | String |         | password of user to send to send to backend |
| user        | Object |         | User object get from current state |
|handleSubmit| function||handler form submission|
## Register - register user
import Register from "./components/Register";
| Name        | Type   | Default | Description                        |
| ----------- | ------ | ------- | ---------------------------------- |
| username| String || username of user  to send to backend   |
|email|string||stores email entered by the form|
| password|String|| password of user to send to send to backend |
| confirmPassword|String|| confirms password entered to send to backend |
| user        | Object || User object get from current state |
|handleSubmit| function||handler form submission|
## Dashboard - display main page after log in
import Dashboard from "./components/Dashboard";
| Name        | Type   | Default | Description                        |
| ----------- | ------ | ------- | ---------------------------------- |
|Welcome|function||display welcome message to current user|
|Dashboard|function||display dashboard to current user|
| user| Object || User object get from current state |
| isPosted|boolean|| whether the current user's state is posted |


## Profile - display/edit current profile
import Profile from "./components/Dashboard";
| Name        | Type   | Default | Description                        |
| ----------- | ------ | ------- | ---------------------------------- |
| username| String || username of user  to send to backend   |
|email|string||stores email entered by the form|
| password|String|| password of user to send to send to backend |
| confirmPassword|String|| confirms password entered to send to backend |
| user        | Object || User object get from current state |
|handleChangeInfo| function||handler form submission for editing profile|
## Question - represent each question
import Question from './question';

| Name        | Type   | Default | Description                        |
| ----------- | ------ | ------- | ---------------------------------- |
| id          | String |         | _id of user get from questions     |
| question_id | String |         | _id of question get from questions |
| user        | Object |         | User object get from current state |

## NewQuestion
import NewQuestion from "./NewQuestion";
| Name        | Type   | Default | Description                        |
| ----------- | ------ | ------- | ---------------------------------- |
|title|string||title of new question|
|body|string||body of the new question|
|bounty|string||bounty of the new question|
| user        | Object || User object get from current state |
|handleSubmit| function||handle question form submission|

## Questions - represent all questions
import ContentList from './questions';

| Name      | Type   | Default  | Description                                         |
| --------- | ------ | -------- | --------------------------------------------------- |
| Questions | Const  |          | State questions that aggregates individual question |
| User      | Object |          | User object get from current state                  |
| id        | String | User._id | Got from question._id of current accepted question  |


## SearchBar - handle search and return back questions
import SearchResults from './search';

| Name          | Type   | Default | Description                            |
| ------------- | ------ | ------- | -------------------------------------- |
| searchValues  | string  |         | the input value from user for a search |
| searchResults | string  |         | the returned questions after a search  |
|presetValues|string[]||a list of string containing the list of categories|
| user          | Object |         | User object get from current state     |

## SideBar - display a side bar
import Sidebar from "./Sidebar";
| Name        | Type   | Default | Description                        |
| ----------- | ------ | ------- | ---------------------------------- |
| activeId          | String |         | id of which side bar is active |


