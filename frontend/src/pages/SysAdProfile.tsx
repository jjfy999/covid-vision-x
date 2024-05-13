import Header from "./templates/Header";
import "../../../static/patient/css/Profile.css";
import ProfileCard from "../pages/templates/ProfileCard";
import { useEffect, useState } from "react";

const SysadProfile = () => {
    const [adminProfile, setAdminProfile] = useState<any>(null);

    useEffect(() => {
        const fetchdata = async () => {
            try {
                const tokens = JSON.parse(
                    localStorage.getItem("authTokens") || "{}"
                );
                const token = tokens.access;
                const res = await fetch("/baseUrl/sysProfileView/", {
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
                setAdminProfile(data);
            } catch (error) {
                console.error("Fetch error:", error);
            }
        };
        fetchdata();
    }, []);

    return (
        <div>
            <Header userRole={"system_admin"} />

            {/* Profile starts */}
            <section id="patientProfilePage">
                <h1 id="profileTitle">My Profile</h1>
                <div id="patientProfileCard">
                    {adminProfile ? (
                        <ProfileCard
                            id={adminProfile.id}
                            name={adminProfile.name}
                            username={adminProfile.username}
                            password={adminProfile.password}
                            role={adminProfile.role}
                            phone_number={adminProfile.phone}
                            email={adminProfile.email}
                            pageContext="profile"
                        />
                    ) : (
                        <div>Loading ...</div>
                    )}
                </div>
            </section>
            {/* Profile ends */}
        </div>
    );
};

export default SysadProfile;
