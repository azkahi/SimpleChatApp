import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Chat from './Chat';

test('renders Chat component', () => {
  render(<Chat />);
});

test('sends a message when the form is submitted', () => {
  const { getByTestId } = render(<Chat />);
  const inputElement = getByTestId('message-input');
  const formElement = getByTestId('message-form');

  fireEvent.change(inputElement, { target: { value: 'Hello, world!' } });
  fireEvent.submit(formElement);
});
