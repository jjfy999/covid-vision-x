import Header from './Header';
import '../../../static/patient/css/Profile.css';
import ProfileCard from '../pages/templates/ProfileCard';

const SysadProfile = () => {

    const adminProfile = {
        id: "0007",
        name: "Admin Admin",
        username: "admin123",
        password: "adminpass",
        role: "system admin",
        phone: "777-777-7777",
        email: "admin@example.com"
    };

    return (
        <div>
            <Header userRole={'sysad'} />

            {/* Profile starts */}
            <section id="patientProfilePage">
                <h1 id="profileTitle">My Profile</h1>
                <div id="patientProfileCard">
                    <ProfileCard
                    id={adminProfile.id}
                    name={adminProfile.name}
                    username={adminProfile.username}
                    password={adminProfile.password}
                    role={adminProfile.role}
                    contactNumber={adminProfile.phone}
                    email={adminProfile.email}
                    pageContext='profile'
                />
                </div>
            </section>
            {/* Profile ends */}

        </div>
    );
};

export default SysadProfile;
