import { AppAction } from '../constants/action';
import { get } from '../utils/request';

// Get all new blogs for Homepage (has pagination)
export function getAllBlogs(data) {
  return {
    type: AppAction.GET_ALL_BLOGS,
    promise: get('/blogs', data),
  };
}

// Get 3 trending blogs with highest likes
export function getTrendingBlogs() {
  return {
    type: AppAction.GET_TRENDING_BLOGS,
    promise: get('/blogs/trending'),
  };
}