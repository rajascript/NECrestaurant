import React, { Component } from "react";
import { connect } from "react-redux";
import AdminPanelHeader from "./AdminPanelHeader";
import Panel from "./Panel/Panel";
import AdminPanelSidebar from "./AdminPanelSidebar";
class AdminPanel extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	moveToBookings() {
		this.childPanel.moveToBookings();
	}
	moveToOrders() {
		this.childPanel.moveToOrders();
	}
	componentDidMount() {
		console.log(this.childPanel);
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
						<Panel ref={ref => (this.childPanel = ref)} />
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
