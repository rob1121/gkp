import {
  SET_PAGINATION
} from '../actions/types';


const INITIAL_STATE = {
    total: 0,
    per_page: 0,
    current_page: 0,
    last_page: 0,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_PAGINATION: {
      return {
        ...state,
        ...action.payload,
      };
    }
    default:
      return state;
  }
};
