import "../css/DoctorReport.css";
import { useState, useEffect } from "react";
import UserBox from "./templates/UserBox";
import { FaSearch } from "react-icons/fa";
import Header from "./templates/Header";
import { ReportDetails } from "./UserAccInterface";

// Combined Component
const DoctorNUR = () => {
    const [searchState, setSearchState] = useState<string>("");
    const [reportData, setReportData] = useState<ReportDetails[]>([]);
    const [filteredData, setFilteredData] = useState<ReportDetails[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const tokens = JSON.parse(
                    localStorage.getItem("authTokens") || "{}"
                );
                const token = tokens.access;
                const res = await fetch(
                    "https://www.covidvisionsx.online/docNonUploadedReports/",
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: "Bearer " + token,
                        },
                    }
                );
                const data = await res.json();
                console.log(data);
                setReportData(data.reports);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };
        fetchData();
    }, []);

    const handleSearch = (searchState: string) => {
        const filtered = reportData.filter(
            (report) =>
                report.id.toString().includes(searchState.toLowerCase()) ||
                report.patient_name
                    .toLowerCase()
                    .includes(searchState.toLowerCase()) ||
                report.status.toLowerCase().includes(searchState.toLowerCase())
        );
        setFilteredData(filtered);
    };

    useEffect(() => {
        return () => {
            setSearchState("");
        };
    }, []);

    useEffect(() => {
        setFilteredData(reportData);
    }, [reportData]);

    return (
        <>
            <Header userRole="doctor" />
            <div className="doctorReportPage">
                <section>
                    <h1 id="doctorReportTitle">Non-Uploaded Reports</h1>
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
                                onChange={(e) => {
                                    setSearchState(e.target.value);
                                    handleSearch(e.target.value);
                                }}
                            />
                        </div>
                    </div>
                    <div id="itemTitleBar">
                        <p id="NUReportId">Report ID</p>
                        <p id="NUReportpatientName">Patient Name</p>
                        <p id="NUReportpatientResult">Status</p>
                    </div>
                    <div id="userListContainer">
                        <div id="userList">
                            {reportData && (
                                <UserBox
                                    users={filteredData}
                                    context="report"
                                />
                            )}
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default DoctorNUR;
