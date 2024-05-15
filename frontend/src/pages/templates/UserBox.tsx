import React from "react";
import { Link } from "react-router-dom";
import profileImg from "../../images/unknownPerson.jpg";
import {
    ReportDetails,
    UserAccountDetails,
    ModelList,
} from "../UserAccInterface";
import "../../css/UserBox.css";
import { useNavigate } from "react-router-dom";

interface UserBoxProps {
    users: UserAccountDetails[];
    context: "account";
}

interface ReportBoxProps {
    users: ReportDetails[];
    context: "report" | "patientReport";
}

interface ModelBoxProps {
    users: ModelList[];
    context: "model";
}

const UserBox: React.FC<UserBoxProps | ReportBoxProps | ModelBoxProps> = ({
    users,
    context,
}) => {
    const navigate = useNavigate();
    const handleDelete = async (id: string) => {
        try {
            const tokens = JSON.parse(
                localStorage.getItem("authTokens") || "{}"
            );
            const token = tokens.access;
            const res = await fetch(
                `http://CovidVisionX.eba-aap3dwij.ap-southeast-1.elasticbeanstalk.com/researcherDeleteModel/${id}/`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + token,
                    },
                }
            );
            if (!res.ok) {
                throw new Error("HTTP error, status = " + res.status);
            } else {
                alert("Model deleted successfully");
                navigate("/model", { replace: true });
            }
        } catch (error) {
            console.error("Error deleting model:", error);
        }
    };
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
                                    to={`/AccDetail/${accountUser.id}/`}
                                >
                                    View Details
                                </Link>
                            </div>
                        </div>
                    );
                } else if (context === "report") {
                    const reportUser = user as ReportDetails;
                    return (
                        <div className="userBox" key={index}>
                            <div className="user-img-box"> </div>
                            <p className="id">{reportUser.id}</p>
                            <p className="name">{reportUser.patient_name}</p>
                            <p className="role">{reportUser.status}</p>
                            <div className="viewInfoBtn">
                                <Link
                                    id={`infoBtn${index}`}
                                    to={`/reportDetails/${reportUser.id}/`}
                                >
                                    View Details
                                </Link>
                            </div>
                        </div>
                    );
                } else if (context === "patientReport") {
                    const reportUser = user as ReportDetails;
                    return (
                        <div className="userBox" key={index}>
                            <div className="user-img-box"> </div>
                            <p className="id">{reportUser.id}</p>
                            <p className="name">{reportUser.patient_name}</p>
                            <p className="role">{reportUser.status}</p>
                            <div className="viewInfoBtn">
                                <Link
                                    id={`infoBtn${index}`}
                                    to={`/report/${reportUser.id}/`}
                                >
                                    View Details
                                </Link>
                            </div>
                        </div>
                    );
                } else if (context === "model") {
                    const model = user as ModelList;
                    return (
                        <div className="userBox" key={index}>
                            <div className="user-img-box"> </div>
                            <p className="id">{model.id}</p>
                            <p className="name">{model.name}</p>
                            <div >
                                <button
                                    className="deleteModelBtn"
                                    id={`infoBtn${index}`}
                                    onClick={() => handleDelete(model.name)}
                                >
                                    Delete Model
                                </button>
                            </div>
                        </div>
                    );
                }
            })}
        </div>
    );
};

export default UserBox;
