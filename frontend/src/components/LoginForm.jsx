import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import logo from '../assets/logo.svg';
import '../css/loginPage.css'
import { Navigate } from "react-router-dom";
import {AuthContext} from '../pages/Main'

export default function LoginForm() {

    const useAuthContext = useContext(AuthContext)

    const [showPassword, setShowPassword] = useState(false);
    
    const [loginFormData, setLoginFormData] = useState({
        username: '',
        password: ''
    })

    function handleLoginFormData(event) {
        const { name, value } = event.target;
        setLoginFormData(prevForm => ({
            ...prevForm,
            [name]: value
        }));
    }

    async function handleLoginFormSubmit(e) {
        e.preventDefault()
        if (loginFormData.username.length && loginFormData.password.length) {
            
            try {
                useAuthContext.setLoading(true);
                const response = await fetch('http://localhost:5000/api/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type':'application/json'
                    },
                    body: JSON.stringify(loginFormData)
                });
                if (!response.ok) {
                    throw new Error('failed to send data to backend')
                }
                const responseData = await response.json();
                if (responseData.username) {
                    useAuthContext.setUserDet({
                        username: loginFormData.username,
                        email: responseData.email
                    })
                    useAuthContext.setIsAuthenticated(true)
                    useAuthContext.setFlash({
                        message: responseData.message,
                        status: responseData.status
                    })
                }
                else {
                    useAuthContext.setFlash({
                        message: responseData.message,
                        status: responseData.status
                    })
                }
            }
            catch (error) {
                useAuthContext.setFlash({
                    message: 'Error sending data to backend:',
                    status: 'error'
                })
            } finally {
                useAuthContext.setLoading(false);
            }
        }
    }

    return (
        <>
            {useAuthContext.isAuthenticated
                ? <Navigate to='/' />
                :
                <div className="login-main fcc">
                    <div className="login-topic fcc">
                        <img src={logo} className="App-logo" alt="logo" />
                        <h1 className="login-page-heading">Chat Application <br />With <br />Flask And React</h1>
                    </div>
                    <div className="login-page">
                        <h1 className="login-title">LOGIN PAGE</h1>
                        <div className="login-form-div">
                            <form method="post" className="login-form fcc">
                                <div className="input-username fcc">
                                    <label htmlFor="username">Username : </label>
                                    <input
                                        type="text"
                                        value={loginFormData.username}
                                        onChange={handleLoginFormData}
                                        placeholder="Enter Username..."
                                        name='username' />
                                </div>
                                <div className="input-password fcc">
                                    <label htmlFor="password">Password : </label>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={loginFormData.password}
                                        onChange={handleLoginFormData}
                                        placeholder="Enter Password..."
                                        name='password' />
                                    <p
                                        onClick={() => setShowPassword(prev => (!prev))}
                                        className="showPasswordIcon"
                                    ><FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye}></FontAwesomeIcon>
                                    </p>
                                </div>
                                <div className="input-submit">
                                    <button
                                        type="button"
                                        onClick={handleLoginFormSubmit}
                                        >Login
                                    </button>
                                    <p className="signup-login signup-page-btn fcc">
                                        Create New Account ? &nbsp;&nbsp;
                                        <Link className="signup-login-btn" to="/signup">Signup Here</Link>
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                }
        </>
    )
}