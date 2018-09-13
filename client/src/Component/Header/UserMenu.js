import React, { Component } from "react";
export default class UserMenu extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<ul>
				<li>{this.props.user.name}</li>
				<li>Credits: {this.props.user.credits}</li>
				<li>
					<button
						onClick={this.props.logout}
						id="userMenu__button--loader"
						className="userMenu__button--loader"
					>
						Logout
					</button>
				</li>
			</ul>
		);
	}
}
