import { UserAction } from '../constants/action';
import { get, post, put, del } from '../utils/request';

// Login with Google, send auth data from Google login popup
export function loginGoogle(data) {
  return {
    type: UserAction.LOGIN_GOOGLE,
    promise: post('/login', data),
  };
}

// Logout
export function logout() {
  return {
    type: UserAction.LOGOUT,
    payload: true,
  };
}

// Get user info for Profile page
export function getUserInfo(userId) {
  return {
    type: UserAction.GET_USER_INFO,
    promise: get(`/users/${userId}`),
  };
}

// Get all blogs writen by this user
export function getUserBlogs(userId) {
  return {
    type: UserAction.GET_USER_BLOG,
    promise: get(`/users/${userId}/blogs`),
  };
}

// Delete a blog
export function deleteBlog(blogId) {
  return {
    type: UserAction.DELETE_BLOG,
    promise: del(`/blogs/${blogId}`),
  };
}

// Create a new blog
export function createBlog(data) {
  return {
    type: UserAction.CREATE_BLOG,
    promise: post('/blogs', data),
  };
}

// Edit a blog
export function updateBlog(data) {
  return {
    type: UserAction.UPDATE_BLOG,
    promise: put(`/blogs/${data.id}`, data),
  };
}

// Get a blog's data to edit it
export function getEdittingBlog(blogId) {
  return {
    type: UserAction.GET_EDITTING_BLOG,
    promise: get(`/blogs/${blogId}`),
  };
}