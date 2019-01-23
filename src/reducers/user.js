import { UserAction } from '../constants/action';
import Auth from '../utils/auth';

const INITIAL_STATE = {
  loggedIn: Auth.isAuth(),
  userInfo: {},
  userBlogs: [],
  edittingBlog: {},
};

export default (state = INITIAL_STATE, action) => {
  const UNAUTHORIZED_CODE = 40100;
  if (action && action.payload && action.payload.data && action.payload.data.errorCode === UNAUTHORIZED_CODE) {
    Auth.logout();
    return { ...INITIAL_STATE, loggedIn: false };
  }

  switch (action.type) {
    case UserAction.LOGIN_GOOGLE_SUCCESS: {
      Auth.setAuth(action.payload.data);
      return {
        ...state,
        loggedIn: true,
      };
    }

    case UserAction.LOGOUT: {
      Auth.logout();
      return {
        ...state,
        loggedIn: false,
      };
    }

    case UserAction.GET_USER_INFO_SUCCESS: {
      return {
        ...state,
        userInfo: action.payload.data,
      };
    }

    case UserAction.GET_USER_BLOG_SUCCESS: {
      return {
        ...state,
        userBlogs: action.payload.data,
      };
    }

    case UserAction.DELETE_BLOG_SUCCESS: {
      return state;
    }

    case UserAction.CREATE_BLOG_SUCCESS: {
      return state;
    }

    case UserAction.UPDATE_BLOG_SUCCESS: {
      return state;
    }

    case UserAction.GET_EDITTING_BLOG_SUCCESS: {
      return {
        ...state,
        edittingBlog: action.payload.data,
      };
    }

    default:
      break;
  }

  return state;
};