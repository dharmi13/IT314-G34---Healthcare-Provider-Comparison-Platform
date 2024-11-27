import React from 'react';
import { render, screen } from '@testing-library/react';
import { AppContext } from './AppContext'; // Adjust the import path
import AppContextProvider from './AppContext'; // Adjust the import path
import '@testing-library/jest-dom';
// Sample component to consume the context for testing
const TestComponent = () => {
    const context = React.useContext(AppContext);
    return (
        <div>
            <h1>Context Test</h1>
            <p>{JSON.stringify(context)}</p>
        </div>
    );
};

describe('AppContext', () => {
    test('provides context values to children', () => {
        render(
            <AppContextProvider>
                <TestComponent />
            </AppContextProvider>
        );

        // Check if the context is provided correctly
        expect(screen.getByText(/Context Test/i)).toBeInTheDocument();
        expect(screen.getByText(/{}|null/i)).toBeInTheDocument(); // Initially, the context value is an empty object
    });
});