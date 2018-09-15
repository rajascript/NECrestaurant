import { combineReducers } from "redux";
import authReducer from "./authReducer";
import adminReducer from "./adminReducer";
import bookingReducer from "./bookingReducer";

export default combineReducers({
	auth: authReducer,
	admin: adminReducer,
	booking: bookingReducer
});
