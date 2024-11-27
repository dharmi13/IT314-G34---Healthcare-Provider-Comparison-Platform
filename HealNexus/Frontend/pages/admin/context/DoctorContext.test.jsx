// DoctorContext.test.js
import React from 'react';
import { render, screen, act } from '@testing-library/react';
import axios from 'axios';
import DoctorContextProvider, { DoctorContext } from './DoctorContext'; // Adjust the import path as necessary
import '@testing-library/jest-dom';

jest.mock('axios');

const TestComponent = () => {
  const {
    getAppointments,
    appointments,
    completeAppointment,
    getDashData,
    dashdata,
    getProfiledata,
    profiledata,
  } = React.useContext(DoctorContext);

  return (
    <div>
      <h1>Appointments</h1>
      {appointments && appointments.map((appointment, index) => (
        <div key={index}>
          <span>{appointment.title}</span>
          <button onClick={() => completeAppointment(appointment.id)}>Complete</button>
        </div>
      ))}
      <button onClick={getAppointments}>Fetch Appointments</button>
      <button onClick={getDashData}>Fetch Dashboard Data</button>
      <button onClick={getProfiledata}>Fetch Profile Data</button>
      <h1>Dashboard Data</h1>
      {dashdata && <pre>{JSON.stringify(dashdata, null, 2)}</pre>}
      <h1>Profile Data</h1>
      {profiledata && <pre>{JSON.stringify(profiledata, null, 2)}</pre>}
    </div>
  );
};

describe('DoctorContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('fetches appointments and displays them', async () => {
    const appointmentsData = [
      { id: 1, title: 'Appointment 1' },
      { id: 2, title: 'Appointment 2' },
    ];

    axios.get.mockResolvedValueOnce({ data: { success: true, appointments: appointmentsData } });

    render(
      <DoctorContextProvider>
        <TestComponent />
      </DoctorContextProvider>
    );

    // Simulate fetching appointments
    await act(async () => {
      const fetchButton = screen.getByText('Fetch Appointments');
      fetchButton.click();
    });

    expect(screen.getByText('Appointment 1')).toBeInTheDocument();
    expect(screen.getByText('Appointment 2')).toBeInTheDocument();
  });

  test('completes an appointment', async () => {
    const appointmentsData = [
      { id: 1, title: 'Appointment 1' },
    ];

    axios.get.mockResolvedValueOnce({ data: { success: true, appointments: appointmentsData } });
    axios.post.mockResolvedValueOnce({ data: { success: true, message: 'Appointment completed' } });

    render(
      <DoctorContextProvider>
        <TestComponent />
      </DoctorContextProvider>
    );

    // Simulate fetching appointments
    await act(async () => {
      const fetchButton = screen.getByText('Fetch Appointments');
      fetchButton.click();
    });

    // Simulate completing an appointment
    await act(async () => {
      const completeButton = screen.getByText('Complete');
      completeButton.click();
    });

    expect(axios.post).toHaveBeenCalledWith('http://localhost:4000/api/doctor/complete-appointment', { appointmentId: 1 }, { headers: { dtoken: '' } });
  });

  test('fetches dashboard data', async () => {
    const dashboardData = { totalAppointments: 10 };

    axios.get.mockResolvedValueOnce({ data: { success: true, docdashdata: dashboardData } });

    render(
      <DoctorContextProvider>
        <TestComponent />
      </DoctorContextProvider>
    );

    // Simulate fetching dashboard data
    await act(async () => {
      const fetchButton = screen.getByText('Fetch Dashboard Data');
      fetchButton.click();
    });

    expect(screen.getByText(/10/)).toBeInTheDocument();
  });

  test('fetches profile data', async () => {
    const profileData = { name: 'Dr. John Doe' };

    axios.get.mockResolvedValueOnce({ data: { success: true, profiledata: profileData } });

    render(
      <DoctorContextProvider>
        <TestComponent />
      </DoctorContextProvider>
    );

    // Simulate fetching profile data
    await act(async () => {
      const fetchButton = screen.getByText('Fetch Profile Data');
      fetchButton.click();
    });

    expect(screen.getByText(/Dr. John Doe/)).toBeInTheDocument();
  });
});