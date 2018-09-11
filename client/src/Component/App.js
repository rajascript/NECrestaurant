import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../Action";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Booking from "./Booking/Booking";
import Dashboard from "./Dashboard";
import AdminLogin from "./Admin/AdminLogin";
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
						<Header />
						<Route exact path="/" component={Dashboard} />
						<Route exact path="/Booking" component={Booking} />
						<Route exact path="/adminLogin" component={AdminLogin} />
						<Footer />
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
