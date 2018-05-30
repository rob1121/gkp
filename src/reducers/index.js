import { combineReducers } from 'redux';
import page from './page_reducer';
import stdf_logs from './stdf_logs_reducer';

export default combineReducers({
  page, stdf_logs
});
