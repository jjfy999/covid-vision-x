// import React from 'react';
import ReactDOM from "react-dom";
import ProfileCard from "./templates/ProfileCard";
import DrawerAppBar from "./templates/DrawerAppBar";

const App = () => {
  return (
    <>
      <DrawerAppBar />
      <ProfileCard
        doctorId="D1987"
        name="Dr. Jane Smith"
        specialty="Cardiology"
        yearsOfExperience={10}
        contactNumber="+1 234 567 8900"
        email="dr.janesmith@example.com"
      />
    </>
  );
};

export default App;
