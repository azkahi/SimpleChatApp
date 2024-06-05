import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Input from './Input';

describe('Input component', () => {
  it('should update the message when input value changes', () => {
    const setMessage = jest.fn();
    const sendMessage = jest.fn();
    const message = 'Hello';

    const { getByPlaceholderText } = render(
      <Input setMessage={setMessage} sendMessage={sendMessage} message={message} />
    );

    const inputElement = getByPlaceholderText('Type a message...');
    fireEvent.change(inputElement, { target: { value: 'New message' } });

    expect(setMessage).toHaveBeenCalledWith('New message');
  });

  it('should call sendMessage when send button is clicked', () => {
    const setMessage = jest.fn();
    const sendMessage = jest.fn();
    const message = 'Hello';

    const { getByText } = render(
      <Input setMessage={setMessage} sendMessage={sendMessage} message={message} />
    );

    const sendButton = getByText('Send');
    fireEvent.click(sendButton);

    expect(sendMessage).toHaveBeenCalled();
  });
});