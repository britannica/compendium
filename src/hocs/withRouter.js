import React from 'react';
import { useLocation, useNavigate, useMatch } from 'react-router-dom';

export default function withRouter(Component) {
  return (props) => <Component {...props} match={useMatch()} navigate={useNavigate()} location={useLocation()} />;
}
