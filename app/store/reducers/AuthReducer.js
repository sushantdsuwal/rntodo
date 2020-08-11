import {
  SET_USER,
  SET_TOKEN,
  RESET_AUTH,
  RESET_TOKEN,
  REFRESH_ACCESS_TOKEN,
} from '../actionTypes';

const INITIAL_STATE = {
  user: {},
  status: {},
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
};

const AuthReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        ...action.payload,
      };

    case SET_TOKEN:
      return {
        ...state,
        accessToken: action.payload.accessToken,
        isAuthenticated: true,
      };

    case REFRESH_ACCESS_TOKEN:
      return {
        ...state,
        accessToken: action.payload,
      };

    case RESET_AUTH:
      return {};

    case RESET_TOKEN:
      return {
        ...state,
        user: {},
        status: {},
        accessToken: null,
        refreshToken: null,
        isAuthenticated: false,
      };

    default:
      return state;
  }
};

export default AuthReducer;
