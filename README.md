# finalprojectw23-theride
# The Ride - a safe, decentralized, and transparent tutoring platform

TheRide is an online platform that helps university students to find immediate aid for their homeworks and assignments. It is safe, decentralized and transparent. Students can post their questions on the platform with a “bounty”, which means whoever can solve the question will be rewarded with a certain amount of money offered by the student. We believe with this system, the responses students receive would be more helpful. 


# What problem(s) does it solve?

Currently, if students encounter obstacles regarding homework and assignments, they would usually ask on Piazza or attend office hours. However, these tools might not be as effective as they seem. Piazza responses are usually short, and sometimes there are unhelpful responses such as “Check the textbook”. Office hours are usually more effective than Piazza, but they have specific time slots assigned to them, and thus the help is not immediate. 

# Academic Offence?

Regarding the concern of potential academic offenses and plagiarism, we have a backend database that holds all user information. Under necessary circumstances, we will be able to share our information with the university to penalize the suspects. 

# How to install

## Backend

Currently, we are on the set up phase, so far to run our backend simply go to our home directory 
First you need to install npm in the home directory, run command:

```sh
brew i npm
```

Then use npm to install following packs `express, mongoose, nodemon, express-async-handler and dot env`

```sh
npm i express mongoose nodemon express-async-handler dotenv bcrypt jsonwebtoken
npm install --save redux

```

then type the following command into terminal
 
```npm run server```

then the terminal will tells you about connection status to mongo and url. In the future phase, we are planning to implement a docker in our project so that the installation is going to be easy.

## Frontend

To run frontend go to frontend directoy and type:

```sh
npm install
```

The terminal will tell you the port number

# Contribution Process: describe the process for contributing to your project.

We use git flow to control and monitor the development of our project. 
We name our primary branch: main, this is the actual product.
We name our development branch: dev, this is where our feature branches merge into.
We name our feature branch: [feature], these are the branches to develop our user stories.
We name our tasks branch: [feature]-[task] to branch from the , these are the branches to implement the individual task for that user stories.


# If you discover any issues/bugs
Please submit a github issue in the repository, with title and description of the bugs you found.


We would either meet online or in person and talk about our ideas. Before we decided on our project idea, everyone came up with their own idea and pitched it to the team. We then all voted on a survey and decided on the project idea. 

For sprint 0, everyone got together and decided major directions of the project, such as user interface, software etc. We then went through each requirement for sprint 0 and split up the work among everyone. There are some mds where everyone wrote together.
