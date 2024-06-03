import React, { FC, useState, ChangeEvent, useEffect } from 'react';

import { useNavigate } from "react-router-dom";
import { GoogleLogin } from '@react-oauth/google';
import { useCookies } from 'react-cookie';

import RootCookies from "../components/IRootCookies";
import GoogleOAuth from "./IGoogleOAuth";

import './Join.css';

interface SignInProps { }

const SignIn: FC<SignInProps> = () => {
  const [name, setName] = useState<string>('');
  const [_, setCookie] = useCookies(['token']);
  const [OAuthToken, setOAuthToken] = useState<string>('');

  const navigate = useNavigate();

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleSignIn = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (!name) {
      event.preventDefault();
    } else {
      setCookie('token', OAuthToken);
      navigate('/chat');
    }
  };

  const responseMessage = (response: any) => {
    const OAuthResp = response as GoogleOAuth;
    setOAuthToken(OAuthResp.credential);
  };

  const errorMessage = () => {
    console.log("An error has occured.");
  };

  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        {OAuthToken ?
          <>
            <h1 className="heading">Join</h1>
            <div>
              <input placeholder="Name" className="joinInput" type="text" onChange={handleNameChange} />
            </div>
            <button onClick={(e) => handleSignIn(e)} className={'button mt-20'} type="submit">Sign In</button>
          </>
          :
          <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
        }
      </div>
    </div>
  );
}

export default SignIn;