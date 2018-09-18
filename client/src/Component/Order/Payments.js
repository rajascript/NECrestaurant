import React, { Component } from "react";
import StripeCheckout from "react-stripe-checkout";
import { connect } from "react-redux";
import * as actions from "../../Action";
class Payments extends Component {
	render() {
		return (
			<StripeCheckout
				name={"Indique"}
				description={"Pay for your order"}
				amount={this.props.total}
				currency="INR"
				token={token => this.props.handleToken(token)}
				stripeKey={process.env.REACT_APP_STRIPE_KEY}
			>
				<a className="waves-effect waves-light btn">Pay</a>
			</StripeCheckout>
		);
	}
}
export default connect(
	null,
	actions
)(Payments);
