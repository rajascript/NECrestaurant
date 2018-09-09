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
		this.props.login(user);
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
export default connect(
	mapStateToProps,
	{ login }
)(LoginForm);
