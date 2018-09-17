import { combineReducers } from "redux";
import authReducer from "./authReducer";
import adminReducer from "./adminReducer";
import bookingReducer from "./bookingReducer";
import bookingTasksReducer from "./bookingTasksReducer";

export default combineReducers({
	auth: authReducer,
	admin: adminReducer,
	bookings: bookingReducer,
	bookingsTasks: bookingTasksReducer
});
