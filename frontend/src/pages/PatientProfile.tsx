import Header from './Header';
import '../../../static/patient/css/Profile.css';
import ProfileCard from '../pages/templates/ProfileCard';

function PatientProfile() {

    const patientProfile = {
        id: "0001",
        name: "John Doe",
        username: "johndoe123",
        password: "jd@1234",
        role: "patient",
        phone: "123-456-7890",
        email: "johndoe@example.com"
    };

    return (
        <div>
            <Header userRole={'patient'} />

            {/* Profile starts */}
            <section id="patientProfilePage">
                <h1 id="profileTitle">My Profile</h1>
                <div id="patientProfileCard">
                    <ProfileCard
                    id={patientProfile.id}
                    name={patientProfile.name}
                    username={patientProfile.username}
                    password={patientProfile.password}
                    role={patientProfile.role}
                    contactNumber={patientProfile.phone}
                    email={patientProfile.email}
                    pageContext='profile'
                />
                </div>
            </section>
            {/* Profile ends */}

        </div>
    );
}

export default PatientProfile;
