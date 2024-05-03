import '../../../static/systemadmin/css/AccDetail.css';
import profileImg from '../../../static/images/unknownPerson.jpg';
import Header from './Header';
import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { sampleUsers } from './sampleUserAcc';
import { UserAccountDetails } from './UserAccInterface';

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
            <section>
                <h1 id="userAccDeatails">Account Details</h1>
                <div id="tablediv">
                    <img src={profileImg} id="userImg" alt="User" />
                    <table id="infoTable">
                        <tbody>
                            <tr>
                                <th><label htmlFor="id">User ID:</label></th>
                                <td>{user.id}</td>
                            </tr>
                            <tr>
                                <th><label htmlFor="name">Name:</label></th>
                                <td>{user.name}</td>
                            </tr>
                            <tr>
                                <th><label htmlFor="username">Username:</label></th>
                                <td>{user.username}</td>
                            </tr>
                            <tr>
                                <th><label htmlFor="password">Password:</label></th>
                                <td>{user.password}</td>
                            </tr>
                            <tr>
                                <th><label htmlFor="role">Role:</label></th>
                                <td>{user.role}</td>
                            </tr>
                            <tr>
                                <th><label htmlFor="phone">Contact number:</label></th>
                                <td>{user.phone}</td>
                            </tr>
                            <tr>
                                <th><label htmlFor="email">Email:</label></th>
                                <td>{user.email}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="btn">
                    {/* <Link id="editBtn" to="/EditAcc">Edit</Link> */}
                    <Link id="editBtn" to={`/EditAcc/${name}`}>Edit</Link>
                    <Link id="backBtn" to="/UserAcc">Back</Link>
                </div>
            </section>
        </div>
    );
};

export default AccountDetails;
