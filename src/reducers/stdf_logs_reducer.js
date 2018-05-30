import {
  SET_STDF_LOGS
} from '../actions/types';


const INITIAL_STATE = [{
  id: '',
  platform: '',
  file_name: '',
  file_size: '',
  tester_id: '',
  lot_id: '',
  op_code: '',
  wafer_id: '',
  parse_time: '',
  transfer_time: '',
  mode_cod: '',
  rsst_cod: '',
  err_code: '',
  wrn_code: '',
  time_stamp: '',
  total_tested: '',
  total_good: '',
  total_bad: '',
}];

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_STDF_LOGS: {
      return {
        ...state,
        ...action.payload,
      };
    }
    default:
      return state;
  }
};
