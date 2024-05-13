import { useEffect, useState } from "react";
import ProfileCard from "./templates/ProfileCard";
import Header from "./templates/Header";

const App = () => {
    const [researcherProfile, setResearcherProfile] = useState<any>(null);

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
                setResearcherProfile(data);
            } catch (error) {
                console.error("Fetch error:", error);
            }
        };
        fetchdata();
    }, []);

    return (
        <>
            <Header userRole="researcher" />
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "calc(100vh - 350px)",
                    marginTop: "100px",
                }}
            >
                <section id="researcherProfilePage">
                    <h1 id="profileTitle">My Profile</h1>
                    <div
                        id="researcherProfileCard"
                        style={{
                            flexShrink: 0,
                            width: "100%",
                            maxWidth: "500px",
                        }}
                    >
                        {researcherProfile && (
                            <ProfileCard
                                id={researcherProfile.id}
                                name={researcherProfile.name}
                                username={researcherProfile.username}
                                password={researcherProfile.password}
                                role={researcherProfile.role}
                                phone_number={researcherProfile.phone_number}
                                email={researcherProfile.email}
                                pageContext="profile"
                            />
                        )}
                    </div>
                </section>
            </div>
        </>
    );
};

export default App;
