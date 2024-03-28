import React, { createContext, useEffect, useState } from "react";
import Chat from "./Chat";
import Loading from "../components/Loading";
import { BrowserRouter,Routes, Route } from "react-router-dom";
import SignupForm from "../components/SignupForm";
import LoginForm from "../components/LoginForm";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faCircleExclamation } from '@fortawesome/free-solid-svg-icons';

export const AuthContext = createContext();

export default function Main() {

    const [flash,setFlash]=useState([null,null])
    
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    const [loading, setLoading] = useState(false);

    const [userDet, setUserDet] = useState({
        username: '',
        email:''
    })

    useEffect(() => {
        setFlash([flash.message, flash.status])
        setTimeout(() => {
            setFlash([null, null])
        }, 3000);
    },[flash.message,flash.status]);

    useEffect(() => {
        fetchUserDet()
    }, [])
    
    async function fetchUserDet() {
        console.log('fetch default user data');
        try {
            const response = await fetch('http://localhost:5000/api/getCurrentUser', {
                method: 'GET'
            });
    
            if (!response.ok) {
                throw new Error('Failed to fetch user data');
            }
    
            const responseData = await response.json();

            console.log(responseData);
    
            if (responseData.username) {
                setUserDet({
                    username: responseData.username,
                    email: responseData.email
                });
                setIsAuthenticated(true);
            } else {
                // Handle case where responseData is empty or undefined
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
            // Handle error, e.g., set error state or display error message
        }
    }
    
    const userAccess = {
        userDet: userDet,
        setUserDet: setUserDet,
        isAuthenticated: isAuthenticated,
        setIsAuthenticated: setIsAuthenticated,
        setLoading: setLoading,
        setFlash:setFlash
    }

    return (
        <AuthContext.Provider value={userAccess}>
            {loading &&
                <div className="loading-screen fcc">
                    <Loading/>
                </div>
            }
            {flash[0] &&
                <div className="flash-msg-div fcc">
                    <p className={ flash[1] + " flash-msg"}>
                        {flash.status === 'success'
                            ? <FontAwesomeIcon icon={faCircleCheck} />
                            : <FontAwesomeIcon icon={faCircleExclamation} />}&nbsp;&nbsp;
                        {flash[0]}
                    </p>
                </div>
            }
            <BrowserRouter>
                <div className="main-div">
                    <Routes>   
                        <Route index element={isAuthenticated? <Chat /> : <LoginForm />} />
                        <Route path="/signup" element={<SignupForm />} />                          
                    </Routes>
                </div>
            </BrowserRouter>
        </AuthContext.Provider>
    )
}