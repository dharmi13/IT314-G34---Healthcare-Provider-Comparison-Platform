import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AdminallAppointments from './AdminallAppointments.jsx'; // Ensure this path is correct
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import '@testing-library/jest-dom';

describe('AdminallAppointments Component', () => {
    const mock = new MockAdapter(axios);
    const appointmentMock = {
        detailedAppointments: [
            {
                patientName: 'John Doe',
                patientimage: 'patient1.jpg',
                userData: { patientage: 30 },
                slotDate: '01_12_2024',
                slotTime: '10:00 AM',
                doctorName: 'Dr. Smith',
                doctorimage: 'doctor1.jpg',
                amount: 50
            },
            {
                patientName: 'Jane Doe',
                patientimage: 'patient2.jpg',
                userData: { patientage: 25 },
                slotDate: '02_12_2024',
                slotTime: '11:00 AM',
                doctorName: 'Dr. Jones',
                doctorimage: 'doctor2.jpg',
                amount: 75
            }
        ]
    };

    beforeEach(() => {
        mock.onGet(`${process.env.VITE_SERVER_URL}/admin/dashboard`).reply(200, appointmentMock);
    });

    afterEach(() => {
        mock.reset();
    });

    // test('renders appointment data correctly', async () => {
    //     render(
    //         <MemoryRouter>
    //             <AdminallAppointments />
    //         </MemoryRouter>
    //     );

    //     // Check if the patient names are rendered
    //     expect(await screen.findByText(/John Doe/i)).toBeInTheDocument();
    //     expect(await screen.findByText(/Jane Doe/i)).toBeInTheDocument();

    //     // Check if the ages are rendered
    //     // expect(await screen.findByText(/30/i)).toBeInTheDocument();
    //     // expect(await screen.findByText(/25/i)).toBeInTheDocument();

    //     // Check if the dates are rendered using a more flexible matcher
    //     expect(await screen.findByText((content, element) => {
    //         return content.startsWith('01 Jan') && element.tagName.toLowerCase() === 'div'; // Adjust the tag name as needed
    //     })).toBeInTheDocument();

    //     expect(await screen.findByText(/10:00 AM/i)).toBeInTheDocument();
    //     expect(await screen.findByText((content, element) => {
    //         return content.startsWith('02 Jan') && element.tagName.toLowerCase() === 'div'; // Adjust the tag name as needed
    //     })).toBeInTheDocument();

    //     expect(await screen.findByText(/11:00 AM/i)).toBeInTheDocument();

    //     // Check if the doctor names are rendered
    //     expect(await screen.findByText(/Dr. Smith/i)).toBeInTheDocument();
    //     expect(await screen.findByText(/Dr. Jones/i)).toBeInTheDocument();

    //     // Check if the fees are rendered
    //     expect(await screen.findByText(/\$50/i)).toBeInTheDocument();
    //     expect(await screen.findByText(/\$75/i)).toBeInTheDocument();
    // });

    test('displays no appointments message when there are no appointments', async () => {
        mock.onGet(`${process.env.VITE_SERVER_URL}/admin/dashboard`).reply(200, { detailedAppointments: [] });

        render(
            <MemoryRouter>
                <AdminallAppointments />
            </MemoryRouter>
        );

        // Check if the no appointments message is displayed
        expect(await screen.findByText(/No appointments available/i)).toBeInTheDocument();
    });
});