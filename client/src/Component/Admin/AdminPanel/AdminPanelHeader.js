import React, { Component, Fragment } from "react";
import { IconContext } from "react-icons";
import { FiUser } from "react-icons/fi";
import AdminMenu from "./AdminMenu";
import { connect } from "react-redux";
import { adminDelete } from "../../../Action/adminAuthActions";
import { adminCreate } from "../../../Action/adminAuthActions";
import { adminUpdate } from "../../../Action/adminAuthActions";
class AdminPanelHeader extends Component {
  state = { AdminMenuVisible: false };
  constructor(props) {
    super(props);
    this.toggleAdminMenu = this.toggleAdminMenu.bind(this);
    this.handleAddAdmin = this.handleAddAdmin.bind(this);
    this.handleDeleteAdmin = this.handleDeleteAdmin.bind(this);
    this.handleUpdateAdmin = this.handleUpdateAdmin.bind(this);
    this.state = {};
  }

  handleAddAdmin() {
    this.props.logoutUser();
  }
  handleDeleteAdmin() {
    this.props.logoutUser();
  }
  handleUpdateAdmin() {
    this.props.logoutUser();
  }

  toggleAdminMenu() {
    if (!this.state.adminMenuVisible) {
      this.setState({ adminMenuVisible: true });
    } else {
      this.setState({ adminMenuVisible: false });
    }
  }

  render() {
    return (
      <Fragment>
        <div className="adminPanel__header--logo" />
        <div className="adminPanel__header--heading">Bookings</div>
        <div className="adminPanel__header__adminInfo--container">
          <button
            onClick={this.toggleAdminMenu}
            id="headerButtonUser"
            className="header__button--user"
          >
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
          </button>
          {this.state.adminMenuVisible && (
            <div className="adminmenu">
              <AdminMenu
                admin={this.props.admin}
                AddAdmin={this.handleAddAdmin}
                DeleteAdmin={this.handleDeleteAdmin}
                UpdateAdmin={this.handleUpdateAdmin}
              />
            </div>
          )}
        </div>
      </Fragment>
    );
  }
}
function mapStateToProps({ admin }) {
  return { admin };
}
export default connect(
  mapStateToProps,
  {
    adminDelete,
    adminCreate,
    adminUpdate
  }
)(AdminPanelHeader);
