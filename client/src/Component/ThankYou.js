import React, { Component } from "react";
import * as firebase from "firebase";
var config = {
	apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
	authDomain: process.env.REACT_APP_FIREBASE_AUTH_KEY,
	databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_KEY,
	projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID_KEY,
	storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET_KEY,
	messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGE_KEY
};
//firebase.initializeApp(config);
export default class ThankYou extends Component {
	constructor(props) {
		super(props);
		this.state = {
			bookingId: "",
			status: "waiting"
		};
	}
	componentDidMount() {
		console.log("pa", this.props);
		let db = firebase.database();
		let dbRef = db
			.ref()
			.child(
				"bookings" +
					"/" +
					this.props.location.date +
					"/" +
					this.props.location.date +
					"/" +
					this.props.location.slot +
					"/" +
					this.props.location.bookingId
			);
		dbRef.on("value", snapshot => {
			this.setState({ status: snapshot.val().status });
		});
		if (this.state.bookingId === "") {
			this.setState({
				bookingId: this.props.location.bookingId,
				date: this.props.location.date,
				slot: this.props.location.slot
			});
		}
	}
	render() {
		return (
			<div className="thankyou__container">
				<div> Thank you </div>
				<div> {this.state.bookingId} </div>
				<div> {this.state.status} </div>
			</div>
		);
	}
}
