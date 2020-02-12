import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

export default function NotFound() {

    return(
    <center>
      <div className="nf-container">
        <h1>Oops! This page does not exist!</h1>
        <div className="nf-moon"><span className="nf-moon-text">404</span></div>
        <Link to="/">
          <div className="nf-logo-div">
            <img className="nf-logo" src="illume-logo180.png" alt="illume pricing logo" />
          </div>
          <h1 className="main-heading nf-heading">Illume Decision Hub Home</h1>
        </Link>
      </div>
    </center>
  );
}
