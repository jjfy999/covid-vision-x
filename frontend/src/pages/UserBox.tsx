import React from 'react';
import { Link } from 'react-router-dom';
import profileImg from '../../../static/images/unknownPerson.jpg';

export interface User {
  id: string;
  name: string;
  role: string;
}

const UserBox: React.FC<{ user: User }> = ({ user }) => {
  return (
    <div className="userBox" key={user.id}>
      <div className="user-img-box">
        <img src={profileImg} alt={user.name} className="userImg" />
      </div>
      <p className="userID">{user.id}</p>
      <p className="userName">{user.name}</p>
      <p className="role">{user.role}</p>
      <div className="viewInfoBtn">
        <Link id="infoBtn" to={`/AccDetail/${user.id}`}>View Details</Link>
      </div>
    </div>
  );
};

export default UserBox;
