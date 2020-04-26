import React, { useReducer } from 'react'
import authReducer from '../authContext/authReducer'
import AuthContext from '../authContext/authContext'
import axios from 'axios'
import setToken from '../../utils/setToken'
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGOUT,
  CLEAR_ERRORS
} from '../types'

const AuthState = (props) => {
    const initialState = {
      //token: localStorage.getItem('token'),
      loading: true,
        userAuth: null,
        errors: null,
        user:null
      }
    const [state, dispatch] = useReducer(authReducer, initialState) 
    
    const getUser = async () => {
      if (localStorage.token) {
        setToken(localStorage.token)
      }
      try {
        const res = await axios.get('/auth')
        dispatch({
          type: USER_LOADED,
          payload: res.data
        })
      } catch (errors) {
        dispatch({
          type: AUTH_ERROR,
          payload:errors
          
        })
      }
    }   
  //Register User
  const register = async formData => {
    const config = {
      header: {
        'Content-Type': 'application/json'
      }
    }
    try {
      const res = await axios.post("/register", formData, config)
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      })
      //loadUser()
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data
      })
    }
  }
//login user

  const login = async formData => {
    const config = {
      header: {
        'Content-Type': 'application/json'
      }
    }
    try {
      const res = await axios.post('/auth', formData, config)
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      })
      //loadUser()
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data
      })
    }
  }

// Logout
const logout = () => {
  console.log('function logout')
  dispatch({ 
    type: LOGOUT 
  })
}

  const setError = err => {
    dispatch({
      type: REGISTER_FAIL,
      payload: err 
    })
  }
  const clearError = () => dispatch({ type: CLEAR_ERRORS });
  return (
        <AuthContext.Provider value={{
            
            userAuth: state.userAuth,
            errors:state.errors,
            loading: state.loading,
            user:state.user,
            getUser:getUser,
            register,
            login, 
            setError,
            clearError,
            logout
          }} >
            {props.children}
          </AuthContext.Provider>
    )
}

export default AuthState
