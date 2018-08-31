import React, { Component } from "react";
import { Link } from "react-router-dom";
class Header extends Component {
  render() {
    console.log(this.props);
    return (
      <nav>
        <div>
          <Link to={"/"}>BRANDNAME</Link>
        </div>
      </nav>
    );
  }
}
export default Header;
