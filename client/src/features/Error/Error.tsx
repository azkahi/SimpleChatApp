import React from 'react';
import { useRouteError } from "react-router-dom";

import './Error.css';

import RouteError from './IRouteError';

const ErrorPage = () => {
  const error: RouteError = useRouteError() as RouteError;
  console.error(error);

  return (
    <div className="errorMainContainer" id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText ?? error.message}</i>
      </p>
    </div>
  );
}

export default ErrorPage;