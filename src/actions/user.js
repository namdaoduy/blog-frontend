import { UserAction } from '../constants/action';
import { get, post, put, del } from '../utils/request';

export function login(data) {
  return {
    type: UserAction.LOGIN,
    promise: post('/login', data),
  };
}

export function logout() {

}