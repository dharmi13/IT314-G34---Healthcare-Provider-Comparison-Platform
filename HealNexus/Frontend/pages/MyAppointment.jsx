import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { toast } from 'react-toastify';
import { Appbar } from './dashBoard';

Modal.setAppElement('#root'); // Attach modal to the root element for accessibility

const MyAppointments = () => {
  // Dummy data for appointments
  const dummyAppointments = [
    {
      _id: 'app1',
      docData: {
        name: 'Dr. Richard James',
        image: 'https://via.placeholder.com/150',
        speciality: 'General physician',
        address: {
          line1: '17th Cross, Richmond',
          line2: 'Circle, Ring Road, London',
        },
      },
      slotDate: '14_11_2024',
      slotTime: '10:30 AM',
      cancel: false,
      isCompleted: false,
    },
    {
      _id: 'app2',
      docData: {
        name: 'Dr. Emily Larson',
        image: 'https://via.placeholder.com/150',
        speciality: 'Gynecologist',
        address: {
          line1: '27th Cross, Richmond',
          line2: 'Circle, Ring Road, London',
        },
      },
      slotDate: '15_11_2024',
      slotTime: '11:00 AM',
      cancel: true,
      isCompleted: false,
    },
    {
      _id: 'app3',
      docData: {
        name: 'Dr. Sarah Patel',
        image: 'https://via.placeholder.com/150',
        speciality: 'Dermatologist',
        address: {
          line1: '37th Cross, Richmond',
          line2: 'Circle, Ring Road, London',
        },
      },
      slotDate: '16_11_2024',
      slotTime: '2:00 PM',
      cancel: false,
      isCompleted: true,
    },
  ];

  const [appointments, setAppointments] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentAppointment, setCurrentAppointment] = useState(null);
  const [modalAction, setModalAction] = useState(''); // 'cancel' or 'book'

  // Simulate fetching appointments
  useEffect(() => {
    setAppointments(dummyAppointments);
  }, []);

  const formatDate = (dateString) => {
    const [day, month, year] = dateString.split('_');
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthName = months[parseInt(month, 10) - 1];
    return `${day} ${monthName} ${year}`;
  };

  const openModal = (appointment, action) => {
    setCurrentAppointment(appointment);
    setModalAction(action);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setCurrentAppointment(null);
    setModalAction('');
  };

  const handleModalConfirm = () => {
    if (modalAction === 'cancel') {
      cancelAppointment(currentAppointment._id);
    } else if (modalAction === 'book') {
      bookAppointment(currentAppointment._id);
    }
    closeModal();
  };

  const cancelAppointment = (appointmentId) => {
    const updatedAppointments = appointments.map((appointment) =>
      appointment._id === appointmentId ? { ...appointment, cancel: true } : appointment
    );
    setAppointments(updatedAppointments);
    toast.success('Appointment cancelled successfully');
  };

  const bookAppointment = (appointmentId) => {
    const updatedAppointments = appointments.map((appointment) =>
      appointment._id === appointmentId ? { ...appointment, isCompleted: true } : appointment
    );
    setAppointments(updatedAppointments);
    toast.success('Appointment booked successfully');
  };

  return (
    <div><Appbar/>
    <div className="mx-20">
      <p className="pb-3 mt-12 font-medium text-zinc-700 border-b">My Appointments</p>
      <div>
        {appointments.map((item) => (
          <div
            key={item._id}
            className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b"
          >
            <div>
              <img className="w-32 bg-indigo-50" src={item.docData.image} alt={item.docData.name} />
            </div>
            <div className="flex-1 text-small text-zinc-600">
              <p className="text-neutral-800 font-semibold">{item.docData.name}</p>
              <p>{item.docData.speciality}</p>
              <p className="text-neutral-700 font-medium mt-1">Address:</p>
              <p className="text-xs">{item.docData.address.line1}</p>
              <p className="text-xs">{item.docData.address.line2}</p>
              <p className="mt-1">
                <span className="font-medium">Date & Time:</span>{' '}
                <span className="text-xs">
                  {formatDate(item.slotDate)} | {item.slotTime}
                </span>
              </p>
            </div>
            <div></div>
            <div className="flex flex-col gap-2 justify-end">
              {!item.cancel && !item.isCompleted && (
                <button
                  onClick={() => openModal(item, 'book')}
                  className="text-sm text-stone-500 text-center min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300"
                >
                  Pay Offline
                </button>
              )}
              {!item.cancel && !item.isCompleted && (
                <button
                  onClick={() => openModal(item, 'cancel')}
                  className="text-sm text-stone-500 text-center min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300"
                >
                  Cancel Appointment
                </button>
              )}
              {item.cancel && (
                <button className="text-sm text-center min-w-48 py-2 border rounded border-red-500 text-red-500 transition-all duration-300">
                  Appointment Cancelled
                </button>
              )}
              {!item.cancel && item.isCompleted && (
                <button className="text-sm text-center min-w-48 py-2 border rounded border-green-500 text-green-500 transition-all duration-300">
                  Appointment Completed
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal for confirmation */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Confirmation Modal"
        className="flex items-center justify-center h-screen"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <div className="bg-white rounded-lg p-8 w-80 shadow-md">
          <h2 className="text-lg font-semibold">
            {modalAction === 'cancel' ? 'Cancel Appointment' : 'Pay Offline'}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {modalAction === 'cancel'
              ? 'Are you sure you want to cancel this appointment?'
              : 'Are you sure you want to book this appointment?'}
          </p>
          <div className="flex justify-end gap-4 mt-4">
            <button
              onClick={closeModal}
              className="px-4 py-2 text-sm text-gray-500 bg-gray-200 rounded hover:bg-gray-300"
            >
              No
            </button>
            <button
              onClick={handleModalConfirm}
              className="px-4 py-2 text-sm text-white bg-blue-500 rounded hover:bg-blue-600"
            >
              Yes
            </button>
          </div>
        </div>
      </Modal>
    </div>
    </div>
  );
};

export default MyAppointments;
