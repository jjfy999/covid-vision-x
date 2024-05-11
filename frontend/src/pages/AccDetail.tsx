import '../../../static/systemadmin/css/AccDetail.css';
import Header from './templates/Header';
import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { sampleUsers } from './sampleUserAcc';
import { UserAccountDetails } from './UserAccInterface';
import ProfileCard from './templates/ProfileCard';

const AccountDetails = () => {
    const { userId } = useParams(); // Get the user ID from URL parameters
    const [user, setUser] = useState<UserAccountDetails | null>(null);

    useEffect(() => {
        // Find the user with the matching ID from the sampleUsers array
        const foundUser = sampleUsers.find(user => user.id === userId);
        setUser(foundUser || null); // Set the user details in state
    }, [userId]); // Re-run the effect when the user ID changes

    // If the user is not found, display a message
    if (!user) {
        return <div>User not found</div>;
    }

    return (
        <div>
            <Header userRole={'sysad'}/>

            {/* Account Details Section */}
            <section id="accDetailPage">
                <h1 id="userAccDetails">Account Details</h1>
                <div id="profileCardContainer"> {/* Replace tablediv with profileCardContainer */}
                    <ProfileCard
                        id={user.id} 
                        name={user.name}
                        role={user.role}
                        contactNumber={user.phone} 
                        email={user.email}
                        username={user.username}
                        password={user.password}
                        pageContext='useracc'
                    />
                </div>
            </section>
        </div>
    );
};

export default AccountDetails;
