import { UserAction } from '../constants/action';

export function login(data) {
  return {
    type: UserAction.LOGIN,
    // promise go here
  }
}