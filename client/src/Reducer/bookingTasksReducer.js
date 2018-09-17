import {
	CONFIRM_BOOKINGS_FAILED,
	CONFIRM_BOOKINGS,
	CANCEL_BOOKINGS_FAILED,
	CANCEL_BOOKINGS,
	RESERVE_BOOKINGS_FAILED,
	RESERVE_BOOKINGS,
	REVOKE_AND_REFUND_BOOKINGS_FAILED,
	REVOKE_AND_REFUND_BOOKINGS
} from "../Action/types";

export default (state = null, action) => {
	switch (action.type) {
		case CONFIRM_BOOKINGS_FAILED:
			return action.payload;
		case CONFIRM_BOOKINGS:
			return action.payload;
		case CANCEL_BOOKINGS_FAILED:
			return action.payload;
		case CANCEL_BOOKINGS:
			return action.payload;
		case RESERVE_BOOKINGS_FAILED:
			return action.payload;
		case RESERVE_BOOKINGS:
			return action.payload;
		case REVOKE_AND_REFUND_BOOKINGS_FAILED:
			return action.payload;
		case REVOKE_AND_REFUND_BOOKINGS:
			return action.payload;
		default:
			return state;
	}
};
