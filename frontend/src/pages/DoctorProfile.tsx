import ProfileCard from "./templates/ProfileCard";
import Header from "./templates/Header";
import { useEffect, useState } from "react";

const App = () => {
    const [docProfile, setDocProfile] = useState<any>(null);

    useEffect(() => {
        const fetchdata = async () => {
            try {
                const tokens = JSON.parse(
                    localStorage.getItem("authTokens") || "{}"
                );
                const token = tokens.access;
                const res = await fetch("/baseUrl/docProfileView/", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + token,
                    },
                });
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
                            phone_number={docProfile.phone_number}
                            email={docProfile.email}
                            pageContext="profile"
                        />
                    )}
                </div>
            </div>
        </>
    );
};

export default App;
