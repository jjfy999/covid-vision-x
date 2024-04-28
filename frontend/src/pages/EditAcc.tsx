import '../../../static/systemadmin/css/EditAcc.css';
import profileImg from '../../../static/images/unknownPerson.jpg';
import Header from './Header';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { UserAccountDetails } from './UserAccInterface';
import { sampleUsers } from './sampleUserAcc';
import { useParams } from 'react-router-dom';

const EditAccountDetails = () => {

  const { userId } = useParams(); // Get the user ID from URL parameters
  const [formData, setFormData] = useState<UserAccountDetails | null>(null);

  useEffect(() => {
    // Find the user with the matching ID from the sampleUsers array
    const foundUser = sampleUsers.find(user => user.id === userId);
    setFormData(foundUser || null); // Set the user details in state
  }, [userId]); // Re-run the effect when the user ID changes

  // Function to handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
        ...formData!,
        [name]: value
    });
  };

  // Function to handle form submission
  const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      // Perform actions such as updating the user data
      console.log("Updated user data:", formData);
  };

  if (!formData) {
      return <div>User not found</div>;
  }

  return (
    <div>
      <Header userRole={'sysad'}/>

      {/* Account Details Section */}
      <section>
        <h1 id="userAccDeatails">Account Details</h1>
        <div id="tablediv">
          <img src={profileImg} id="userImg" alt="User" />
          <form onSubmit={handleSubmit}>

            <table id="infoTable">
              <tbody>
                  <tr>
                    <th><label htmlFor="id">User ID:</label></th>
                    <td><input type="text" id="id" name="id" value={formData.id} onChange={handleInputChange} /></td>
                  </tr>
                  <tr>
                    <th><label htmlFor="name">User Name:</label></th>
                    <td><input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} /></td>
                  </tr>
                  <tr>
                    <th><label htmlFor="role">Role:</label></th>
                    <td><input type="text" id="role" name="role" value={formData.role} onChange={handleInputChange} /></td>
                  </tr>
                  <tr>
                    <th><label htmlFor="gender">Gender:</label></th>
                    <td><input type="text" id="gender" name="gender" value={formData.gender} onChange={handleInputChange} /></td>
                  </tr>
                  <tr>
                    <th><label htmlFor="contact">Contact number:</label></th>
                    <td><input type="text" id="contact" name="contact" value={formData.contact} onChange={handleInputChange} /></td>
                  </tr>
                  <tr>
                    <th><label htmlFor="email">Email:</label></th>
                    <td><input type="text" id="email" name="email" value={formData.email} onChange={handleInputChange} /></td>
                  </tr>
                </tbody>
            </table>
          </form>
        </div>
        <div className="btn">
          {/* <Link id="doneBtn" to="/AccDetail">Done</Link> */}
          <button id="doneBtn" type="submit">Done</button>

          <Link id="cancelBtn" to="/AccDetail">Cancel</Link>
        </div>
      </section>
    </div>
  );
};

export default EditAccountDetails;
