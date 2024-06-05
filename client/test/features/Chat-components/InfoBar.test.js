import React from 'react';
import { render, screen } from '@testing-library/react';
import InfoBar from './InfoBar';

describe('InfoBar', () => {
  test('renders room name correctly', () => {
    const room = 'Test Room';
    render(<InfoBar room={room} />);
    const roomNameElement = screen.getByText(room);
    expect(roomNameElement).toBeInTheDocument();
  });

  test('renders online icon', () => {
    render(<InfoBar room="Test Room" />);
    const onlineIconElement = screen.getByAltText('online icon');
    expect(onlineIconElement).toBeInTheDocument();
  });

  test('renders close icon', () => {
    render(<InfoBar room="Test Room" />);
    const closeIconElement = screen.getByAltText('close icon');
    expect(closeIconElement).toBeInTheDocument();
  });
});