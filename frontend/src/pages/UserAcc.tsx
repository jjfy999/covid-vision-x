import "../../../static/systemadmin/css/UserAcc.css";
import Header from "./templates/Header";
import { useState, useEffect } from "react";
import UserBox from "./templates/UserBox";
import { UserAccountDetails } from "./UserAccInterface";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

// Combined Component
const UserAccount = () => {
    const [users, setUsers] = useState<UserAccountDetails[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [filteredUsers, setFilteredUsers] =
        useState<UserAccountDetails[]>(users);
    const [searchTerm, setSearchTerm] = useState<string>("");

    useEffect(() => {
        // Fetch user data from the API endpoint when component mounts
        const fetchData = async () => {
            try {
                const tokens = JSON.parse(
                    localStorage.getItem("authTokens") || "{}"
                );
                const token = tokens.access;
                const response = await fetch("/baseUrl/sysUserAccList/", {
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
                const allUsers = [
                    ...data.patients,
                    ...data.doctors,
                    ...data.system_admins,
                    ...data.researchers,
                ];
                setUsers(allUsers);
            } catch (error) {
                console.error("Error fetching user data:", error);
                setError("Error fetching user data");
            }
        };
        fetchData(); // Call the fetchData function
    }, []); // Empty dependency array means this effect runs only once after the first render

    // Function to handle search
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
        <div>
            <Header userRole={"sysad"} />

            <div className="userAccPage">
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

                        {/* Create User Account button */}
                        <div id="createUser">
                            <Link className="btns" to="/CreateUser">
                                &#43; Add New User
                            </Link>
                        </div>
                    </div>

                    {/* Item title bar */}
                    <div id="itemTitleBar">
                        <p id="titleId">UserID</p>
                        <p id="titleName">Name</p>
                        <p id="titleRole">Role</p>
                    </div>

                    {/* User Acc list */}
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
        </div>
    );
};

export default UserAccount;
