import {
  SET_SELECTED_COLUMN,
  SET_COLUMN,
  SET_PLATFORM,
  SET_ERR_CODE,
  SET_WRN_CODE
} from '../actions/types';

export const setSelectedColumn = payload => ({ type: SET_SELECTED_COLUMN, payload });
export const setColumn = payload => ({ type: SET_COLUMN, payload });
export const setPlatform = payload => ({ type: SET_PLATFORM, payload });
export const setErrCode = payload => ({ type: SET_ERR_CODE, payload });
export const setWrnCode = payload => ({ type: SET_WRN_CODE, payload });