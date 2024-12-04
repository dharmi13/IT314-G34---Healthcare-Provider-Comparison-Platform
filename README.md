# IT314-G34 Healthcare Provider Comparison Platform

The **Healthcare Provider Comparison Platform** is designed to help patients efficiently compare and choose healthcare providers, manage appointments, and interact with various medical services. It offers a user-friendly interface and functionalities for patients, doctors, hospitals, and administrators. This platform streamlines processes such as appointment booking, specialist search, appointment cancellation, and payment processing.

---

## 🏥 Key Features

### 🧑‍⚕️ **For Patients**
- **Login & Registration**: Securely create accounts, log in, and manage profiles.
- **Search Specialists**: Filter doctors by specialty, location, and ratings.
- **Book & Cancel Appointments**: View doctor profiles and available slots to manage bookings.
- **Provide Reviews**: Rate and review specialists after appointments.

### 👩‍⚕️ **For Doctors**
- **Login & Registration**: Securely create accounts, log in, and manage profiles.
- **Manage Appointments**: View and complete patient appointments.

### 🔧 **For Admins**
- **User & Specialist Management**: Manage user roles, validate and approve specialist profiles.

---

## 📅 Agile Development

The project follows an **Agile methodology**, broken into multiple **sprints** to ensure timely and efficient feature delivery. Each sprint focuses on specific features, such as:
- User management
- Appointment booking
- Payment processing
- Specialist reviews

---

## 🚀 Project Preview

- **Live Site**: [Heal Nexus Healthcare Provider Platform](https://heal-nexus.onrender.com/)  
- **Video Demonstration**: [YouTube Video](https://www.youtube.com/watch?v=lIFs1VMjC4c)

---

## 🤝 Contributors


| Name               | GitHub ID                                           |
|--------------------|----------------------------------------------------|
| Dharmi Patel       | [dharmi13](https://github.com/dharmi13)           |
| **Hitanshu Variya** | [Hitanshu-Variya](https://github.com/Hitanshu-Variya) |
| Ayush Chaudhari    | [chaudhariayus](https://github.com/chaudhariayus) |
| Zeel Danani        | [ZeelDanani](https://github.com/ZeelDanani)       |
| Harshit Prajapati  | [202201500](https://github.com/202201500)         |
| Mihir Patel        | [msp008987](https://github.com/msp008987)         |
| Shail Patel        | [shail-patel-321](https://github.com/shail-patel-321) |
| Malay Sidapara     | [Malay-25](https://github.com/Malay-25)           |
| Aditya Raina       | [slothfulscroll](https://github.com/slothfulscroll) |

---
## 🛠️ Installation and Project Setup
This project uses Node.js, MongoDB, and Express for the backend, and a React App for the frontend. Follow the steps below to set up and run the project locally.

Prerequisites
Ensure you have the following installed:

```
Node.js (LTS version recommended)
MongoDB (Local or Cloud instance, e.g., MongoDB Atlas)
npm or yarn
```

### Step 1: Clone the Repository
1. Clone the repository to your local machine:

```bash
git clone https://github.com/your-repo/healthcare-platform.git
cd healthcare-platform
```

---

### Step 2: Backend Setup
1. Navigate to the Backend folder:
```
cd ./HealNexus/Backend
```

2. Install the required dependencies:
```
npm install
```

3. Set up the environment variables:
- Create a .env file in the Backend directory.
- Add the following configuration:
```
PORT= <YOUR SPECIFIED PORT>
MONGODB_URL= <YOUR MONGOBD URL>
SECRET_JWT_KEY= <YOUR JWT SECRET KEY>
NODE_ENV= development
CLIENT_URL= http://localhost:<CLIENT PORT>

EMAIL_HOST= <YOUR HOST SERVICE>
EMAIL_PORT= <YOUR HOST SERVICE PORT NUMBER>
EMAIL_USER= <YOUR EMAIL ID>
EMAIL_PASSWORD= <YOUR APP PASSWORD>

CLOUDINARY_NAME= <YOUR ASSIGNED NAME>
CLOUDINARY_API_KEY= <YOUR API KEY>
CLOUDINARY_SECRET_KEY= <YOUR SECRET KEY>

ADMIN_EMAIL= <ANY EMAIL OF YOUR CHOICE>
ADMIN_PASSWORD= <YOUR PASSWORD OF YOUR CHOICE>
```

4. Start the backend server:
```
npm run dev
```
---

### Step 3: Frontend Setup
1. Navigate to the Frontend folder:
```
cd ../Frontend
```
2. Install the required dependencies:
```
npm install
```
3. Set up the environment variables:
- Create a .env file in the Frontend directory.
- Add the following configuration:
```
REACT_APP_BACKEND_URL= http://localhost:<YOUR FRONTEND PORT>
```
4. Start the frontend server:
```
npm start
```
---

### Step 4: Run the Application
- Ensure both the backend and frontend servers are running.
- If `http://localhost:<FRONTEND PORT>` doesn't open automatically, Open your browser and navigate to `http://localhost:<FRONTEND PORT>` to access the platform.

## 🚀 Closing Notes

Thank you for checking out the Healthcare Provider Comparison Platform! We hope this platform provides an efficient and user-friendly solution for managing healthcare services. 

Happy coding! 🚀 <br>
Made with 💖 Group-34.
