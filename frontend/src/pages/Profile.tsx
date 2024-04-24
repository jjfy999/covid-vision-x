import Header from './Header';
import '../../../static/patient/css/Profile.css';
import profileImg from '../../../static/images/unknownPerson.jpg';
import { Link } from 'react-router-dom';

function PatientProfile() {
  return (
    <div>
        <Header/>

        {/* Profile starts */}
        <section>
            <h1 id="patientProfile">My Profile</h1>

            <div id="tablediv">
            <img src={profileImg} id="patientImg" alt="Patient" />
            <table id="infoTable">
                <tbody>
                <tr>
                    <th><label htmlFor="id">Patient ID:</label></th>
                    <td>T0992</td>
                </tr>

                <tr>
                    <th><label htmlFor="name">Patient Name:</label></th>
                    <td>Bryant Ng</td>
                </tr>

                <tr>
                    <th><label htmlFor="age">Age:</label></th>
                    <td>37</td>
                </tr>

                <tr>
                    <th><label htmlFor="gender">Gender:</label></th>
                    <td>Male</td>
                </tr>

                <tr>
                    <th><label htmlFor="contact">Contact number:</label></th>
                    <td>+65 7788 9900</td>
                </tr>

                <tr>
                    <th><label htmlFor="email">Email:</label></th>
                    <td>bryantng@gmail.com</td>
                </tr>

                <tr>
                    <th><label htmlFor="status">Covid-19 Diagnosis status:</label></th>
                    <td>Pending</td>
                </tr>
                </tbody>
            </table>
            </div>

            <div className="btn">
                <Link id="editBtn" to="/EditProfile">Edit</Link>
            </div>
        </section>
      {/* Profile ends */}
    </div>
  );
}

export default PatientProfile;
