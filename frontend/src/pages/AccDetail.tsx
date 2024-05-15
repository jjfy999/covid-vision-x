import "../css/AccDetail.css";
import Header from "./templates/Header";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { UserAccountDetails } from "./UserAccInterface";
import ProfileCard from "./templates/ProfileCard";
import { useAuth } from "./templates/AuthContexr";

const AccountDetails = () => {
    const { userId } = useParams(); // Get the user ID from URL parameters
    const { user } = useAuth();
    const [checkUser, setCheckUser] = useState<UserAccountDetails | null>(null);

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
                setCheckUser(data);
            } catch (error) {
                console.error("Fetch error:", error);
            }
        };
        fetchdata();
    }, [userId]); // Re-run the effect when the user ID changes

    // If the user is not found, display a message
    if (!checkUser) {
        return <Link to="/HomePage/">User not found {userId}</Link>;
    }

    return (
        <>
            {user.role === "system_admin" ? (
                <div>
                    <Header userRole={"system_admin"} />

                    {/* Account Details Section */}
                    <section id="accDetailPage">
                        <h1 id="userAccDetails">Account Details</h1>
                        <div id="profileCardContainer">
                            {" "}
                            <ProfileCard
                                id={checkUser.id}
                                name={checkUser.name}
                                role={checkUser.role}
                                phone_number={checkUser.phone_number}
                                email={checkUser.email}
                                username={checkUser.username}
                                password={checkUser.password}
                                status={
                                    checkUser.role === "patient"
                                        ? checkUser.status
                                        : undefined
                                }
                                pageContext="useracc"
                            />
                        </div>
                    </section>
                </div>
            ) : (
                <div>
                    <Header userRole={"doctor"} />

                    {/* Account Details Section */}
                    <section id="accDetailPage">
                        <h1 id="userAccDetails">Patient Details</h1>
                        <div id="profileCardContainer">
                            {" "}
                            <ProfileCard
                                id={checkUser.id}
                                name={checkUser.name}
                                role={checkUser.role}
                                phone_number={checkUser.phone_number}
                                email={checkUser.email}
                                username={checkUser.username}
                                status={checkUser.status}
                                pageContext="doctor"
                            />
                        </div>
                    </section>
                </div>
            )}
        </>
    );
};

export default AccountDetails;
