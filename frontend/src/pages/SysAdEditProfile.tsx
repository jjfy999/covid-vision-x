// import Header from './Header';
// import '../../../static/systemadmin/css/EditSysadminProfile.css';
// import profileImg from '../../../static/images/unknownPerson.jpg';
// import { Link } from 'react-router-dom';

// const SysadEditProfile = () => {
//   return (
//     <div>
//       {/* Header section */}
//       <Header userRole={'sysad'}/>

//       {/* Profile Editing section */}
//       <section>
//         <h1 id="SAEditProfile">Profile Editing</h1>
//         <div id="tablediv">
//         <img src={profileImg} id="patientImg" alt="Profile" />
//           <table id="infoTable">
//             <tbody>
//               <tr>
//                 <th><label htmlFor="id">System Admin ID:</label></th>
//                 <td><input type="text" id="id" name="id" /></td>
//               </tr>
//               <tr>
//                 <th><label htmlFor="name">System Admin Name:</label></th>
//                 <td><input type="text" id="name" name="name" /></td>
//               </tr>
//               <tr>
//                 <th><label htmlFor="age">Age:</label></th>
//                 <td><input type="text" id="age" name="age" /></td>
//               </tr>
//               <tr>
//                 <th><label htmlFor="gender">Gender:</label></th>
//                 <td><input type="text" id="gender" name="gender" /></td>
//               </tr>
//               <tr>
//                 <th><label htmlFor="contact">Contact number:</label></th>
//                 <td><input type="text" id="contact" name="contact" /></td>
//               </tr>
//               <tr>
//                 <th><label htmlFor="email">Email:</label></th>
//                 <td><input type="text" id="email" name="email" /></td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//         <div className="btn">
//             <Link id="doneBtn" to="/SysAdProfile">Done</Link>
//             <Link id="cancelBtn" to="/SysAdProfile">Cancel</Link>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default SysadEditProfile;
