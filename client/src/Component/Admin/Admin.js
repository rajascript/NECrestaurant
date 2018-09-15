import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import ButtonLoader from "../utils/ButtonLoader";
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
		return <div> {this.props.admin.username}</div>;
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
