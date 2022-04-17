# Todo App

The Todo App is to maintain your todo list.

## Application consists of 3 directories 

1. todo-frontend - front end of the application
2. todo-backend - back end of the application
3. todo-commons - shared resources for both todo-frontend and todo-backend

## To Run the application



1. Navigate to todo-commons directory and ,
    
    1. Do "npm install"
    2. do "npm run build"

2. Navigate to todo-backend directory and ,

    1. Do "npm install"
    2. do "npm run start"

    then your backend api will serve on "http://localhost:4000/"

3. Navigate to todo-frontend directory and ,

    1. Do "npm install"
    2. do "npm run start"

    then your frontend application will serve on "http://localhost:3000/"


## To Run the tests

1. To run frontend tests and get the coverage report navigate to todo-frontend directory and

    1. Do "npm run coverage"
    2. coverage directory will be generated inside the todo-frontend directory
    3. Open index.html file in your browser to see the code coverage results