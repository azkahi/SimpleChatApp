import React, { FC, useState, ChangeEvent } from 'react';
import { Link } from "react-router-dom";

import './Join.css';

interface SignInProps {}

const SignIn: FC<SignInProps> = () => {
  const [name, setName] = useState<string>('');
  const [room, setRoom] = useState<string>('defaultRoom');

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleSignIn = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (!name || !room) {
      event.preventDefault();
    }
  };

  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">Join</h1>
        <div>
          <input placeholder="Name" className="joinInput" type="text" onChange={handleNameChange} />
        </div>
        <Link onClick={(e) => handleSignIn(e)} to={`/chat?name=${name}`}>
          <button className={'button mt-20'} type="submit">Sign In</button>
        </Link>
      </div>
    </div>
  );
}

export default SignIn;