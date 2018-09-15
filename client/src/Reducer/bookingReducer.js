import { BOOK_TABLE, BOOK_TABLE_FAILED } from "../Action/types";

export default (state = null, action) => {
	switch (action.type) {
		case BOOK_TABLE:
			if (action.payload === "") return false;
			return action.payload;
		case BOOK_TABLE_FAILED:
			return action.payload;
		default:
			return state;
	}
};
