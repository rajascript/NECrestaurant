import React, { Component, Fragment } from "react";
import DataRow from "./DataRow";
import moment from "moment";
import { IconContext } from "react-icons";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
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
		this.clickNext = this.clickNext.bind(this);
		this.clickPrev = this.clickPrev.bind(this);
	}
	componentDidMount() {
		console.log("ca");
		if (this.state.date === "")
			this.setState({ date: this.state.moment.format("DD-MM-YY") });
		this.props.fetchBookings({ date: this.state.moment.format("DD-MM-YY") });
	}
	clickNext() {
		let currDay = this.state.moment;
		let tomorrow = moment(currDay).add(1, "days");
		console.log(tomorrow);
		this.setState({ moment: tomorrow, date: tomorrow.format("DD-MM-YY") });
		this.props.fetchBookings({ date: tomorrow.format("DD-MM-YY") });
	}
	clickPrev() {}
	renderData() {
		if (
			this.state.valuesArray[0] === 404 ||
			this.state.valuesArray[0] === "404"
		) {
			return (
				<div className="adminPanel__panel--fetchError">
					No data exists for the specified date.
				</div>
			);
		}
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
		console.log(props.bookings);
		this.setState({ valuesArray: [props.bookings] });
	}
	render() {
		return (
			<Fragment>
				<div className="adminPanel__panel__date">
					<div className="adminPanel__panel__container">
						<div
							onClick={this.clickPrev}
							className="adminPanel__panel__date--prev"
						>
							<IconContext.Provider
								value={{ color: "red", className: "global-class-name" }}
							>
								<Fragment>
									<FiChevronLeft />
								</Fragment>
							</IconContext.Provider>
						</div>
						<div className="adminPanel__panel__date--date">
							{this.state.date}
						</div>
						<div
							onClick={this.clickNext}
							className="adminPanel__panel__date--next"
						>
							<IconContext.Provider
								value={{ color: "red", className: "global-class-name" }}
							>
								<Fragment>
									<FiChevronRight />
								</Fragment>
							</IconContext.Provider>
						</div>
					</div>
				</div>
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
