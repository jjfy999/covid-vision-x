import "../css/AccDetail.css";
import Header from "./templates/Header";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { UserAccountDetails } from "./UserAccInterface";
import ProfileCard from "./templates/ProfileCard";

const AccountDetails = () => {
    const { userId } = useParams(); // Get the user ID from URL parameters
    const [user, setUser] = useState<UserAccountDetails | null>(null);

    useEffect(() => {
        const fetchdata = async () => {
            try {
                const tokens = JSON.parse(
                    localStorage.getItem("authTokens") || "{}"
                );
                const token = tokens.access;
                const res = await fetch(`/baseUrl/docSearchUser/${userId}/`, {
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
                setUser(data);
            } catch (error) {
                console.error("Fetch error:", error);
            }
        };
        fetchdata();
    }, [userId]); // Re-run the effect when the user ID changes

    // If the user is not found, display a message
    if (!user) {
        return <Link to="/HomePage">User not found {userId}</Link>;
    }

    return (
        <div>
            <Header userRole={"system_admin"} />

            {/* Account Details Section */}
            <section id="accDetailPage">
                <h1 id="userAccDetails">Account Details</h1>
                <div id="profileCardContainer">
                    {" "}
                    {/* Replace tablediv with profileCardContainer */}
                    <ProfileCard
                        id={user.id}
                        name={user.name}
                        role={user.role}
                        phone_number={user.phone}
                        email={user.email}
                        username={user.username}
                        password={user.password}
                        result={
                            user.role === "patient" ? user.result : undefined
                        }
                        pageContext="useracc"
                    />
                </div>
            </section>
        </div>
    );
};

export default AccountDetails;
