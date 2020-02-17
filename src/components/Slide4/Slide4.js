import React from 'react';
import { useHistory } from 'react-router-dom';
import './Slide4.css';

export default function Slide4() {
  
  const history = useHistory();

  return(
    <center>
      <div className="list-slide-main-container" onClick={()=>history.push(`/slide5`)}>
      <div className="slide-heading-container">
        <img className="slide-logo" src="illume-logo180.png" alt="Illume Logo" />
          <span className="slide-heading">challenges</span>
        </div>
        <ul className="list-ul">
          <li className="list-li">Unreadable spreadsheets</li>
          <li className="list-li">Financial jargon</li>
          <li className="list-li">Unknown factors</li>
          <li className="list-li">Translating information</li>
        </ul>

      </div>
    </center>
  );
}