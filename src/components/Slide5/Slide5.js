import React from 'react';
import { useHistory } from 'react-router-dom';

const history = useHistory();

export default function Slide5() {
  return(
    <div className="list-slide-main-container" onClick={()=>history.push(`/`)}>
      <img className="slide-logo" src="illume-logo180.png" alt="Illume Logo" />
          <span className="slide-heading">illume decision hub</span>
      <ul>
        <li>Dynamic information gathering</li>
        <li>Conversational language</li>
        <li>Prompted consideration</li>
        <li>Profit Opportunities</li>
        <li>Productive calculations</li>

      </ul>
    </div>
  );
}