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
					<img
						style={{ width: "50px" }}
						alt="Fig_Sidebar"
						src="/assets/logo.png"
					/>
				</div>
				<div className="adminPanel__sidebar--item adminPanel__sidebar--booking">
					<h5
						onClick={() => {
							this.props.moveToBookings();
						}}
					>
						Bookings
					</h5>
				</div>
				<div className="adminPanel__sidebar--item adminPanel__sidebar--order">
					<h5
						onClick={() => {
							this.props.moveToOrders();
						}}
					>
						Orders
					</h5>
				</div>
			</div>
		);
	}
}
