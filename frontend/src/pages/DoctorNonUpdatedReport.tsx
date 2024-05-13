import NonUpdatedReport from "./templates/NonUpdatedReport";
import Header from "./templates/Header";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import UserBox from "./templates/UserBox";

const App = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    useEffect(() => {
        const fetchdata = async () => {
            try {
                const tokens = JSON.parse(
                    localStorage.getItem("authTokens") || "{}"
                );
                const token = tokens.access;
                console.log("Token: ", token);
                const res = await fetch("/baseUrl/docNonUploadedReports/", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + token,
                    },
                });
                if (!res.ok) {
                    throw new Error("http error: status " + res.status);
                }
                const data = await res.json();
                setUsers(data);
            } catch (error) {
                console.error("Fetch error:", error);
            }
        };
        fetchdata();
    }, []);

    const handleSearch = (searchTerm: string) => {
        const filtered = users.filter(
            (user) =>
                user.id.toString().includes(searchTerm.toLowerCase()) ||
                user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.role.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredUsers(filtered);
    };

    useEffect(() => {
        return () => {
            setSearchTerm("");
        };
    }, []);

    useEffect(() => {
        setFilteredUsers(users);
    }, [users]);

    return (
        <>
            <Header userRole="doctor" />
            <div className="NUR">
                {/* User Account Section */}
                <section>
                    <h1 id="userAccTitle">User Accounts</h1>
                    <div className="searchCreate">
                        {/* Search bar */}
                        <div className="searchContainer">
                            <button className="searchButton">
                                <FaSearch />
                            </button>
                            <input
                                id="searchInput"
                                type="text"
                                placeholder="Search user by ID..."
                                value={searchTerm}
                                onChange={(e) => {
                                    setSearchTerm(e.target.value);
                                    handleSearch(e.target.value);
                                }}
                            />
                        </div>
                    </div>
                    {/* Item title bar */}
                    <div id="itemTitleBar">
                        <p id="titleId">UserID</p>
                        <p id="titleName">Name</p>
                        <p id="titleRole">Role</p>
                    </div>
                    <div id="userListContainer">
                        <div id="userList">
                            {users && (
                                <UserBox
                                    users={filteredUsers}
                                    context="account"
                                />
                            )}
                        </div>
                    </div>
                </section>
            </div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                }}
            >
                <NonUpdatedReport />
            </div>
        </>
    );
};

export default App;
