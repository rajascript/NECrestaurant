import React, { Component } from "react";
import { IconContext } from "react-icons";
import { FiX } from "react-icons/fi";
import SignupForm from "./authForms/SignupForm";
import LoginForm from "./authForms/LoginForm";
import { Fragment } from "react";
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
		document.getElementById("loginPopupButtonLogin").style.zIndex = -1;
		document.getElementById("loginPopupButtonSignup").style.zIndex = -2;
		if (this.state.openPopupWithSignup === true)
			this.setState({ openPopupWithSignup: false });
	}
	activateSignupTab() {
		document.getElementById("loginPopupButtonLogin").style.zIndex = -2;
		document.getElementById("loginPopupButtonSignup").style.zIndex = -1;
		if (this.state.openPopupWithSignup === false)
			this.setState({ openPopupWithSignup: true });
	}
	moveToLogin() {
		this.setState({ openPopupWithSignup: false });
	}
	componentDidMount() {
		if (this.props.openPopupWithSignup) {
			document.getElementById("loginPopupButtonLogin").style.zIndex = -2;
			document.getElementById("loginPopupButtonSignup").style.zIndex = -1;
		} else {
			document.getElementById("loginPopupButtonLogin").style.zIndex = -1;
			document.getElementById("loginPopupButtonSignup").style.zIndex = -2;
		}
	}
	renderPopupWithSignup() {
		return (
			<Fragment>
				<div className="loginPopup__container__backdrop" />
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
					<div
						id="loginPopupButtonClose"
						className="loginPopup__button--close"
						onClick={this.props.closePopup}
					>
						<IconContext.Provider
							value={{ color: "red", className: "global-class-name" }}
						>
							<Fragment>
								<FiX />
							</Fragment>
						</IconContext.Provider>
					</div>
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
			</Fragment>
		);
	}

	renderPopupWithLogin() {
		return (
			<Fragment>
				<div className="loginPopup__container__backdrop" />
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
					<div
						id="loginPopupButtonClose"
						className="loginPopup__button--close"
						onClick={this.props.closePopup}
					>
						<IconContext.Provider
							value={{ color: "red", className: "global-class-name" }}
						>
							<Fragment>
								<FiX />
							</Fragment>
						</IconContext.Provider>
					</div>
					<LoginForm
						displayLoginError={this.displayLoginError}
						removeLoginWindowError={this.removeLoginWindowError}
					/>
					{this.state.loginWindowErrorVisible && (
						<div id="loginPopupError" className="loginPopup__error">
							{this.state.loginWindowError}
						</div>
					)}
				</div>
			</Fragment>
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
