import "../../../static/doctor/css/DoctorReport.css";
import { useState, useEffect } from "react";
import UserBox from "./templates/UserBox";
import { FaSearch } from "react-icons/fa";
import Header from "./templates/Header";

// Combined Component
const DoctorNUR = () => {
    const [searchState, setSearchState] = useState<string>("");
    const [reportData, setReportData] = useState<any>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const tokens = JSON.parse(
                    localStorage.getItem("authTokens") || "{}"
                );
                const token = tokens.access;
                const res = await fetch("/baseUrl/docNonUploadedReports/", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + token,
                    },
                });
                const data = await res.json();
                console.log(data);
                setReportData(data.reports);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };
        fetchData();
    }, []);
    return (
        <>
            <Header userRole="doctor" />
            <div className="doctorReportPage">
                <section>
                    <h1 id="doctorReportTitle">Non-Updated Reports</h1>
                    <div className="searchBox">
                        <div className="searchBar">
                            <button className="searchButton">
                                <FaSearch />
                            </button>
                            <input
                                id="searchInputPatient"
                                type="text"
                                placeholder="Search"
                                value={searchState}
                                onChange={(e) => setSearchState(e.target.value)}
                            />
                        </div>
                    </div>
                    <div id="itemTitleBar">
                        <p id="titleId">Report ID</p>
                        <p id="titleName">Patient Name</p>
                        <p id="titleRole">Status</p>
                    </div>
                    <div id="userListContainer">
                        <div id="userList">
                            {reportData && (
                                <UserBox users={reportData} context="report" />
                            )}
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default DoctorNUR;
