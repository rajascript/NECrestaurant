import axios from "axios";
import { FETCH_ADMIN, ADMIN_LOGIN_FAILED, ADMIN_LOGIN } from "./types";
//axios settings
axios.defaults.headers.common = {
	Authorization: "bearer " + localStorage.getItem("adminToken")
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
