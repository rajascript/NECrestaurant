import { combineReducers } from "redux";
import authReducer from "./authReducer";
import adminReducer from "./adminReducer";
import bookingReducer from "./bookingReducer";
import orderReducer from "./orderReducer";
import bookingTasksReducer from "./bookingTasksReducer";

export default combineReducers({
	auth: authReducer,
	admin: adminReducer,
	bookings: bookingReducer,
	orders: orderReducer,
	bookingsTasks: bookingTasksReducer
});
