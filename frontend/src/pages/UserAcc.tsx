import '../../../static/systemadmin/css/UserAcc.css';
import profileImg from '../../../static/images/unknownPerson.jpg';
import Header from './Header';
import { Link } from 'react-router-dom';

// Combined Component
const UserAccount = () => {
  // Sample user data (can be replaced with dynamic data or fetched from API)
  const users = [
    { id: "C0001", name: "Bernad Koh", role: "Doctor" },
    { id: "C0002", name: "John Doe", role: "Nurse" },
    // Add more user data as needed
  ];

  return (
    <div>
        <Header userRole={'sysad'}/>

        {/* User Account Section */}
        <section>
            <h1 id="userAcc">User Accounts</h1>
            <div id="userList">
            {users.map(user => (
                <div className="userBox" key={user.id}>
                <div className="user-img-box">
                    <img src={profileImg} alt={user.name} className="userImg" />
                </div>
                <p className="userID">{user.id}</p>
                <p className="userName">{user.name}</p>
                <p className="role">{user.role}</p>
                <div className="viewInfoBtn">
                    <Link id="infoBtn" to="/AccDetail">View Details</Link>
                </div>
                </div>
            ))}
            </div>
        </section>
    </div>
  );
};

export default UserAccount;
