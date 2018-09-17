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
		this.toggleUserMenu = this.toggleUserMenu.bind(this);
		this.openSignupPopup = this.openSignupPopup.bind(this);
		this.handleLogout = this.handleLogout.bind(this);
	}
	openLoginPopup() {
		this.setState({ loginPopupVisible: true, openPopupWithSignup: false });
	}
	toggleUserMenu() {
		if (!this.state.userMenuVisible) {
			this.setState({ userMenuVisible: true });
		} else {
			this.setState({ userMenuVisible: false });
		}
	}
	openSignupPopup() {
		this.setState({ loginPopupVisible: true, openPopupWithSignup: true });
	}
	handleLogout() {
		this.props.logoutUser();
	}
	renderLoggedOutUserHeader() {
		return (
			<div className="headerWrapper">
				<div className="headerLeftFiller" />
				<div className="logowrapper">Indique</div>
				<div className="toprightcontentwrapper">
					<button
						onClick={this.openLoginPopup}
						id="headerButtonLogin"
						type="button"
						className="btn btn-primary"
					>
						Login
					</button>
					<button
						onClick={this.openSignupPopup}
						id="headerButtonSignup"
						type="button"
						className="btn btn-link"
					>
						Signup
					</button>
					{this.state.loginPopupVisible && (
						<LoginPopup
							ref={ref => (this.loginPopupChild = ref)}
							closePopup={() => this.setState({ loginPopupVisible: false })}
							openPopupWithSignup={this.state.openPopupWithSignup}
						/>
					)}
				</div>
			</div>
		);
	}
	renderLoader() {
		return (
			<div className="headerWrapper">
				<div className="headerLeftFiller" />
				<div className="logowrapper">Indique</div>
				<div className="toprightcontentwrapper">
					<ButtonLoader />
				</div>
			</div>
		);
	}
	renderLoggedInUserHeader() {
		return (
			<div className="headerWrapper">
				<div className="headerLeftFiller" />
				<div className="logowrapper">Indique</div>
				<div className="toprightcontentwrapper">
					<button
						onClick={this.toggleUserMenu}
						id="headerButtonUser"
						className="header__button--user"
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
						<div className="usermenu">
							<UserMenu user={this.props.auth} logout={this.handleLogout} />
						</div>
					)}
				</div>
			</div>
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
		if (
			!this.props.auth ||
			this.props.auth === "login_failed" ||
			this.props.auth === "success"
		)
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
