import React, { Component } from "react";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";
class LoginPopup extends Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.state.openPopupWithSignup = this.props.openPopupWithSignup;
		this.activateLoginTab = this.activateLoginTab.bind(this);
		this.activateSignupTab = this.activateSignupTab.bind(this);
		this.moveToLogin = this.moveToLogin.bind(this);
		this.state.displayLoginMessage = false;
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
		this.setState({ openPopupWithSignup: false, displayLoginMessage: true });
	}
	renderPopupWithSignup() {
		return (
			<div id="loginPopup__container" className="loginPopup__container">
				<button
					id="loginPopup__button--login"
					className="loginPopup__button--login"
					onClick={this.activateLoginTab}
				>
					Login
				</button>
				<button
					id="loginPopup__button--signup"
					className="loginPopup__button--signup"
					onClick={this.activateSignupTab}
				>
					Signup
				</button>
				<SignupForm moveToLogin={this.moveToLogin} />
			</div>
		);
	}
	renderPopupWithLogin() {
		return (
			<div id="loginPopup__container" className="loginPopup__container">
				{this.state.displayLoginMessage && (
					<p
						id="loginPopup__signupSuccessMessage"
						className="loginPopup__signupSuccessMessage"
					>
						Signup successful! please login.
					</p>
				)}

				<button
					id="loginPopup__button--login"
					className="loginPopup__button--login"
					onClick={this.activateLoginTab}
				>
					Login
				</button>
				<button
					id="loginPopup__button--signup"
					className="loginPopup__button--signup"
					onClick={this.activateSignupTab}
				>
					Signup
				</button>
				<LoginForm />
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
