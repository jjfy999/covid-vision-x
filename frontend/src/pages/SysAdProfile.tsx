import Header from './Header';
import '../../../static/systemadmin/css/SysadminProfile.css';
import profileImg from '../../../static/images/unknownPerson.jpg';
import { Link } from 'react-router-dom';

const SysadProfile = () => {
  return (
    <div>
        <Header userRole={'sysad'}/>

        {/* Report section */}
        <section>
            <h1 id="patientProfile">My Profile</h1>
            <div id="tablediv">
            <img src={profileImg} id="patientImg" alt="Profile" />
            <table id="infoTable">
                <tbody>
                <tr>
                    <th><label htmlFor="id">System Admin ID:</label></th>
                    <td>T0992</td>
                </tr>
                <tr>
                    <th><label htmlFor="name">System Admin Name:</label></th>
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
                </tbody>
            </table>
            </div>
            <div className="btn">
                <Link id="editBtn" to="/SysAdEditProfile">Edit</Link>
            </div>
        </section>
    </div>
  );
};

export default SysadProfile;
