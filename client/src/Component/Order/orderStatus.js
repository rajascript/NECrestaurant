import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import * as firebase from "firebase";

export default class OrderStatus extends Component {
	constructor(props) {
		super(props);
		this.state = {
			status: "waiting",
			orderId: "",
			date: "",
			time: ""
		};
	}
	componentDidMount() {
		console.log("pa", this.props);
		let db = firebase.database();
		let dbRef = db
			.ref()
			.child(
				"orders" +
					"/" +
					this.props.location.date +
					"/" +
					this.props.location.date +
					"/" +
					this.props.location.time +
					"/" +
					this.props.location.orderId
			);
		dbRef.on("value", snapshot => {
			console.log(snapshot);
			if (snapshot.val() !== null)
				this.setState({ status: snapshot.val().status });
		});
		if (this.state.orderId === "") {
			this.setState({
				orderId: this.props.location.orderId,
				date: this.props.location.date,
				time: this.props.location.time
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
					<h6> Your Order #{this.props.location.orderId} is </h6>
					<br />
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
