import React from 'react';
import { useHistory } from 'react-router-dom';

const history = useHistory();

export default function Slide4() {
  return(
    <div className="list-slide-main-container">
      <h1 className="list-slide-heading">Targets</h1>
      <ul>
        <li>Woman-owned small businesses</li>
        <li>Conversational language</li>
        <li>Increasing overall finances</li>
      </ul>
    </div>
  );
}