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

	render() {
		return (
			<div className="adminPanel">
				<AdminPanelSidebar />
				<div className="adminPanel__body">
					<div className="adminPanel__header">
						<AdminPanelHeader admin={this.props.admin} />
					</div>
					<div className="adminPanel__panel">
						<Panel />
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
