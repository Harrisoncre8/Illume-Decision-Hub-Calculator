import React from 'react';
import './Footer.css';

export default function Footer() {

  return(
    <>
      <div className="whitespace"></div>
      <footer className="footer-main-container">
        <img className="footer-logo" src="illume-logo180.png" alt="illume logo" />
        <span className="footer-brand-name">illume decision hub</span>
        <span>
          <a href="https://illume-pricing.com/" />
        </span>
      </footer>
    </>
  );
}