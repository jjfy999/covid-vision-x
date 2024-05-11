import '../../../static/doctor/css/DoctorReport.css';
import { useState, useEffect } from 'react';
import UserBox from './templates/UserBox';
import { sampleUsers } from './sampleUserAcc';
import { UserAccountDetails } from './UserAccInterface';
import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import DrawerAppBar from "./templates/DrawerAppBar";

// Combined Component
const DoctorReport = () => {
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
        <DrawerAppBar userRole="doctor" firstText="Patient" />

        <div className="doctorReportPage">
          {/* User Account Section */}
          <section>
              <h1 id="doctorReportTitle">Reports</h1>
              <div className="searchBox">
                
                {/* Search bar */}
                <div className="searchBar">
                  <button className="searchButton" ><FaSearch /></button>
                  <input
                    id="searchInputPatient"
                    type="text"
                    placeholder="Search user by ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              {/* Item title bar */}
              <div id="itemTitleBar">
                <p id="patientId">Patient ID</p>
                <p id="patientName">Patient Name</p>
                <p id="patientResult">Result</p>
              </div>

              {/* User Acc list */}
              <div id="userListContainer">
                <div id="userList">
                  {filteredUsers.length === 0 ? (
                    <p className="errorMessage">Patient not found...</p>
                  ) : (
                    <UserBox users={filteredUsers.filter(user => user.role === 'patient')} context='patient' />
                  )}
                </div>
              </div>

          </section>
        </div>
    </div>
  );
};

export default DoctorReport;
