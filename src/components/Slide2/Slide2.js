import React from 'react';
import './Slide2.css';

export default function Slide2() {

  return(
    <center>
      <div className="slide-main-container">

        <div className="slide-heading-container">
          <img className="slide-logo" src="illume-logo180.png" alt="Illume Logo" />
          <span className="slide-heading">ILLUME PRICING</span>
        </div>

        <div className="slide2-img-name-container">
          <img className="slide2-img img-1" src="https://illume-pricing.com/wp-content/uploads/2019/07/Susan-outside-2.jpeg" alt="Susan Heinlein" />
            <div className="slide-name n1">Susan Heinlein</div>
          <img className="slide2-img img-2" src="https://illume-pricing.com/wp-content/uploads/2019/07/Jenny-Niemela-1024x1024.jpg" alt="Jenny Niemela" />
            <div className="slide-name n2">Jenny Niemela</div>
        </div>

      </div>
    </center>
  );
}