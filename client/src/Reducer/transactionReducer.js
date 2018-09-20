import { TRANSACTION, TRANSACTION_FAILED } from "../Action/types";

export default (state = null, action) => {
	switch (action.type) {
		case TRANSACTION:
			return action.payload;
		case TRANSACTION_FAILED:
			return action.payload;
		default:
			return state;
	}
};
