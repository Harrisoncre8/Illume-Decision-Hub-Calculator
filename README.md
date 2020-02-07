# Illume Decision Hub Calculator
Group Project for Prime Digital Academy 

Client: Illume Pricing

Group: Harrison Nguyen, Phillip Berg, Courtney Olesee, and Awren Nuit


_Duration: 2 week sprint_
***currently in progress***

The application is designed to help small business owners generate more profits. Using conversational language through a “choose your own adventure” format, clients will be prompted to enter their financial information to create predictive calculations based on business decisions they can make around product pricing, operating costs, and total revenue. This will help clients better understand how changes in their decision-making and pricing could affect their future profitability.

## Screen Shots

## Installation 
> npm install 

> npm run client

>npm run server

## Usagages 
- User:
    - Must register for login
    - Able to edit their information
    - 3 Calculator Stepper (converstaional questionaires) options (Break Even, Profit Lever, Price Setting)
        - each calculator keeps user inputted data in state to output in 'results' page where user can continue to edit inputted numbers to dynamically view results 
        - Results suggest changes in user financial decisions to positively impact business
- Admin:
    - Must be created by another Admin
    - Able to edit each calculator's question, subquestion, and tool tip text
    - Able to edit all user information, toggle users between Admin/User, change users' passwords for reset
    - Able to edit industry margins and add new industries
    - Can use all tool functionality of regular user

## Built With
- React
- Axios, PG, Node, Express
- PostgresSQL

## Challenges
- Git branching with multiple users
    - Solved by having multi-phase testing so that each contributor has branches tested by another user before being able to create pull request. This way we rarely (if ever) had any broken code in master. First, the creator tested their own code and solved any master conflicts. Then, another contributor tested that branch. Then the creator of the code created a new pull request which was checked by another contributor before merging to the master branch. 
- Database construction 

## Stretch Goals
- Admin ability to change order of questions 
