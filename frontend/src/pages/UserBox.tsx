import React from 'react';
import { Link } from 'react-router-dom';
import profileImg from '../../../static/images/unknownPerson.jpg';
import { UserAccountDetails } from './UserAccInterface';
import '../../../static/systemadmin/css/UserBox.css';

interface UserBoxProps {
  users: UserAccountDetails[];
}

const UserBox: React.FC<UserBoxProps> = ({ users }) => {
  return (
    <div>
      {users.map((user, index) => (
        <div className="userBox" key={index}>
          <div className="user-img-box">
            <img src={profileImg} alt={user.name} className="userImg" />
          </div>
          <p className="name">{user.name}</p>
          <p className="username">{user.username}</p>
          <p className="role">{user.role}</p>
          <div className="viewInfoBtn">
            <Link id={`infoBtn${index}`} to={`/AccDetail/${user.name}`}>View Details</Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserBox;
