import React, { Component, Fragment } from "react";

export default class DataRow extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<Fragment>
				<div className="adminPanel__panel__data--item adminPanel__panel__data--bookingId">
					{this.props.data.bookingId}
				</div>
				<div className="adminPanel__panel__data--item adminPanel__panel__data--name">
					{this.props.data.name}
				</div>
				<div className="adminPanel__panel__data--item adminPanel__panel__data--Phone">
					{this.props.data.Phone}
				</div>
				<div className="adminPanel__panel__data--item adminPanel__panel__data--seats">
					{this.props.data.seats}
				</div>
				<div className="adminPanel__panel__data--item adminPanel__panel__data--slot">
					{this.props.data.slot}
				</div>
				<div className="adminPanel__panel__data--item adminPanel__panel__data--action">
					{this.props.data.slot}
				</div>
			</Fragment>
		);
	}
}
