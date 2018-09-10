import React, { Component } from "react";
import LoginGoogle from "./LoginGoogle";
import { connect } from "react-redux";
import { login } from "../../Action/index";
class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailValue: "",
      passwordValue: ""
    };
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }
  handleLogin(e) {
    console.log(this.state);
    let user = {
      email: this.state.emailValue,
      password: this.state.passwordValue
    };

    if (
      performPasswordCheck(this.state.passwordValue) &&
      performEmailCheck(this.state.emailValue)
    ) {
      console.log("You Entered the correct type of values");
      this.props.login(user);
    } else {
      console.log("You did not enter the correct type of values");
    }
    e.preventDefault();
  }

  handleEmailChange(e) {
    this.setState({ emailValue: e.target.value });
  }
  handlePasswordChange(e) {
    this.setState({ passwordValue: e.target.value });
  }
  componentWillReceiveProps(props) {
    console.log(props);
  }
  render() {
    return (
      <div id="loginForm__container" className="loginForm__container">
        <form onSubmit={this.handleLogin}>
          <input
            className="loginForm__Form--email"
            placeholder="enter email"
            type="email"
            value={this.state.emailValue}
            onChange={this.handleEmailChange}
          />
          <br />
          <input
            className="loginForm__Form--password"
            placeholder="enter password"
            type="password"
            value={this.state.passwordValue}
            onChange={this.handlePasswordChange}
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

function performPasswordCheck(val) {
  if (typeof val !== "string" || val === null || typeof val === "undefined")
    return false;
  if (val.split("").length < 5) return false;
  return true;
}

function performEmailCheck(val) {
  if (typeof val !== "string" || val === null || typeof val === "undefined")
    return false;
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(val).toLowerCase());
}

export default connect(
  mapStateToProps,
  { login }
)(LoginForm);
