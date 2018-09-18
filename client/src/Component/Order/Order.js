import React, { Component, Fragment } from "react";
import OrderForm from "./OrderForm";
import Payments from "./Payments";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { requestOrder } from "../../Action";
class Order extends Component {
	constructor(props) {
		super(props);
		this.state = {
			orderConfirmed: false,
			orderUserConfirmed: true,
			orderId: "",
			total: this.props.total || 400,
			user: {}
		};
	}
	componentWillReceiveProps(props) {
		console.log(props);
		if (
			typeof props.orders !== "undefined" &&
			props.orders !== null &&
			typeof props.orders.orderId !== "undefined"
		) {
			this.setState({
				orderUserConfirmed: true,
				orderId: props.orders.orderId
			});
		} else this.setState({ displayServerError: true });
		if (props.auth) {
			let emailValue = props.auth.email || "";
			let nameValue = props.auth.name || "";
			let phoneValue = props.auth.phone || "";
			this.setState({ emailValue, nameValue, phoneValue });
		}
	}
	render() {
		if (this.state.orderConfirmed) {
			return (
				<Redirect
					push
					to={{
						pathname: "/orderstatus",
						orderId: this.state.orderId
					}}
				/>
			);
		}
		return (
			<Fragment>
				{!this.state.orderUserConfirmed && <OrderForm />}
				{this.state.orderUserConfirmed && <Payments total={this.state.total} />}
			</Fragment>
		);
	}
}
function mapStateToProps({ orders, auth }) {
	console.log(this.props);
	return { orders, auth };
}

export default connect(
	mapStateToProps,
	{ requestOrder }
)(Order);
