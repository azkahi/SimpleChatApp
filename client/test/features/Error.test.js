import React from 'react';
import { render } from '@testing-library/react';

import ErrorPage from './Error';

jest.mock('react-router-dom', () => ({
  useRouteError: jest.fn(),
}));

describe('ErrorPage', () => {
  it('should render error message', () => {
    const { getByText } = render(<ErrorPage />);

    expect(getByText('Oops!')).toBeInTheDocument();
    expect(getByText('Sorry, an unexpected error has occurred.')).toBeInTheDocument();
    expect(getByText(`Not Found`)).toBeInTheDocument();
  });

  it('should render error message with fallback', () => {
    const { getByText } = render(<ErrorPage />);

    expect(getByText('Oops!')).toBeInTheDocument();
    expect(getByText('Sorry, an unexpected error has occurred.')).toBeInTheDocument();
    expect(getByText(`An error occurred`)).toBeInTheDocument();
  });
});