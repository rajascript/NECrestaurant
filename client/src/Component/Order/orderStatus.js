import React, { Component } from "react";
import * as firebase from "firebase";

export default class OrderStatus extends Component {
	constructor(props) {
		super(props);
		this.state = {
			status: "waiting",
			orderId: ""
		};
	}
	componentDidMount() {
		console.log("pa", this.props);
		let db = firebase.database();
		let dbRef = db
			.ref()
			.child(
				"orders" +
					"/" +
					this.props.location.date +
					"/" +
					this.props.location.date +
					"/" +
					this.props.location.slot +
					"/" +
					this.props.location.orderId
			);
		dbRef.on("value", snapshot => {
			this.setState({ status: snapshot.val().status });
		});
		if (this.state.orderId === "") {
			this.setState({
				orderId: this.props.location.orderId,
				date: this.props.location.date,
				slot: this.props.location.slot
			});
		}
	}
	render() {
		return (
			<div>
				<div> {this.props.location.orderId} </div>
				<div> {this.state.status} </div>
			</div>
		);
	}
}
