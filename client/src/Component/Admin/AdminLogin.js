import React, { Component } from "react";
import { connect } from "react-redux";
import { adminLogin, fetchAdmin } from "../../Action/index";
import { Redirect } from "react-router-dom";
import ButtonLoader from "../utils/ButtonLoader";
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

	handleLogin(e) {
		console.log(this.state);
		let admin = {
			username: this.state.userNameValue,
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
	componentWillMount() {
		this.props.fetchAdmin();
	}
	componentWillReceiveProps(props) {
		if (typeof props.admin !== "undefined" || props.admin !== false)
			this.setState({ admin: props.admin });
	}
	render() {
		if (this.props.admin) return <Redirect push to="/admin" />;
		else if (typeof this.props.admin === "undefined")
			return <ButtonLoader size={60} />;
		else
			return (
				<div id="loginFormContainer" className="loginForm__container">
					<form onSubmit={this.handleLogin}>
						<input
							id = "adminUsername"
							className="loginForm__Form--userName"
							placeholder="Enter Username"
							type="Name"
							value={this.state.userNameValue}
							onChange={this.handleUserNameChange}
						/>
						<br />
						<input
							id = "adminPassword"
							className="loginForm__Form--password"
							placeholder="Enter password"
							type="password"
							value={this.state.passwordValue}
							onChange={this.handlePasswordChange}
						/>
						<br />
						<input 
							id="submitA"
							type="submit"
							value="Submit" />
					</form>
				</div>
			);
	}
}

function mapStateToProps({ admin }) {
	return { admin };
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
	{ adminLogin, fetchAdmin }
)(AdminLogin);
