import React, { Component, Fragment } from "react";
import DataRow from "./DataRow";
import moment from "moment";
import { connect } from "react-redux";
import { fetchBookings } from "../../../../Action/index";
class Panel extends Component {
	constructor(props) {
		super(props);
		this.state = {
			valuesArray: [],
			moment: moment(),
			date: ""
		};
	}
	componentDidMount() {
		if (this.state.date === "")
			this.setState({ date: this.state.moment.format("DD-MM-YY") });
		this.props.fetchBookings({ date: this.state.moment.format("DD-MM-YY") });
	}
	renderData() {
		let key = -1;
		return this.state.valuesArray.map(data => {
			let dat = [];
			for (let slot in data) {
				let currSlot = data[slot];
				for (let booking in currSlot) {
					key += 1;
					let currBooking = currSlot[booking];
					currBooking.slot = slot;
					currBooking.date = this.state.date;
					dat.push(
						<div className="adminPanel__panel__data" key={key}>
							<DataRow data={currBooking} />
						</div>
					);
				}
			}
			return dat;
		});
	}
	componentWillReceiveProps(props) {
		this.setState({ valuesArray: [props.bookings] });
	}
	render() {
		return (
			<Fragment>
				<div className="adminPanel__panel__header">
					<div className="adminPanel__panel__bookings__container">
						<div className="adminPanel__panel__heading">#Booking Id</div>
						<div className="adminPanel__panel__heading">Name</div>
						<div className="adminPanel__panel__heading">Phone</div>
						<div className="adminPanel__panel__heading">Email</div>
						<div className="adminPanel__panel__heading">Seats</div>
						<div className="adminPanel__panel__heading adminPanel__panel__heading--slot">
							Slot
						</div>
						<div className="adminPanel__panel__heading">Action</div>
					</div>
				</div>
				<div className="adminPanel__panel__body">{this.renderData()}</div>
			</Fragment>
		);
	}
}
function mapStateToProps({ bookings }) {
	console.log(bookings);
	return { bookings };
}
export default connect(
	mapStateToProps,
	{ fetchBookings }
)(Panel);
