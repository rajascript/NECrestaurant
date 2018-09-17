import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
export default class About extends Component {
	render() {
		return (
			<Fragment>
				<div class="navbarwrapper">
					<div class="tophalfcontentwrapper">
						<Link to="/">
							<div class="logowrapper">Indique</div>
						</Link>
					</div>
					<div class="bottomhalfcontentwrapper">
						<div class="navbarlinkwrapper">
							<a class="navbarlink" href="">
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
				<div class="aboutbannerwrapper">
					<div class="aboutbannerheading">Our Story</div>
					<div class="aboutbannerquote">
						There is food and then there is dining, <br /> We know the
						difference ...
					</div>
				</div>
				<div class="aboutchefwrapper" />
				<div class="aboutchefrow">
					<img class="aboutchefleft" src="assets/chef1.png" />
					<div class="aboutcheftext">
						<span class="aboutchefname">Mahindir Dahiya</span>
						<span class="aboutchefquote">
							He is an Executive chef of the nec restaurant. His primary role is
							in managing the overall kitchen. He is also responsible for
							managing different outlets of nec restaurant. Another role of him
							is to control kitchen cost and liaising with suppliers and
							creating the menus.
						</span>
					</div>
					<div class="aboutchefright" />
				</div>
				<div class="aboutchefrow">
					<div class="aboutchefleft" />
					<div class="aboutcheftext">
						<span class="aboutchefname">Hjingan Tamale</span>
						<span class="aboutchefquote">
							He is the Sous-Chef which is the direct assistant of the main
							chef. He works according to assigned the duties of the head chef.
							He is responsible for scheduling the kitchen staff. He works in
							place of the head chef when he is out. His other roles are looking
							after the cleanliness, he also trains the entire staff.
						</span>
					</div>
					<img class="aboutchefright" src="assets/chef2.png" />
				</div>
				<div class="aboutchefrow">
					<img class="aboutchefleft" src="assets/chef3.png" />
					<div class="aboutcheftext">
						<span class="aboutchefname">Francesca Loude</span>
						<span class="aboutchefquote">
							He is a Commis Chef, which is a junior member of staff that works
							under a chef de partie in order to learn the ins and outs of a
							specific station. His work duties are Kitchen Porter and dish
							washer His speciality is in Chinese food.
						</span>
					</div>
					<div class="aboutchefright" />
				</div>
				<div class="aboutchefrow">
					<div class="aboutchefleft" />
					<div class="aboutcheftext">
						<span class="aboutchefname">Gilberto Cequain</span>
						<span class="aboutchefquote">
							He is a chef de partie which sometimes is called “line cook”. He
							is in charge of a particular area of production. He is responsible
							for the making of the dishes present in the menu. His speciality
							is in north and south Indian food.
						</span>
					</div>
					<img class="aboutchefright" src="assets/chef4.png" />
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
								This was a project made for NEC Technologies by Group 7
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
