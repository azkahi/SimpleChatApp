import React, { useEffect } from "react";

import { useCookies } from 'react-cookie';
import { Outlet, useNavigate } from "react-router-dom";

import RootCookies from "../components/IRootCookies";

const Root = () => {
  const [cookies, setCookie] = useCookies(['token']);

  const navigate = useNavigate();

  useEffect(() => {
    const token = cookies as RootCookies;

    if (!token.token) {
      navigate('/join');
    } else {
      navigate('/chat');
    }
  }, [cookies]);


  return (
    <>
      <div>
        <Outlet />
      </div>
    </>
  );
}

export default Root;