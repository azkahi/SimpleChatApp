import React from 'react';
import { render } from '@testing-library/react';
import TextContainer from './TextContainer';

describe('TextContainer', () => {
  it('should render the component without errors', () => {
    render(<TextContainer users={[]} />);
  });

  it('should render the correct heading', () => {
    const { getByText } = render(<TextContainer users={[]} />);
    expect(getByText('Realtime Chat Application 💬')).toBeInTheDocument();
  });

  it('should render the correct subheading', () => {
    const { getByText } = render(<TextContainer users={[]} />);
    expect(getByText('Users:')).toBeInTheDocument();
  });

  it('should render the list of users', () => {
    const users = ['User1', 'User2', 'User3'];
    const { getByText } = render(<TextContainer users={users} />);
    users.forEach((user) => {
      expect(getByText(user)).toBeInTheDocument();
    });
  });

  it('should render the online icon for each user', () => {
    const users = ['User1', 'User2', 'User3'];
    const { getAllByAltText } = render(<TextContainer users={users} />);
    const onlineIcons = getAllByAltText('Online Icon');
    expect(onlineIcons.length).toBe(users.length);
  });
});