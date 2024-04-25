import '../../../static/systemadmin/css/AccDetail.css';
import profileImg from '../../../static/images/unknownPerson.jpg';
import Header from './Header';
import { Link } from 'react-router-dom';

const AccountDetails = () => {
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
                    <td>T0992</td>
                </tr>
                <tr>
                    <th><label htmlFor="name">User Name:</label></th>
                    <td>Bryant Ng</td>
                </tr>
                <tr>
                    <th><label htmlFor="role">Role:</label></th>
                    <td>Doctor</td>
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
                <Link id="editBtn" to="/EditAcc">Edit</Link>
                <Link id="backBtn" to="/UserAcc">Back</Link>
            </div>
        </section>
    </div>
  );
};

export default AccountDetails;
