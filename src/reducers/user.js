import { UserAction } from '../constants/action';
import Auth from '../utils/auth';

const INITIAL_STATE = {
  loggedIn: Auth.isAuth(),
};

export default (state = INITIAL_STATE, action) => {
  const UNAUTHORIZED_CODE = 40100;
  console.log(action);
  if (action && action.payload && action.payload.data && action.payload.data.errorCode === UNAUTHORIZED_CODE) {
    Auth.logout();
    return { ...INITIAL_STATE, loggedIn: false };
  }

  switch (action.type) {
    case UserAction.LOGIN: {
      const newState = {
        ...state,
      };

      return newState;
    }

    default:
      break;
  }

  return state;
};