import React, { useEffect } from "react";

import { useCookies } from 'react-cookie';
import { Outlet, useNavigate } from "react-router-dom";

import RootCookies from "../components/IRootCookies";

const Root = () => {
  const [cookies, setCookie] = useCookies(['token']);

  const navigate = useNavigate();

  useEffect(() => {
    const token = cookies as RootCookies;

    console.log(token);
    if (!token.token) {
      console.log("No token found in cookies");
      navigate('/join');
    } else {
      console.log("Token found in cookies");
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