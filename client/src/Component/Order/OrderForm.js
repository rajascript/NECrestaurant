import React, { Component, Fragment } from "react";
import moment from "moment";
import shortId from "shortid";
import { Link } from "react-router-dom";

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
			total: this.props.total || 40000,
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
	componentWillReceiveProps(props) {
		console.log(props);
		if (this.state.emailValue === "") {
			this.setState({
				emailValue: props.email,
				nameValue: props.name,
				phoneValue: props.phone
			});
		}
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
			this.props.setUser(user);
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
			<Fragment>
				<div class="navbarwrapper">
					<Link to="/">
						<div class="logowrapper">Indique</div>
					</Link>
					<div class="bottomhalfcontentwrapper">
						<div className="navbarlinkwrapper">
							<Link className="navbarlink" to="/about">
								ABOUT
							</Link>

							<Link className="navbarlink" to="/booking">
								BOOKING
							</Link>

							<Link className="navbarlink" to="/menu">
								MENU
							</Link>

							<Link className="navbarlink" to="/order">
								DELIVERY
							</Link>

							<Link className="navbarlink" to="/">
								CONTACT
							</Link>
						</div>
					</div>
				</div>
				<div class="bookingheadingwrapper">Order food.</div>
				<div id="bookingFormContainer" className="bookingFsEorm__container">
					<form>
						<center>
							<br />
							<input
								id="orderFormName"
								placeholder="Name"
								type="text"
								value={this.state.nameValue}
								onChange={this.handleNameChange}
								className="sEmail"
							/>
							<br />
							<br />
							<input
								id="orderFormPhone"
								placeholder="Phone"
								type="phone"
								value={this.state.phoneValue}
								onChange={this.handlePhoneChange}
								className="sEmail"
							/>
							<br />
							<br />
							<input
								id="orderFormAddress"
								placeholder="enter address"
								type="text"
								value={this.state.addressValue}
								onChange={this.handleAddressChange}
								className="sEmail"
							/>
							<br />
							<label htmlFor="seatsSelector">Payment option: </label>
							<select
								type="number"
								id="seatsSelector"
								value={this.state.seatsValue}
								onChange={this.handleSelectChange}
								className="sEmail"
							>
								<option value="true">COD</option>
								<option value="false">Online</option>
							</select>
							<br />
							<br />
							<br />
							<input
								type="submit"
								class="btn blogin btn-dark"
								value="Submit"
								onClick={this.handleOrder}
							/>
						</center>
					</form>
				</div>
				<div class="navbarwrapper">
					<div class="tophalfcontentwrapper">
						<div class="topleftcontentwrapper" />
					</div>
					<div class="bottomhalfcontentwrapper">
						<div class="navbarlinkwrapper">
							<a class="navbarlink" href="">
								<span class="glyphicon glyphicon-earphone" /> 7656576565
							</a>

							<a class="navbarlink" href=" ">
								This was a project made for NEC Technologies by Group 4
							</a>

							<a class="navbarlink" href="">
								<span class="glyphicon glyphicon-envelope" /> hi@indique.com
							</a>
						</div>
					</div>
				</div>
			</Fragment>
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
