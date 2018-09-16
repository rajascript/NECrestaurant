import axios from "axios";
import {
	BOOK_TABLE,
	BOOK_TABLE_FAILED,
	FETCH_BOOKINGS,
	FETCH_BOOKINGS_FAILED,
	CONFIRM_BOOKINGS_FAILED,
	CONFIRM_BOOKINGS,
	CANCEL_BOOKINGS_FAILED,
	CANCEL_BOOKINGS,
	REVOKE_AND_REFUND_BOOKINGS_FAILED,
	REVOKE_AND_REFUND_BOOKINGS,
	RESERVE_BOOKINGS_FAILED,
	RESERVE_BOOKINGS
} from "./types";

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
export const fetchBookings = date => {
	return async dispatch => {
		try {
			const res = await axios.post("/api/fetchBookings", date);

			dispatch({
				type: FETCH_BOOKINGS,
				payload: res.data
			});
		} catch (err) {
			dispatch({
				type: FETCH_BOOKINGS_FAILED,
				payload: err.response.status
			});
		}
	};
};
export const confirmBooking = values => {
	return async dispatch => {
		try {
			const res = await axios.post("/api/confirmBooking", values);

			dispatch({
				type: CONFIRM_BOOKINGS,
				payload: { type: CONFIRM_BOOKINGS, data: res.data }
			});
		} catch (err) {
			let errCode = err.response.status;
			dispatch({
				type: CONFIRM_BOOKINGS_FAILED,
				payload: { type: CONFIRM_BOOKINGS_FAILED, data: errCode }
			});
		}
	};
};

export const cancelBooking = values => {
	return async dispatch => {
		try {
			const res = await axios.post("/api/cancelBooking", values);

			dispatch({
				type: CANCEL_BOOKINGS,
				payload: { type: CANCEL_BOOKINGS, data: res.data }
			});
		} catch (err) {
			dispatch({
				type: CANCEL_BOOKINGS_FAILED,
				payload: { type: CANCEL_BOOKINGS_FAILED, data: err.response.status }
			});
		}
	};
};

export const revokeAndRefundBooking = values => {
	return async dispatch => {
		try {
			const res = await axios.post("/api/revokeAndRefundBooking", values);

			dispatch({
				type: REVOKE_AND_REFUND_BOOKINGS,
				payload: { type: REVOKE_AND_REFUND_BOOKINGS, data: res.data }
			});
		} catch (err) {
			dispatch({
				type: REVOKE_AND_REFUND_BOOKINGS_FAILED,
				payload: {
					type: REVOKE_AND_REFUND_BOOKINGS_FAILED,
					data: err.response.status
				}
			});
		}
	};
};

export const reserveBooking = values => {
	return async dispatch => {
		try {
			const res = await axios.post("/api/reserve", values);

			dispatch({
				type: RESERVE_BOOKINGS,
				payload: { type: RESERVE_BOOKINGS, data: res.data }
			});
		} catch (err) {
			dispatch({
				type: RESERVE_BOOKINGS_FAILED,
				payload: { type: RESERVE_BOOKINGS_FAILED, data: err.response.status }
			});
		}
	};
};
