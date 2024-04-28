import '../../../static/systemadmin/css/EditAcc.css';
import profileImg from '../../../static/images/unknownPerson.jpg';
import Header from './Header';
import { Link } from 'react-router-dom';

const EditAccountDetails = () => {
  return (
    <div>
      <Header userRole={'sysad'}/>

      {/* Account Details Section */}
      <section>
        <h1 id="userAccDeatails">Account Details</h1>
        <div id="tablediv">
          <img src={profileImg} id="userImg" alt="User" />
          <table id="infoTable">
            <tbody>
              <tr>
                <th><label htmlFor="id">User ID:</label></th>
                <td><input type="text" id="id" name="id" /></td>
              </tr>
              <tr>
                <th><label htmlFor="name">User Name:</label></th>
                <td><input type="text" id="name" name="name" /></td>
              </tr>
              <tr>
                <th><label htmlFor="role">Role:</label></th>
                <td><input type="text" id="role" name="role" /></td>
              </tr>
              <tr>
                <th><label htmlFor="gender">Gender:</label></th>
                <td><input type="text" id="gender" name="gender" /></td>
              </tr>
              <tr>
                <th><label htmlFor="contact">Contact number:</label></th>
                <td><input type="text" id="contact" name="contact" /></td>
              </tr>
              <tr>
                <th><label htmlFor="email">Email:</label></th>
                <td><input type="text" id="email" name="email" /></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="btn">
          <Link id="doneBtn" to="/AccDetail">Done</Link>
          <Link id="cancelBtn" to="/AccDetail">Cancel</Link>
        </div>
      </section>
    </div>
  );
};

// // export default EditAccountDetails;
// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import profileImg from '../../../static/images/unknownPerson.jpg';
// import Header from './Header';

// // Define the interface for user account details
// interface UserAccountDetails {
//   id: string;
//   name: string;
//   role: string;
//   gender: string;
//   contact: string;
//   email: string;
// }

// const EditAccountDetails = ({ userData }: { userData: UserAccountDetails }) => {
//   // State to manage form data
//   const [formData, setFormData] = useState(userData);

//   // Function to handle form input changes
//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value
//     });
//   };

//   // Function to handle form submission
//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     // Perform actions such as updating the user data
//     console.log("Updated user data:", formData);
//   };

//   return (
//     <div>
//       <Header userRole={'sysad'}/>

//       {/* Account Details Section */}
//       <section>
//         <h1 id="userAccDeatails">Edit Account Details</h1>
//         <div id="tablediv">
//           <img src={profileImg} id="userImg" alt="User" />
//           <form onSubmit={handleSubmit}>
//             <table id="infoTable">
//               <tbody>
//                 <tr>
//                   <th><label htmlFor="id">User ID:</label></th>
//                   <td><input type="text" id="id" name="id" value={formData.id} onChange={handleInputChange} /></td>
//                 </tr>
//                 <tr>
//                   <th><label htmlFor="name">User Name:</label></th>
//                   <td><input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} /></td>
//                 </tr>
//                 <tr>
//                   <th><label htmlFor="role">Role:</label></th>
//                   <td><input type="text" id="role" name="role" value={formData.role} onChange={handleInputChange} /></td>
//                 </tr>
//                 <tr>
//                   <th><label htmlFor="gender">Gender:</label></th>
//                   <td><input type="text" id="gender" name="gender" value={formData.gender} onChange={handleInputChange} /></td>
//                 </tr>
//                 <tr>
//                   <th><label htmlFor="contact">Contact number:</label></th>
//                   <td><input type="text" id="contact" name="contact" value={formData.contact} onChange={handleInputChange} /></td>
//                 </tr>
//                 <tr>
//                   <th><label htmlFor="email">Email:</label></th>
//                   <td><input type="text" id="email" name="email" value={formData.email} onChange={handleInputChange} /></td>
//                 </tr>
//               </tbody>
//             </table>
//             <div className="btn">
//               <button id="doneBtn" type="submit">Done</button>
//               <Link id="cancelBtn" to="/AccDetail">Cancel</Link>
//             </div>
//           </form>
//         </div>
//       </section>
//     </div>
//   );
// };

export default EditAccountDetails;
