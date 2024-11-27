import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AdminContext, AdminProvider } from './AdminContext'; // Adjust the import path
import '@testing-library/jest-dom';
// Sample component to consume the AdminContext for testing
const TestComponent = () => {
    const { doctors, unverifiedDoctors, verifyDoctor } = React.useContext(AdminContext);

    const handleVerifyDoctor = (doctor) => {
        verifyDoctor(doctor);
    };

    return (
        <div>
            <h1>Doctors</h1>
            <h2>Verified Doctors</h2>
            <ul>
                {doctors.map((doctor, index) => (
                    <li key={index}>{doctor.name}</li>
                ))}
            </ul>
            <h2>Unverified Doctors</h2>
            <ul>
                {unverifiedDoctors.map((doctor, index) => (
                    <li key={index}>
                        {doctor.name}
                        <button onClick={() => handleVerifyDoctor(doctor)}>Verify</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

describe('AdminContext', () => {
    test('initializes with correct doctors and unverified doctors', () => {
        render(
            <AdminProvider>
                <TestComponent />
            </AdminProvider>
        );

        // Check if the verified doctors are rendered
        expect(screen.getByText(/Dr. John Smith/i)).toBeInTheDocument();
        expect(screen.getByText(/Dr. Sarah Johnson/i)).toBeInTheDocument();

        // Check if the unverified doctors are rendered
        expect(screen.getByText(/Dr. John Eliyah/i)).toBeInTheDocument();
        expect(screen.getByText(/Dr. Smith Johnson/i)).toBeInTheDocument();
    });

    test('verifies a doctor and moves them from unverified to verified', async () => {
        render(
            <AdminProvider>
                <TestComponent />
            </AdminProvider>
        );

        // Verify the first unverified doctor by finding the specific button
        const verifyButtons = screen.getAllByRole('button', { name: /verify/i });
        fireEvent.click(verifyButtons[0]); // Click the first "Verify" button

        // Check if the doctor is moved to the verified list
        await waitFor(() => {
            
            expect(screen.getByText(/Dr. John Eliyah/i)).toBeInTheDocument(); // Should now be in verified list
        });
    });
});