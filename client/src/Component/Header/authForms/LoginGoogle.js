import React, { Component } from "react";

export default class LoginGoogle extends Component {
	render() {
		return (
			<a href="/api/auth/google">
				<button
					onClick={this.props.loginGoogle}
					className="loginBtn loginBtn--google"
				>
					Login with Google
				</button>
			</a>
		);
	}
}
