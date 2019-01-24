import { BlogAction } from '../constants/action';
import { get, post } from '../utils/request';

// Get blog's data by ID
export function getBlogById(blogId) {
  return {
    type: BlogAction.GET_BLOG_BY_ID,
    promise: get(`/blogs/${blogId}`),
  };
}

// Like a blog
export function likeBlog(blogId) {
  return {
    type: BlogAction.LIKE_BLOG,
    promise: post(`/likes/${blogId}`),
  };
}