import React, { Component } from "react";

export default class AdminPanelSidebar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			valuesArray: []
		};
	}

	render() {
		return (
			<div className="adminPanel__sidebar">
				<div className="adminPanel__sidebar--item adminPanel__sidebar--logo">
					<img style={{ width: "50px" }} src="/assets/logo.png" />
				</div>
			</div>
		);
	}
}
