import * as React from "react";
import * as ReactDOM from "react-dom/client";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';

import ErrorPage from "./features/Error/Error";
import Chat from './features/Chat/Chat';
import Join from './features/Join/Join';
import Root from "./features/Root/Root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "join",
        element: <Join />,
      },
      {
        path: "chat",
        element: <Chat />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID ?? ""}>
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
  </GoogleOAuthProvider>
);