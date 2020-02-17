import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export default function Slide6() {

  const history = useHistory();

  useEffect(()=>{
    for(let i=0; i<1; i++){
      let audio = new Audio('thx.mp3');
      audio.play();
    }
  }, []);

  return(
    <center>
      <div className="list-slide-main-container" onClick={()=>history.push(`/slide7`)}>
        <img className="slide-logo" src="illume-logo180.png" alt="Illume Logo" />
            <span className="slide-heading">challenges</span>
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