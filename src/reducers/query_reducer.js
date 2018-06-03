import moment from 'moment';
import {
  SET_QUERY
} from '../actions/types';

const INITIAL_STATE = {
  platform: '',
  err_code: '',
  wrn_code: '',
  lot_id: '',
  sort_type: '',
  sort_col: '',
  date_range: [ 
    moment().format('YYYY-DD-MM 00:00:00'),
    moment().format('YYYY-DD-MM 23:59:59'),
  ],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_QUERY: {
      return {
        ...state,
        ...action.payload,
      };
    }
    default:
      return state;
  }
};
