import React, { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { redirect } from "react-router-dom";

interface AuthContextProps {
  authTokens: string | null;
  user: { username: string; role: string } | null;
  //isAuthenticated: boolean;
  loginUser(username: string, password: string): Promise<void>;
  logoutUser: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // const [authTokens, setAuthTokens] = useState<string | null>(() =>
  //   localStorage.getItem("authTokens")
  //     ? JSON.parse(localStorage.getItem("authTokens"))
  //     : null
  // );

  // const [user, setUser] = useState<any>(() =>
  //   localStorage.getItem("authTokens")
  //     ? jwtDecode(localStorage.getItem("authTokens"))
  //     : null
  // );

  const [authTokens, setAuthTokens] = useState<string | null>(() => {
    const tokens = localStorage.getItem("authTokens");
    return tokens ? JSON.parse(tokens) : null;
  });
  
  const [user, setUser] = useState<{ username: string; role: string } | null>(() => {
    const tokens = localStorage.getItem("authTokens");
    return tokens ? jwtDecode(tokens) : null;
  });
  

  const [loading, setLoading] = useState(true);

  // const [isAuthenticated, setIsAuthenticated] = useState(false);

  const loginUser: AuthContextProps["loginUser"] = async (
    username: string,
    password: string
  ) => {
    // Perform authentication logic
    //setIsAuthenticated(true);
    console.log("Username at login: ", username);
    console.log("Password at login: ", password);
    const response = await fetch("http://127.0.0.1:8000/api/token/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
    const data = await response.json();

    if (response.status === 200) {
      setAuthTokens(data);
      setUser(jwtDecode(data.access));
      localStorage.setItem("authTokens", JSON.stringify(data));
    } else {
      alert("Something went wrong");
    }
  };

  const logoutUser = () => {
    // Perform logout logic
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    redirect("/loginpage");
    //setIsAuthenticated(false);
  };

  const updateToken = async () => {

    // const response = await fetch("http://127.0.0.1:8000/api/token/refresh/", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ refresh: authTokens?.refresh }),
    // });
    if (typeof authTokens === 'object' && authTokens !== null && 'refresh' in authTokens) {
      const response = await fetch("http://127.0.0.1:8000/api/token/refresh/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refresh: (authTokens as { refresh: string }).refresh }),
      });

      const data = await response.json();

      if (response.status === 200) {
        setAuthTokens(data);
        setUser(jwtDecode(data.access));
        localStorage.setItem("authTokens", JSON.stringify(data));
      } else {
        logoutUser();
      }

      if (loading) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (loading) {
      updateToken();
    }

    const updateTime = 1000 * 60 * 4;

    let interval = setInterval(() => {
      if (authTokens) {
        updateToken();
      }
    }, updateTime);
    return () => clearInterval(interval);
  }, [authTokens, loading]);

  return (
    <AuthContext.Provider
      value={{
        authTokens: authTokens,
        user: user,
        loginUser,
        logoutUser,
      }}
    >
      {loading ? null : children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
