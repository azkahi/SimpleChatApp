import React from 'react';
import { render } from '@testing-library/react';
import Message from './Message';

test('renders message sent by current user', () => {
  const message = {
    text: 'Hello',
    user: 'John',
  };
  const name = 'John';

  const { getByText } = render(<Message message={message} name={name} />);

  expect(getByText('Hello')).toBeInTheDocument();
  expect(getByText('John')).toBeInTheDocument();
});

test('renders message sent by other user', () => {
  const message = {
    text: 'Hi',
    user: 'Jane',
  };
  const name = 'John';

  const { getByText } = render(<Message message={message} name={name} />);

  expect(getByText('Hi')).toBeInTheDocument();
  expect(getByText('Jane')).toBeInTheDocument();
});