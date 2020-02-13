import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Register.css';
import Modal from 'react-awesome-modal';

class Register extends Component {

  //Store local state
  state = {
    visible: false,
    name: '',
    company: '',
    phone: '',
    industry: '',
    email: '',
    password: '',
    showPassword: 'password',
    agreement: false,
  }

  // Run on component mount
  componentDidMount() {
    this.props.dispatch({ type: `GET_DISCLAIMER` });
    this.props.dispatch({ type: 'GET_INDUSTRY' })
  }

  // Toggle agreement checkbox
  agree = e => this.state.agreement ? this.setState({ agreement: false }) : this.setState({ agreement: true });

  // Close modal popup
  closeModal = () => this.setState({ visible: false });

  // Adds class if input has a value, removes the class if input has no value
  checkForValue = e => e.target.value ? e.target.classList.add('text-field-active') : e.target.classList.remove('text-field-active');

  // Sets local state to current input value, adds or removes class based on input's value
  handleChange = (e, propName) => {
    this.setState({
      ...this.state,
      [propName]: e.target.value
    });
    this.checkForValue(e);
  }

  // Return to login page
  handleCancel = () => {
    this.props.history.push('/');
  }

  // Open modal popup
  openModal = () => this.setState({ visible: true });

  // Push history to new user page
  pushHistoryToUser = () => {
    this.props.history.push('/new-user');
  }

  // Log new user information into database, push history to new user page
  registerUser = e => {
    e.preventDefault();
    if (this.state.name && this.state.company && this.state.phone && this.state.industry && this.state.email && this.state.password && this.state.agreement) {
      this.props.dispatch({
        type: 'REGISTER',
        payload: {
          name: this.state.name,
          company: this.state.company,
          phone: this.state.phone,
          industry: this.state.industry,
          email: this.state.email,
          password: this.state.password,
        },
      });
      this.pushHistoryToUser();
    }
    else if (this.state.name && this.state.company && this.state.phone && this.state.industry && this.state.email && this.state.password) {
      this.props.dispatch({ type: `REGISTRATION_TOS_NOT_CHECKED` });
    }
    else {
      this.props.dispatch({ type: 'REGISTRATION_INPUT_ERROR' });
    }
  }

  // Show or hide password
  togglePasswordView = () => this.state.showPassword === 'password' ? this.setState({ showPassword: 'text' }) : this.setState({ showPassword: 'password' });

  render() {
    return (
      <center>
        <div className="register-container">
          {this.props.errors.registrationMessage && (
            <h2
              className="alert"
              role="alert"
            >
              {this.props.errors.registrationMessage}
            </h2>
          )}

          <div>
            <img className="register-logo" src="illume-logo180.png" alt="illume logo" />
            <span className="register-brand-name">illume decision hub</span>
          </div>

          <div className="text-field-container">
            <input
              className="text-field"
              type="text"
              name="name"
              value={this.state.name}
              onChange={(e) => this.handleChange(e, 'name')}
            />
            <label className="text-field-label">name</label>
            <div className="text-field-mask register-mask-name"></div>
          </div>

          <div className="text-field-container">
            <input
              className="text-field"
              type="text"
              name="company"
              value={this.state.company}
              onChange={(e) => this.handleChange(e, 'company')}
            />
            <label className="text-field-label">company</label>
            <div className="text-field-mask register-mask-company"></div>
          </div>

          <div className="text-field-container">
            <input
              className="text-field"
              type="text"
              name="phone"
              value={this.state.phone}
              onChange={(e) => this.handleChange(e, 'phone')}
            />
            <label className="text-field-label">phone #</label>
            <div className="text-field-mask register-mask-phone"></div>
          </div>

          <div className="text-field-container">
            <select
              className="dropdown register-dropdown"
              name="industry"
              value={this.state.industry}
              onChange={(e) => this.handleChange(e, 'industry')}
            >
              <option className="dropdown-option" value='' disabled>Select Industry</option>
              {this.props.industry.map((industryRow => {
                return (
                  <option className="dropdown-option" value={industryRow.id} key={industryRow.id}>
                    {industryRow.industry}
                  </option>
                )
              }))}
            </select>
          </div>

          <div className="text-field-container">
            <input
              className="text-field"
              type="text"
              name="email"
              value={this.state.email}
              onChange={(e) => this.handleChange(e, 'email')}
            />
            <label className="text-field-label">email</label>
            <div className="text-field-mask register-mask-email"></div>
          </div>

          <div className="text-field-container">
            <input
              className="text-field"
              type={this.state.showPassword}
              onChange={(e) => this.handleChange(e, 'password')}
            />
            <label className="text-field-label">password</label>
            <div className="text-field-mask register-mask-password"></div>
            <span>
              <input type="checkbox" onClick={this.togglePasswordView} />
              <label> Show Password</label>
            </span>
          </div>

          <div className="register-tos-container">
            <input type="checkbox" onClick={this.agree} />
            <label> I agree to the <span className="tos" onClick={this.openModal}>Terms of Service</span></label>
          </div>

          <button className="normal-btn register-register-btn" onClick={this.registerUser}>Confirm</button>
          <hr className="register-hr" />
          <button className="register-cancel-btn" onClick={this.handleCancel}>cancel</button>

          <Modal
            visible={this.state.visible}
            width="440"
            height="330"
            effect="fadeInUp"
            onClickAway={this.closeModal}
          >
            <div className="modal-container">
              <h1 className="main-heading">Usage Agreement</h1>
              <div>
                <p className="align-left">{this.props.disclaimer.disclaimer}</p>
              </div>
              <div className="modal-btn-container">
                <button className="normal-btn" onClick={this.closeModal}>
                  Okay
                  </button>
              </div>
            </div>
          </Modal>
        </div>
      </center>
    );
  }
}

const putReduxStateOnProps = reduxState => ({
  disclaimer: reduxState.disclaimer,
  errors: reduxState.errors,
  industry: reduxState.industry,
});

export default connect(putReduxStateOnProps)(Register);