import { Link } from 'react-router-dom';
import profileImg from '../../../static/images/unknownPerson.jpg';
import Header from './Header';
import '../../../static/patient/css/EditProfile.css';

function EditProfile() {
  return (
    <div>
      <Header userRole={'sysad'} />


      {/* Edit Profile section starts */}
      <section>
        <h1 id="patientProfile">Add New User</h1>

        <div id="tablediv">
          <img src={profileImg} id="patientImg" alt="Patient" />
          <table id="infoTable">
            <tbody>
              <tr>
                <th><label htmlFor="id">Patient ID:</label></th>
                <th><input type="text" id="id" name="id" /></th>
              </tr>

              <tr>
                <th><label htmlFor="name">Patient Name:</label></th>
                <th><input type="text" id="name" name="name" /></th>
              </tr>

              <tr>
                <th><label htmlFor="age">Age:</label></th>
                <th><input type="text" id="age" name="age" /></th>
              </tr>

              <tr>
                <th><label htmlFor="gender">Gender:</label></th>
                <th><input type="text" id="gender" name="gender" /></th>
              </tr>

              <tr>
                <th><label htmlFor="contact">Contact number:</label></th>
                <th><input type="text" id="contact" name="contact" /></th>
              </tr>

              <tr>
                <th><label htmlFor="email">Email:</label></th>
                <th><input type="text" id="email" name="email" /></th>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="btn">
          <Link id="doneBtn" to="/UserAcc">Done</Link>
          <Link id="cancelBtn" to="/UserAcc">Cancel</Link>
        </div>
      </section>
      {/* Edit Profile section ends */}

      {/* Include your JavaScript file */}
      <script src="withSearchBar.js"></script>
    </div>
  );
}

export default EditProfile;
