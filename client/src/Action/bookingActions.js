import axios from "axios";
import { BOOK_TABLE, BOOK_TABLE_FAILED } from "./types";

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
