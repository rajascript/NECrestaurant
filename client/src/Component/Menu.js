import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
export default class Menu extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<Fragment>
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
				<div class="menuwrapper">
					<div class="menuheadingwrapper">Non Veg Specials</div>
					<div class="gridwrapwrapper">
						<div class="menugridwrapper">
							<div class="fooditem">
								<img
									class="foodpic"
									src="assets/tandoorichicken.jpg"
									alt="Review Avatar"
								/>
								<div class="foodname">
									<center>Tandoori Chicken</center>
								</div>
							</div>
							<div class="fooditem">
								<img
									class="foodpic"
									src="assets/afghanichicken.jpg"
									alt="Review Avatar"
								/>
								<div class="foodname">
									<center>Afgani Chicken</center>
								</div>
							</div>
							<div class="fooditem">
								<img
									class="foodpic"
									src="assets/chickentikka.jpg"
									alt="Review Avatar"
								/>
								<div class="foodname">
									<center>Chicken Tikka</center>
								</div>
							</div>
							<div class="fooditem">
								<img
									class="foodpic"
									src="assets/ChilliChicken.jpg"
									alt="Review Avatar"
								/>
								<div class="foodname">
									<center>Chilli Chicken</center>
								</div>
							</div>
							<div class="fooditem">
								<img
									class="foodpic"
									src="assets/butterchicken.png"
									alt="Review Avatar"
								/>
								<div class="foodname">
									<center>Butter Chicken</center>
								</div>
							</div>
							<div class="fooditem">
								<img
									class="foodpic"
									src="assets/Mutton.jpg"
									alt="Review Avatar"
								/>
								<div class="foodname">
									<center>Mutton</center>
								</div>
							</div>
							<div class="fooditem">
								<img
									class="foodpic"
									src="assets/Cseekh.jpg"
									alt="Review Avatar"
								/>
								<div class="foodname">
									<center>Chicken Seekh</center>
								</div>
							</div>
							<div class="fooditem">
								<img
									class="foodpic"
									src="assets/Mseekh.jpg"
									alt="Review Avatar"
								/>
								<div class="foodname">
									<center>Mutton Seekh</center>
								</div>
							</div>
						</div>
					</div>
					<div class="menuheadingwrapper">Veg Specials</div>
					<div class="gridwrapwrapper">
						<div class="menugridwrapper">
							<div class="fooditem">
								<img
									class="foodpic"
									src="assets/Bhatura.png"
									alt="Review Avatar"
								/>
								<div class="foodname">
									<center>Chole Bhatura</center>
								</div>
							</div>
							<div class="fooditem">
								<img
									class="foodpic"
									src="assets/Dalm.png"
									alt="Review Avatar"
								/>
								<div class="foodname">
									<center>Dal Makhni</center>
								</div>
							</div>
							<div class="fooditem">
								<img
									class="foodpic"
									src="assets/Kofta.png"
									alt="Review Avatar"
								/>
								<div class="foodname">
									<center>Kofta</center>
								</div>
							</div>
							<div class="fooditem">
								<img
									class="foodpic"
									src="assets/PaneerT.png"
									alt="Review Avatar"
								/>
								<div class="foodname">
									<center>Paneer Tikka</center>
								</div>
							</div>
							<div class="fooditem">
								<img
									class="foodpic"
									src="assets/Dosa.png"
									alt="Review Avatar"
								/>
								<div class="foodname">
									<center>Dosa</center>
								</div>
							</div>
							<div class="fooditem">
								<img
									class="foodpic"
									src="assets/Kachori.png"
									alt="Review Avatar"
								/>
								<div class="foodname">
									<center>Kachori</center>
								</div>
							</div>
							<div class="fooditem">
								<img
									class="foodpic"
									src="assets/olivier.jpg"
									alt="Review Avatar"
								/>
								<div class="foodname">
									<center>Olivier</center>
								</div>
							</div>
							<div class="fooditem">
								<img
									class="foodpic"
									src="assets/chilipotato.jpg"
									alt="Review Avatar"
								/>
								<div class="foodname">
									<center>Chilli Potato</center>
								</div>
							</div>
						</div>
					</div>
					<div class="menuheadingwrapper">Breads</div>
					<div class="gridwrapwrapper">
						<div class="menugridwrapper">
							<div class="fooditem">
								<img
									class="foodpic"
									src="assets/wheatB.png"
									alt="Review Avatar"
								/>
								<div class="foodname">
									<center>Wheat Bread</center>
								</div>
							</div>
							<div class="fooditem">
								<img
									class="foodpic"
									src="assets/whiteB.png"
									alt="Review Avatar"
								/>
								<div class="foodname">
									<center>White Bread</center>
								</div>
							</div>
							<div class="fooditem">
								<img class="foodpic" src="assets/MGB.png" alt="Review Avatar" />
								<div class="foodname">
									<center>Multi-Grain Bread</center>
								</div>
							</div>
							<div class="fooditem">
								<img class="foodpic" src="assets/BB.png" alt="Review Avatar" />
								<div class="foodname">
									<center>Brown Bread</center>
								</div>
							</div>
							<div class="fooditem">
								<img class="foodpic" src="assets/SB.png" alt="Review Avatar" />
								<div class="foodname">
									<center>Sourdough Bread</center>
								</div>
							</div>
						</div>
					</div>
					<div class="menuheadingwrapper">Rice Dishes</div>
					<div class="gridwrapwrapper">
						<div class="menugridwrapper">
							<div class="fooditem">
								<img
									class="foodpic"
									src="assets/Lrice.png"
									alt="Review Avatar"
								/>
								<div class="foodname">
									<center>Lemon Rice</center>
								</div>
							</div>
							<div class="fooditem">
								<img
									class="foodpic"
									src="assets/Crice.png"
									alt="Review Avatar"
								/>
								<div class="foodname">
									<center>Claypot chicken rice</center>
								</div>
							</div>
							<div class="fooditem">
								<img
									class="foodpic"
									src="assets/Corice.png"
									alt="Review Avatar"
								/>
								<div class="foodname">
									<center>Congee</center>
								</div>
							</div>
							<div class="fooditem">
								<img
									class="foodpic"
									src="assets/Onrice.png"
									alt="Review Avatar"
								/>
								<div class="foodname">
									<center>Onigiri</center>
								</div>
							</div>
							<div class="fooditem">
								<img
									class="foodpic"
									src="assets/idli.png"
									alt="Review Avatar"
								/>
								<div class="foodname">
									<center>Idlii</center>
								</div>
							</div>
							<div class="fooditem">
								<img
									class="foodpic"
									src="assets/mrice.png"
									alt="Review Avatar"
								/>
								<div class="foodname">
									<center>Mansaf</center>
								</div>
							</div>
						</div>
					</div>
					<div class="menuheadingwrapper">Desserts</div>
					<div class="gridwrapwrapper">
						<div class="menugridwrapper">
							<div class="fooditem">
								<img
									class="foodpic"
									src="assets/kheer.png"
									alt="Review Avatar"
								/>
								<div class="foodname">
									<center>Kheer</center>
								</div>
							</div>
							<div class="fooditem">
								<img
									class="foodpic"
									src="assets/kulfi.png"
									alt="Review Avatar"
								/>
								<div class="foodname">
									<center>Kulfi</center>
								</div>
							</div>
							<div class="fooditem">
								<img class="foodpic" src="assets/Jal.png" alt="Review Avatar" />
								<div class="foodname">
									<center>Jalebi</center>
								</div>
							</div>
							<div class="fooditem">
								<img
									class="foodpic"
									src="assets/imar.png"
									alt="Review Avatar"
								/>
								<div class="foodname">
									<center>Imarti</center>
								</div>
							</div>
							<div class="fooditem">
								<img class="foodpic" src="assets/GKH.png" alt="Review Avatar" />
								<div class="foodname">
									<center>Gajar ka Halwa</center>
								</div>
							</div>
							<div class="fooditem">
								<img class="foodpic" src="assets/sev.png" alt="Review Avatar" />
								<div class="foodname">
									<center>Sevai</center>
								</div>
							</div>
						</div>
					</div>
				</div>
				<br />
				<br />
				<br />
				<center>
					{" "}
					<div class="signinprompt">
						<a class="signinprompt" href="booking.htm">
							Reserve a Table
						</a>
					</div>
				</center>
				<br />
				<br />
				<div class="navbarwrapper">
					<div class="bottomhalfcontentwrapper">
						<div class="navbarlinkwrapper">
							<a class="navbarlink" href="">
								<span class="glyphicon glyphicon-earphone" /> 7656576565
							</a>

							<a class="navbarlink" href=" ">
								THIS PROJECT WAS MADE FOR NEC TECHNOLOGIES BY GROUP 4
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
