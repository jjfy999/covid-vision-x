import "../../../static/doctor/css/DoctorReport.css";
import { useState, useEffect } from "react";
import UserBox from "./templates/UserBox";
import { ReportDetails } from "./UserAccInterface";
import { FaSearch } from "react-icons/fa";
import Header from "./templates/Header";

// Combined Component
const DoctorReport = () => {
    const [users, setUsers] = useState<ReportDetails[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [filteredUsers, setFilteredUsers] = useState<UserAccountDetails[]>(
        []
    );
    const [searchTerm, setSearchTerm] = useState<string>("");

    useEffect(() => {
        // Fetch user data from the API endpoint when component mounts
        const fetchData = async () => {
            try {
                const tokens = JSON.parse(
                    localStorage.getItem("authTokens") || "{}"
                );
                const token = tokens.access;
                const res = await fetch("/baseUrl/docUploadedReports/", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + token,
                    },
                });
                const data = await res.json();
                console.log(data);
                setUsers(data.reports);
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
                user.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.patient_name
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                user.status.toLowerCase().includes(searchTerm.toLowerCase())
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
            {/* <DrawerAppBar userRole="doctor" firstText="Patient" /> */}
            <Header userRole="doctor" />

            <div className="doctorReportPage">
                {/* User Account Section */}
                <section>
                    <h1 id="doctorReportTitle">Reports</h1>
                    <div className="searchBox">
                        {/* Search bar */}
                        <div className="searchBar">
                            <button className="searchButton">
                                <FaSearch />
                            </button>
                            <input
                                id="searchInputPatient"
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
                        <p id="patientId">Patient ID</p>
                        <p id="patientName">Patient Name</p>
                        <p id="patientResult">Result</p>
                    </div>

                    {/* User Acc list */}
                    <div id="userListContainer">
                        <div id="userList">
                            {users && (
                                <UserBox
                                    users={filteredUsers}
                                    context="report"
                                />
                            )}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default DoctorReport;
