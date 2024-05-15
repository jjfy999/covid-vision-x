import { useEffect, useState } from "react";
import Header from "./templates/Header";
import NonUpdatedReport from "./templates/NonUpdatedReport";
import { useParams } from "react-router-dom";
import { ReportDetails } from "./UserAccInterface";

const ViewReportDetails = () => {
    const { id } = useParams();
    const [reportData, setReportData] = useState<ReportDetails | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const tokens = JSON.parse(
                    localStorage.getItem("authTokens") || "{}"
                );
                const token = tokens.access;
                const res = await fetch(
                    `https://CovidVisionX.eba-aap3dwij.ap-southeast-1.elasticbeanstalk.com/docShowReport/${id}/`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: "Bearer " + token,
                        },
                    }
                );
                const data = await res.json();
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
                    approved={reportData.approved}
                />
            )}
        </>
    );
};

export default ViewReportDetails;
