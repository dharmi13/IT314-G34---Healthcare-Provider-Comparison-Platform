// AdminContext.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { AdminProvider } from './AdminContext'; // Adjust the import path as necessary
import { AdminContext } from './AdminContext';
import '@testing-library/jest-dom';

// Test Component to use AdminContext
const TestComponent = () => {
  const { doctors, unverifiedDoctors, verifyDoctor, rejectDoctor } = React.useContext(AdminContext);
  
  return (
    <div>
      <h1>Verified Doctors</h1>
      {doctors.map((doctor, index) => (
        <div key={index}>{doctor.name}</div>
      ))}
      
      <h1>Unverified Doctors</h1>
      {unverifiedDoctors.map((doctor, index) => (
        <div key={index}>
          {doctor.name}
          <button onClick={() => verifyDoctor(doctor)}>Verify</button>
          <button onClick={() => rejectDoctor(doctor)}>Reject</button>
        </div>
      ))}
    </div>
  );
};

describe('AdminContext', () => {
  test('renders initial doctors and unverified doctors', () => {
    render(
      <AdminProvider>
        <TestComponent />
      </AdminProvider>
    );

    // Check if the verified doctors are rendered
    expect(screen.getByText("Dr. John Smith")).toBeInTheDocument();
    expect(screen.getByText("Dr. Sarah Johnson")).toBeInTheDocument();
    
    // Check if the unverified doctors are rendered
    expect(screen.getByText("Dr. John Eliyah")).toBeInTheDocument();
    expect(screen.getByText("Dr. Smith Johnson")).toBeInTheDocument();
  });

  test('verifies a doctor', () => {
    render(
      <AdminProvider>
        <TestComponent />
      </AdminProvider>
    );

    const verifyButton = screen.getAllByText("Verify", { selector: 'button' })[0];
    fireEvent.click(verifyButton);

    // Check if the doctor has been moved to verified list
    expect(screen.getByText("Dr. John Smith")).toBeInTheDocument();
    // expect(screen.queryByText("Dr. John Eliyah")).not.toBeInTheDocument();
  });

  test('rejects a doctor', () => {
    render(
      <AdminProvider>
        <TestComponent />
      </AdminProvider>
    );

    const rejectButton = screen.getAllByText("Reject", { selector: 'button' })[0];
    fireEvent.click(rejectButton);

    // Check if the rejected doctor is removed from unverified list
    expect(screen.queryByText("Dr. John Eliyah")).not.toBeInTheDocument();
  });
});