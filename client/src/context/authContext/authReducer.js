import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERRORS
  } from '../types'
  
  export default (state, action) => {
    switch (action.type) {
      case USER_LOADED:
      return {
        ...state,
        userAuth: true,
        user: action.payload,
        loading: false,
        error: null
      }

      case REGISTER_SUCCESS:
      case LOGIN_SUCCESS:
        localStorage.setItem('token', action.payload.token)
        return {
          ...state,
          
          userAuth: true,
          loading: false,
          errors: null
        }
      case REGISTER_FAIL:
      case LOGIN_FAIL:
      case AUTH_ERROR:
      case LOGOUT:
        localStorage.removeItem('token')
        console.log('clear token')
        return {
          ...state,
          
          userAuth: null,
          loading: false,
          errors: action.payload
        }
        case CLEAR_ERRORS:
            return {
              ...state,
              errors: null
            }
      default:
        return state
    }
  }