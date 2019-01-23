import { AppAction } from '../constants/action';

const INITIAL_STATE = {
  allBlogs: [],
  trendingBlogs: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AppAction.GET_ALL_BLOGS_SUCCESS: {
      return {
        ...state,
        allBlogs: action.payload.data,
      };
    }

    case AppAction.GET_TRENDING_BLOGS_SUCCESS: {
      return {
        ...state,
        trendingBlogs: action.payload.data,
      };
    }

    default:
      break;
  }

  return state;
};