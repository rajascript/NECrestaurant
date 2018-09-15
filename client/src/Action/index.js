import axios from "axios";
import {
	FETCH_USER,
	FETCH_USER_FAILED,
	FETCH_ADMIN,
	USER_SIGNUP,
	USER_SIGNUP_FAILED,
	USER_LOGIN,
	USER_LOGOUT,
	USER_LOGIN_FAILED,
	ADMIN_LOGIN_FAILED,
	ADMIN_LOGIN,
	BOOK_TABLE,
	BOOK_TABLE_FAILED
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

export const bookTable = values => {
	return async dispatch => {
		try {
			const res = await axios.post("/api/requestBooking", values);

			dispatch({
				type: BOOK_TABLE,
				payload: res.data
			});
		} catch (err) {
			dispatch({
				type: BOOK_TABLE_FAILED,
				payload: err.response.status
			});
		}
	};
};
