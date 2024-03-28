import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';
import '../css/loginPage.css'
import { Link } from "react-router-dom";
import logo from '../assets/logo.svg';
import { Navigate } from "react-router-dom";
import { AuthContext } from '../pages/Main'

export default function SignupForm() {

    const useAuthContext=useContext(AuthContext)

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
    }

    const [isSigned, setIsSigned] = useState(false);

    // function handleSignupFormSubmit() {
    //     useAuthContext.setUserDet(prev => ({
    //         name:signupFormData.username
    //     }))
    //     useAuthContext.setIsAuthenticated(true);
    // }

    async function handleSignupFormSubmit(e) {
        e.preventDefault()
    
        if (signupFormData.username.length &&
            signupFormData.password.length &&
            signupFormData.email.length ) {
            console.log('Submitted', signupFormData);
            try {
                useAuthContext.setLoading(true);
                const response = await fetch('http://localhost:5000/api/signup', {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(signupFormData)
                });
                if (!response.ok) {
                    throw new Error('Failed to send data to the backend');
                }
                const responseData = await response.json();
                // setResponse(responseData.message);
                // console.log(responseData.message);
                // setFlashMsg({
                //     message: responseData.message,
                //     status: responseData.status
                // })
                console.log(responseData);
                setIsSigned(true)
                useAuthContext.setLoading(false)
            } catch (error) {
                console.error('Error sending data to backend:', error);
                // setFlashMsg({
                //     message: 'Error sending data to backend:',
                //     status: 'error'
                // })
            }finally {
                useAuthContext.setLoading(false);
            }
        }
        else {
            // setFlashMsg({
            //     message: 'Fill all fields',
            //     status: 'error'
            // })
        }
        // console.log(response);
        // response ? <Navigate to='/' replace /> : <Navigate to='/signup' replace />
    }

    function handleShowPassword(type) {
        console.log(type);
        setShowPassword(prevShowPassword => ({
            ...prevShowPassword, [type]: !prevShowPassword[type]
        }))
    }

    return (
        <>                
            {isSigned
                ? <Navigate to='/' />
                :
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
                                        type="button"
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
            }
        </>
    )
}