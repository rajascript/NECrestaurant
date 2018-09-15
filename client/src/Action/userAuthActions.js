import axios from "axios";
import {
	FETCH_USER,
	FETCH_USER_FAILED,
	USER_SIGNUP,
	USER_LOGIN,
	USER_LOGOUT,
	USER_LOGIN_FAILED
} from "./types";
export const fetchUser = () => {
	return async dispatch => {
		try {
			const res = await axios.get("/api/current_user");
			dispatch({
				type: FETCH_USER,
				payload: res.data
			});
		} catch (err) {
			if (err.response.status === 401)
				dispatch({
					type: FETCH_USER_FAILED,
					payload: false
				});
		}
	};
};

export const signup = values => {
	return async dispatch => {
		try {
			const res = await axios.post("/api/signup", values);
			dispatch({
				type: USER_SIGNUP,
				payload: res.data
			});
		} catch (err) {
			console.log(err.response);
			if (err.response.status === 500)
				dispatch({
					type: USER_SIGNUP,
					payload: err.response.status
				});
		}
	};
};
export const loginGoogle = values => {
	return async dispatch => {
		try {
			const res = await axios.get("/api/auth/google");
			dispatch({
				type: USER_LOGIN,
				payload: res.data
			});
		} catch (err) {
			if (err.response.status === 401)
				dispatch({
					type: USER_LOGIN_FAILED,
					payload: "google_login_failed"
				});
		}
	};
};
export const login = values => {
	return async dispatch => {
		try {
			const res = await axios.post("/api/login", values);
			dispatch({
				type: USER_LOGIN,
				payload: res.data
			});
		} catch (err) {
			if (err.response.status === 401)
				dispatch({
					type: USER_LOGIN_FAILED,
					payload: "login_failed"
				});
		}
	};
};
export const logoutUser = values => {
	console.log("nda");
	return async dispatch => {
		try {
			await axios.get("/api/logout");
			dispatch({
				type: USER_LOGOUT,
				payload: false
			});
		} catch (err) {
			console.log(err);
			dispatch({
				type: USER_LOGOUT,
				payload: err.response.status
			});
		}
	};
};
