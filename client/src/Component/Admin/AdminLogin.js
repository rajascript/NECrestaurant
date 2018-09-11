import React, { Component } from "react";
import { connect } from "react-redux";
import { adminLogin } from "../../Action/index";
class AdminLogin extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userNameValue: "",
			passwordValue: ""
		};
		this.handleUserNameChange = this.handleUserNameChange.bind(this);
		this.handlePasswordChange = this.handlePasswordChange.bind(this);
		this.handleLogin = this.handleLogin.bind(this);
	}
	componentWillReceiveProps(props) {
		console.log(props);
	}
	handleLogin(e) {
		console.log(this.state);
		let admin = {
			userName: this.state.userNameValue,
			password: this.state.passwordValue
		};

		if (
			performPasswordCheck(this.state.passwordValue) &&
			performUserNameCheck(this.state.userNameValue)
		) {
			console.log("You Entered the correct type of values");
			this.props.adminLogin(admin);
		} else {
			console.log("You did not enter the correct type of values");
		}
		e.preventDefault();
	}

	handleUserNameChange(e) {
		this.setState({ userNameValue: e.target.value });
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
						className="loginForm__Form--userName"
						placeholder="Enter Username"
						type="Name"
						value={this.state.userNameValue}
						onChange={this.handleUserNameChange}
					/>
					<br />
					<input
						className="loginForm__Form--password"
						placeholder="Enter password"
						type="password"
						value={this.state.passwordValue}
						onChange={this.handlePasswordChange}
					/>
					<br />
					<input type="submit" value="Submit" />
				</form>
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

function performUserNameCheck(val) {
	if (typeof val !== "string" || val === null || typeof val === "undefined")
		return false;
	return true;
}

export default connect(
	mapStateToProps,
	{ adminLogin }
)(AdminLogin);
