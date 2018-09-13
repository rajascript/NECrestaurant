import axios from "axios";
import {
	FETCH_USER,
	FETCH_USER_FAILED,
	FETCH_ADMIN,
	USER_SIGNUP,
	USER_LOGIN,
	USER_LOGOUT,
	USER_LOGIN_FAILED,
	ADMIN_LOGIN_FAILED,
	ADMIN_LOGIN
} from "./types";
//axios settings
axios.defaults.headers.common = {
	Authorization: "bearer " + localStorage.getItem("adminToken")
};

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
export const fetchAdmin = () => {
	return async dispatch => {
		const res = await axios.get("/api/admin/current_admin");
		dispatch({
			type: FETCH_ADMIN,
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
			const res = await axios.get("/api/logout");
			dispatch({
				type: USER_LOGOUT,
				payload: res.data
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
export const adminLogin = values => {
	return async dispatch => {
		try {
			const res = await axios.post("/api/admin/login", values);

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

export const adminDelete = values => {
	return async dispatch => {
		try {
			const res = await axios.post("/api/admin/delete", values);
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

export const adminCreate = values => {
	return async dispatch => {
		try {
			const res = await axios.post("/api/admin/create", values);
			dispatch({
				type: ADMIN_LOGIN,
				payload: res.data
			});
		} catch (err) {
			dispatch({
				type: ADMIN_LOGIN_FAILED,
				payload: err.response.status
			});
		}
	};
};

export const adminUpdate = values => {
	return async dispatch => {
		try {
			const res = await axios.post("/api/admin/update", values);

			dispatch({
				type: ADMIN_LOGIN,
				payload: res.data
			});
		} catch (err) {
			dispatch({
				type: ADMIN_LOGIN_FAILED,
				payload: err.response.status
			});
		}
	};
};
