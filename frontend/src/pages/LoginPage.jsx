import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';
import logo from '../assets/logo.svg';
import './loginPage.css'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function LoginPage(props) {

    function Login() {

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
        console.log(loginFormData);
    
        function handleLoginFormSubmit(e) {
            // fetch
            e.preventDefault()
            if (loginFormData.username.length && loginFormData.password.length) {
                console.log('Submitted', loginFormData);
                props.handleLogin()
            }
        }
        
        return (
            <>
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
                                        onClick={() => setShowPassword(prev=>(!prev))}
                                        className="showPasswordIcon"
                                    ><FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye}></FontAwesomeIcon>
                                    </p>
                                </div>
                                <div className="input-submit">
                                    <button
                                        type="submit"
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
            </>
        )
    }

    function Signup() {

        const [showPassword, setShowPassword] = useState({
            signup: false,
            signupConfirm: false
        });
    
        const [signupFormData, setSignupFormData] = useState({
            username: '',
            password: '',
            confirmPassword: '',
            email: '',
        })
    
        function handleSignupFormData(event) {
            const { name, value } = event.target;
            setSignupFormData(prevForm => ({
                ...prevForm,
                [name]: value
            }));
            // if () {
                
            // }
        }
        console.log(signupFormData);
    
        function handleSignupFormSubmit(e) {
            // fetch
            e.preventDefault()
            if (signupFormData.username.length && signupFormData.password.length && signupFormData.email.length) {
                console.log('Submitted', signupFormData);
            }
        }
    
        function handleShowPassword(type) {
            console.log(type);
            setShowPassword(prevShowPassword => ({
                ...prevShowPassword, [type]: !prevShowPassword[type]
            }))
        }
    
        
        return (
            <>
                <div className="login-main fcc">
                    <div className="login-topic fcc">
                    <img src={logo} className="App-logo" alt="logo" />
                        <h1 className="login-page-heading">Chat Application <br />With <br />Flask And React</h1>
                    </div>
                    <div className="login-page">
                        <h1 className="login-title">SIGNUP PAGE</h1>
                        <div className="login-form-div signup-form-div">
                            <form method="post" className="login-form fcc">
                                <div className="input-username fcc">
                                    <label htmlFor="username">Username : </label>
                                    <input
                                        type="text"
                                        value={signupFormData.username}
                                        onChange={handleSignupFormData}
                                        placeholder="Enter Username..."
                                        name='username' />
                                </div>
                                <div className="input-password fcc">
                                    <label htmlFor="password">Password : </label>
                                    <input
                                        type={showPassword.signup ? "text" : "password"}
                                        value={signupFormData.password}
                                        onChange={handleSignupFormData}
                                        placeholder="Enter Password..."
                                        name='password' />
                                    <p
                                        onClick={() => handleShowPassword('signup')}
                                        className="showPasswordIcon"
                                    ><FontAwesomeIcon icon={showPassword.signup ? faEyeSlash : faEye}></FontAwesomeIcon>
                                    </p>
                                </div>
                                <div className="input-password fcc">
                                    <label htmlFor="confirmPassword">Confirm Password : </label>
                                    <input
                                        type={showPassword.signupConfirm ? "text" : "password"}
                                        value={signupFormData.confirmPassword}
                                        onChange={handleSignupFormData}
                                        placeholder="Enter Confirm Password..."
                                        name='confirmPassword' />
                                    <p
                                        onClick={() => handleShowPassword('signupConfirm')}
                                        className="showPasswordIcon"
                                    ><FontAwesomeIcon icon={showPassword.signupConfirm ? faEyeSlash : faEye}></FontAwesomeIcon>
                                    </p>
                                </div>
                                <div className="input-email fcc">
                                    <label htmlFor="email">Email : </label>
                                    <input
                                        type="email"
                                        value={signupFormData.email}
                                        onChange={handleSignupFormData}
                                        placeholder="Enter Email..."
                                        name='email' />
                                </div>
                                <div className="input-submit">
                                    <button
                                        type="submit"
                                        onClick={handleSignupFormSubmit}
                                    >Signup
                                    </button>
                                    <p className="signup-login login-page-btn fcc">
                                        Already Have An Account ? &nbsp;&nbsp;
                                        <Link className="signup-login-btn" to="/">Login Here</Link>
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            
            </>
        )
    }
    
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/" element={<Login />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}
    

export default LoginPage;