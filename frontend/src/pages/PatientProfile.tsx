import Header from './Header';
import '../../../static/patient/css/Profile.css';
import profileImg from '../../../static/images/unknownPerson.jpg';
import { Link } from 'react-router-dom';
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
                <h1 id="patientProfile">My Profile</h1>
                <div id="patientProfileCard">
                    <ProfileCard
                    id={patientProfile.id}
                    name={patientProfile.name}
                    username={patientProfile.username}
                    password={patientProfile.password}
                    role={patientProfile.role}
                    contactNumber={patientProfile.phone}
                    email={patientProfile.email}
                />
                </div>

                {/* <div className="btn">
                    <Link id="editBtn" to="/PatientEditProfile">Edit</Link>
                </div> */}
            </section>
            {/* Profile ends */}
        </div>
    );
}

export default PatientProfile;
