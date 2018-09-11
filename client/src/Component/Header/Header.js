import React, { Component } from "react";
import LoginPopup from "./LoginPopup";
class Header extends Component {
	state = { loginPopupVisible: false, openPopupWithSignup: false };
	constructor(props) {
		super(props);
		this.openLoginPopup = this.openLoginPopup.bind(this);
		this.openSignupPopup = this.openSignupPopup.bind(this);
	}
	openLoginPopup() {
		this.setState({ loginPopupVisible: true, openPopupWithSignup: false });
	}
	openSignupPopup() {
		this.setState({ loginPopupVisible: true, openPopupWithSignup: true });
	}
	render() {
		return (
			<nav>
				<p id="header__text" className="header__text">
					Indique
				</p>
				<button
					onClick={this.openLoginPopup}
					id="header__button--login"
					className="header__button--login"
				>
					Login
				</button>
				<button
					onClick={this.openSignupPopup}
					id="header__button--login"
					className="header__button--login"
				>
					Signup
				</button>
				<button
					onClick={this.openSignupPopup}
					id="header__button--book"
					className="header__button--book"
				>
					Book
				</button>
				{this.state.loginPopupVisible && (
					<LoginPopup openPopupWithSignup={this.state.openPopupWithSignup} />
				)}
			</nav>
		);
	}
}
export default Header;
