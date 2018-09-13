import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { logoutUser } from "../../Action/index";
import { connect } from "react-redux";
import { IconContext } from "react-icons";
import LoginPopup from "./LoginPopup";
import { FiUser } from "react-icons/fi";
import UserMenu from "./UserMenu";
import ButtonLoader from "../utils/ButtonLoader";
class Header extends Component {
	state = {
		loginPopupVisible: false,
		openPopupWithSignup: false,
		userMenuVisible: false
	};
	constructor(props) {
		super(props);
		this.openLoginPopup = this.openLoginPopup.bind(this);
		this.openUserMenu = this.openUserMenu.bind(this);
		this.openSignupPopup = this.openSignupPopup.bind(this);
		this.handleLogout = this.handleLogout.bind(this);
	}
	openLoginPopup() {
		this.setState({ loginPopupVisible: true, openPopupWithSignup: false });
	}
	openUserMenu() {
		this.setState({ userMenuVisible: true });
	}
	openSignupPopup() {
		this.setState({ loginPopupVisible: true, openPopupWithSignup: true });
	}
	handleLogout() {
		this.props.logoutUser();
	}
	renderLoggedOutUserHeader() {
		return (
			<nav>
				<p id="headerText" className="header__text">
					Indique
				</p>
				<button
					onClick={this.openLoginPopup}
					id="headerButtonLogin"
					className="header__button--login"
				>
					Login
				</button>
				<button
					onClick={this.openSignupPopup}
					id="headerButtonLogin"
					className="header__button--login"
				>
					Signup
				</button>
				<Link to="/booking">
					<button id="headerButtonBook" className="header__button--book">
						Book
					</button>
				</Link>
				{this.state.loginPopupVisible && (
					<LoginPopup
						ref={ref => (this.loginPopupChild = ref)}
						openPopupWithSignup={this.state.openPopupWithSignup}
					/>
				)}
			</nav>
		);
	}
	renderLoader() {
		return (
			<nav>
				<p id="headerText" className="header__text">
					Indique
				</p>
				<ButtonLoader />
			</nav>
		);
	}
	renderLoggedInUserHeader() {
		return (
			<nav>
				<p id="headerText" className="header__text">
					Indique
				</p>
				<button
					onClick={this.openUserMenu}
					id="headerButtonLogin"
					className="header__button--login"
				>
					<IconContext.Provider
						value={{ color: "#ff6928", className: "global-class-name" }}
					>
						<Fragment>
							<FiUser />
						</Fragment>
					</IconContext.Provider>
				</button>
				{this.state.userMenuVisible && (
					<div>
						<UserMenu user={this.props.auth} logout={this.handleLogout} />
					</div>
				)}
			</nav>
		);
	}
	componentWillReceiveProps(props) {
		if (props.auth === "login_failed") {
			this.loginPopupChild.displayLoginError("Error: Wrong credentials");
		}
	}
	render() {
		if (typeof this.props.auth === "undefined" || this.props.auth === null) {
			return this.renderLoader();
		}
		if (!this.props.auth || this.props.auth === "login_failed")
			return this.renderLoggedOutUserHeader();
		else return this.renderLoggedInUserHeader();
	}
}
function mapStateToProps({ auth }) {
	return { auth };
}
export default connect(
	mapStateToProps,
	{ logoutUser }
)(Header);
