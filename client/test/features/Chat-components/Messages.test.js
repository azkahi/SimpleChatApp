import React from 'react';
import { render } from '@testing-library/react';
import Messages from './Messages';

describe('Messages', () => {
  it('renders messages correctly', () => {
    const messages = [
      { user: 'John', text: 'Hello' },
      { user: 'Jane', text: 'Hi there' },
    ];
    const name = 'John';

    const { getByText } = render(<Messages messages={messages} name={name} />);

    messages.forEach((message) => {
      const messageElement = getByText(message.text);
      expect(messageElement).toBeInTheDocument();
    });
  });

  it('renders the name correctly', () => {
    const messages = [
      { user: 'John', text: 'Hello' },
      { user: 'Jane', text: 'Hi there' },
    ];
    const name = 'John';

    const { getByText } = render(<Messages messages={messages} name={name} />);

    const nameElement = getByText(name);
    expect(nameElement).toBeInTheDocument();
  });
});