import ProfileCard from "./templates/ProfileCard";
import Header from "./templates/Header";
import { useEffect, useState } from "react";
import "../css/Profile.css";

const App = () => {
    const [docProfile, setDocProfile] = useState<any>(null);

    useEffect(() => {
        const fetchdata = async () => {
            try {
                const tokens = JSON.parse(
                    localStorage.getItem("authTokens") || "{}"
                );
                const token = tokens.access;
                const res = await fetch(
                    "http://CovidVisionX.eba-aap3dwij.ap-southeast-1.elasticbeanstalk.com/docProfileView/",
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: "Bearer " + token,
                        },
                    }
                );
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
        <div>
            <Header userRole="doctor" />
            <section id="patientProfilePage">
                <h1 id="profileTitle">My Profile</h1>
                <div id="patientProfileCard">
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
            </section>
            {/* Profile ends */}
        </div>
    );
};

export default App;
