import React, { useState } from "react";
import axios from "axios";
import "../../../static/login/login.css";
import logo from "../../../static/images/logo_transparent.png";
import { useAuth } from "./templates/AuthContexr";
import { Navigate } from "react-router-dom";

function LoginPage() {
  const [isLoginView, setIsLoginView] = useState(true); // Toggle between login and signup view
  const [role, setRole] = useState(""); // Role state for login
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { user, loginUser } = useAuth();
  const [loggedInUser, setLoggedInUser] = useState(false);

  const handleLogin = async (username: string, password: string) => {
    //preventDefault();
    if (!role || !username || !password) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      console.log("Username before login: ", username);
      console.log("Password before login: ", password);
      await loginUser(username, password);
      setLoggedInUser(true);
    } catch (error) {
      console.error("Login error", error);
      alert("Login failed");
    }
  };
  if (loggedInUser) {
    // If user is authenticated, redirect based on user role
    switch (user.role) {
      case "patient":
        return <Navigate to="/Report" replace />;
      case "doctor":
        return <Navigate to="/doctorprofile" replace />;
      case "system_admin":
        return <Navigate to="/UserAcc" replace />;
      default:
        return null; // or any other default behavior
    }
  }

  const handleSignup = async (event: any) => {
    event.preventDefault();
    if (!username || !password || password !== confirmPassword) {
      alert("Please check your inputs or passwords do not match.");
      return;
    }

    const signupData = {
      username,
      password,
      role: "patient", // Hardcoded role as patient for signup
    };

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          //"X-CSRFToken": csrfToken,
        },
      };
      await axios.post("/signup/", signupData, config);
      alert("Signup successful, you can now login.");
      setIsLoginView(true); // Switch back to login view after signup
    } catch (error) {
      console.error("Signup error", error);
      alert("Signup failed");
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>, any) => {
    event.preventDefault();
    await handleLogin(username, password);
  };

  return (
    <div id="loginSection">
      <div id="img-box">
        <img src={logo} id="logo_login" alt="Company Logo" />
      </div>

      {isLoginView ? (
        <div id="loginForm">
          <h1 className="heading">Login</h1>
          <form onSubmit={handleSubmit}>
            <label className="label" htmlFor="role">
              <b>Login As</b>
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
              id="roleInput"
            >
              <option value="" disabled selected>
                Select a role
              </option>
              <option value="patient">Patient</option>
              <option value="doctor">Doctor</option>
              <option value="sysad">System Administrator</option>
            </select>

            <label className="label" htmlFor="uname">
              <b>Username</b>
            </label>
            <input
              className="label"
              type="text"
              placeholder="Enter Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />

            <label className="label" htmlFor="psw">
              <b>Password</b>
            </label>
            <input
              className="label"
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button className="loginPageBtn" type="submit">Login</button>

            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setIsLoginView(false);
              }}
              style={{
                color: "blue",
                cursor: "pointer",
                textDecoration: "underline",
              }}
            >
              Don't have an account? Sign up
            </a>
          </form>
        </div>
      ) : (
        <div id="signUpForm">
          <h1 className="heading">Sign Up</h1>
          <form onSubmit={handleSignup}>
            <label className="label" htmlFor="uname">
              <b>Username</b>
            </label>
            <input
              className="label"
              type="text"
              placeholder="Enter Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />

            <label className="label" htmlFor="psw">
              <b>Password</b>
            </label>
            <input
              className="label"
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <label className="label" htmlFor="confirmPsw">
              <b>Confirm Password</b>
            </label>
            <input
              className="label"
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            <button className="loginPageBtn" type="submit">Sign Up</button>

            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setIsLoginView(true);
              }}
              style={{
                color: "blue",
                cursor: "pointer",
                textDecoration: "underline",
              }}
            >
              Already have an account? Log in
            </a>
          </form>
        </div>
      )}
    </div>
  );
}

export default LoginPage;
