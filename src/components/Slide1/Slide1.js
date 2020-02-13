import React from 'react';

export default function Slide1() {

  return(
    <center>
      <div className="slide-main-container">

        <div className="slide-heading-container">
          <img className="slide-logo" src="" alt="Illume Logo" />
          <h1 className="slide-heading">TEAM ILLUME</h1>
        </div>

        <div className="slide-img-container">
          <div className="slide-img-single">
            <img src="" alt="Harrison Nguyen" />
            <p className="slide-name">Harrison Nguyen</p>
          </div>
          <div className="slide-img-single">
            <img src="" alt="Awren Nuit" />
            <p className="slide-name">Awren Nuit</p>
          </div>
          <div className="slide-img-single">
            <img src="" alt="Phillip Berg" />
            <p className="slide-name">Phillip Berg</p>
          </div>
          <div className="slide-img-single">
            <img src="" alt="Courtney Olesee" />
            <p className="slide-name">Courtney Olesee</p>
          </div>
        </div>
        
      </div>
    </center>
  );
}