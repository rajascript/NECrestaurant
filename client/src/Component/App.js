import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../Action";
import Header from "./Header";
import Dashboard from "./Dashboard";
import "./App.css";

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }
  render() {
    return (
      <div>
        <Router>
          <div>
            <div>
              <Header />
            </div>
            <Route path="/" component={Dashboard} />
          </div>
        </Router>
      </div>
    );
  }
}
export default connect(null, actions)(App);
