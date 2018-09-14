import React, { Component } from "react";
import Datetime from "react-datetime";
import { connect } from "react-redux";
import { signup } from "../../Action/index";
class BookingForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			emailValue: "",
			nameValue: "",
			phoneValue: "",
			moment: new Date()
		};
		this.handleEmailChange = this.handleEmailChange.bind(this);
		this.handleNameChange = this.handleNameChange.bind(this);
		this.handlePhoneChange = this.handlePhoneChange.bind(this);
		this.handleBooking = this.handleBooking.bind(this);
		this.handleStartDateChange = this.handleStartDateChange.bind(this);
		this.handleEndDateChange = this.handleEndDateChange.bind(this);
		this.isValidEndDate = this.isValidEndDate.bind(this);
		this.isValidStartDate = this.isValidStartDate.bind(this);
	}
	componentDidMount() {
		if (
			this.state.endDate.getMinutes() % 15 !== 0 ||
			this.state.startDate.getMinutes() % 15 !== 0
		) {
			let newEndMinute = this.state.endDate.getMinutes();
			let newStartMinute = this.state.startDate.getMinutes();
			newEndMinute = (Math.round(newEndMinute / 15) * 15) % 60;
			newStartMinute = (Math.round(newStartMinute / 15) * 15) % 60;
			if (
				newEndMinute < this.state.endDate.getMinutes() ||
				newStartMinute < this.state.startDate.getMinutes()
			) {
				newEndMinute += 15;
				newStartMinute += 15;
			}
			if (newEndMinute >= 60) newEndMinute = 0;
			if (newStartMinute >= 60) newStartMinute = 0;
			let newEndDate = new Date();
			newEndDate.setMinutes(newEndMinute);
			console.log(newEndDate);
			let newStartDate = new Date();
			newStartDate.setMinutes(newStartMinute);
			this.setState({ endDate: newEndDate, startDate: newStartMinute });
		}
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
	handleDateChange(date) {
		this.setState({ moment: date });
	}
	isValidEndDate(date) {
		let currDate = new Date(date);
		let currStartDate = new Date(this.state.startDate);
		if (currDate.getDate() !== currStartDate.getDate()) return false;
		if (currDate.getMonth() !== currStartDate.getMonth()) return false;
		if (currDate.getYear() !== currStartDate.getYear()) return false;
		if (currDate <= currStartDate) return false;
		return true;
	}
	isValidStartDate(date) {
		let startDate = new Date(date);
		if (startDate.getDate() !== startDate.getDate()) return false;
		return true;
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
		console.log(this.state.endDate);
		return (
			<div id="bookingFormContainer" className="bookingForm__container">
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
					<InputMoment
						moment={this.state.moment}
						onChange={this.handleDateChange}
						onSave={this.handleSave}
						minStep={15} // default
						hourStep={1} // default
						prevMonthIcon="ion-ios-arrow-left" // default
						nextMonthIcon="ion-ios-arrow-right" // default
					/>
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
	var re = /^(([^<>()\\.,;:\s@"]+(\.[^<>()\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(String(val).toLowerCase());
}

function performPhoneCheck(val) {
	if (typeof val !== "number" || val === null || typeof val === "undefined") {
		return false;
	}
	if (val.toString().split("").length !== 10) {
		return false;
	}
	return true;
}

function performStringCheck(val) {
	if (typeof val !== "string" || val === null || typeof val === "undefined")
		return false;
	return true;
}

export default connect(
	mapStateToProps,
	{ signup }
)(BookingForm);
