import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../Action";
import Booking from "./Booking/Booking";
import Dashboard from "./Dashboard";
import About from "./About";
import AdminLogin from "./Admin/AdminLogin";
import Admin from "./Admin/Admin";
import ThankYou from "./ThankYou";
import "./App.css";

class App extends Component {
	componentDidMount() {
		this.props.fetchUser();
	}
	render() {
		return (
			<div>
				<Router>
					<div>
						<Route exact path="/" component={Dashboard} />
						<Route exact path="/about" component={About} />
						<Route exact path="/booking" component={Booking} />
						<Route exact path="/adminLogin" component={AdminLogin} />
						<Route exact path="/admin" component={Admin} />
						<Route exact path="/thankyou" component={ThankYou} />
					</div>
				</Router>
			</div>
		);
	}
}
export default connect(
	null,
	actions
)(App);
