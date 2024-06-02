import React, { useState, useEffect } from "react";
import { useParams  } from "react-router-dom";
import queryString from 'query-string';
import { io } from "socket.io-client";

import TextContainer from '../TextContainer/TextContainer';
import Messages from '../Messages/Messages';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';

import './Chat.css';

const socket = io();

interface ChatProps {}

const Chat: React.FC<ChatProps> = ({ }) => {
  const [name, setName] = useState<string>('');
  const [room, setRoom] = useState<string>('');
  const [users, setUsers] = useState<string[]>([]);
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    const { name } = useParams();

    setRoom(room as string);
    setName(name as string)

    socket.emit('join', { name, room }, (error: string) => {
      if(error) {
        alert(error);
      }
    });
  }, [location.search]);
  
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
          <InfoBar room={room} />
          <Messages messages={messages} name={name} />
          <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </div>
      <TextContainer users={users.map((user) => ( { name: user } ))}/>
    </div>
  );
}

export default Chat;