import React, { useState } from 'react';
import axios from 'axios';
import '../theme/login.css';
import logo from '../../../static/images/logo.png';
import DrawerAppBar from './templates/DrawerAppBar';

function LoginPage() {

    const [isLoginView, setIsLoginView] = useState(true);  // Toggle between login and signup view
    const [role, setRole] = useState('');  // Role state for login
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [csrfToken, setCsrfToken] = useState('');

    React.useEffect(() => {
        const fetchCsrfToken = async () => {
            const response = await axios.get('/api/csrf_token/');
            setCsrfToken(response.data.csrfToken);
        };
        fetchCsrfToken();
    }, []);

<<<<<<< HEAD
    const handleLogin = async (event: any) => {
        event.preventDefault();
        if (!role || !username || !password) {
            alert('Please fill in all required fields.');
            return;
=======
      {
        /* 
      const config = {
          headers: {
              'Content-Type': 'application/json',
              'X-CSRFToken': csrfToken,
            },
        };
        const result = await axios.post('/login/', loginData, config);
    */
      }
      // Redirect based on role
      if (user) {
        switch (user.role) {
          case "patient":
            window.location.href = "/Report";
            break;
          case "doctor":
            window.location.href = "/";
            break;
          case "system_admin":
            window.location.href = "/UserAcc";
            break;
          default:
            break;
>>>>>>> 19d41af3e3b1dd949b733dee8bfec5d7a9f4e779
        }

        const loginData = {
            role,
            username,
            password,
        };

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken,
                },
            };
            const result = await axios.post('/login/', loginData, config);
            // Redirect based on role
            switch (role) {
                case 'patient':
                    window.location.href = '/Report';
                    break;
                case 'doctor':
                    window.location.href = '/';
                    break;
                case 'sysad':
                    window.location.href = '/UserAcc';
                    break;
                default:
                    break;
            }
        } catch (error) {
            console.error('Login error', error);
            alert('Login failed');
        }
    };

    const handleSignup = async (event: any) => {
        event.preventDefault();
        if (!username || !password || password !== confirmPassword) {
            alert('Please check your inputs or passwords do not match.');
            return;
        }

        const signupData = {
            username,
            password,
            role: 'patient',  // Hardcoded role as patient for signup
        };

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken,
                },
            };
            await axios.post('/signup/', signupData, config);
            alert('Signup successful, you can now login.');
            setIsLoginView(true);  // Switch back to login view after signup
        } catch (error) {
            console.error('Signup error', error);
            alert('Signup failed');
        }
    };

    return (
        <div id="container">
            <div id="loginSection">
                {isLoginView ? (
                    <div>
                        <h1 id="loginHeading">LOGIN</h1>
                        <form onSubmit={handleLogin}>
                            <label htmlFor="role"><b>Login As</b></label>
                            <select value={role} onChange={e => setRole(e.target.value)} required id="roleInput">
                                <option value="" disabled selected>Select a role</option>
                                <option value="patient">Patient</option>
                                <option value="doctor">Doctor</option>
                                <option value="sysad">System Administrator</option>
                            </select>

                            <label htmlFor="uname"><b>Username</b></label>
                            <input type="text" placeholder="Enter Username" value={username} onChange={e => setUsername(e.target.value)} required />

                            <label htmlFor="psw"><b>Password</b></label>
                            <input type="password" placeholder="Enter Password" value={password} onChange={e => setPassword(e.target.value)} required />

                            <button type="submit">Login</button>

                            <a href="#" onClick={(e) => {
                                e.preventDefault();
                                setIsLoginView(false);
                            }} style={{ color: 'blue', cursor: 'pointer', textDecoration: 'underline' }}>Don't have an account? Sign up</a>
                        </form>
                    </div>
                ) : (
                    <div>
                        <h1 id="loginHeading">SIGN UP</h1>
                        <form onSubmit={handleSignup}>
                            <label htmlFor="uname"><b>Username</b></label>
                            <input type="text" placeholder="Enter Username" value={username} onChange={e => setUsername(e.target.value)} required />

                            <label htmlFor="psw"><b>Password</b></label>
                            <input type="password" placeholder="Enter Password" value={password} onChange={e => setPassword(e.target.value)} required />

                            <label htmlFor="confirmPsw"><b>Confirm Password</b></label>
                            <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />

                            <button type="submit">Sign Up</button>

                            <a href="#" onClick={(e) => {
                                e.preventDefault();
                                setIsLoginView(true);
                            }} style={{ color: 'blue', cursor: 'pointer', textDecoration: 'underline' }}>Already have an account? Log in</a>
                        </form>
                    </div>
                )}
            </div>

            <div id="logoSection">
                <div id="img-box">
                    <img src={logo} id="logoImg" alt="Company Logo" />
                </div>
            </div>
        </div>
    );
}

export default LoginPage;


/* import React, { useState } from 'react';
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
 */