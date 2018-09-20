import React, { Component, Fragment } from "react";
import BookingForm from "./BookingForm";
import { Link } from "react-router-dom";
export default class Booking extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
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
				<div class="featuredboxwrapperBooking">
					<div class="featuredboxwrapper-txt">
						Join us,
						<br /> Won't you?
					</div>
				</div>

				<div class="bookingheadingwrapper">Book a Table.</div>

				<BookingForm />
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
