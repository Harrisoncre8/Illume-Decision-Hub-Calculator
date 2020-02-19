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
                    <h2>Creating an Admin</h2><br/>
                        <p>
                            To create an admin, first make sure the user has already registered an account.
                            Once they have an account, an admin can go to 'Edit User Information' and click 
                            'Edit Info' in the user's row. In the last drop down option, 'User Type', switch
                            the user from 'user' to 'admin'. Next time they log in, they will have full admin access.
                        </p>
                        <br/>
                        <br/>
                    <h2>Edit Calculator Text</h2><br/>
                        <p>
                            In the Admin Navigation Bar (Home Page), click 'Edit Calculators', and choose the calculator 
                            that has the text you would like to edit. Scroll to see the descriptive headings of each. The 
                            question text is what appears before each input, the tool tip is what appears when the question
                            mark is hovered over. Edit each as you would like and hit save. The text will update immediately.
                        </p>
                        <br/>
                        <br/>
                    <h2>User Profile Changes</h2><br/>
                        <p>
                            In the Admin Navigation Bar (Home Page), click 'Edit User Information.' Each row in the user table
                            contains contact information for each client. Clicking 'Edit Info' brings up all of their information. 
                            Here, admins can edit any of the client information. Leaving the 'password' and 'confirm password'
                            inputs blank will leave the user's password as-is. Typing in a new password will change their password for
                            them upon next login. The drop downs on the bottom allow the admin to change the industry associated with 
                            the user, and the user type (to create an admin). Users are able to edit any of their information themselves,
                            other than user type. 
                        </p>
                        <br/>
                        <br/>
                    <h2>Industry Changes</h2><br/>
                        <p>
                            In the Admin Navigation Bar (Home Page), click 'Edit Industries.' Each row in the industry table contains
                            the name, gross margin, and operating margin (all editable via 'Edit Info'). Clicking 'disable' on any 
                            industry row will disable that industry. A disabled industry no longer appears in the options list for users
                            If a user with a disabled industry logs in, they are prompted to choose a new industry before being 
                            able to use the application. Alternatively, admins can edit individual user's industries in the 'Edit User 
                            Information' tab. 
                        </p>
            </div>
        </div>
      </center>
    );
  }