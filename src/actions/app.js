import { AppAction } from '../constants/action';
import { get, post, put, del } from '../utils/request';

export function getAllBlogs(data) {
  return {
    type: AppAction.GET_ALL_BLOGS,
    promise: get('/blogs', data),
  };
}

export function getTrendingBlogs() {
  return {
    type: AppAction.GET_TRENDING_BLOGS,
    promise: get('/blogs/trending'),
  };
}