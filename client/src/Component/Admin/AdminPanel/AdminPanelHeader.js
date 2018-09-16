import React, { Component, Fragment } from "react";
import { IconContext } from "react-icons";
import { FiUser } from "react-icons/fi";
export default class AdminPanelHeader extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<Fragment>
				<div className="adminPanel__header--logo" />
				<div className="adminPanel__header--heading">Bookings</div>
				<div className="adminPanel__header__adminInfo--container">
					<span className="adminPanel__header__adminInfo--username">
						{this.props.admin.username}
					</span>
					<span className="adminPanel__header__adminInfo--icon">
						<IconContext.Provider
							value={{ color: "white", className: "global-class-name" }}
						>
							<Fragment>
								<FiUser />
							</Fragment>
						</IconContext.Provider>
					</span>
				</div>
			</Fragment>
		);
	}
}
