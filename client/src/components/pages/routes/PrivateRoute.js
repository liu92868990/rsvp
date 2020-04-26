import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../../../context/authContext/authContext';


const PrivateRoute = ({ component: Component, ...rest }) => {
    const {userAuth,loading }= useContext(AuthContext)
    //const { isAuthencated, loading } = authContext;
    console.log('Private Router...')
    console.log(userAuth)
    return (
        <Route
        {...rest}
        render={props =>
          !userAuth ? (
  


            <Redirect to='/login' />
          ) : (
              <Component {...props} />
            )
        }
      />
      
    )
}

export default PrivateRoute
