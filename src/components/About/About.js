import React from 'react';
import Nav from '../Nav/Nav';
import './About.css';

export default function About(){
  return(
    <center>
      <Nav />
       <div className="main-container">
          <div className="top-card-container">

            <div className="slide-heading-container">
              <img className="slide-logo" src="illume-logo180.png" alt="Illume Logo" />
              <span className="slide-heading">illume Decision Hub</span>
            </div>

            <div className="info-container">
              <div className="slide">
                Jenny and Susan are business owners with a passion 
                for helping other business owners fulfill their potential. 
                Their biggest goal is helping their clients to work less and earn more.
              </div>
            </div>

            <div className="slide-img-name-container">
              <img className="slide-img img-2" src="susan.jpeg" alt="Susan Heinlein" />
              <div className="slide-name n2">Susan Heinlein</div>
              <img className="slide-img img-3" src="jenny.jpg" alt="Phillip Berg" />
              <div className="slide-name n3">Jenny Niemala</div>
            </div>

            <div className="heading">
              The Challenge
            </div>

            <ul className="list-ul">
              <li className="list-li">
                To help small to midsize business owners understand how changes 
                in their financial decision-making could affect their future profitability.
              </li> 
              <li className="list-li">
                Currently, Jenny and Susan see many of their clients suffer through barriers to 
                making these informed decisions. Their clients are limited by convoluted financial 
                jargon, feeling overworked and underpaid, and having a lack of clear information.
              </li>
              <li className="list-li">
                They see women business owners paying themselves less than men who own businesses, 
                clients burning themselves out with a lack of work life balance, and an overall lack 
                of confidence in making financial change. 
              </li>
              <li className="list-li">
                Jenny and Susan took on the challenge of simplifying the process by formulating 
                a dynamic tool to help clients make these educated business decisions, so that both 
                they and their clients could work less and earn more.
              </li>
            </ul>

            <div className="heading">
              The Solution
            </div>
            
            <ul className="list-ul">
              <li className="list-li">
                The Illume Decision Hub addresses the challenge of handling unreadable spreadsheets by dynamically 
                collecting data that the user types in and uses it throughout their financial 
                calculation process.
              </li> 
              <li className="list-li">
                Using conversational language in tandem with help text, the application 
                is able to translate financial jargon into easy to understand language.
              </li>
              <li className="list-li">
                The Illume Decision Hub also helps clients identify many unknown financial factors 
                such as indirect costs and increasing prices as a way to improve profits. 
              </li>
              <li className="list-li">
                On the results page, the application uses Predictive Calculations to translate 
                the user’s outputs into easy to understand call to actions. 
              </li>
              <li className="list-li">
                Along with solving the listed challenges, the Illume Decision Hub helps users 
                generate new Profit Opportunities that they can further explore.  
              </li>
            </ul>

            <div className="info-container">
              <div className="last-heading">
                The Illume Decision Hub started as an idea to help people work less and earn more and we 
                hope it will become a tool that encourages you to understand the worth of your 
                time, effort, and product.
              </div>
            </div>

          </div>
        </div>
    </center>
  )
}