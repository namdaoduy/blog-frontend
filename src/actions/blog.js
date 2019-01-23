import { BlogAction } from '../constants/action';
import { get, post, put } from '../utils/request';

export function getBlogById(blogId) {
  return {
    type: BlogAction.GET_BLOG_BY_ID,
    promise: get(`/blogs/${blogId}`),
  };
}

export function likeBlog(blogId) {
  return {
    type: BlogAction.LIKE_BLOG,
    promise: post(`/likes/${blogId}`),
  };
}