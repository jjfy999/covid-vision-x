import React, { useState } from 'react';
import axios from 'axios';
import '../theme/login.css';

function LoginPage() {
    const [role, setRole] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [csrfToken, setCsrfToken] = useState('');

    React.useEffect(() => {
        const fetchCsrfToken = async () => {
            const response = await axios.get('/api/csrf_token/'); //Change endpoint
            setCsrfToken(response.data.csrfToken);
        };
        fetchCsrfToken();
    }, []);

    const validateLogin = async (event) => {
        event.preventDefault();
        if (!role || !username || !password) {
            alert('Please fill in all required fields.');
            return;
        }

        const loginData = {
            role,
            username,
            password
        };

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken,
                },
            };
            const result = await axios.post('/login/', loginData, config); //Change this too
            //Redirect user based on role
            switch (role) {
                case 'patient':
                    window.location.href = '/PatientUI/Report.html';
                    break;
                case 'doctor':
                    window.location.href = '/';
                    break;
                case 'sysad':
                    window.location.href = '/SystemAdminUI/UserAcc.html';
                    break;
                default:
                    break;
            }
        } catch (error) {
            console.error('Login error', error);
        }
    };

    return (
        <div id="container">
            <div id="loginSection">
                <div>
                    <h1 id="loginHeading">LOGIN</h1>
                    <form onSubmit={validateLogin}>
                        <label htmlFor="role"><b>Login As</b></label>
                        <select value={role} onChange={e => setRole(e.target.value)} required id="roleInput">
                            <option value="" disabled selected>Select a role</option>
                            <option value="patient">Patient</option>
                            <option value="doctor">Doctor</option>
                            <option value="sysad">System Administrator</option>
                        </select>

                        <label htmlFor="uname"><b>Username</b></label>
                        <input
                            type="text"
                            placeholder="Enter Username"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            required
                        />

                        <label htmlFor="psw"><b>Password</b></label>
                        <input
                            type="password"
                            placeholder="Enter Password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                        />

                        <button type="submit">Login</button>
                    </form>
                </div>
            </div>

            <div id="logoSection">
                <div id="img-box">
                    <img src="/images/logo.png" id="logoImg" alt="Company Logo" />
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
