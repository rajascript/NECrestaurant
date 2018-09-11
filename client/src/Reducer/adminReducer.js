import {
	CREATE_ADMIN_FAILED,
	CREATE_ADMIN,
	DELETE_ADMIN_FAILED,
	DELETE_ADMIN,
	UPDATE_ADMIN_FAILED,
	UPDATE_ADMIN
} from "../Action/types";

export default (state = null, action) => {
	switch (action.type) {
		case CREATE_ADMIN:
			if (action.payload === "") return false;
			return action.payload;
		case CREATE_ADMIN_FAILED:
			if (action.payload === "") return false;
			return action.payload;
		case UPDATE_ADMIN:
			if (action.payload === "" || typeof action.payload === "undefined")
				return false;
			return action.payload;
		case UPDATE_ADMIN_FAILED:
			if (action.payload === "" || typeof action.payload === "undefined")
				return false;
			return action.payload;
		case DELETE_ADMIN:
			return action.payload;
		case DELETE_ADMIN_FAILED:
			if (action.payload === "" || typeof action.payload === "undefined")
				return false;
			else {
				return action.payload;
			}
		case ADMIN_LOGIN_FAILED:
			return action.payload;
		default:
			return state;
	}
};
