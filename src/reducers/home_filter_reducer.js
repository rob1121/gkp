import {
  SET_SELECTED_COLUMN,
  SET_COLUMN,
  SET_PLATFORM,
  SET_ERR_CODE,
  SET_WRN_CODE
} from '../actions/types';


const INITIAL_STATE = {
  selected_columns: [],
  columns: [],
  platform: [],
  err_code: [],
  wrn_code: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_SELECTED_COLUMN: {
      return {
        ...state,
        selected_columns: {
          ...state.selected_columns,
          ...action.payload,
        }
      };
    }
    case SET_COLUMN: {
      return {
        ...state,
        columns: {
          ...state.columns,
          ...action.payload,
        }
      };
    }
    case SET_PLATFORM: {
      return {
        ...state,
        platform: {
          ...state.platform,
          ...action.payload,
        }
      };
    }
    case SET_ERR_CODE: {
      return {
        ...state,
        err_code: {
          ...state.err_code,
          ...action.payload,
        }
      };
    }
    case SET_WRN_CODE: {
      return {
        ...state,
        wrn_code: {
          ...state.wrn_code,
          ...action.payload,
        }
      };
    }
    default:
      return state;
  }
};
