import React, { Component } from "react";

class Header extends Component {
	render() {
		console.log(this.props);
		return (
			<nav>
				<p className="header__text">I am a header.</p>
			</nav>
		);
	}
}
export default Header;
