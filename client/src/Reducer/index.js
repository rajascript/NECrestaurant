import { combineReducers } from "redux";
import authReducer from "./authReducer";
import adminReducer from "./adminReducer";
import bookingReducer from "./bookingReducer";
import orderReducer from "./orderReducer";
import bookingTasksReducer from "./bookingTasksReducer";
import ordersTasksReducer from "./ordersTasksReducer";
import transactionReducer from "./transactionReducer";

export default combineReducers({
	auth: authReducer,
	admin: adminReducer,
	bookings: bookingReducer,
	orders: orderReducer,
	bookingsTasks: bookingTasksReducer,
	ordersTasks: ordersTasksReducer,
	transaction: transactionReducer
});
