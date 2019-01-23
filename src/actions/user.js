import { UserAction } from '../constants/action';
import { get, post, del } from '../utils/request';

export function loginGoogle(data) {
  return {
    type: UserAction.LOGIN_GOOGLE,
    promise: post('/login', data),
  };
}

export function logout() {
  return {
    type: UserAction.LOGOUT,
    payload: true,
  };
}

export function getUserInfo(userId) {
  return {
    type: UserAction.GET_USER_INFO,
    promise: get(`/users/${userId}`),
  };
}

export function getUserBlogs(userId) {
  return {
    type: UserAction.GET_USER_BLOG,
    promise: get(`/users/${userId}/blogs`),
  };
}

export function deleteBlog(blogId) {
  return {
    type: UserAction.DELETE_BLOG,
    promise: del(`/blogs/${blogId}`),
  };
}