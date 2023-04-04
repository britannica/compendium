import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

export default function withRouter(Component) {
  return (props) => <Component {...props} params={useParams()} navigate={useNavigate()} location={useLocation()} />;
}
