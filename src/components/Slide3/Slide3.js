import React from 'react';
import '../Slide1/Slide1.css';
import { useHistory } from 'react-router-dom';

export default function Slide1() {

  return(
    <center>
      <div className="slide-main-container">

        <div className="slide-heading-container">
        <img className="slide-logo" src="illume-logo180.png" alt="Illume Logo" />
          <span className="slide-heading">TEAM ILLUME</span>
        </div>

        <div className="slide-img-name-container">
          <img className="slide-img img-1" src="https://avatars1.githubusercontent.com/u/52988745?s=460&v=4" alt="Harrison Nguyen" />
            <div className="slide-name n1">Harrison Nguyen</div>
          <img className="slide-img img-2" src="https://avatars2.githubusercontent.com/u/54560441?s=460&v=4" alt="Awren Nuit" />
            <div className="slide-name n2">Awren Nuit</div>
          <img className="slide-img img-3" src="https://avatars1.githubusercontent.com/u/44420714?s=460&v=4" alt="Phillip Berg" />
            <div className="slide-name n3">Phillip Berg</div>
          <img className="slide-img img-4" src="https://avatars0.githubusercontent.com/u/55601904?s=460&v=4" alt="Courtney Olesee" />
            <div className="slide-name n4">Courtney Olesee</div>
        </div>

      </div>
    </center>
  );
}