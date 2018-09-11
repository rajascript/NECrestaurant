import React, { Component } from "react";

import { connect } from "react-redux";
import { signup } from "../../Action/index";
class BookingForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			emailValue: "",
			nameValue: "",
			phoneValue: ""
		};
		this.handleEmailChange = this.handleEmailChange.bind(this);
		this.handleNameChange = this.handleNameChange.bind(this);
		this.handlePhoneChange = this.handlePhoneChange.bind(this);
		this.handleBooking = this.handleBooking.bind(this);
	}
	handleBooking(e) {
		console.log(this.state);
		let user = {
			email: this.state.emailValue,
			name: this.state.nameValue,
			phone: this.state.phoneValue
		};

		if (
			performPhoneCheck(Number(this.state.phoneValue)) &&
			performStringCheck(this.state.nameValue) &&
			performEmailCheck(this.state.emailValue)
		) {
			//comma daal kar response likho
			console.log("All dada entered was of correct type");
			this.props.signup(user);
		} else {
			console.log("All Data entered was not of correct data type");
		}

		e.preventDefault();
	}

	handleEmailChange(e) {
		this.setState({ emailValue: e.target.value });
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
			<div id="bookingForm__container" className="bookingForm__container">
				<form onSubmit={this.handleSignup}>
					<input
						className="bookingForm__Form--name"
						placeholder="Name"
						type="text"
						value={this.state.nameValue}
						onChange={this.handleNameChange}
					/>
					<br />
					<input
						className="bookingForm__Form--phone"
						placeholder="Phone"
						type="phone"
						value={this.state.phoneValue}
						onChange={this.handlePhoneChange}
					/>
					<br />
					<input
						className="bookingForm__Form--seats"
						placeholder="enter email"
						type="email"
						value={this.state.emailValue}
						onChange={this.handleEmailChange}
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

function performEmailCheck(val) {
	if (typeof val !== "string" || val === null || typeof val === "undefined")
		return false;
	var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(String(val).toLowerCase());
}

function performPhoneCheck(val) {
	if (typeof val !== "number" || val === null || typeof val === "undefined") {
		console.log("nax", typeof val);
		return false;
	}
	if (val.toString().split("").length !== 10) {
		console.log(val.toString().split("").length);
		return false;
	}
	return true;
}

function performPasswordCheck(val) {
	if (typeof val !== "string" || val === null || typeof val === "undefined")
		return false;
	if (val.split("").length < 5) return false;
	return true;
}

function performStringCheck(val) {
	if (typeof val !== "string" || val === null || typeof val === "undefined")
		return false;
	return true;
}

function performPasswordConfirmCheck(val_1, val_2) {
	if (val_1 !== val_2) return false;
	return true;
}

export default connect(
	mapStateToProps,
	{ signup }
)(BookingForm);
