import { ORDER_FOOD, ORDER_FOOD_FAILED } from "../Action/types";

export default (state = null, action) => {
	switch (action.type) {
		case ORDER_FOOD:
			return action.payload;
		case ORDER_FOOD_FAILED:
			return action.payload;
		default:
			return state;
	}
};
