import { getItem, setItem, removeItem } from './storage';

const TOKEN_KEY = 'access_token';
const UID_KEY = 'user_id';

class Auth {
  constructor() {
    this.data = {
      accessToken: getItem(TOKEN_KEY),
      userId: getItem(UID_KEY),
    };
  }

  isAuth() {
    return !!this.getToken();
  }

  getToken() {
    return this.data.accessToken;
  }

  setAuth(data) {
    this.data = data;
    setItem(TOKEN_KEY, data.accessToken);
    setItem(UID_KEY, data.userId);
  }

  logout() {
    this.data = {};
    removeItem(TOKEN_KEY);
    removeItem(UID_KEY);
  }
}

export default new Auth();