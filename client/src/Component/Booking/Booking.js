import React, { Component, Fragment } from "react";
import BookingForm from "./BookingForm";

export default class Booking extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<Fragment>
				<div class="navbarwrapper">
					<div class="tophalfcontentwrapper">
						<div class="logowrapper">Indique</div>
					</div>
					<div class="bottomhalfcontentwrapper">
						<div class="navbarlinkwrapper">
							<a class="navbarlink" href="about.htm">
								ABOUT
							</a>

							<a class="navbarlink" href="">
								BOOKING
							</a>

							<a class="navbarlink" href=" ">
								MENU
							</a>

							<a class="navbarlink" href="">
								DELIVERY
							</a>

							<a class="navbarlink" href="">
								CONTACT
							</a>
						</div>
					</div>
				</div>
				<div class="featuredboxwrapper">
					<div class="rightwrapper">
						<img
							src="assets/bookingbannerimage.jpg"
							alt="Pink Subtext"
							width="100%"
						/>
					</div>
					<div class="bookingleftwrapper">
						<div class="bookingbannerheadingwrapper">
							Join us, <br /> Won't you?
						</div>
					</div>
				</div>

				<div class="bookingheadingwrapper">Book a Table for Later</div>

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
