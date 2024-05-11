import React from 'react';
import { Link } from 'react-router-dom';
import profileImg from '../../../../static/images/unknownPerson.jpg';
import { UserAccountDetails } from '../UserAccInterface';
import '../../../../static/systemadmin/css/UserBox.css';

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
          <p className="id">{user.id}</p>
          <p className="name">{user.name}</p>
          <p className="role">{user.role}</p>
          <div className="viewInfoBtn">
            <Link id={`infoBtn${index}`} to={`/AccDetail/${user.id}`}>View Details</Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserBox;
