import React, { FC, ChangeEvent, KeyboardEvent, MouseEventHandler } from 'react';

import './Input.css';

interface InputProps {
  setMessage: (message: string) => void;
  sendMessage: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  message: string;
}

const Input: FC<InputProps> = ({ setMessage, sendMessage, message }) => (
  <form className="form">
    <input
      className="input"
      type="text"
      placeholder="Type a message..."
      value={message}
      onChange={(event: ChangeEvent<HTMLInputElement>) => setMessage(event.target.value)}
    />
    <button className="sendButton" onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => sendMessage(event)}>Send</button>
  </form>
)

export default Input;