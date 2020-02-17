import React from 'react';
import './Slide1.css';
import { useHistory } from 'react-router-dom';

export default function Slide1() {

  const history = useHistory();

  return(
    <center>
      <div className="slide-main-container" onClick={()=>history.push(`/slide2`)}>

        <div className="slide-heading-container">
        <img className="slide-logo" src="illume-logo180.png" alt="Illume Logo" />
          <span className="slide-heading">team illume</span>
        </div>

        <div className="slide-img-name-container">
          <img className="slide-img img-1" src="harrison.jpg" alt="Harrison Nguyen" />
            <div className="slide-name n1">Harrison Nguyen</div>
          <img className="slide-img img-2" src="awren.jpg" alt="Awren Nuit" />
            <div className="slide-name n2">Awren Nuit</div>
          <img className="slide-img img-3" src="phillip.jpg" alt="Phillip Berg" />
            <div className="slide-name n3">Phillip Berg</div>
          <img className="slide-img img-4" src="Courtney.jpg" alt="Courtney Olesee" />
            <div className="slide-name n4">Courtney Olesee</div>
        </div>

      </div>
    </center>
  );
}