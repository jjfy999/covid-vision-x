import Header from "./templates/Header";
import { Link } from "react-router-dom";
import "../css/UserAcc.css";
import { useEffect, useState } from "react";
import { ModelList } from "./UserAccInterface";
import UserBox from "./templates/UserBox";

const App = () => {
    const [users, setUsers] = useState<ModelList[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const tokens = JSON.parse(
                    localStorage.getItem("authTokens") || "{}"
                );
                const token = tokens.access;
                const response = await fetch("/baseUrl/docListModels/", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + token,
                    },
                });

                if (!response.ok) {
                    throw new Error("HTTP error, status = " + response.status);
                }
                const data = await response.json();
                const users = data.keys.map((key: string, index: number) => ({
                    id: index.toString(),
                    name: key,
                }));
                setUsers(users);
            } catch (error) {
                console.error("Error fetching model data:", error);
            }
        };
        fetchData();
    }, []);

    return (
        <>
            <Header userRole="researcher" />
            <h1 id="modelTitle">Models</h1>

            <div className="searchCreate">
                <div id="createUser">
                    <Link className="btns" to="/ModelUpload/">
                        &#43; Add New Model
                    </Link>
                </div>
            </div>
            <div id="itemTitleBar">
                <p id="modelId">Id</p>
                <p id="modelName">Name</p>
            </div>
            <div id="userListContainer">
                <div id="userList">
                    {users && <UserBox users={users} context="model" />}
                </div>
            </div>
        </>
    );
};

export default App;
