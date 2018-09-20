import axios from "axios";
import {
	ORDER_FOOD,
	ORDER_FOOD_FAILED,
	FETCH_ORDERS,
	FETCH_ORDERS_FAILED,
	CONFIRM_ORDERS_FAILED,
	CONFIRM_ORDERS,
	CANCEL_ORDERS_FAILED,
	CANCEL_ORDERS,
	REVOKE_AND_REFUND_ORDERS_FAILED,
	REVOKE_AND_REFUND_ORDERS,
	RESERVE_ORDERS_FAILED,
	RESERVE_ORDERS
} from "./types";

export const requestOrder = values => {
	return async dispatch => {
		try {
			const res = await axios.post("/api/requestOrder", values);
			dispatch({
				type: ORDER_FOOD,
				payload: res.data
			});
		} catch (err) {
			console.log(err);
			dispatch({
				type: ORDER_FOOD_FAILED,
				payload: err.response.status
			});
		}
	};
};
export const fetchOrders = date => {
	return async dispatch => {
		try {
			const res = await axios.post("/api/fetchOrders", date);
			dispatch({
				type: FETCH_ORDERS,
				payload: res.data
			});
		} catch (err) {
			dispatch({
				type: FETCH_ORDERS_FAILED,
				payload: err.response.status
			});
		}
	};
};
export const confirmOrder = values => {
	return async dispatch => {
		try {
			const res = await axios.post("/api/confirmOrder", values);

			dispatch({
				type: CONFIRM_ORDERS,
				payload: { type: CONFIRM_ORDERS, data: res.data }
			});
		} catch (err) {
			console.log(err);
			let errCode = err.response.status;
			dispatch({
				type: CONFIRM_ORDERS_FAILED,
				payload: { type: CONFIRM_ORDERS_FAILED, data: errCode }
			});
		}
	};
};

export const cancelOrder = values => {
	return async dispatch => {
		try {
			const res = await axios.post("/api/cancelOrder", values);

			dispatch({
				type: CANCEL_ORDERS,
				payload: { type: CANCEL_ORDERS, data: res.data }
			});
		} catch (err) {
			dispatch({
				type: CANCEL_ORDERS_FAILED,
				payload: { type: CANCEL_ORDERS_FAILED, data: err.response.status }
			});
		}
	};
};

export const revokeAndRefundOrder = values => {
	return async dispatch => {
		try {
			const res = await axios.post("/api/revokeAndRefundOrder", values);

			dispatch({
				type: REVOKE_AND_REFUND_ORDERS,
				payload: { type: REVOKE_AND_REFUND_ORDERS, data: res.data }
			});
		} catch (err) {
			dispatch({
				type: REVOKE_AND_REFUND_ORDERS_FAILED,
				payload: {
					type: REVOKE_AND_REFUND_ORDERS_FAILED,
					data: err.response.status
				}
			});
		}
	};
};

export const reserveOrder = values => {
	return async dispatch => {
		try {
			const res = await axios.post("/api/reserve", values);

			dispatch({
				type: RESERVE_ORDERS,
				payload: { type: RESERVE_ORDERS, data: res.data }
			});
		} catch (err) {
			dispatch({
				type: RESERVE_ORDERS_FAILED,
				payload: { type: RESERVE_ORDERS_FAILED, data: err.response.status }
			});
		}
	};
};
