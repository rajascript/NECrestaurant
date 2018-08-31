import { FETCH_USER } from '../Action/types';

export default (state = null, action) => {
  switch (action.type) {
    case FETCH_USER:
      if(action.payload==="")
        return false;
      return action.payload;
    default:
      return state;
  }
};
