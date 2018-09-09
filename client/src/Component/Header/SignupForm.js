import React, { Component } from "react";
import LoginGoogle from "./LoginGoogle";
import { connect } from "react-redux";
import { signup } from "../../Action/index";
class SignupForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			passwordValue: "",
			confirmPasswordValue: "",
			nameValue: "",
			phoneValue: ""
		};
		this.handleEmailChange = this.handleEmailChange.bind(this);
		this.handlePasswordChange = this.handlePasswordChange.bind(this);
		this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(
			this
		);
		this.handleNameChange = this.handleNameChange.bind(this);
		this.handlePhoneChange = this.handlePhoneChange.bind(this);
		this.handleSignup = this.handleSignup.bind(this);
	}
	handleSignup(e) {
		console.log(this.state);
		let user = {
			email: this.state.email,
			password: this.state.passwordValue,
			name: this.state.nameValue,
			phone: this.state.phoneValue
		};
		this.props.signup(user);
		e.preventDefault();
	}
	handleEmailChange(e) {
		this.setState({ email: e.target.value });
	}
	handleNameChange(e) {
		this.setState({ nameValue: e.target.value });
	}
	handlePhoneChange(e) {
		this.setState({ phoneValue: e.target.value });
	}

	handlePasswordChange(e) {
		this.setState({ passwordValue: e.target.value });
	}
	handleConfirmPasswordChange(e) {
		this.setState({ confirmPasswordValue: e.target.value });
	}
	componentWillReceiveProps(props) {
		console.log("received", props);
		if (this.props.auth === 200) this.props.moveToLogin();
		else this.setState({ displayServerError: true });
	}
	render() {
		return (
			<div id="signupForm__container" className="signupForm__container">
				<form onSubmit={this.handleSignup}>
					<input
						className="signupForm__Form--email"
						placeholder="enter email"
						type="email"
						value={this.state.email}
						onChange={this.handleEmailChange}
					/>
					<br />
					<input
						className="signupForm__Form--password"
						placeholder="enter password"
						type="password"
						value={this.state.passwordValue}
						onChange={this.handlePasswordChange}
					/>
					<br />
					<input
						className="signupForm__Form--confirmPassword"
						placeholder="confirm password"
						type="password"
						value={this.state.confirmPasswordValue}
						onChange={this.handleConfirmPasswordChange}
					/>
					<br />
					<input
						className="signupForm__Form--name"
						placeholder="Name"
						type="text"
						value={this.state.nameValue}
						onChange={this.handleNameChange}
					/>
					<br />
					<input
						className="signupForm__Form--phone"
						placeholder="Phone"
						type="phone"
						value={this.state.phoneValue}
						onChange={this.handlePhoneChange}
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
	{ signup }
)(SignupForm);
