// AppContext.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import AppContextProvider, { AppContext } from './AppContext'; // Adjust the import path as necessary
import '@testing-library/jest-dom';

// Test Component to use AppContext
const TestComponent = () => {
  const contextValue = React.useContext(AppContext);
  return (
    <div>
      <h1>App Context Test</h1>
      <pre>{JSON.stringify(contextValue, null, 2)}</pre>
    </div>
  );
};

describe('AppContext', () => {
  test('renders without crashing and provides context value', () => {
    render(
      <AppContextProvider>
        <TestComponent />
      </AppContextProvider>
    );

    // Check if the component renders
    expect(screen.getByText("App Context Test")).toBeInTheDocument();

    // Check if the context value is an empty object as defined in AppContext
    expect(screen.getByText(/^\{\s*\}$/)).toBeInTheDocument(); // Matches an empty object
  });
});