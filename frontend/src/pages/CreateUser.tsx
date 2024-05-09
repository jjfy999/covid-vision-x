import { Link } from 'react-router-dom';
import profileImg from '../../../static/images/unknownPerson.jpg';
import Header from './Header';
import '../../../static/systemadmin/css/CreateUser.css';
import { useState, ChangeEvent, FormEvent } from 'react'; 
import axios from 'axios'; 

function EditProfile() {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    role: '',
    contact: '',
    email: '',
    username: '',
    password: ''
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e: FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post('your-api-endpoint', formData); // Replace 'your-api-endpoint' with your actual API endpoint
      console.log(response.data); // Log the response data
    } catch (error) {
      console.error('Error:', error);
    }
  };

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
          <form id="infoForm" onSubmit={handleSubmit}> 
            <table id="infoTable">
              <tbody>
                <tr>
                  <th><label className="inputLabel" htmlFor="id">ID:</label></th>
                  <th><input className="inputField" type="text" id="id" name="id" /></th>
                </tr>

                <tr>
                  <th><label className="inputLabel" htmlFor="name">Name:</label></th>
                  <th><input className="inputField" type="text" id="name" name="name" /></th>
                </tr>

                <tr>
                  <th><label className="inputLabel" htmlFor="role">Role:</label></th>
                  <th><input className="inputField" type="text" id="role" name="role" /></th>
                </tr>

                <tr>
                  <th><label className="inputLabel" htmlFor="contact">Contact number:</label></th>
                  <th><input className="inputField" type="text" id="contact" name="contact" /></th>
                </tr>

                <tr>
                  <th><label className="inputLabel" htmlFor="email">Email:</label></th>
                  <th><input className="inputField" type="text" id="email" name="email" /></th>
                </tr>
                <tr>
                  <th><label className="inputLabel" htmlFor="username">Username:</label></th>
                  <th><input className="inputField" type="text" id="username" name="username" /></th>
                </tr>
                <tr>
                  <th><label className="inputLabel" htmlFor="password">Password:</label></th>
                  <th><input className="inputField" type="text" id="password" name="password" /></th>
                </tr>
              </tbody>
            </table>
          </form>
        </div>

        <div className="btn">
          <button id="doneBtn" type="submit" form="infoForm">Done</button>
          {/* <Link id="doneBtn" to="/UserAcc">Done</Link> */}
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
