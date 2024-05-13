import { useEffect, useState } from "react";
import Header from "./templates/Header";
import NonUpdatedReport from "./templates/NonUpdatedReport";
import { useParams } from "react-router-dom";
import { ReportDetails } from "./UserAccInterface";

const ViewReportDetails = () => {
    const { id } = useParams();
    const [reportData, setReportData] = useState<ReportDetails | null>(null);

    useEffect(() => {
        console.log(id);
        const fetchData = async () => {
            try {
                const tokens = JSON.parse(
                    localStorage.getItem("authTokens") || "{}"
                );
                const token = tokens.access;
                const res = await fetch(`/baseUrl/docShowReport/${id}/`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + token,
                    },
                });
                const data = await res.json();
                console.log("id: ", id);
                console.log(data);
                setReportData(data);
            } catch (error) {
                console.error("Error fetching report data:", error);
            }
        };
        fetchData();
    }, [id]);

    return (
        <>
            <Header userRole={"doctor"} />
            {reportData && (
                <NonUpdatedReport
                    id={reportData.patient_id}
                    patient_name={reportData.patient_name}
                    date={reportData.date}
                    image={reportData.image}
                    status={reportData.status}
                />
            )}
        </>
    );
};

export default ViewReportDetails;
