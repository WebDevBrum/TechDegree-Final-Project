import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Consumer } from './Context';

// redirects to sign in if authenticated user does not exist in state

export default ({ component: Component, ...rest }) => {
  return (
    <Consumer>
      {context => (
        <Route
          {...rest}
          render={props => context.authenticatedUser ? (
            <Component {...props} />
          ) : (
              <Redirect to={{
                pathname: '/signin',
                state: { from: props.location },
              }} />
            )
          }
        />
      )}
    </Consumer>
  );
};