import React from 'react';
import Nav from '../Nav/Nav';
import { useHistory } from 'react-router-dom';


export default function AdminHelpAbout() {
    
    const history = useHistory();
    
    // Return to admin home page
    const pushHistoryBack = () => history.push('/admin');
  
    return (
      <center>
        <Nav />
        <div className="main-container">
            <div className="top-card-container">
                <button className="close-window-button" onClick={pushHistoryBack}>x</button>
                <h1 className="main-heading admin-industry-heading">Help</h1> 
                    <h2>Creating an Admin</h2>
                        <p>To create an admin, first make sure the user has already registered an account.
                            Once they have an account, an admin must go to 'Edit User Information' and click 
                            'Edit Info' in the user's row. In the last drop down option, 'User Type', switch
                            the user from 'user' to 'admin'. Next time they log in, they will have full admin access.
                        </p>
            </div>
        </div>
      </center>
    );
  }