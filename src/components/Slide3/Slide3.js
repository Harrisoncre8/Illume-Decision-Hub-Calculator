import React from 'react';
import './Slide3.css';

export default function Slide3() {

  return(
    <center>
      <div className="slide-main-container">

        <div className="slide-heading-container">
        <img className="slide3-logo" src="illume-logo180.png" alt="Illume Logo" />
          <span className="slide3-heading">team illume</span>
        </div>

        <div className="slide3-img-name-container-clients">
          <img className="slide3-img img-1" src="https://illume-pricing.com/wp-content/uploads/2019/07/Susan-outside-2.jpeg" alt="Susan Heinlein" />
            <div className="slide3-name n1">Susan Heinlein</div>
          <img className="slide3-img img-2" src="https://illume-pricing.com/wp-content/uploads/2019/07/Jenny-Niemela-1024x1024.jpg" alt="Jenny Niemela" />
            <div className="slide3-name n2">Jenny Niemela</div>
        </div>

        <div className="slide3-img-name-container-team">
          <img className="slide-img img-1" src="https://avatars1.githubusercontent.com/u/52988745?s=460&v=4" alt="Harrison Nguyen" />
            <div className="slide-name n1">Harrison Nguyen</div>
          <img className="slide-img img-2" src="https://avatars2.githubusercontent.com/u/54560441?s=460&v=4" alt="Awren Nuit" />
            <div className="slide-name n2">Awren Nuit</div>
            <img className="slide-img img-3" src="Courtney.jpg" alt="Courtney Olesee" />
            <div className="slide-name n3">Courtney Olesee</div>
          <img className="slide-img img-4" src="phillip.jpg" alt="Phillip Berg" />
            <div className="slide-name n4">Phillip Berg</div>
        </div>

      </div>
    </center>
  );
}