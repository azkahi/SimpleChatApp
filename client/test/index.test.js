import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

import App from './App';

test('renders join page', () => {
  const history = createMemoryHistory();
  history.push('/join');
  
  render(
    <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID ?? ""}>
      <Router history={history}>
        <App />
      </Router>
    </GoogleOAuthProvider>
  );

  const joinElement = screen.getByText(/Join/i);
  expect(joinElement).toBeInTheDocument();
});

test('renders chat page', () => {
  const history = createMemoryHistory();
  history.push('/chat');
  
  render(
    <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID ?? ""}>
      <Router history={history}>
        <App />
      </Router>
    </GoogleOAuthProvider>
  );

  const chatElement = screen.getByText(/Chat/i);
  expect(chatElement).toBeInTheDocument();
});