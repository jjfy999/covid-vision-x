import React, { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { redirect } from "react-router-dom";

interface AuthContextProps {
    authTokens: string | null;
    user: { username: string; role: string };
    loginUser(username: string, password: string): Promise<void>;
    logoutUser: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [authTokens, setAuthTokens] = useState<string | null>(() =>
        localStorage.getItem("authTokens")
            ? JSON.parse(localStorage.getItem("authTokens") || "")
            : null
    );

    const [user, setUser] = useState<any>(() =>
        localStorage.getItem("authTokens")
            ? jwtDecode(localStorage.getItem("authTokens") || "")
            : null
    );

    const [loading, setLoading] = useState(true);

    const loginUser: AuthContextProps["loginUser"] = async (
        username: string,
        password: string
    ) => {
        const response = await fetch("www.covidvisionsx.online/api/token/", {
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
            console.log("Response status: ", response.status);
            console.log("Response data: ", data);
            console.log("There is a response error", user);
            alert("Something went wrong");
        }
    };

    const logoutUser = () => {
        setAuthTokens(null);
        setUser(null);
        localStorage.removeItem("authTokens");
        redirect("/loginpage/");
    };

    const updateToken = async () => {
        const response = await fetch(
            "www.covidvisionsx.online/api/token/refresh/",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    refresh: (authTokens as unknown as { refresh: string })
                        ?.refresh,
                }),
            }
        );

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
    };

    useEffect(() => {
        if (loading) {
            updateToken();
        }

        const updateTime = 1000 * 60 * 60 * 10; // Change this to minutes later

        const interval = setInterval(() => {
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
