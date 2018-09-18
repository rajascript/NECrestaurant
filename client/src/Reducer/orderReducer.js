import {
	ORDER_FOOD,
	ORDER_FOOD_FAILED,
	CONFIRM_ORDERS_FAILED,
	CONFIRM_ORDERS,
	CANCEL_ORDERS_FAILED,
	CANCEL_ORDERS,
	RESERVE_ORDERS_FAILED,
	RESERVE_ORDERS,
	REVOKE_AND_REFUND_ORDERS_FAILED,
	REVOKE_AND_REFUND_ORDERS
} from "../Action/types";

export default (state = null, action) => {
	switch (action.type) {
		case ORDER_FOOD:
			return action.payload;
		case ORDER_FOOD_FAILED:
			return action.payload;
		case CONFIRM_ORDERS_FAILED:
			return action.payload;
		case CONFIRM_ORDERS:
			return action.payload;
		case CANCEL_ORDERS_FAILED:
			return action.payload;
		case CANCEL_ORDERS:
			return action.payload;
		case RESERVE_ORDERS_FAILED:
			return action.payload;
		case RESERVE_ORDERS:
			return action.payload;
		case REVOKE_AND_REFUND_ORDERS_FAILED:
			return action.payload;
		case REVOKE_AND_REFUND_ORDERS:
			return action.payload;
		default:
			return state;
	}
};
