// // MyAppointment.test.jsx
// import React from 'react';
// import { render, screen, fireEvent, waitFor } from '@testing-library/react';
// import { MemoryRouter } from 'react-router-dom';
// import MyAppointments from './MyAppointment';
// import axios from 'axios';
// import MockAdapter from 'axios-mock-adapter';
// import { toast } from 'react-toastify';

// // Create a mock instance of axios
// const mock = new MockAdapter(axios);

// // Mock the react-toastify library
// jest.mock('react-toastify', () => ({
//   toast: {
//     success: jest.fn(),
//     error: jest.fn(),
//   },
// }));

// // Mock the react-modal component
// jest.mock('react-modal', () => {
//   return {
//     setAppElement: jest.fn(),
//     default: ({ isOpen, onRequestClose, children }) => {
//       if (!isOpen) return null; // Render nothing if not open
//       return (
//         <div>
//           <div data-testid="modal">{children}</div>
//           <button onClick={onRequestClose}>Close</button>
//         </div>
//       );
//     },
//   };
// });

// // Mock the Appbar component if necessary
// jest.mock('./dashBoard', () => ({
//   Appbar: () => <div data-testid="appbar">Appbar</div>,
// }));

// describe('MyAppointments Component', () => {
//   beforeEach(() => {
//     // Clear any previous mocks
//     mock.reset();
//   });

//   test('renders MyAppointments component and fetches appointment data', async () => {
//     // Mock the API response
//     mock.onGet(`${import.meta.env.VITE_SERVER_URL}/appointment/get-patient-appointments`).reply(200, {
//       allAppointmentsData: [
//         {
//           appointmentData: {
//             id: '1',
//             slotDate: '12_10_2023',
//             slotTime: '10:00 AM',
//             cancel: false,
//             payment: false,
//           },
//           doctorData: {
//             image: 'doctor_image.png',
//             userName: 'Dr. John Doe',
//             specialty: 'Cardiology',
//             address: {
//               street: '123 Main St',
//               city: 'Anytown',
//               state: 'CA',
//             },
//           },
//         },
//       ],
//     });

//     render(
//       <MemoryRouter>
//         <MyAppointments />
//       </MemoryRouter>
//     );

//     // Verify that the appointment data is rendered
//     expect(await screen.findByText('Dr. John Doe')).toBeInTheDocument();
//     expect(screen.getByText('Cardiology')).toBeInTheDocument();
//     expect(screen.getByText('Date & Time:')).toBeInTheDocument();
//   });

//   test('opens modal to book an appointment', async () => {
//     mock.onGet(`${import.meta.env.VITE_SERVER_URL}/appointment/get-patient-appointments`).reply(200, {
//       allAppointmentsData: [
//         {
//           appointmentData: {
//             id: '1',
//             slotDate: '12_10_2023',
//             slotTime: '10:00 AM',
//             cancel: false,
//             payment: false,
//           },
//           doctorData: {
//             image: 'doctor_image.png',
//             userName: 'Dr. John Doe',
//             specialty: 'Cardiology',
//             address: {
//               street: '123 Main St',
//               city: 'Anytown',
//               state: 'CA',
//             },
//           },
//         },
//       ],
//     });

//     render(
//       <MemoryRouter>
//         <MyAppointments />
//       </MemoryRouter>
//     );

//     // Open the booking modal
//     fireEvent.click(screen.getByText('Pay Offline'));

//     // Verify that the modal is open
//     expect(screen.getByTestId('modal')).toBeInTheDocument();
//     expect(screen.getByText('Are you sure you want to book this appointment?')).toBeInTheDocument();
//   });

//   test('successfully books an appointment', async () => {
//     mock.onGet(`${import.meta.env.VITE_SERVER_URL}/appointment/get-patient-appointments`).reply(200, {
//       allAppointmentsData: [
//         {
//           appointmentData: {
//             id: '1',
//             slotDate: '12_10_2023',
//             slotTime: '10:00 AM',
//             cancel: false,
//             payment: false,
//           },
//           doctorData: {
//             image: 'doctor_image.png',
//             userName: 'Dr. John Doe',
//             specialty: 'Cardiology',
//             address: {
//               street: '123 Main St',
//               city: 'Anytown',
//               state: 'CA',
//             },
//           },
//         },
//       ],
//     });

//     mock.onPut(`${import.meta.env.VITE_SERVER_URL}/appointment/book-appointment`).reply(200, {
//       message: 'Appointment booked successfully!',
//     });

//     render(
//       <MemoryRouter>
//         <MyAppointments />
//       </MemoryRouter>
//     );

//     // Open the booking modal
//     fireEvent.click(screen.getByText('Pay Offline'));

//     // Confirm the booking
//     fireEvent.click(screen.getByText('Confirm'));

//     // Wait for the success toast to appear
//     await waitFor(() => {
//       expect(toast.success).toHaveBeenCalledWith('Appointment booked successfully!');
//     });
//   });

//   test('handles booking failure', async () => {
//     mock.onGet(`${import.meta.env.VITE_SERVER_URL}/appointment/get-patient-appointments`).reply(200, {
//       allAppointmentsData: [
//         {
//           appointmentData: {
//             id: '1',
//             slotDate: '12_10_2023',
//             slotTime: '10:00 AM',
//             cancel: false,
//             payment: false,
//           },
//           doctorData: {
//             image: 'doctor_image.png',
//             userName: 'Dr. John Doe',
//             specialty: 'Cardiology',
//             address: {
//               street: '123 Main St',
//               city: 'Anytown',
//               state: 'CA',
//             },
//           },
//         },
//       ],
//     });

//     mock.onPut(`${import.meta.env.VITE_SERVER_URL}/appointment/book-appointment`).reply(500, {
//       message: 'Failed to book appointment.',
//     });

//     render(
//       <MemoryRouter>
//         <MyAppointments />
//       </MemoryRouter>
//     );

//     // Open the booking modal
//     fireEvent.click(screen.getByText('Pay Offline'));

//     // Confirm the booking
//     fireEvent.click(screen.getByText('Confirm'));

//     // Wait for the error toast to appear
//     await waitFor(() => {
//       expect(toast.error).toHaveBeenCalledWith('Failed to book appointment.');
//     });
//   });
// });