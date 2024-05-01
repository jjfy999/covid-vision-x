import React from 'react';
import ReactDOM from "react-dom";
import ProfileCard from "./templates/ProfileCard";
import DrawerAppBar from "./templates/DrawerAppBar";

const App = () => {
  return (
    <>
      <DrawerAppBar />
      {/* <div style={{
        // display: 'flex',        // Enables flexbox layout
        // justifyContent: 'center', // Centers horizontally
        // alignItems: 'center',     // Centers vertically
        // height: 'calc(100vh - 64px)', // Full viewport height minus the AppBar height
        // marginTop: '100px',         // Offset by the height of the AppBar
      }}>
        <ProfileCard
          doctorId="D1987"
          name="Dr. Jane Smith"
          specialty="Cardiology"
          yearsOfExperience={10}
          contactNumber="+1 234 567 8900"
          email="dr.janesmith@example.com"
        />
      </div> */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 'calc(100vh - 450px)',
        marginTop: '100px'
      }}>
        <div style={{
          flexShrink: 0,  // Prevents the ProfileCard from shrinking
          width: '100%',  // Use 100% of the width of the parent to center the card properly
          maxWidth: '380px' // Ensures the card does not stretch beyond 500px
        }}>
          <ProfileCard
            doctorId="D1987"
            name="Dr. Jane Smith"
            contactNumber="+1 234 567 8900"
            email="dr.janesmith@example.com"
          />
        </div>
      </div>
    </>
  );
};

export default App;
