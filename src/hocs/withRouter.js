import React from 'react';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';

export default function withRouter(Component) {
  return (props) => <Component {...props} match={useRouteMatch()} history={useHistory()} location={useLocation()} />;
}
