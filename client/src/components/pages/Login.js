import React, { useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom';
import AuthContext from '../../context/authContext/authContext'
const Login = (props) => {
  const { login, userAuth, errors,clearError } = useContext(AuthContext)
  useEffect(() => {
    if (userAuth) {
      props.history.push('/')
    }
  }, [userAuth, props.history])

  
    const [user, setUser] = useState({
        email: '',
        password: ''
      })
      const { email, password } = user
    
      const onchange = e => {
        setUser({
          ...user,
          [e.target.name]: e.target.value
        })
         if (errors !== null) { clearError() }
      }
      const onsubmit = e => {
        e.preventDefault()
        login({
          email,
          password
        })
        clearError()
      }
  return (
    <div className="login">
      <h1>Login</h1>
      <form onSubmit={onsubmit}>
        <input type="email" name="email" placeholder="Email" value={email} onChange={onchange} />
        <input type="password" name="password" placeholder="Password" value={password} onChange={onchange} required />
        <input type="submit" value="Login" className="btn" />
      </form>
      <div className="question">
      {errors !== null &&  <button className="danger" >
          {errors.msg?errors.msg:errors.error[0].msg} 
          <span onClick={() => clearError()}>X</span></button>}
        <p>Dont' have an accout? {" "} <Link to='/register'>Sign Up</Link></p>
      </div>
    </div>
  )
}
export default Login
