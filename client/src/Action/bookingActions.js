import axios from "axios";
import {
	BOOK_TABLE,
	BOOK_TABLE_FAILED,
	FETCH_BOOKINGS,
	FETCH_BOOKINGS_FAILED
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
