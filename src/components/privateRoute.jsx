import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ component: Component, allowedRoles, userRole, ...rest }) => <Route
    {...rest}
    render={(props) =>
      allowedRoles.includes(userRole) ? (
        <Component {...props} />
      ) : (
        <Navigate to="/login" />
      )
    }
  />


export default PrivateRoute;