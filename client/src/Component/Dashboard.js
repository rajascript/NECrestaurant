import React, { Component, Fragment } from "react";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
class Dashboard extends Component {
	render() {
		return (
			<Fragment>
				<Header />
				<div> Alan Turing</div>
				<Footer />
			</Fragment>
		);
	}
}
export default Dashboard;
