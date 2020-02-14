import React from 'react';
import { useHistory } from 'react-router-dom';

const history = useHistory();

export default function Slide5() {
  return(
    <div className="list-slide-main-container">
      <img className="slide-logo" src="illume-logo180.png" alt="Illume Logo" />
          <span className="slide-heading">illume decision hub</span>
      <ul>
        <li>Several financial tools</li>
        <li>Offers suggestions</li>
        <li></li>
      </ul>
    </div>
  );
}