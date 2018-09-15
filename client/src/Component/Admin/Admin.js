import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import ButtonLoader from "../utils/ButtonLoader";
import AdminPanel from "./AdminPanel/AdminPanel";
import { fetchAdmin } from "../../Action/index";
class Admin extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	componentWillMount() {
		this.props.fetchAdmin();
	}
	render() {
		if (!this.props.admin) return <Redirect push to="/adminlogin" />;
		else if (typeof this.props.admin === "undefined")
			return <ButtonLoader size={60} />;
		return (
			<div>
				<AdminPanel />
			</div>
		);
	}
}

function mapStateToProps({ admin }) {
	console.log(admin);
	return { admin };
}

export default connect(
	mapStateToProps,
	{ fetchAdmin }
)(Admin);
