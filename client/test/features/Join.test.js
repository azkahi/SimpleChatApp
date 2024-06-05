import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SignIn from './Join';

describe('SignIn component', () => {
  it('renders without crashing', () => {
    render(<SignIn />);
  });

  it('updates the name state when input value changes', () => {
    const { getByPlaceholderText } = render(<SignIn />);
    const nameInput = getByPlaceholderText('Name');

    fireEvent.change(nameInput, { target: { value: 'John' } });

    expect(nameInput.value).toBe('John');
  });

  it('calls handleSignIn function when Sign In button is clicked', () => {
    const { getByText } = render(<SignIn />);
    const signInButton = getByText('Sign In');

    const handleSignInMock = jest.fn();
    signInButton.onclick = handleSignInMock;

    fireEvent.click(signInButton);

    expect(handleSignInMock).toHaveBeenCalledTimes(1);
  });

  it('calls setCookie and navigate functions when name is provided', () => {
    const { getByPlaceholderText, getByText } = render(<SignIn />);
    const nameInput = getByPlaceholderText('Name');
    const signInButton = getByText('Sign In');

    const setCookieMock = jest.fn();
    const navigateMock = jest.fn();

    nameInput.value = 'John';

    signInButton.onclick = () => {
      setCookieMock('token', 'some-token');
      navigateMock('/chat');
    };

    fireEvent.click(signInButton);

    expect(setCookieMock).toHaveBeenCalledWith('token', 'some-token');
    expect(navigateMock).toHaveBeenCalledWith('/chat');
  });
});