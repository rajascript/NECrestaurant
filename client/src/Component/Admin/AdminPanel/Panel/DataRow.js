import React, { Component, Fragment } from "react";
import { IconContext } from "react-icons";
import { FiDollarSign, FiX, FiCheck } from "react-icons/fi";
import { connect } from "react-redux";
import {
	confirmBooking,
	cancelBooking,
	revokeAndRefundBooking
} from "../../../../Action/index";
import ButtonLoader from "../../../utils/ButtonLoader";
import {
	CONFIRM_BOOKINGS_FAILED,
	CONFIRM_BOOKINGS,
	CANCEL_BOOKINGS_FAILED,
	CANCEL_BOOKINGS,
	RESERVE_BOOKINGS_FAILED,
	RESERVE_BOOKINGS,
	REVOKE_AND_REFUND_BOOKINGS_FAILED,
	REVOKE_AND_REFUND_BOOKINGS
} from "../../../../Action/types";
class DataRow extends Component {
	constructor(props) {
		super(props);
		this.state = {
			unread: true,
			backgroundColor: "",
			popupOption: 3,
			popupValues: {},
			popupVisible: false,
			popupMessage: "",
			popupSuccessVisible: false,
			loading: false,
			popupSuccess: "",
			popupErrorVisible: false,
			popupError: ""
		};
		this.confirmBookingClick = this.confirmBookingClick.bind(this);
		this.confirmPopupClick = this.confirmPopupClick.bind(this);
		this.cancelPopupClick = this.cancelPopupClick.bind(this);
		this.closePopupTimeout = this.closePopupTimeout.bind(this);
		this.confirmBookingClick = this.confirmBookingClick.bind(this);
		this.cancelBookingClick = this.cancelBookingClick.bind(this);
		this.revokeAndRefundBookingClick = this.revokeAndRefundBookingClick.bind(
			this
		);
	}
	confirmPopupClick() {
		switch (this.state.popupOption) {
			case 0:
				this.setState({ loading: true });
				this.props.confirmBooking(this.state.popupValues);
				break;
			case 1:
				this.setState({ loading: true });
				this.props.cancelBooking(this.state.popupValues);
				break;
			case 2:
				this.setState({ loading: true });
				this.props.revokeAndRefundBooking(this.state.popupValues);
				break;
			default:
				this.cancelPopup();
				break;
		}
	}
	cancelPopupClick() {
		this.setState({ popupVisible: false, popupMessage: "" });
	}
	confirmBookingClick() {
		let confirmApiValues = {
			bookingId: this.props.data.bookingId,
			date: this.props.data.date,
			slot: this.props.data.slot,
			by: this.props.admin.username + this.props.admin.empId
		};
		this.setState({
			popupOption: 0,
			popupValues: confirmApiValues,
			popupVisible: true,
			popupMessage: "Confirm booking " + this.props.data.bookingId + "?"
		});
	}
	cancelBookingClick() {
		let cancelApiValues = {
			bookingId: this.props.data.bookingId,
			date: this.props.data.date,
			slot: this.props.data.slot,
			by: this.props.admin.username + this.props.admin.empId
		};
		this.setState({
			popupOption: 1,
			popupValues: cancelApiValues,
			popupVisible: true,
			popupMessage: "Cancel booking " + this.props.data.bookingId + "?"
		});
	}
	revokeAndRefundBookingClick() {
		let revokeAndRefundApiValues = {
			bookingId: this.props.data.bookingId,
			date: this.props.data.date,
			slot: this.props.data.slot,
			by: this.props.admin.username + this.props.admin.empId,
			refundAmount: 100
		};
		this.setState({
			popupOption: 2,
			popupValues: revokeAndRefundApiValues,
			popupVisible: true,
			popupMessage:
				"Revoke and refund booking " + this.props.data.bookingId + "?"
		});
	}
	closePopupTimeout() {
		setTimeout(() => {
			this.setState({
				popupVisible: false,
				popupErrorVisible: false,
				popupSuccessVisible: false
			});
		}, 3000);
	}
	componentWillReceiveProps(props) {
		console.log(props);
		if (
			props.bookingsTasks !== null &&
			props.bookingsTasks.data.bookingId === this.props.data.bookingId
		) {
			switch (props.bookingsTasks.type) {
				case CONFIRM_BOOKINGS_FAILED:
					this.setState({
						backgroundColor: "black",
						loading: false,
						popupErrorVisible: true,
						popupError: props.bookingsTasks.data.responseError
					});
					break;
				case CONFIRM_BOOKINGS:
					this.setState({
						backgroundColor: "green",
						loading: false,
						popupSuccessVisible: true,
						popupSuccess: props.bookingsTasks.data.response
					});
					break;
				case CANCEL_BOOKINGS_FAILED:
					this.setState({
						backgroundColor: "black",
						loading: false,
						popupErrorVisible: true,
						popupError: props.bookingsTasks.data.responseError
					});
					break;
				case CANCEL_BOOKINGS:
					this.setState({
						backgroundColor: "red",
						loading: false,
						popupSuccessVisible: true,
						popupSuccess: props.bookingsTasks.data.response
					});
					break;
				case RESERVE_BOOKINGS_FAILED:
					this.setState({
						backgroundColor: "black",
						loading: false,
						popupErrorVisible: true,
						popupError: props.bookingsTasks.data.responseError
					});
					break;
				case RESERVE_BOOKINGS:
					this.setState({
						backgroundColor: "orange",
						loading: false,
						popupSuccessVisible: true,
						popupSuccess: props.bookingsTasks.data.response
					});
					break;
				case REVOKE_AND_REFUND_BOOKINGS_FAILED:
					this.setState({
						backgroundColor: "black",
						loading: false,
						popupErrorVisible: true,
						popupError: props.bookingsTasks.data.responseError
					});
					break;
				case REVOKE_AND_REFUND_BOOKINGS:
					this.setState({
						backgroundColor: "blue",
						loading: false,
						popupSuccessVisible: true,
						popupSuccess: props.bookingsTasks.data.response
					});
					break;
				default:
					break;
			}
			this.closePopupTimeout();
		}
	}
	getBookmark() {
		switch (this.props.data.status) {
			case "waiting":
				return "purple";
			case "canceled and refunded":
				return "blue";
			case "canceled by restaurant":
				return "red";
			case "confirmed":
				return "green";
			case "reserved":
				return "violet";
			default:
				return "black";
		}
	}
	render() {
		return (
			<Fragment>
				{this.state.unread && (
					<div
						style={{
							backgroundColor: this.state.backgroundColor || this.getBookmark()
						}}
						className="adminPanel__panel__data--item adminPanel__panel__data--unread"
					/>
				)}
				<div className="adminPanel__panel__data--item adminPanel__panel__data--bookingId">
					{this.props.data.bookingId}
				</div>
				<div className="adminPanel__panel__data--item adminPanel__panel__data--name">
					{this.props.data.name}
				</div>
				<div className="adminPanel__panel__data--item adminPanel__panel__data--phone">
					{this.props.data.phone}
				</div>
				<div className="adminPanel__panel__data--item adminPanel__panel__data--email">
					{this.props.data.email}
				</div>
				<div className="adminPanel__panel__data--item adminPanel__panel__data--seats">
					{this.props.data.seats}
				</div>
				<div className="adminPanel__panel__data--item adminPanel__panel__data--slot">
					{this.props.data.slot}
				</div>
				<div className="adminPanel__panel__data--actions">
					<div
						onClick={this.confirmBookingClick}
						className="adminPanel__panel__data__actions--confirm adminPanel__panel__data__actions--item"
					>
						<IconContext.Provider
							value={{ color: "green", className: "global-class-name" }}
						>
							<Fragment>
								<FiCheck />
							</Fragment>
						</IconContext.Provider>
					</div>
					<div
						onClick={this.cancelBookingClick}
						className="adminPanel__panel__data__actions--cancel adminPanel__panel__data__actions--item"
					>
						<IconContext.Provider
							value={{ color: "red", className: "global-class-name" }}
						>
							<Fragment>
								<FiX />
							</Fragment>
						</IconContext.Provider>
					</div>
					<div
						onClick={this.revokeAndRefundBookingClick}
						className="adminPanel__panel__data__actions--revokeAndRefund adminPanel__panel__data__actions--item"
					>
						<IconContext.Provider
							value={{ color: "blue", className: "global-class-name" }}
						>
							<Fragment>
								<FiDollarSign />
							</Fragment>
						</IconContext.Provider>
					</div>
				</div>
				{this.state.popupVisible && (
					<div className="adminPanel__panel__popup__container" />
				)}
				{this.state.popupVisible && (
					<div className="adminPanel__panel__popup">
						{this.state.loading && (
							<div className="adminPanel__panel__popup--title">
								<ButtonLoader />
							</div>
						)}
						{!this.state.popupErrorVisible &&
							!this.state.popupSuccessVisible &&
							!this.state.loading && (
								<div>
									<div className="adminPanel__panel__popup--title">
										{this.state.popupMessage}
									</div>
									<div className="adminPanel__panel__popup__actions">
										<div
											onClick={this.confirmPopupClick}
											className="adminPanel__panel__popup__actions--action adminPanel__panel__popup--confirm"
										>
											<IconContext.Provider
												value={{
													color: "green",
													className: "global-class-name"
												}}
											>
												<Fragment>
													<FiCheck />
												</Fragment>
											</IconContext.Provider>
										</div>
										<div
											onClick={this.cancelPopupClick}
											className="adminPanel__panel__popup__actions--action adminPanel__panel__popup--cancel"
										>
											<IconContext.Provider
												value={{
													color: "red",
													className: "global-class-name"
												}}
											>
												<Fragment>
													<FiX />
												</Fragment>
											</IconContext.Provider>
										</div>
									</div>
								</div>
							)}
						{this.state.popupSuccessVisible && (
							<div className="adminPanel__panel__popup--success">
								{this.state.popupSuccess}
							</div>
						)}
						{this.state.popupErrorVisible && (
							<div className="adminPanel__panel__popup--error">
								{this.state.popupError}
							</div>
						)}
					</div>
				)}
			</Fragment>
		);
	}
}
function mapStateToProps({ bookingsTasks, admin }) {
	return { bookingsTasks, admin };
}
export default connect(
	mapStateToProps,
	{ confirmBooking, cancelBooking, revokeAndRefundBooking }
)(DataRow);
