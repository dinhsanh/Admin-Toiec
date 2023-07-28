import { userConstants } from '../_constants';
import Cookies from 'js-cookie';
export const userActions = {
   login,
   logout
}

function login(data) {
   Cookies.set('username', data.username)
   return (dispatch) => {
      dispatch(success(data))
   }
   function success(data) {
      return {
         type: userConstants.LOGIN_SUCCESS,
         payload: data
      }
   }
}

function logout() {
   Cookies.remove('username')
   return { type: userConstants.LOGOUT };
}