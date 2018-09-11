import React, { Component } from "react";
import BookingForm from "./BookingForm";

export default class Booking extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return <BookingForm />;
	}
}
