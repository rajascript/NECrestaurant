import React, { Component } from "react";
import moment from "moment";
import "../../../node_modules/input-moment/dist/input-moment.css";
import InputMoment from "input-moment";
import { connect } from "react-redux";
import { signup } from "../../Action/index";
class BookingForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			emailValue: "",
			nameValue: "",
			phoneValue: "",
			dateValue: "",
			moment: moment(),
			bookingErrorVisible: false,
			bookingErrorMessage: "",
			calednarVisible: false
		};
		this.handleEmailChange = this.handleEmailChange.bind(this);
		this.handleNameChange = this.handleNameChange.bind(this);
		this.handlePhoneChange = this.handlePhoneChange.bind(this);
		this.handleSave = this.handleSave.bind(this);
		this.handleDateChange = this.handleDateChange.bind(this);
		this.handleBooking = this.handleBooking.bind(this);
		this.toggleCalendar = this.toggleCalendar.bind(this);
	}
	toggleCalendar() {
		if (this.state.calednarVisible) this.setState({ calednarVisible: false });
		else this.setState({ calednarVisible: true });
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
	handleSave() {
		if (this.state.moment < new Date()) {
			this.setState({
				bookingErrorVisible: true,
				bookingErrorMessage: "Error: Please select a future date and time."
			});
		} else if (this.state.moment.hour() < 11 || this.state.moment.hour() > 22) {
			this.setState({
				bookingErrorVisible: true,
				bookingErrorMessage: "Error: Restaurant timings 11 AM to 10 PM."
			});
		} else {
			this.setState({ dateValue: this.state.moment.format("DD/MM/YY HH:MM") });
		}
		this.toggleCalendar();
	}
	handleDateChange(moment) {
		this.setState({ moment });
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
		if (this.props.auth === 200) this.props.moveToLogin();
		else this.setState({ displayServerError: true });
	}
	render() {
		return (
			<div id="bookingFormContainer" className="bookingForm__container">
				<form onSubmit={this.handleSignup}>
					<input
						id="bookingFormName"
						className="bookingForm__Form--name"
						placeholder="Name"
						type="text"
						value={this.state.nameValue}
						onChange={this.handleNameChange}
					/>
					<br />
					<input
						id="bookingFormPhone"
						className="bookingForm__Form--phone"
						placeholder="Phone"
						type="phone"
						value={this.state.phoneValue}
						onChange={this.handlePhoneChange}
					/>
					<br />
					<input
						id="bookingFormEmail"
						className="bookingForm__Form--email"
						placeholder="enter email"
						type="email"
						value={this.state.emailValue}
						onChange={this.handleEmailChange}
					/>
					<br />
					<input
						id="bookingFormDate"
						className="bookingForm__Form--date"
						placeholder="Date"
						type="text"
						value={this.state.dateValue}
						onClick={this.toggleCalendar}
					/>
					<br />
					{this.state.calednarVisible && (
						<InputMoment
							moment={this.state.moment}
							onChange={this.handleDateChange}
							onSave={this.handleSave}
							minStep={15} // default
							hourStep={1} // default
							prevMonthIcon="ion-ios-arrow-left" // default
							nextMonthIcon="ion-ios-arrow-right" // default
						/>
					)}
					<br />
					<input 
						id="submit"
						type="submit" value="Submit" />
				</form>
				<p>
					{this.state.bookingErrorVisible && this.state.bookingErrorMessage}
				</p>
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
