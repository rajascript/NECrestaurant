import axios from "axios";
import { TRANSACTION, TRANSACTION_FAILED } from "./types";

export const handleToken = Token => {
	console.log(Token);
	return async dispatch => {
		try {
			const res = await axios.post("/api/stripe", Token);
			dispatch({ type: TRANSACTION, payload: res.data });
		} catch (err) {
			dispatch({ type: TRANSACTION_FAILED, payload: err.response.status });
		}
	};
};

export const handleCod = Token => {
	return async dispatch => {
		try {
			const res = await axios.post("/api/cod", Token);
			dispatch({ type: TRANSACTION, payload: res.data });
		} catch (err) {
			dispatch({ type: TRANSACTION_FAILED, payload: err.response.status });
		}
	};
};
