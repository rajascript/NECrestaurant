import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import * as firebase from "firebase";
/*var config = {
	apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
	authDomain: process.env.REACT_APP_FIREBASE_AUTH_KEY,
	databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_KEY,
	projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID_KEY,
	storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET_KEY,
	messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGE_KEY
};*/
//firebase.initializeApp(config);
export default class ThankYou extends Component {
	constructor(props) {
		super(props);
		this.state = {
			bookingId: "",
			status: "waiting"
		};
	}
	componentDidMount() {
		console.log("pa", this.props);
		let db = firebase.database();
		let dbRef = db
			.ref()
			.child(
				"bookings" +
					"/" +
					this.props.location.date +
					"/" +
					this.props.location.date +
					"/" +
					this.props.location.slot +
					"/" +
					this.props.location.bookingId
			);
		dbRef.on("value", snapshot => {
			if (snapshot.val() !== null)
				this.setState({ status: snapshot.val().status });
		});
		if (this.state.bookingId === "") {
			this.setState({
				bookingId: this.props.location.bookingId,
				date: this.props.location.date,
				slot: this.props.location.slot
			});
		}
	}
	render() {
		return (
			<Fragment>
				<div className="navbarwrapper">
					<div />
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
				<div className="flexContCenter">
					<div> Thank you </div>
					<h6> Your booking #{this.state.bookingId} is </h6>

					<h5> {this.state.status} </h5>
					<img
						style={{ height: "450px" }}
						src="/assets/waiting.jpg"
						alt="waiting"
					/>
				</div>
				<footer class="navbarwrapper orderFooter">
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
				</footer>
			</Fragment>
		);
	}
}
