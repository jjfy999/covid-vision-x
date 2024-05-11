import '../../../static/systemadmin/css/UserAcc.css';
import Header from './templates/Header';
import { useState, useEffect } from 'react';
import UserBox from './templates/UserBox';
import { sampleUsers } from './sampleUserAcc';
import { UserAccountDetails } from './UserAccInterface';
import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

// Combined Component
const UserAccount = () => {
  const [users, setUsers] = useState<UserAccountDetails[]>(sampleUsers);
  const [error, setError] = useState<string | null>(null);
  const [filteredUsers, setFilteredUsers] = useState<UserAccountDetails[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');

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

    const filtered = users.filter(user =>
      user.id.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchTerm, users]); // Empty dependency array means this effect runs only once after the first render

  // Function to handle search
  const handleSearch = () => {
    const filtered = users.filter(user =>
      user.id.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  return (
    <div>
        <Header userRole={'sysad'}/>

        <div className="userAccPage">
          {/* User Account Section */}
          <section>
              <h1 id="userAccTitle">User Accounts</h1>
              <div className="searchCreate">
                
                {/* Search bar */}
                <div className="searchContainer">
                  <button className="searchButton" ><FaSearch /></button>
                  <input
                    id="searchInput"
                    type="text"
                    placeholder="Search user by ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                {/* Create User Account button */}
                <div id="createUser">
                  <Link className='btns' to="/CreateUser">&#43; Add New User</Link>
                </div>
              </div>

              {/* Item title bar */}
              <div id="itemTitleBar">
                <p id="titleId">UserID</p>
                <p id="titleName">Name</p>
                <p id="titleRole">Role</p>
              </div>

              {/* User Acc list */}
              <div id="userListContainer">
                <div id="userList">
                  {filteredUsers.length === 0 ? (
                    <p className="errorMessage">User not found...</p>
                  ) : (
                    <UserBox users={filteredUsers} />
                  )}
                </div>
              </div>

          </section>
        </div>
    </div>
  );
};

export default UserAccount;
