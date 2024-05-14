import Header from "./templates/Header";
import "../css/Report.css";
import xrayImg from "../../../static/images/xray.png";
import { useEffect, useState } from "react";

const Report = () => {
    const [patientReport, setPatientReport] = useState<any>(null);
    const [outcome, setOutcome] = useState("Negative");

    useEffect(() => {
        const fetchdata = async () => {
            try {
                const tokens = JSON.parse(
                    localStorage.getItem("authTokens") || "{}"
                );
                const token = tokens.access;
                const res = await fetch("/baseUrl/patientReport/", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + token,
                    },
                });
                if (!res.ok) {
                    console.log("This is the error:", res);
                    throw new Error("http error: status " + res.status);
                }
                const data = await res.json();
                setPatientReport(data);
                console.log(data);
                setOutcome(
                    data.status === "Positive" ? "covid" || "Covid" : "Negative"
                );
            } catch (error) {
                console.error("Fetch error:", error);
            }
        };
        fetchdata();
    }, []);

    return (
        <div>
            <Header userRole={"patient"} />

            <section id="reportPage">
                <h1 id="patientReport">My Report</h1>

                <div id="reportBox">
                    <img src={xrayImg} id="xrayImg" alt="Patient X-ray" />
                    {patientReport ? (
                        <table id="reportTable">
                            <tbody>
                                <tr>
                                    <th>
                                        <label
                                            className="reportLabel"
                                            htmlFor="id"
                                        >
                                            Patient ID
                                        </label>
                                    </th>
                                    <td>: {patientReport.patient_id}</td>
                                </tr>

                                <tr>
                                    <th>
                                        <label
                                            className="reportLabel"
                                            htmlFor="name"
                                        >
                                            Patient Name
                                        </label>
                                    </th>
                                    <td>: {patientReport.patient_name}</td>
                                </tr>
                                <tr>
                                    <th>
                                        <label
                                            className="reportLabel"
                                            htmlFor="status"
                                        >
                                            Covid-19 Diagnosis status
                                        </label>
                                    </th>
                                    <td>: {patientReport.status}</td>
                                </tr>
                                <tr>
                                    <th>
                                        <label
                                            className="reportLabel"
                                            htmlFor="status"
                                        >
                                            Covid-19 Diagnosis outcome
                                        </label>
                                    </th>
                                    <td>: {outcome}</td>
                                </tr>
                            </tbody>
                        </table>
                    ) : (
                        <div>Loading...</div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Report;
