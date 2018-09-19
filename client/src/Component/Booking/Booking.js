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
				<div class="pagewrapper">
					<div class="navbarwrapper">
						<div class="tophalfcontentwrapper">
							<div class="topleftcontentwrapper" />
							<div class="logowrapper">Indique</div>
							<div class="toprightcontentwrapper">
								<button type="button" class="btn btn-danger btn-sm">
									Login
								</button>
								<button type="button" class="btn btn-outline-light btn-sm">
									Sign Up
								</button>
							</div>
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
								alt="Pink Subtext Image"
								width="100%"
							/>
						</div>
						<div class="bookingleftwrapper">
							<div class="bookingbannerheadingwrapper">
								Join us, <br /> Won't you?
							</div>
						</div>
					</div>
					<div class="bookingwrapper">
						<div class="bookingheadingwrapper">Tables we offer</div>
						<div class="bookinggridwrapper">
							<img class="griditemsall" src="assets/2seater.png" />
							<img class="griditemsall" src="assets/4seater.png" />
							<img class="griditemsall" src="assets/8seater.png" />
							<div class="bookinggridwrapper">
								<div class="griditemsmall">
									<span>3 available</span>
								</div>
								<div class="griditemsmall">
									<span>5 available</span>
								</div>
								<div class="griditemsmall">
									<span>4 available</span>
								</div>
							</div>
						</div>
						<div class="signinprompt">
							<a class="signinprompt" href="login.htm">
								Sign in to reserve a table
							</a>
						</div>
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
									This is a working project made for NEC Technologies by Group 4{" "}
								</a>

								<a class="navbarlink" href="">
									<span class="glyphicon glyphicon-envelope" /> hi@indique.com
								</a>
							</div>
						</div>
					</div>
				</div>
			</Fragment>
		);
	}
}
