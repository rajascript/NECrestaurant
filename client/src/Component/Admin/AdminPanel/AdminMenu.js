import React, { Component } from "react";
export default class AdminMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="adminmenu__container">
        <div className="adminmenu--item">
          <button
            onClick={this.props.logout} //edit the function
            id="adminMenuButtonLoader"
            className="btn btn-primary adminMenu__button--loader"
          >
            Logout
          </button>
        </div>

        <div style={{ color: "black" }} className="adminmenu--item">
          {this.props.admin.name}
        </div>

        <div className="adminmenu--item">
          <button
            onClick={this.props.logout} //edit the function
            id="adminMenuButtonLoader"
            className="btn btn-primary adminMenu__button--loader"
          >
            Add Admin
          </button>
        </div>

        <div className="adminmenu--item">
          <button
            onClick={this.props.logout} //edit the function
            id="adminMenuButtonLoader"
            className="btn btn-primary adminMenu__button--loader"
          >
            Delete Admin
          </button>
        </div>
        <div className="adminmenu--item">
          <button
            onClick={this.props.logout} //edit the function
            id="adminMenuButtonLoader"
            className="btn btn-primary adminMenu__button--loader"
          >
            Update Admin
          </button>
        </div>
      </div>
    );
  }
}
