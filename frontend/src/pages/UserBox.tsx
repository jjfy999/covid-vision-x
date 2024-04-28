import React from 'react';
import { Link } from 'react-router-dom';
import profileImg from '../../../static/images/unknownPerson.jpg';
import { UserAccountDetails } from './UserAccInterface';

// export interface User {
//   id: string;
//   name: string;
//   role: string;
// }
interface UserBoxProps {
  users: UserAccountDetails[];
}

const UserBox: React.FC<UserBoxProps> = ({ users }) => {

  // Hardcoded user ID for sample user data
  // const userId = "T0992";

  // const firstThreeUsers = users.slice(0, 3);
  const firstThreeUsers = users;


  return (
    <div>
      {firstThreeUsers.map((user, index) => (
        <div className="userBox" key={index}>
          <div className="user-img-box">
            <img src={profileImg} alt={user.name} className="userImg" />
          </div>
          <p className="userID">{user.id}</p>
          <p className="userName">{user.name}</p>
          <p className="role">{user.role}</p>
          <div className="viewInfoBtn">
            <Link id={`infoBtn${index}`} to={`/AccDetail/${user.id}`}>View Details</Link>
          </div>
        </div>
      ))}
    </div>
    // <div className="userBox" key={user.id}>
    //   <div className="user-img-box">
    //     <img src={profileImg} alt={user.name} className="userImg" />
    //   </div>
    //   <p className="userID">{user.id}</p>
    //   <p className="userName">{user.name}</p>
    //   <p className="role">{user.role}</p>
    //   <div className="viewInfoBtn">
    //     {/* <Link id="infoBtn" to={`/AccDetail/${user.id}`}>View Details</Link> */}
    //     <Link id="infoBtn" to="/AccDetail">View Details</Link>

        
    //     {/* Link to the AccDetail page with hardcoded user ID
    //     <Link id="infoBtn" to={`/AccDetail/${userId}`}>View Details</Link> */}
    //   </div>
    // </div>
  );
};

export default UserBox;
