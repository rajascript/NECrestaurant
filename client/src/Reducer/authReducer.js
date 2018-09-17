import {
	FETCH_USER,
	USER_SIGNUP,
	USER_LOGIN,
	USER_LOGIN_FAILED,
	USER_LOGOUT,
	FETCH_USER_FAILED
} from "../Action/types";

export default (state = null, action) => {
	switch (action.type) {
		case FETCH_USER:
			if (action.payload === "") return false;
			return action.payload;
		case FETCH_USER_FAILED:
			return action.payload;
		case USER_SIGNUP:
			console.log("sign");
			if (action.payload === "" || typeof action.payload === "undefined") {
				console.log("nulla");
				return false;
			}
			console.log("payload");
			return action.payload;
		case USER_LOGIN:
			if (action.payload === "" || typeof action.payload === "undefined")
				return false;
			return action.payload;
		case USER_LOGOUT:
			if (action.payload === "" || typeof action.payload === "undefined")
				return false;
			return action.payload;
		case USER_LOGIN_FAILED:
			return action.payload;
		default:
			return state;
	}
};
