import React from 'react';
import { useHistory } from 'react-router-dom';

const history = useHistory();

export default function Slide4() {
  return(
    <div className="list-slide-main-container" onClick={()=>history.push(`/slide5`)}>
      <h1 className="list-slide-heading">Challenges</h1>
      <ul>
        <li>Unreadable speadsheets</li>
        <li>Financial jargon</li>
        <li>Unknown factors</li>
        <li>Gender pay gap</li>
        <li>Translating information</li>
      </ul>
    </div>
  );
}