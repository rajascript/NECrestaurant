import React, { Component } from "react";
export default class UserMenu extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<div className="usermenu__container">
				<div className="usermenu--item">
					<button
						onClick={this.props.logout}
						id="userMenuButtonLoader"
						className="btn btn-primary userMenu__button--loader"
					>
						Logout
					</button>
				</div>
				<div className="usermenu--item">{this.props.user.name}</div>
				<div className="usermenu--item">Credits: {this.props.user.credits}</div>
			</div>
		);
	}
}
