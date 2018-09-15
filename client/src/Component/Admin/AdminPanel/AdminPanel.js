import React, { Component } from "react";
import { connect } from "react-redux";

class AdminPanel extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return <div>Hello</div>;
	}
}
function mapStateToProps({ admin }) {
	return { admin };
}
export default connect(mapStateToProps)(AdminPanel);
