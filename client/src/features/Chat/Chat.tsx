import React, { useState, useEffect } from "react";

import { useCookies } from "react-cookie";

import { io } from "socket.io-client";

import TextContainer from './components/TextContainer/TextContainer';
import Messages from './components/Messages/Messages';
import InfoBar from './components/InfoBar/InfoBar';
import Input from './components/Input/Input';

import './Chat.css';

interface ChatProps {}

const Chat: React.FC<ChatProps> = () => {
  const name = "Test";

  const [cookies, _] = useCookies(['token']);
  const [users, setUsers] = useState<string[]>([]);
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<{user: string, text: string}[]>([]);

  
  const socket = io(process.env.REACT_APP_BASE_URL ?? "http://localhost:5000", {
    extraHeaders: {
      "Authorization": cookies.token
    },
    auth: {
      token: cookies.token
    }
  });
  
  useEffect(() => {
    socket.timeout(5000).emit('join', { name, token: cookies.token }, (error: string) => {
      if (error) {
        alert(error);
      }
    });

    socket.on('message', ({ user, text } : {user: string, text: string}) => {
      const message = { user, text };
      console.log({message});
      console.log({messages});
      setMessages(messages => [ ...messages, message ]);
    });
    
    socket.on("roomData", ({users} : {users: string[]} ) => {
      console.log({users});
      setUsers(users);
    });
  }, []);

  const sendMessage = (event: React.FormEvent) => {
    event.preventDefault();

    if(message) {
      socket.emit('sendMessage', {message, token: cookies.token}, () => setMessage(''));
    }
  }

  return (
    <div className="outerContainer">
      <div className="container">
          <InfoBar room={"Main Room"} />
          <Messages messages={messages} name={name ?? ""} />
          <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </div>
      <TextContainer users={users}/>
    </div>
  );
}

export default Chat;