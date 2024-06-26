import React, { FC, useState, ChangeEvent } from 'react';

import { useNavigate } from "react-router-dom";
import { GoogleLogin } from '@react-oauth/google';
import { useCookies } from 'react-cookie';

import GoogleOAuth from "./IGoogleOAuth";

import './Join.css';

interface SignInProps { }

const SignIn: FC<SignInProps> = () => {
  const [name, setName] = useState<string>('');
  const [_, setCookie] = useCookies(['token']);
  const [token, setToken] = useState<string>('');

  const navigate = useNavigate();

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleSignIn = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (!name) {
      event.preventDefault();
    } else {
      setCookie('token', token);
      navigate('/chat');
    }
  };

  const responseMessage = (response: any) => {
    const OAuthResp = response as GoogleOAuth;
    setToken(OAuthResp.credential);
  };

  const errorMessage = () => {
    alert("An error has occured.");
  };

  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        {token ?
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