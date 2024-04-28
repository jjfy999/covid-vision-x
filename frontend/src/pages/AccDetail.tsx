import '../../../static/systemadmin/css/AccDetail.css';
import profileImg from '../../../static/images/unknownPerson.jpg';
import Header from './Header';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { sampleUsers } from './sampleUserAcc';

// // Define sample user data
// const sampleUserData = {
//     id: "T0992",
//     name: "Bryant Ng",
//     role: "Doctor",
//     gender: "Male",
//     contact: "+65 7788 9900",
//     email: "bryantng@gmail.com"
// };

const AccountDetails = () => {

    // const [userData, setUserData] = useState(null);
    // const [error, setError] = useState(null);

    // useEffect(() => {
    //     const fetchUserData = async () => {
    //         try {
    //             // Simulate fetching user data from an API
    //             const response = await axios.get('API_ENDPOINT_URL');
    //             setUserData(response.data);
    //         } catch (error) {
    //             console.error('Error fetching user data:', error);
    //             setError('Error fetching user data');
    //         }
    //     };

    //     fetchUserData();
    // }, []);

    // if (error) {
    //     return <div>Error: {error}</div>;
    // }

    // if (!userData) {
    //     return <div>Loading...</div>;
    // }
//     return (
//         <div>
//             <Header userRole={'sysad'}/>

//             {/* Account Details Section */}
//             <section>
//                 <h1 id="userAccDeatails">Account Details</h1>
//                 <div id="tablediv">
//                     <img src={profileImg} id="userImg" alt="User" />
//                     <table id="infoTable">
//                         <tbody>
//                         <tr>
//                             <th><label htmlFor="id">User ID:</label></th>
//                             <td>{sampleUserData.id}</td>
//                         </tr>
//                         <tr>
//                             <th><label htmlFor="name">User Name:</label></th>
//                             <td>{sampleUserData.name}</td>
//                         </tr>
//                         <tr>
//                             <th><label htmlFor="role">Role:</label></th>
//                             <td>{sampleUserData.role}</td>
//                         </tr>
//                         <tr>
//                             <th><label htmlFor="gender">Gender:</label></th>
//                             <td>{sampleUserData.gender}</td>
//                         </tr>
//                         <tr>
//                             <th><label htmlFor="contact">Contact number:</label></th>
//                             <td>{sampleUserData.contact}</td>
//                         </tr>
//                         <tr>
//                             <th><label htmlFor="email">Email:</label></th>
//                             <td>{sampleUserData.email}</td>
//                         </tr>
//                         </tbody>
//                     </table>
//                 </div>
//                 <div className="btn">
//                     <Link id="editBtn" to="/EditAcc">Edit</Link>
//                     <Link id="backBtn" to="/UserAcc">Back</Link>
//                 </div>
//             </section>
//         </div>
//     );

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
                            {sampleUsers.map(user => (
                                <React.Fragment key={user.id}>
                                    <tr>
                                        <th><label htmlFor="id">User ID:</label></th>
                                        <td>{user.id}</td>
                                    </tr>
                                    <tr>
                                        <th><label htmlFor="name">User Name:</label></th>
                                        <td>{user.name}</td>
                                    </tr>
                                    <tr>
                                        <th><label htmlFor="role">Role:</label></th>
                                        <td>{user.role}</td>
                                    </tr>
                                    <tr>
                                        <th><label htmlFor="gender">Gender:</label></th>
                                        <td>{user.gender}</td>
                                    </tr>
                                    <tr>
                                        <th><label htmlFor="contact">Contact number:</label></th>
                                        <td>{user.contact}</td>
                                    </tr>
                                    <tr>
                                        <th><label htmlFor="email">Email:</label></th>
                                        <td>{user.email}</td>
                                    </tr>
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="btn">
                    <Link id="editBtn" to="/EditAcc">Edit</Link>
                    <Link id="backBtn" to="/UserAcc">Back</Link>
                </div>
            </section>
        </div>
    );
};

export default AccountDetails;
