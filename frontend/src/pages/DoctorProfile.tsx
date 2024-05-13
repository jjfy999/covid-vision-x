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
                    height: "calc(100vh - 450px)",
                    marginTop: "250px",
                }}
            >
                <div
                    style={{
                        flexShrink: 0, // Prevents the ProfileCard from shrinking
                        width: "100%", // Use 100% of the width of the parent to center the card properly
                        maxWidth: "380px", // Ensures the card does not stretch beyond 500px
                    }}
                >
                    {docProfile && (
                        <ProfileCard
                            id={docProfile.id}
                            name={docProfile.name}
                            username={docProfile.username}
                            password={docProfile.password}
                            role={docProfile.role}
                            contactNumber={docProfile.phone_number}
                            email={docProfile.email}
                            pageContext="profile"
                        />
                    )}
                </div>
            </div>
            {/* 
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "calc(100vh - 450px)",
                    marginTop: "300px",
                }}
            >
                <div
                    style={{
                        flexShrink: 0,
                        width: "100%",
                        maxWidth: "600px",
                    }}
                >
                    <UploadImage
                        userRole="doctor"
                        onFileUpload={(file, patientName) => {
                            console.log(file, patientName);
                        }}
                    />

                    <UploadImage
                        userRole="researcher"
                        onFileUpload={(file, patientName) => {
                            console.log(file, patientName);
                        }}
                    />
                </div>
            </div>

            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                }}
            >
                <NonUpdatedReport
                // patientName="John Tan"
                // date="23 March 2024"
                // imageUrl="path_to_xray_image.png"
                // initialStatus="covid"
                />
            </div> */}
        </>
    );
};

export default App;
