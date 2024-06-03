import React, { useState, useEffect } from "react";

import { useCookies } from "react-cookie";

import queryString from 'query-string';
import { io } from "socket.io-client";

import RootCookies from "../components/IRootCookies";
import TextContainer from './components/TextContainer/TextContainer';
import Messages from './components/Messages/Messages';
import InfoBar from './components/InfoBar/InfoBar';
import Input from './components/Input/Input';

import './Chat.css';

const socket = io();

interface ChatProps {}

const Chat: React.FC<ChatProps> = ({ }) => {
  const name = "Test";

  const [cookies, _] = useCookies(['token']);
  const [users, setUsers] = useState<string[]>([]);
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    socket.emit('join', { name }, (error: string) => {
      if(error) {
        alert(error);
      }
    });
  }, []);
  
  useEffect(() => {
    socket.on('message', (message: string) => {
      setMessages(messages => [ ...messages, message ]);
    });
    
    socket.on("roomData", ({ users }: { users: string[] }) => {
      setUsers(users);
    });
  }, []);

  const sendMessage = (event: React.FormEvent) => {
    event.preventDefault();

    if(message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  }

  return (
    <div className="outerContainer">
      <div className="container">
          <InfoBar room={"Main Room"} />
          <Messages messages={messages} name={name ?? ""} />
          <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </div>
      <TextContainer users={users.map((user) => ( { name: user } ))}/>
    </div>
  );
}

export default Chat;