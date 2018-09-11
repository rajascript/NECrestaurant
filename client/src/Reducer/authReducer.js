import {
	FETCH_USER,
	USER_SIGNUP,
	USER_LOGIN,
	ADMIN_LOGIN,
	USER_LOGIN_FAILED,
	ADMIN_LOGIN_FAILED
} from "../Action/types";

export default (state = null, action) => {
	switch (action.type) {
		case FETCH_USER:
			if (action.payload === "") return false;
			return action.payload;
		case USER_SIGNUP:
			if (action.payload === "" || typeof action.payload === "undefined")
				return false;
			return action.payload;
		case USER_LOGIN:
			if (action.payload === "" || typeof action.payload === "undefined")
				return false;
			return action.payload;
		case USER_LOGIN_FAILED:
			return action.payload;
		case ADMIN_LOGIN:
			if (action.payload === "" || typeof action.payload === "undefined")
				return false;
			return action.payload;
		case ADMIN_LOGIN_FAILED:
			return action.payload;
		default:
			return state;
	}
};
