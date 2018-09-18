import React, { Component } from "react";
import moment from "moment";
import "../../../node_modules/input-moment/dist/input-moment.css";
import InputMoment from "input-moment";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { bookTable } from "../../Action/index";

class BookingForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			emailValue: "",
			nameValue: "",
			phoneValue: "",
			dateValue: "",
			seatsValue: 4,
			moment: moment(),
			bookingErrorVisible: false,
			bookingErrorMessage: "",
			calendarVisible: false,
			bookingId: "",
			bookingConfirmed: false
		};
		this.handleSelectChange = this.handleSelectChange.bind(this);
		this.handleEmailChange = this.handleEmailChange.bind(this);
		this.handleNameChange = this.handleNameChange.bind(this);
		this.handlePhoneChange = this.handlePhoneChange.bind(this);
		this.handleSave = this.handleSave.bind(this);
		this.handleDateChange = this.handleDateChange.bind(this);
		this.handleBooking = this.handleBooking.bind(this);
		this.toggleCalendar = this.toggleCalendar.bind(this);
	}
	handleSelectChange(event) {
		this.setState({ seatsValue: event.target.value });
	}
	toggleCalendar() {
		if (this.state.calendarVisible) this.setState({ calendarVisible: false });
		else this.setState({ calendarVisible: true });
	}
	getDateFromMoment(momentDate) {
		return momentDate.split(" ")[0];
	}
	getSlotFromMoment(momentDate) {
		return momentDate.split(" ")[1].split(":")[0];
	}
	handleBooking(e) {
		let user = {
			email: this.state.emailValue,
			name: this.state.nameValue,
			phone: this.state.phoneValue,
			seats: this.state.seatsValue,
			date: this.getDateFromMoment(this.state.dateValue),
			slot: this.getSlotFromMoment(this.state.dateValue)
		};
		debugger;
		let PhoneCheck = performPhoneCheck(Number(this.state.phoneValue));
		let StringCheck = performStringCheck(this.state.nameValue);
		let EmailCheck = performEmailCheck(this.state.emailValue);
		console.log(PhoneCheck, StringCheck, EmailCheck);
		debugger;
		if (!PhoneCheck.success) {
			console.log("error", PhoneCheck.message);
			this.setState({
				bookingErrorVisible: true,
				bookingErrorMessage: PhoneCheck.message
			});
		} else if (!StringCheck.success) {
			console.log("error", StringCheck.message);
			this.setState({
				bookingErrorVisible: true,
				bookingErrorMessage: StringCheck.message
			});
		} else if (!EmailCheck.success) {
			console.log("error", EmailCheck.message);
			this.setState({
				bookingErrorVisible: true,
				bookingErrorMessage: EmailCheck.message
			});
		} else {
			console.log("All data entered was of correct type");
			console.log(user);
			this.setState({ bookingErrorVisible: false });
			this.props.bookTable(user);
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
			this.setState({ dateValue: this.state.moment.format("DD-MM-YY HH:mm") });
		}
		this.toggleCalendar();
	}
	handleDateChange(moment) {
		this.setState({ moment });
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
		if (
			typeof props.bookings !== "undefined" &&
			props.bookings !== null &&
			typeof props.bookings.bookingId !== "undefined"
		) {
			this.setState({
				bookingConfirmed: true,
				bookingId: props.bookings.bookingId
			});
		} else this.setState({ displayServerError: true });
		if (props.auth) {
			let emailValue = props.auth.email || "";
			let nameValue = props.auth.name || "";
			let phoneValue = props.auth.phone || "";
			this.setState({ emailValue, nameValue, phoneValue });
		}
	}
	render() {
		if (this.state.bookingConfirmed)
			return (
				<Redirect
					push
					to={{
						pathname: "/thankyou",
						bookingId: this.state.bookingId,
						date: this.getDateFromMoment(this.state.dateValue),
						slot: this.getSlotFromMoment(this.state.dateValue)
					}}
				/>
			);
		return (
			<div id="bookingFormContainer" className="bookingForm__container">
				<form>
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
						className="bookingForm__Form--seats"
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
					{this.state.calendarVisible && (
						<InputMoment
							moment={this.state.moment}
							onChange={this.handleDateChange}
							onSave={this.handleSave}
							minStep={1}
							hourStep={1}
							prevMonthIcon="ion-ios-arrow-left"
							nextMonthIcon="ion-ios-arrow-right"
						/>
					)}
					<br />
					<select
						type="number"
						id="seatsSelector"
						value={this.state.seatsValue}
						onChange={this.handleSelectChange}
					>
						<option value="1">1</option>
						<option value="2">2</option>
						<option value="3">3</option>
						<option value="4">4</option>
						<option value="5">5</option>
						<option value="6">6</option>
						<option value="7">7</option>
						<option value="8">8</option>
					</select>
					<br />
					<input type="submit" value="Submit" onClick={this.handleBooking} />
				</form>
				<p id="error">
					{this.state.bookingErrorVisible && this.state.bookingErrorMessage}
				</p>
			</div>
		);
	}
}

function mapStateToProps({ bookings, auth }) {
	return { bookings, auth };
}

function performEmailCheck(val) {
	console.log(val);
	if (typeof val !== "string" || val === null || typeof val === "undefined")
		return { success: false, message: "Phone number poorly formatted" };
	var re = /^(([^<>()\\.,;:\s@"]+(\.[^<>()\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	let temp = re.test(String(val).toLowerCase());
	console.log(temp);
	return { success: temp, message: "Email poorly formatted" };
}

function performPhoneCheck(val) {
	if (typeof val !== "number" || val === null || typeof val === "undefined") {
		return { success: false, message: "Phone number poorly formatted" };
	}
	if (val.toString().split("").length !== 10) {
		return { success: false, message: "Phone number should be of 10 digits" };
	}
	return { success: true };
}

function performStringCheck(val) {
	if (typeof val !== "string" || val === null || typeof val === "undefined")
		return false;
	return { success: true };
}

export default connect(
	mapStateToProps,
	{ bookTable }
)(BookingForm);
