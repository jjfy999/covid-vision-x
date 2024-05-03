import '../../../static/systemadmin/css/UserAcc.css';
import Header from './Header';
import { useState, useEffect } from 'react';
import UserBox from './UserBox';
import { sampleUsers } from './sampleUserAcc';
import { UserAccountDetails } from './UserAccInterface';
import { Link } from 'react-router-dom';


// Combined Component
const UserAccount = () => {
  const [users, setUsers] = useState<UserAccountDetails[]>(sampleUsers);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch user data from the API endpoint when component mounts
    const fetchData = async () => {
      try {
        // const response = await axios.get('API_ENDPOINT_URL');
        // setUsers(response.data);
        setUsers(sampleUsers);

      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('Error fetching user data');
      }
    };

    fetchData(); // Call the fetchData function
  }, []); // Empty dependency array means this effect runs only once after the first render

  return (
    <div>
        <Header userRole={'sysad'}/>

        <body>
          {/* User Account Section */}
          <section>
              <h1 id="userAcc">User Accounts</h1>
              
              {/* Create User Account Section */}
              <div id="createUser">
                <Link className='btns' to="/CreateUser">&#43; Add New User</Link>
              </div>
              
              <div id="userList">
                <UserBox users={users} />
              </div>
          </section>
        </body>
    </div>
  );
};

export default UserAccount;
