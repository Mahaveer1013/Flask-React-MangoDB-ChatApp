import React, { useState } from "react";
import LoginPage from "./LoginPage";
import Chat from "./Chat";


export default function Main() {
    
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    function handleLogin() {
        setIsAuthenticated(true)
    }

    function handleLogout() {
        setIsAuthenticated(false)
    }

    return (
        <div className="main-div">
            {isAuthenticated ? <Chat handleLogout={handleLogout} /> :
            <LoginPage handleLogin={handleLogin} />}
        </div>
    )
}