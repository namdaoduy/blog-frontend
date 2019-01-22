import { UserAction } from '../constants/action';
import Auth from '../utils/auth';

const INITIAL_STATE = {
  loggedIn: Auth.isAuth(),
};

export default (state = INITIAL_STATE, action) => {
  // reducer go here
};