import React from 'react';
import './Footer.css';

export default function Footer() {

  const date = new Date().getFullYear();
  return(
    <>
      <div className="whitespace"></div>
      <footer className="footer-main-container">
        <img className="footer-logo" src="illume-logo180.png" alt="illume logo" />
        <span className="footer-brand-name">illume decision hub</span>
        <div className="footer-span-container">
          <span className="footer-a-span">
            &copy; {date} &nbsp;
            <a className="footer-a" href="https://illume-pricing.com/">Illume Pricing</a>
          </span>
        </div>
      </footer>
    </>
  );
}