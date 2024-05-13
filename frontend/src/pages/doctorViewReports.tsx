import { useEffect, useState } from "react";
import Header from "./templates/Header";
import NonUpdatedReport from "./templates/NonUpdatedReport";
import { useParams } from "react-router-dom";
import { ReportDetails } from "./UserAccInterface";

const viewReportDetails = () => {
    const { id } = useParams<{ id: string }>();
    const [reportData, setReportData] = useState<ReportDetails[]>([]);

    useEffect(() => {
        console.log(id);
        const fetchData = async () => {
            try {
                const tokens = JSON.parse(
                    localStorage.getItem("authTokens") || "{}"
                );
                const token = tokens.access;
                const res = await fetch(`/baseUrl/docShowReport/${id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + token,
                    },
                });
                const data = await res.json();
                console.log(data);
                setReportData(data);
            } catch (error) {
                console.error("Error fetching report data:", error);
            }
        };
    }, [id]);

    return (
        <>
            <Header userRole={"doctor"} />
            <NonUpdatedReport ReportData={reportData} />
        </>
    );
};

export default viewReportDetails;
