import React from 'react';
import { useHistory } from 'react-router-dom';

export default function Slide7() {

  const history = useHistory();

  return(
    <center>
      <div className="list-slide-main-container" onClick={()=>history.push(`/slide3`)}>
        <img className="slide-logo" src="illume-logo180.png" alt="Illume Logo" />
            <span className="slide-heading">illume decision hub</span>
        <ul className="list2-ul">
          <li className="list-li">Dynamic information gathering</li>
          <li className="list-li">Conversational language</li>
          <li className="list-li">Prompted consideration</li>
          <li className="list-li">Profit opportunities</li>
          <li className="list-li">Predictive calculations</li>
        </ul>
      </div>
    </center>
  );
}