import React from "react";
import "./OurTeam.css";
import Harshit from '../assets/Harshit.png';
import Zeel from '../assets/zeel.png';
import Mihir from '../assets/mihir.png';
import Shail from '../assets/shail.png';
import Hitanshu from '../assets/hitanshu.jpg';
import Aditya from '../assets/aditya.png';
import Mentor from '../assets/prof.saurabh tiwary.png';
import Malay from '../assets/malay.jpg';
import Dharmi from '../assets/dharmi.png'


const teamMembers = [
  { name: "Shail Patel", id: "202201297", image: Shail },
  { name: "Aditya Raina", id: "202201466", image: Aditya },
  { name: " Dharmi Patel", id: "202201467", image: Dharmi },
  { name: "Malay Sidapara", id: "202201488", image: Malay },
  { name: "Harshit Prajapati", id: "202201500", image: Harshit },
  { name: "Mihir Patel", id: "202201506", image: Mihir },
  { name: "Zeel Danani", id: "202201507", image: Zeel },
  { name: "Hitanshu Varia", id: "202201510", image: Hitanshu },
  { name: "Ayush Chaudhry", id: "202201517", image: Harshit },
  { name: "Prof. Saurabh Tiwary", id: "Mentor", image:Mentor },
];

const OurTeam = () => {
  const goBackToHome = () => {
    window.location.href = "/"; // Navigate to the home page
  };

  return (
     
      <div>
      <h2 className="header">Our Team</h2>
      <div className="team-grid">
        {teamMembers.map((member, index) => (
          <div className="team-card" key={index}>
            <img src={member.image} alt={member.name} className="team-image" />
            <h3 className="team-name">{member.name}</h3>
            <p className="team-id">{member.id}</p>
          </div>
        ))}
      </div>

      {/* Go Back Button */}
      <button className="go-back-button" onClick={goBackToHome}>
        Go Back to Home Page
      </button>
    </div>
  );
};

export default OurTeam;