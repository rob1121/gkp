import { combineReducers } from 'redux';
import page from './page_reducer';
import stdf_logs from './stdf_logs_reducer';
import home_filter from './home_filter_reducer';

export default combineReducers({
  page, stdf_logs, home_filter
});
