import { userConstants } from '../_constants';
import Cookies from 'js-cookie';
const initialState = {
   isLoggedIn: false,
   data: null,
 };
 
 const user = Cookies.get('username');
 if (user) {
   initialState.isLoggedIn = true;
 }

export function authentication(state = initialState, action) {

   switch (action.type) {
      case userConstants.LOGIN_SUCCESS:
         return {
            ...state,
            isLoggedIn: true,
            data: {
               username: action.payload.username
            }
         };
      case userConstants.LOGOUT:
         return {
            ...state,
            isLoggedIn: false,
            user: null
         };
      default:
         return state
   }
}