import ProfileCard from "./templates/ProfileCard";
import UploadImage from "./templates/UploadImage";
import NonUpdatedReport from "./templates/NonUpdatedReport";
import Header from "./templates/Header";
import DrawerAppBar from "./templates/DrawerAppBar";
import { useEffect, useState } from "react";

const App = () => {
    console.log("DoctorProfile.tsx: App(), is being rendered.");
    const [docProfile, setDocProfile] = useState<any>(null);

    useEffect(() => {
        const fetchdata = async () => {
            console.log("Inside fetchdata()");
            try {
                const tokens = JSON.parse(
                    localStorage.getItem("authTokens") || "{}"
                );
                const token = tokens.access;
                console.log("Token: ", token);
                const res = await fetch("/baseUrl/docProfileView/", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + token,
                    },
                });
                console.log("fetch Completed");
                if (!res.ok) {
                    throw new Error("http error: status " + res.status);
                }
                const data = await res.json();
                setDocProfile(data);
            } catch (error) {
                console.error("Fetch error:", error);
            }
        };
        fetchdata();
    }, []);

    return (
        <>
            <Header userRole="doctor" />

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
