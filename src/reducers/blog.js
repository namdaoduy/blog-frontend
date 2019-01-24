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

    case BlogAction.LIKE_BLOG_SUCCESS: {
      const newBlogData = {
        ...state.blogData,
        like: state.blogData.like + 1,
      };

      return {
        ...state,
        blogData: newBlogData,
        isLiked: true,
      };
    }

    default:
      break;
  }

  return state;
};