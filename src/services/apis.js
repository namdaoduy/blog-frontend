import configs from '../configs';

const API_URL = configs.apiUrl;

class _API {
  async postLogin(googleResponse) {
    const res = await fetch(`${API_URL}/login`, {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify(googleResponse),
    });
    const result = await res.json();
    return result;
  }

  async getUserInfo(user_id) {
    const res = await fetch(`${API_URL}/users/${user_id}`, {
      headers: {
        'Access-Control-Allow-Origin': '*:*',
        'Content-Type': 'application/json',
      },
    });
    const result = await res.json();
    return result;
  }

  async getAllBlogs() {
    const res = await fetch(`${API_URL}/blogs`, {
      headers: {
        'Access-Control-Allow-Origin': '*:*',
        'Content-Type': 'application/json',
      },
    });
    const result = await res.json();
    return result;
  }

  async getTrendingBlogs() {
    const res = await fetch(`${API_URL}/blogs/trending`, {
      headers: {
        'Access-Control-Allow-Origin': '*:*',
        'Content-Type': 'application/json',
      },
    });
    const result = await res.json();
    return result;
  }

  async getBlogById(blog_id) {
    const res = await fetch(`${API_URL}/blogs/${blog_id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const result = await res.json();
    return result;
  }

  async getBlogsByUser(user_id) {
    const res = await fetch(`${API_URL}/users/${user_id}/blogs`, {
      headers: { 'Content-Type': 'application/json' },
    });
    const result = await res.json();
    return result;
  }

  async postBlog(title, body, token) {
    const res = await fetch(`${API_URL}/blogs`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      method: 'POST',
      body: JSON.stringify({
        title, body,
      }),
    });
    const result = await res.json();
    return result;
  }

  async putBlog(blog_id, title, body, token) {
    const res = await fetch(`${API_URL}/blogs/${blog_id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      method: 'PUT',
      body: JSON.stringify({
        blog_id, title, body,
      }),
    });
    console.log(res);
    const result = await res.json();
    return result;
  }

  async deleteBlogById(blog_id, token) {
    const res = await fetch(`${API_URL}/blogs/${blog_id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      method: 'DELETE',
    });
    const result = await res.json();
    return result;
  }

  async postLikeBlog(blog_id, token) {
    const res = await fetch(`${API_URL}/likes/${blog_id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      method: 'POST',
    });
    const result = await res.json();
    return result;
  }
}

const API = new _API();
export default API;