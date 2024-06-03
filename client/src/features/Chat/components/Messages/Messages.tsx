import React, { FC } from 'react';
import Message from './Message/Message';
import './Messages.css';

interface MessagesProps {
  messages: {user: string, text: string}[];
  name: string;
}

const Messages: FC<MessagesProps> = ({ messages, name }) => {

  const messagesEndRef = React.createRef<HTMLDivElement>()

  return(
    <div className="messages">
      {messages.map((message, i) => <div key={i}><Message message={{text:message.text, user:message.user}} name={name}/></div>)}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default Messages;