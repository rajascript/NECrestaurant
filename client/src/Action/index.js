import axios from "axios";
import {
	FETCH_USER,
	USER_SIGNUP,
	USER_LOGIN,
	USER_LOGIN_FAILED,
	ADMIN_LOGIN_FAILED,
	ADMIN_LOGIN
} from "./types";

export const fetchUser = () => {
	return async dispatch => {
		const res = await axios.get("/api/current_user");
		dispatch({
			type: FETCH_USER,
			payload: res.data
		});
	};
};
export const signup = values => {
	return async dispatch => {
		const res = await axios.post("/api/signup", values);
		dispatch({
			type: USER_SIGNUP,
			payload: res.status
		});
	};
};
export const login = values => {
	return async dispatch => {
		try {
			const res = await axios.post("/api/login", values);
			console.log("fe", res);
			dispatch({
				type: USER_LOGIN,
				payload: res.data
			});
		} catch (err) {
			console.log(err);
			dispatch({
				type: USER_LOGIN_FAILED,
				payload: err.response.status
			});
		}
	};
};

export const adminLogin = values => {
	return async dispatch => {
		try {
			const res = await axios.post("/api/adminLogin", values);
			console.log("Read", res);
			dispatch({
				type: ADMIN_LOGIN,
				payload: res.data
			});
		} catch (err) {
			console.log("eer", err.response.status);
			dispatch({
				type: ADMIN_LOGIN_FAILED,
				payload: err.response.status
			});
		}
	};
};
