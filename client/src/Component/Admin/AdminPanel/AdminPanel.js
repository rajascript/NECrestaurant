import React, { Component } from "react";
import { connect } from "react-redux";
import AdminPanelHeader from "./AdminPanelHeader";
import Panel from "./Panel/Panel";
import AdminPanelSidebar from "./AdminPanelSidebar";
class AdminPanel extends Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.moveToBookings = this.moveToBookings.bind(this);
		this.moveToOrders = this.moveToOrders.bind(this);
	}
	moveToBookings() {
		console.log("dancnu");
		this["childPanel"].getWrappedInstance().moveToBookings();
	}
	moveToOrders() {
		this["childPanel"].getWrappedInstance().moveToOrders();
	}

	render() {
		return (
			<div className="adminPanel">
				<AdminPanelSidebar
					moveToBookings={this.moveToBookings}
					moveToOrders={this.moveToOrders}
				/>
				<div className="adminPanel__body">
					<div className="adminPanel__header">
						<AdminPanelHeader admin={this.props.admin} />
					</div>
					<div className="adminPanel__panel">
						<Panel
							ref={ref => {
								this["childPanel"] = ref;
							}}
						/>
					</div>
				</div>
			</div>
		);
	}
}
function mapStateToProps({ admin }) {
	return { admin };
}
export default connect(mapStateToProps)(AdminPanel);
