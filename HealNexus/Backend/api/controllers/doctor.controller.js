import Appointment from '../../data/models/appointment.models.js';
import DoctorProfile from '../../data/models/profile/profile.doctor.js';
import User from '../../data/models/user.model.js';

const changeAvailablity = async (req, res) => {
  try {
    const { userID } = req.body;

    const docData = await DoctorProfile.findById(userID);
    if (!docData) {
      return res.status(404).json({ success: false, message: 'Doctor not found' });
    }

    await DoctorProfile.findByIdAndUpdate(userID, { available: !docData.available });
    res.json({ success: true, message: 'Availability changed successfully' });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

const doctorlist = async (req, res) => {
  try {
    const doctorProfileData = await DoctorProfile.find({ isVerified: true });
    const doctorUserData = await User.find({});

    const doctorData = doctorProfileData.map((profile) => {
      const correspondingUser = doctorUserData.find(
        (user) => user._id.toString() === profile.userID.toString() 
      );

      return {
        profile,
        user: correspondingUser || null, 
      };
    });

    res.status(200).json({ success: true, doctorData });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

const appointmentsDoctor = async (req, res) => {
  try {
    const { userID } = req.body
    const appointments = await Appointment.find({ doctorID: userID });

    res.json({ success: true, appointments });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
}

const completeAppointment = async (req, res) => {
  try {
    const { userID, appointmentID } = req.body;
    const appointmentData = await Appointment.findById(appointmentID);

    if (appointmentData && appointmentData.doctorID === userID) {
      await Appointment.findByIdAndUpdate(appointmentID, { isCompleted: true })
      return res.json({ success: true, message: 'Appointment Completed' })
    } else {
      return res.json({ success: false, message: 'Mark Failed' })
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
}

const doctorDashboard = async (req, res) => {
  try {
    const { userID } = req.body;
    let appointments = await Appointment.find({ doctorID: userID })

    let earings = 0;
    appointments.map((item) => {
      if (item.isCompleted || item.payment) {
        earings += item.amount
      }
    })

    let patient = [];
    appointments.map((item) => {
      if (!patient.includes(item.patientID))
        patient.push(item.patientID)
    })

    const doctorDashboardData = {
      earings,
      appointments: appointments.length,
      patient: patient.length,
      latestappointments: appointments.slice(0, 5),
    }

    res.json({ success: true, doctorDashboardData })

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
}

export { changeAvailablity, doctorlist, appointmentsDoctor, completeAppointment, doctorDashboard };
