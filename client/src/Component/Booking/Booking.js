import React, { Component, Fragment } from "react";
import BookingForm from "./BookingForm";
import Footer from "../Footer/Footer";
export default class Booking extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<Fragment>
				<BookingForm />
				<Footer />
			</Fragment>
		);
	}
}
