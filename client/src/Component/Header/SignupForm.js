import React, { Component } from "react";
import LoginGoogle from "./LoginGoogle";
import { connect } from "react-redux";
import { signup } from "../../Action/index";
class SignupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailValue: "",
      passwordValue: "",
      confirmPasswordValue: "",
      nameValue: "",
      phoneValue: ""
    };
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(
      this
    );
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handlePhoneChange = this.handlePhoneChange.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
  }
  handleSignup(e) {
    console.log(this.state);
    let user = {
      email: this.state.emailValue,
      password: this.state.passwordValue,
      name: this.state.nameValue,
      phone: this.state.phoneValue
    };

    if (
      performPhoneCheck(Number(this.state.phoneValue)) &&
      performPasswordCheck(this.state.passwordValue) &&
      performPasswordConfirmCheck(
        this.state.passwordValue,
        this.state.confirmPasswordValue
      ) &&
      performStringCheck(this.state.nameValue) &&
      performEmailCheck(this.state.emailValue)
    ) {
      console.log("i reached here");
      this.props.signup(user);
    }
    e.preventDefault();
  }
  handleEmailChange(e) {
    this.setState({ emailValue: e.target.value });
  }
  handleNameChange(e) {
    this.setState({ nameValue: e.target.value });
  }
  handlePhoneChange(e) {
    this.setState({ phoneValue: e.target.value });
  }

  handlePasswordChange(e) {
    this.setState({ passwordValue: e.target.value });
  }
  handleConfirmPasswordChange(e) {
    this.setState({ confirmPasswordValue: e.target.value });
  }
  componentWillReceiveProps(props) {
    console.log("received", props);
    if (this.props.auth === 200) this.props.moveToLogin();
    else this.setState({ displayServerError: true });
  }
  render() {
    return (
      <div id="signupForm__container" className="signupForm__container">
        <form onSubmit={this.handleSignup}>
          <input
            className="signupForm__Form--email"
            placeholder="enter email"
            type="email"
            value={this.state.emailValue}
            onChange={this.handleEmailChange}
          />
          <br />
          <input
            className="signupForm__Form--password"
            placeholder="enter password"
            type="password"
            value={this.state.passwordValue}
            onChange={this.handlePasswordChange}
          />
          <br />
          <input
            className="signupForm__Form--confirmPassword"
            placeholder="confirm password"
            type="password"
            value={this.state.confirmPasswordValue}
            onChange={this.handleConfirmPasswordChange}
          />
          <br />
          <input
            className="signupForm__Form--name"
            placeholder="Name"
            type="text"
            value={this.state.nameValue}
            onChange={this.handleNameChange}
          />
          <br />
          <input
            className="signupForm__Form--phone"
            placeholder="Phone"
            type="phone"
            value={this.state.phoneValue}
            onChange={this.handlePhoneChange}
          />
          <br />
          <input type="submit" value="Submit" />
        </form>
        <LoginGoogle />
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  console.log(auth);
  return { auth };
}

function performEmailCheck(val) {
  if (typeof val !== "string" || val === null || typeof val === "undefined")
    return false;
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(val).toLowerCase());
}

function performPhoneCheck(val) {
  if (typeof val !== "number" || val === null || typeof val === "undefined") {
    console.log("nax", typeof val);
    return false;
  }
  if (val.toString().split("").length !== 10) {
    console.log(val.toString().split("").length);
    return false;
  }
  return true;
}

function performPasswordCheck(val) {
  if (typeof val !== "string" || val === null || typeof val === "undefined")
    return false;
  if (val.split("").length < 5) return false;
  return true;
}

function performStringCheck(val) {
  if (typeof val !== "string" || val === null || typeof val === "undefined")
    return false;
  return true;
}

function performPasswordConfirmCheck(val_1, val_2) {
  if (val_1 !== val_2) return false;
  return true;
}

export default connect(
  mapStateToProps,
  { signup }
)(SignupForm);
