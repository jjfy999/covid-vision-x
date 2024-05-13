import React from "react";
import { Link } from "react-router-dom";
import profileImg from "../../../../static/images/unknownPerson.jpg";
import { UserAccountDetails } from "../UserAccInterface";
import "../../../../static/systemadmin/css/UserBox.css";

interface UserBoxProps {
    users: UserAccountDetails[];
    context: "account" | "patient";
}

const UserBox: React.FC<UserBoxProps> = ({ users, context }) => {
    return (
        <div>
            {users.map((user, index) => (
                <div className="userBox" key={index}>
                    <div className="user-img-box">
                        <img
                            src={profileImg}
                            alt={user.name}
                            className="userImg"
                        />
                    </div>
                    {context === "account" && <p className="id">{user.id}</p>}
                    {context === "account" && (
                        <p className="name">{user.name}</p>
                    )}
                    {context === "account" && (
                        <p className="role">{user.role}</p>
                    )}
                    {context === "account" && (
                        <div className="viewInfoBtn">
                            <Link
                                id={`infoBtn${index}`}
                                to={
                                    user.role === "doctor"
                                        ? `/PNUR/${user.id}`
                                        : `/AccDetail/${user.id}`
                                }
                            >
                                View Details
                            </Link>
                        </div>
                    )}
                    {context === "patient" && <p className="pid">{user.id}</p>}
                    {context === "patient" && (
                        <p className="pname">{user.name}</p>
                    )}
                    {context === "patient" && (
                        <p className="presult">{user.result}</p>
                    )}
                </div>
            ))}
        </div>
    );
};

export default UserBox;
