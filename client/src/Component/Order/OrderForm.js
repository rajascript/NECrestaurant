import React, { Component } from "react";
import moment from "moment";
import shortId from "shortid";

class OrderForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			emailValue: "",
			nameValue: "",
			phoneValue: "",
			addressValue: "",
			dateValue: moment().format("DD-MM-YY HH:mm"),
			selectorValue: true,
			items: this.props.orderItems || ["001", "002"],
			orderErrorVisible: false,
			orderErrorMessage: "",
			calendarVisible: false,
			orderId: "",
			orderConfirmed: false
		};
		this.handleSelectChange = this.handleSelectChange.bind(this);
		this.handleEmailChange = this.handleEmailChange.bind(this);
		this.handleNameChange = this.handleNameChange.bind(this);
		this.handlePhoneChange = this.handlePhoneChange.bind(this);
		this.handleAddressChange = this.handleAddressChange.bind(this);
		this.handleOrder = this.handleOrder.bind(this);
	}
	handleSelectChange(event) {
		let selectVal = Boolean(event.target.value);
		this.setState({ selectorValue: selectVal });
	}
	getDateFromMoment(momentDate) {
		return momentDate.split(" ")[0];
	}
	getSlotFromMoment(momentDate) {
		return momentDate.split(" ")[1].replace(":", "-");
	}
	handleOrder(e) {
		let orderId = shortId.generate();
		let user = {
			email: this.state.emailValue,
			name: this.state.nameValue,
			phone: this.state.phoneValue,
			address: this.state.addressValue,
			items: this.state.items,
			orderId: orderId,
			date: this.getDateFromMoment(this.state.dateValue),
			time: this.getSlotFromMoment(this.state.dateValue),
			cod: this.state.selectorValue
		};
		let PhoneCheck = performPhoneCheck(Number(this.state.phoneValue));
		let StringCheck = performStringCheck(this.state.nameValue);
		let addressCheck = performStringCheck(this.state.addressValue);
		let EmailCheck = performEmailCheck(this.state.emailValue);
		console.log(PhoneCheck, StringCheck, EmailCheck);

		if (!PhoneCheck.success) {
			console.log("error", PhoneCheck.message);
			this.setState({
				orderErrorVisible: true,
				orderErrorMessage: PhoneCheck.message
			});
		} else if (!StringCheck.success) {
			console.log("error", StringCheck.message);
			this.setState({
				orderErrorVisible: true,
				orderErrorMessage: StringCheck.message
			});
		} else if (!addressCheck.success) {
			console.log("error", addressCheck.message);
			this.setState({
				orderErrorVisible: true,
				orderErrorMessage: addressCheck.message
			});
		} else if (!EmailCheck.success) {
			console.log("error", EmailCheck.message);
			this.setState({
				orderErrorVisible: true,
				orderErrorMessage: EmailCheck.message
			});
		} else {
			console.log("All data entered was of correct type");
			console.log(user);
			this.setState({ orderErrorVisible: false });
			this.props.orderFormCompleted();
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
	handleAddressChange(e) {
		this.setState({ addressValue: e.target.value });
	}
	render() {
		console.log(this.state.dateValue);
		return (
			<div id="orderFormContainer" className="orderForm__container">
				<form>
					<input
						id="orderFormName"
						className="orderForm__Form--name"
						placeholder="Name"
						type="text"
						value={this.state.nameValue}
						onChange={this.handleNameChange}
					/>
					<br />
					<input
						id="orderFormPhone"
						className="orderForm__Form--phone"
						placeholder="Phone"
						type="phone"
						value={this.state.phoneValue}
						onChange={this.handlePhoneChange}
					/>
					<br />
					<input
						id="orderFormEmail"
						className="orderForm__Form--email"
						placeholder="enter email"
						type="email"
						value={this.state.emailValue}
						onChange={this.handleEmailChange}
					/>
					<br />
					<input
						id="orderFormAddress"
						className="orderForm__Form--address"
						placeholder="enter address"
						type="text"
						value={this.state.addressValue}
						onChange={this.handleAddressChange}
					/>
					<br />
					<select
						type="number"
						id="seatsSelector"
						value={this.state.seatsValue}
						onChange={this.handleSelectChange}
					>
						<option value="true">COD</option>
						<option value="false">Online</option>
					</select>
					<br />
					<input type="submit" value="Submit" onClick={this.handleOrder} />
				</form>
				<p id="error">
					{this.state.orderErrorVisible && this.state.orderErrorMessage}
				</p>
			</div>
		);
	}
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

export default OrderForm;
