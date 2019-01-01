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

  async getAllBlogs() {
    const res = await fetch(`${API_URL}/blogs`);
    const result = await res.json();
    return result;
  }

  async getBlogById(id) {
    const res = await fetch(`${API_URL}/blog/${id}`);
    const result = await res.json();
    return result;
  }

  async getBlogsByUser(user_id) {
    const res = await fetch(`${API_URL}/user/blogs/${user_id}`);
    const result = await res.json();
    return result;
  }

  async postBlog(title, body, token) {
    const res = await fetch(`${API_URL}/blog`, {
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

  async putBlog(id, title, body, token) {
    const res = await fetch(`${API_URL}/blog/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      method: 'PUT',
      body: JSON.stringify({
        id, title, body,
      }),
    });
    console.log(res);
    const result = await res.json();
    return result;
  }

  async deleteBlogById(id, token) {
    const res = await fetch(`${API_URL}/blog/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      method: 'DELETE',
    });
    const result = await res.json();
    return result;
  }
}

const API = new _API();
export default API;