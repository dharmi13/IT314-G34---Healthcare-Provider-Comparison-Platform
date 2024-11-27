import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import DoctorContextProvider, { DoctorContext} from './DoctorContext'; // Adjust the import based on your file structure
import axios from 'axios';
import { toast } from 'react-toastify';
import '@testing-library/jest-dom';
import { useContext } from 'react';

// Mock axios
jest.mock('axios');

// Mock toast
jest.mock('react-toastify', () => ({
    toast: {
        success: jest.fn(),
        error: jest.fn(),
    },
}));

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

    React.useEffect(() => {
        getAppointments();
        getDashData();
        getProfiledata();
    }, [getAppointments, getDashData, getProfiledata]);

    return (
        <div>
            <h1>Appointments</h1>
            {appointments && appointments.length > 0 ? (
                <ul>
                    {appointments.map((appointment) => (
                        <li key={appointment.id}>{appointment.title}</li>
                    ))}
                </ul>
            ) : (
                <p>No appointments available.</p>
            )}
            <h1>Dashboard Data</h1>
            {dashdata ? <p>{JSON.stringify(dashdata)}</p> : <p>No dashboard data available.</p>}
            <h1>Profile Data</h1>
            {profiledata ? <p>{JSON.stringify(profiledata)}</p> : <p>No profile data available.</p>}
        </div>
    );
};
// const { completeAppointment } = useContext(DoctorContext);

describe('DoctorContext', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should fetch appointments and display them', async () => {
        const mockAppointments = [
            { id: 1, title: 'Appointment 1' },
            { id: 2, title: 'Appointment 2' },
        ];

        axios.get.mockResolvedValueOnce({ data: { success: true, appointments: mockAppointments } });

        render(
            <DoctorContextProvider>
                <TestComponent />
            </DoctorContextProvider>
        );

        await waitFor(() => expect(axios.get).toHaveBeenCalledWith('http://localhost:4000/api/doctor/appointments', expect.any(Object)));

        expect(screen.getByText('Appointment 1')).toBeInTheDocument();
        expect(screen.getByText('Appointment 2')).toBeInTheDocument();
    });

    it('should handle error when fetching appointments', async () => {
        axios.get.mockResolvedValueOnce({ data: { success: false, message: 'Error fetching appointments' } });

        render(
            <DoctorContextProvider>
                <TestComponent />
            </DoctorContextProvider>
        );

        await waitFor(() => expect(toast.error).toHaveBeenCalledWith('Error fetching appointments'));
    });

    // it('should complete an appointment and refresh the list', async () => {
    //     const mockAppointments = [
    //         { id: 1, title: 'Appointment 1' },
    //         { id: 2, title: 'Appointment 2' },
    //     ];

    //     axios.get.mockResolvedValueOnce({ data: { success: true, appointments: mockAppointments } });
    //     axios.post.mockResolvedValueOnce({ data: { success: true, message: 'Appointment completed' } });

    //     render(
    //         <DoctorContextProvider>
    //             <TestComponent />
    //         </DoctorContextProvider>
    //     );

    //     await waitFor(() => expect(screen.getByText('Appointment 1')).toBeInTheDocument());

    //     // Complete the first appointment
    //     await completeAppointment(1);

    //     expect(toast.success).toHaveBeenCalledWith('Appointment completed');
    //     expect(axios.get).toHaveBeenCalledTimes(2); // Check if appointments were fetched again
    // });

    // it('should handle error when completing an appointment', async () => {
    //     const mockAppointments = [
    //         { id: 1, title: 'Appointment 1' },
    //     ];

    //     axios.get.mockResolvedValueOnce({ data: { success: true, appointments: mockAppointments } });
    //     axios.post.mockResolvedValueOnce({ data: { success: false, message: 'Error completing appointment' } });

    //     render(
    //         <DoctorContextProvider>
    //             <TestComponent />
    //         </DoctorContextProvider>
    //     );

    //     await waitFor(() => expect(screen.getByText('Appointment 1')).toBeInTheDocument());

    //     // Attempt to complete the appointment
    //     await completeAppointment(1 );

    //     expect(toast.error).toHaveBeenCalledWith('Error completing appointment');
    // });

    it('should fetch dashboard data', async () => {
        const mockDashData = { totalAppointments: 10, completedAppointments: 5 };
    
        axios.get.mockResolvedValueOnce({ data: { success: true, docdashdata: mockDashData } });
    
        render(
            <DoctorContextProvider>
                <TestComponent />
            </DoctorContextProvider>
        );
    
        await waitFor(() => expect(axios.get).toHaveBeenCalledWith('http://localhost:4000/api/doctor/dashboard', expect.any(Object)));
    
        // Check for specific properties in the dashboard data
        // expect(screen.getByText(/totalAppointments/i)).toBeDefined();
        // expect(screen.getByText(/completedAppointments/i)).toBeDefined();
    });

    it('should fetch profile data', async () => {
        const mockProfileData = { name: 'Dr. Smith', specialty: 'Cardiology' };

        axios.get.mockResolvedValueOnce({ data: { success: true, profiledata: mockProfileData } });

        render(
            <DoctorContextProvider>
                <TestComponent />
            </DoctorContextProvider>
        );

        await waitFor(() => expect(axios.get).toHaveBeenCalledWith('http://localhost:4000/api/doctor/doc-profile', expect.any(Object)));

        // expect(screen.getByText(JSON.stringify(mockProfileData))).toBeDefined();
    });
});