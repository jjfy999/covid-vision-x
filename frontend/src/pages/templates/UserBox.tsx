import React from "react";
import { Link } from "react-router-dom";
import profileImg from "../../../../static/images/unknownPerson.jpg";
import { ReportDetails, UserAccountDetails } from "../UserAccInterface";
import "../../../../static/systemadmin/css/UserBox.css";

interface UserBoxProps {
    users: UserAccountDetails[];
    context: "account" | "patient";
}

interface ReportBoxProps {
    users: ReportDetails[];
    context: "report";
}

const UserBox: React.FC<UserBoxProps | ReportBoxProps> = ({
    users,
    context,
}) => {
    return (
        <div>
            {users.map((user, index) => {
                if (context === "account") {
                    const accountUser = user as UserAccountDetails;
                    return (
                        <div className="userBox" key={index}>
                            <div className="user-img-box">
                                <img
                                    src={profileImg}
                                    alt={accountUser.name}
                                    className="userImg"
                                />
                            </div>
                            <p className="id">{accountUser.id}</p>
                            <p className="name">{accountUser.name}</p>
                            <p className="role">{accountUser.role}</p>
                            <div className="viewInfoBtn">
                                <Link
                                    id={`infoBtn${index}`}
                                    to={`/AccDetail/${accountUser.id}`}
                                >
                                    View Details
                                </Link>
                            </div>
                        </div>
                    );
                } else if (context === "patient") {
                    const accountUser = user as UserAccountDetails;
                    return (
                        <div className="userBox" key={index}>
                            <div className="user-img-box">
                                <img
                                    src={profileImg}
                                    alt={accountUser.name}
                                    className="userImg"
                                />
                            </div>
                            <p className="pname">{accountUser.name}</p>
                            <p className="presult">{accountUser.result}</p>
                            <p className="pid">{accountUser.id}</p>

                            <div className="viewInfoBtn">
                                <Link id={`infoBtn${index}`} to={`/HomePage/`}>
                                    View Details
                                </Link>
                            </div>
                        </div>
                    );
                } else if (context === "report") {
                    const reportUser = user as ReportDetails;
                    return (
                        <div className="userBox" key={index}>
                            <div className="user-img-box">Hi</div>
                            <p className="id">{reportUser.id}</p>
                            <p className="name">{reportUser.patient_name}</p>
                            <p className="role">{reportUser.status}</p>
                            <div className="viewInfoBtn">
                                <Link id={`infoBtn${index}`} to={"/Homepage/"}>
                                    View Details
                                </Link>
                            </div>
                        </div>
                    );
                }
            })}
        </div>
    );
};

export default UserBox;
