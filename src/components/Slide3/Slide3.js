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
          <img className="slide3-img3-s img-1" src="susan.jpeg" alt="Susan Heinlein" />
            <div className="slide3-name-s n1">Susan Heinlein</div>
          <img className="slide3-img3-j img-2" src="jenny.jpg" alt="Jenny Niemela" />
            <div className="slide3-name-j n2">Jenny Niemela</div>
        </div>

        <div className="slide3-img-name-container-team">
          <img className="slide-img3 img-1" src="harrison.jpg" alt="Harrison Nguyen" />
            <div className="slide-name n1">Harrison Nguyen</div>
          <img className="slide-img3 img-2" src="awren.jpg" alt="Awren Nuit" />
            <div className="slide-name n2">Awren Nuit</div>
            <img className="slide-img3 img-3" src="Courtney.jpg" alt="Courtney Olesee" />
            <div className="slide-name n3">Courtney Olesee</div>
          <img className="slide-img3 img-4" src="phillip.jpg" alt="Phillip Berg" />
            <div className="slide-name n4">Phillip Berg</div>
        </div>

      </div>
    </center>
  );
}