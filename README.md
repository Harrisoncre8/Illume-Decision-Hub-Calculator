# Illume Decision Hub
Group Project for Prime Digital Academy 

Client: Illume Pricing

Group: Phillip Berg, Harrison Nguyen, Awren Nuit, and Courtney Olesee

Duration: 2 week sprint

The application is designed to help small business owners generate more profits. Using conversational language through a “choose your own adventure” format, clients will be prompted to enter their financial information to create predictive calculations based on business decisions they can make around product pricing, operating costs, and total revenue. This will help clients better understand how changes in their decision-making and pricing could affect their future profitability.

[Find the app deployed here](https://illume-decision-hub.herokuapp.com/).

## Screen Shots

![Register Page](public/ScreenShots/register.png=100)
<img src=public/ScreenShots/register.png width="100" />


![Stepper Example](public/ScreenShots/stepper.png=100)


![User Options](public/ScreenShots/useroptions.png=100)


![Results Page](public/ScreenShots/resultspage.png=100)


## Installation
> npm install 

> npm run client

> npm run server

## Usage 
- User:
    - Must register for login
    - Able to edit their information
    - 3 Calculator Stepper (conversational questionnaires) options (Break Even, Price Setting, Profit Lever)
        - Each calculator keeps user inputted data in state to output in 'results' page where user can continue to edit inputted numbers to dynamically view results 
        - Results suggest changes in user financial decisions to positively impact business
        - Users are able to turn calculators on/off to take ones that aren't relevant to their business out of their navigation bar
- Admin:
    - Must be created by another Admin
    - Able to edit each calculator's question, sub-question, and tool tip text
    - Able to edit all user information, toggle users between Admin/User, change users' passwords for reset
    - Able to edit industry margins and add new industries
    - Can use all tool functionality of regular user

## Built With
- React (React Awesome Modal)
- Axios
- Node (nodemon)
- Express
- PostgresSQL
- CSS
- Bycrpyt
- Passport
- Redux (logger, sagas)

## Challenges
- Git branching and merging with multiple users
    - Solved by having multi-phase testing so that each contributor has branches tested by another user before being able to create pull request. This way we rarely (if ever) had any broken code in master. First, the creator tested their own code and solved any master conflicts. Then, another contributor tested that branch. Then the creator of the code created a new pull request which was checked by another contributor before merging to the master branch. 
- Database construction 
    - To achieve the step through format of the calculator inputs, the database contains a table with quesiton, calculator, and next ids so that the stepper routes can be set, and edited based on what kind of relevant costs the user has checked. 

## Stretch Goals
- Admin ability to change order of questions 
- An 'Explore More' option for users to the impact improvements could have on their costs or revenues.
    - For example, in the Profit Lever Calculator's results, a user could increase (toggle between dollars and percentage) the improvement results to see what the increase would do to their costs, prices, or revenue.