import React, { useState, useCallback, useEffect } from 'react';
import './Register.css';
import Modal from 'react-awesome-modal';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

export default function Register() {

  const dispatch = useCallback(useDispatch());
  const history = useHistory();
  const disclaimer = useSelector(state => state.disclaimer);
  const error = useSelector(state => state.errors);
  const industryList = useSelector(state => state.industry);
  const [agreement, setAgreement] = useState(false);
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [industry, setIndustry] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [showPassword, setShowPassword] = useState('password');
  const [visible, setVisible] = useState(false);

  // Run on component mount
  useEffect(()=>{
    dispatch({type: `GET_DISCLAIMER`});
    dispatch({type: `GET_INDUSTRY`});
  }, [dispatch]);

  // Close modal popup
  const closeModal = () => setVisible(false);

  // Adds class if input has a value, removes the class if input has no value
  const checkForValue = e => e.target.value ? e.target.classList.add('text-field-active') : e.target.classList.remove('text-field-active');

  // Return to login page
  const handleCancel = () => history.push('/');

  // Open modal popup
  const openModal = () => setVisible(true);

  // Push history to new user page
  const pushHistoryToUser = () => history.push('/new-user');

  // Log new user information into database, push history to new user page
  const registerUser = e => {
    e.preventDefault();
    if(name && company && phone && industry && email && password && agreement) {
      dispatch({
        type: 'REGISTER',
        payload: {
          name: name,
          company: company,
          phone: phone,
          industry: industry,
          email: email,
          password: password,
        },
      });
      pushHistoryToUser();
    }
    else if(name && company && phone && industry && email && password) {
      dispatch({ type: `REGISTRATION_TOS_NOT_CHECKED` });
    }
    else {
      dispatch({ type: 'REGISTRATION_INPUT_ERROR' });
    }
  }

  // Show or hide password
  const togglePasswordView = () => showPassword === 'password' ? setShowPassword('text') : setShowPassword('password');

  return (
    <center>
      <div className="register-container">
        {error.registrationMessage && (
          <h2
            className="alert"
            role="alert"
          >
            {error.registrationMessage}
          </h2>
        )}

        <div>
          <img className="register-logo" src="illume-logo180.png" alt="illume logo" />
          <span className="register-brand-name">illume decision hub</span>
        </div>

        <form  onSubmit={registerUser}>
          <div className="text-field-container">
            <input
              className={`text-field ${this.state.textField}`}
              type="text"
              name="name"
              value={name}
              onChange={(e) => {
                          setName(e.target.value);
                          checkForValue(e);
                          }
                        }
            />
            <label className="text-field-label">name</label>
            <div className="text-field-mask register-mask-name"></div>
          </div>

          <div className="text-field-container">
            <input
              className={`text-field ${this.state.textField}`}
              type="text"
              name="company"
              value={company}
              onChange={(e) => {
                          setCompany(e.target.value);
                          checkForValue(e);
                          }
                        }
            />
            <label className="text-field-label">company</label>
            <div className="text-field-mask register-mask-company"></div>
          </div>

          <div className="text-field-container">
            <input
              className={`text-field ${this.state.textField}`}
              type="text"
              name="phone"
              value={phone}
              onChange={(e) => {
                          setPhone(e.target.value);
                          checkForValue(e);
                          }
                        }
            />
            <label className="text-field-label">phone #</label>
            <div className="text-field-mask register-mask-phone"></div>
          </div>

          <div className="text-field-container">
            <select
              className="dropdown register-dropdown"
              name="industry"
              value={industry}
              onChange={(e) => {
                          setIndustry(e.target.value);
                          checkForValue(e);
                          }
                        }
            >
              <option className="dropdown-option" value='' disabled>Select Industry</option>
              {industryList.map(industry =>
                <option 
                  className="dropdown-option" 
                  key={industry.id}
                  value={industry.id}
                >
                  {industry.industry}
                </option>
              )}
            </select>
          </div>

          <div className="text-field-container">
            <input
              className={`text-field ${this.state.textField}`}
              type="text"
              name="email"
              value={email}
              onChange={(e) => {
                          setEmail(e.target.value);
                          checkForValue(e);
                          }
                        }
            />
            <label className="text-field-label">email</label>
            <div className="text-field-mask register-mask-email"></div>
          </div>

          <div className="text-field-container">
            <input
              className="text-field"
              type={showPassword}
              onChange={(e) => {
                          setPassword(e.target.value);
                          checkForValue(e);
                          }
                        }
            />
            <label className="text-field-label">password</label>
            <div className="text-field-mask register-mask-password"></div>
            <span>
              <input type="checkbox" onClick={togglePasswordView} />
              <label> Show Password</label>
            </span>
          </div>

          <div className="register-tos-container">
            <input type="checkbox" onClick={()=>setAgreement(!agreement)} />
            <label> I agree to the <span className="tos" onClick={openModal}>Terms of Service</span></label>
          </div>

          <button className="normal-btn register-register-btn" type="submit">Confirm</button>
        </form>
        <hr className="register-hr" />

        <button className="register-cancel-btn" onClick={handleCancel}>cancel</button>

        <Modal
            visible={visible}
            width="440"
            height="330"
            effect="fadeInUp"
            onClickAway={closeModal}
          >
            <div className="modal-container">
              <h1 className="main-heading">Terms of Service Agreement</h1>
              <div>
                <p className="align-left">{disclaimer.disclaimer}</p>
              </div>
              <div className="modal-btn-container">
                <button className="normal-btn" onClick={closeModal}>
                  Okay
                </button>
            </div>
          </div>
        </Modal>
      </div>
    </center>
  );
}