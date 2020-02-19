# Illume Decision Hub
Group Project for Prime Digital Academy 

Client: Illume Pricing, Jenny Niemela & Susan Heinlein

Group: Phillip Berg, Harrison Nguyen, Awren Nuit, and Courtney Olesee

Duration: 2 week sprint

The application is designed to help small business owners generate more profits. Using conversational language through a “choose your own adventure” format, clients will be prompted to enter their financial information to create predictive calculations based on business decisions they can make around product pricing, operating costs, and total revenue. This will help clients better understand how changes in their decision-making and pricing could affect their future profitability.

[Find the app deployed here](https://illume-decision-hub.herokuapp.com/).

## Screen Shots
User Registration Page <br/>
<img src=public/ScreenShots/register.png width="400" alt="Reigister Page"/>


Stepper Example <br/>
<img src=public/ScreenShots/stepper.png width="400" alt="Stepper Example"/>


User Options: able to to check relevant costs and toggle relevant calculators 
<img src=public/ScreenShots/useroptions.png width="400" alt="User Options"/> 


Profit Levers Calculator Results Page: able to continue to edit their inputs
<img src=public/ScreenShots/resultspage.png width="400" alt="Results Page"/>

## Installation
> npm install 

> npm run client

> npm run server

> go to http://localhost:3000/

## Usage 
- User:
    - Must register an account
    - Able to edit their information
    - 3 Calculator Stepper (conversational questionnaires) options (Break Even, Price Setting, Profit Lever)
        - Each calculator keeps data that the user inputs in state to output in 'result' page where user can continue to edit inputted numbers to dynamically view results 
        - Result suggests changes in user's financial decisions to positively impact business
        - Users are able to turn calculators on/off to take ones that aren't relevant to their business out of their navigation bar
        - 'Explore More' in the Profit Lever allows users to increase (toggle between dollars and percentage) the improvement results to see what the increase would do to their costs, prices, or revenue.

- Admin:
    - Must be created by another Admin
    - Able to edit each calculator's question, sub-question, and tooltip text
    - Able to edit all user information, toggle users between Admin/User, change users' passwords for reset
    - Able to edit industry margins and add new industries
    - Can use all tool functionality of regular user

## Built With
- React (React Awesome Modal)
- Axios
- Node.js (nodemon)
- Express.js
- PostgresSQL
- CSS
- Bcrypt
- Passport
- Redux (logger, saga)

## Challenges
- Git branching and merging with multiple contributors
    - Solved by having multi-phase testing so that each contributor has branches tested by another contributor before being able to create pull request. This kept broken code from being merged into the master branch. First, the creator tested their own code and resolved any conflicts. Next, another contributor tested that branch. Finally, the creator made a new pull request that was checked by another contributor before it was merged onto the master branch. 
- Database construction 
    - To achieve the step-through format of the calculator inputs, the database contains a table with question, calculator, and next ids so that the stepper routes can be set and edited based on what kind of relevant costs the user has checked. 

## Future Plans
- Admin ability to change order of questions 
- User ability to add another labor rate with a description field