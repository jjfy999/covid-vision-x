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

export default EditAccountDetails;
