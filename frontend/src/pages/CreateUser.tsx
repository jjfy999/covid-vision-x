import { Link } from "react-router-dom";
import profileImg from "../images/unknownPerson.jpg";
import Header from "./templates/Header";
import "../css/CreateUser.css";
import { useState, FormEventHandler } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function EditProfile() {
    const [name, setName] = useState("");
    const [role, setRole] = useState("");
    const [phone_number, setPhone_Number] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const formData = {
        name: name,
        role: role,
        phone_number: phone_number,
        email: email,
        username: username,
        password: password,
    };

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        if (
            name === "" ||
            role === "" ||
            phone_number === "" ||
            email === "" ||
            username === "" ||
            password === ""
        ) {
            alert("Please fill all fields");
            return;
        }
        try {
            const tokens = JSON.parse(
                localStorage.getItem("authTokens") || "{}"
            );
            const token = tokens.access;

            const response = await axios.post(
                "/baseUrl/sysCreateUser/",
                formData,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (response.status !== 201) {
                console.log("This is the error:", response);
                throw new Error("http error: status " + response.status);
            } else {
                alert("User created successfully");
                navigate("/UserAcc");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div>
            <Header userRole={"system_admin"} />

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
                                    <th>
                                        <label
                                            className="inputLabel"
                                            htmlFor="name"
                                        >
                                            Name:
                                        </label>
                                    </th>
                                    <th>
                                        <input
                                            className="inputField"
                                            type="text"
                                            id="name"
                                            value={name}
                                            onChange={(e) =>
                                                setName(e.target.value)
                                            }
                                        />
                                    </th>
                                </tr>

                                <tr>
                                    <th>
                                        <label
                                            className="inputLabel"
                                            htmlFor="role"
                                        >
                                            Role:
                                        </label>
                                    </th>
                                    <th>
                                        <input
                                            className="inputField"
                                            type="text"
                                            id="role"
                                            value={role}
                                            onChange={(e) =>
                                                setRole(e.target.value)
                                            }
                                        />
                                    </th>
                                </tr>

                                <tr>
                                    <th>
                                        <label
                                            className="inputLabel"
                                            htmlFor="contact"
                                        >
                                            Contact number:
                                        </label>
                                    </th>
                                    <th>
                                        <input
                                            className="inputField"
                                            type="text"
                                            id="contact"
                                            value={phone_number}
                                            onChange={(e) =>
                                                setPhone_Number(e.target.value)
                                            }
                                        />
                                    </th>
                                </tr>

                                <tr>
                                    <th>
                                        <label
                                            className="inputLabel"
                                            htmlFor="email"
                                        >
                                            Email:
                                        </label>
                                    </th>
                                    <th>
                                        <input
                                            className="inputField"
                                            type="text"
                                            id="email"
                                            value={email}
                                            onChange={(e) =>
                                                setEmail(e.target.value)
                                            }
                                        />
                                    </th>
                                </tr>
                                <tr>
                                    <th>
                                        <label
                                            className="inputLabel"
                                            htmlFor="username"
                                        >
                                            Username:
                                        </label>
                                    </th>
                                    <th>
                                        <input
                                            className="inputField"
                                            type="text"
                                            id="username"
                                            value={username}
                                            onChange={(e) =>
                                                setUsername(e.target.value)
                                            }
                                        />
                                    </th>
                                </tr>
                                <tr>
                                    <th>
                                        <label
                                            className="inputLabel"
                                            htmlFor="password"
                                        >
                                            Password:
                                        </label>
                                    </th>
                                    <th>
                                        <input
                                            className="inputField"
                                            type="text"
                                            id="password"
                                            value={password}
                                            onChange={(e) =>
                                                setPassword(e.target.value)
                                            }
                                        />
                                    </th>
                                </tr>
                            </tbody>
                        </table>
                    </form>
                </div>

                <div className="btn">
                    <button id="doneBtn" type="submit" form="infoForm">
                        Done
                    </button>
                    <Link id="cancelBtn" to="/UserAcc">
                        Cancel
                    </Link>
                </div>
            </section>
        </div>
    );
}

export default EditProfile;
