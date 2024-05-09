import { Link } from 'react-router-dom';
import profileImg from '../../../static/images/unknownPerson.jpg';
import Header from './Header';
import '../../../static/systemadmin/css/CreateUser.css';

function EditProfile() {
  return (
    <div>
      <Header userRole={'sysad'} />


      {/* Edit Profile section starts */}
      <section id="createUserPage">
        <h1 id="createUserTitle">Add New User</h1>

        <div id="createUserTable">
          <div id="userImgBox">
            <img src={profileImg} id="userImg" alt="Patient" />
          </div>
          <table id="infoTable">
            <tbody>
              <tr>
                <th><label htmlFor="id">ID</label></th>
                <th><input type="text" id="id" name="id" /></th>
              </tr>

              <tr>
                <th><label htmlFor="name">Name</label></th>
                <th><input type="text" id="name" name="name" /></th>
              </tr>

              <tr>
                <th><label htmlFor="role">Role</label></th>
                <th><input type="text" id="role" name="role" /></th>
              </tr>

              <tr>
                <th><label htmlFor="contact">Contact number</label></th>
                <th><input type="text" id="contact" name="contact" /></th>
              </tr>

              <tr>
                <th><label htmlFor="email">Email</label></th>
                <th><input type="text" id="email" name="email" /></th>
              </tr>
              <tr>
                <th><label htmlFor="username">Username</label></th>
                <th><input type="text" id="username" name="username" /></th>
              </tr>
              <tr>
                <th><label htmlFor="password">Password</label></th>
                <th><input type="text" id="password" name="password" /></th>
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
