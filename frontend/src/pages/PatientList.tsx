import { useEffect, useState } from "react";
import Header from "./templates/Header";
import { UserAccountDetails } from "./UserAccInterface";
import { FaSearch } from "react-icons/fa";
import UserBox from "./templates/UserBox";
import "../css/UserAcc.css";

const PatientList = () => {
    const [user, setUser] = useState<UserAccountDetails[]>([]);
    const [filteredData, setFilteredData] = useState<UserAccountDetails[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const tokens = JSON.parse(
                    localStorage.getItem("authTokens") || "{}"
                );
                const token = tokens.access;
                const res = await fetch(
                    "https://www.covidvisionsx.online/docPatientAccList/",
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: "Bearer " + token,
                        },
                    }
                );
                const data = await res.json();
                const patientData = data.patients;
                console.log(patientData);
                setUser(patientData);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };
        fetchData();
    }, []);

    const handleSearch = (searchTerm: string) => {
        const filtered = user.filter(
            (user) =>
                user.id.toString().includes(searchTerm.toLowerCase()) ||
                user.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredData(filtered);
    };

    useEffect(() => {
        return () => {
            setSearchTerm("");
        };
    }, []);

    useEffect(() => {
        setFilteredData(user);
    }, [user]);

    return (
        <>
            <Header userRole="doctor" />
            <div className="userAccPage">
                <section>
                    <h1 id="userAccTitle">Patient List</h1>
                    <div className="searchBox">
                        <button className="searchButton">
                            <FaSearch />
                        </button>
                        <input
                            id="searchInput"
                            type="text"
                            placeholder="Search"
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                handleSearch(e.target.value);
                            }}
                        />
                    </div>
                </section>
            </div>
            <div id="itemTitleBar">
                <p id="patientListId">Patient ID</p>
                <p id="patientListName">Patient Name</p>
            </div>
            <div id="userListContainer">
                <div id="userList">
                    {user && <UserBox users={filteredData} context="account" />}
                </div>
            </div>
        </>
    );
};

export default PatientList;
