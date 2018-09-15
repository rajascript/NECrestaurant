import React, { Component } from "react";
import SignupForm from "./authForms/SignupForm";
import LoginForm from "./authForms/LoginForm";
class LoginPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.openPopupWithSignup = this.props.openPopupWithSignup;
    this.activateLoginTab = this.activateLoginTab.bind(this);
    this.activateSignupTab = this.activateSignupTab.bind(this);
    this.displayLoginError = this.displayLoginError.bind(this);
    this.removeLoginWindowError = this.removeLoginWindowError.bind(this);
    this.moveToLogin = this.moveToLogin.bind(this);
    this.state.displayLoginMessage = false;
    this.state.loginWindowErrorVisible = false;
    this.state.loginWindowError = "";
  }
  displayLoginError(errorStatement) {
    this.setState({
      loginWindowErrorVisible: true,
      loginWindowError: errorStatement
    });
  }
  removeLoginWindowError() {
    this.setState({ loginWindowErrorVisible: false });
  }
  activateLoginTab() {
    if (this.state.openPopupWithSignup === true)
      this.setState({ openPopupWithSignup: false });
  }
  activateSignupTab() {
    if (this.state.openPopupWithSignup === false)
      this.setState({ openPopupWithSignup: true });
  }
  moveToLogin() {
    console.log("jnca");
    this.setState({ openPopupWithSignup: false, displayLoginMessage: true });
  }
  renderPopupWithSignup() {
    return (
      <div id="loginPopupContainer" className="loginPopup__container">
        <button
          id="loginPopupButtonLogin"
          className="loginPopup__button--login"
          onClick={this.activateLoginTab}
        >
          Login
        </button>
        <button
          id="loginPopupButtonSignup"
          className="loginPopup__button--signup"
          onClick={this.activateSignupTab}
        >
          Signup
        </button>
        <SignupForm
          removeLoginWindowError={this.removeLoginWindowError}
          displayLoginError={this.displayLoginError}
          moveToLogin={this.moveToLogin}
        />
        {this.state.loginWindowErrorVisible && (
          <p id="loginPopupError" className="loginPopup__error">
            {this.state.loginWindowError}
          </p>
        )}
      </div>
    );
  }
  renderPopupWithLogin() {
    return (
      <div id="loginPopupContainer" className="loginPopup__container">
        {this.state.displayLoginMessage && (
          <p
            id="loginPopupSignupSuccessMessage"
            className="loginPopup__signupSuccessMessage"
          >
            Signup successful! please login.
          </p>
        )}
        <button
          id="loginPopupButtonLogin"
          className="loginPopup__button--login"
          onClick={this.activateLoginTab}
        >
          Login
        </button>
        <button
          id="loginPopupButtonSignup"
          className="loginPopup__button--signup"
          onClick={this.activateSignupTab}
        >
          Signup
        </button>
        <LoginForm
          displayLoginError={this.displayLoginError}
          removeLoginWindowError={this.removeLoginWindowError}
        />
        <p id="loginPopupError" className="loginPopup__error">
          {this.state.loginWindowError}
        </p>
      </div>
    );
  }
  render() {
    if (this.state.openPopupWithSignup) {
      return this.renderPopupWithSignup();
    } else {
      return this.renderPopupWithLogin();
    }
  }
}
export default LoginPopup;
