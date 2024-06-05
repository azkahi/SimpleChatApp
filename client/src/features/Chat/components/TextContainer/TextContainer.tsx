import React, { FC } from 'react';

import onlineIcon from '../../../../icons/onlineIcon.png';

import './TextContainer.css';

interface TextContainerProps {
  users: string[];
}

const TextContainer: FC<TextContainerProps> = ({ users }) => (
  <div className="textContainer">
    <div>
      <h1>Realtime Chat Application 💬</h1>
      <h2>Users:</h2>
    </div>
    {
      users
        ? (
          <div>
            <h1>People currently chatting:</h1>
            <div className="activeContainer">
              <h2>
                {users.map((name) => 
                  <div key={name} className="activeItem">
                    {name}
                    <img alt="Online Icon" src={onlineIcon}/>
                  </div>
                )}
              </h2>
            </div>
          </div>
        )
        : null
    }
  </div>
);

export default TextContainer;