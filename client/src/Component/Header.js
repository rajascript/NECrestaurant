import React, { Component } from "react";

class Header extends Component {
	render() {
		console.log(this.props);
		return (
			<nav>
				<div className="header__text">I am a header.</div>
			</nav>
		);
	}
}
export default Header;
