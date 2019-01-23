import { BlogAction } from '../constants/action';

const INITIAL_STATE = {
  blogData: {},
  isLiked: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case BlogAction.GET_BLOG_BY_ID_SUCCESS: {
      return {
        ...state,
        blogData: action.payload.data,
        isLiked: !!action.payload.data.isLiked,
      };
    }

    default:
      break;
  }

  return state;
};