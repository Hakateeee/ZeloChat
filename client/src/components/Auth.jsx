import React, { useState } from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';

import signinImage from '../assets/signup.jpg';

const cookies = new Cookies();

const initialState = {
    fullName: '',
    username: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    // avatarURL: '',
}

const Auth = () => {
    const [form, setForm] = useState(initialState);
    const [isSignup, setIsSignup] = useState(true);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { username, password, phoneNumber, avatarURL } = form;

        const URL = 'http://localhost:5000/auth';

        const { data: { token, userId, hashedPassword, fullName } } = await axios.post(`${URL}/${isSignup ? 'signup' : 'login'}`, {
            username, password, fullName: form.fullName, phoneNumber, avatarURL,
        });

        cookies.set('token', token);
        cookies.set('username', username);
        cookies.set('fullName', fullName);
        cookies.set('userId', userId);

        if(isSignup) {
            cookies.set('phoneNumber', phoneNumber);
            // cookies.set('avatarURL', avatarURL);
            cookies.set('hashedPassword', hashedPassword);
        }

        window.location.reload();
    }

    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup);
    }

    return (
        <div className="auth__form-container">
            <div className="auth__form-container_fields">
                <div className="auth__form-container_fields-content">
                    <p>{isSignup ? 'Đăng ký' : 'Đăng nhập'}</p>
                    <form onSubmit={handleSubmit}>
                        {isSignup && (
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="fullName">Tên đầy đủ</label>
                                <input 
                                    name="fullName" 
                                    type="text"
                                    placeholder="Tên đầy đủ"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )}
                        <div className="auth__form-container_fields-content_input">
                            <label htmlFor="username">Tên đăng nhập</label>
                                <input 
                                    name="username" 
                                    type="text"
                                    placeholder="Tên đăng nhập"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        {isSignup && (
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="phoneNumber">Số điện thoại</label>
                                <input 
                                    name="phoneNumber" 
                                    type="text"
                                    placeholder="Số điện thoại"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )}
                        {/* {isSignup && (
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="avatarURL">Đường link avart</label>
                                <input 
                                    name="avatarURL" 
                                    type="text"
                                    placeholder="Avatar URL"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )} */}
                        <div className="auth__form-container_fields-content_input">
                                <label htmlFor="password">Mật khẩu</label>
                                <input 
                                    name="password" 
                                    type="password"
                                    placeholder="Mật khẩu"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        {isSignup && (
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="confirmPassword">Xác nhận mật khẩu</label>
                                <input 
                                    name="confirmPassword" 
                                    type="password"
                                    placeholder="Xác nhận mật khẩu"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            )}
                        <div className="auth__form-container_fields-content_button">
                            <button>{isSignup ? "Đăng ký" : "Đăng nhập"}</button>
                        </div>
                    </form>
                    <div className="auth__form-container_fields-account">
                        <p>
                            {isSignup
                             ? "Đã có tài khoản?" 
                             : "Chưa có tài khoản?"
                             }
                             <span onClick={switchMode}>
                             {isSignup ? 'Đăng nhập' : 'Đăng ký'}
                             </span>
                        </p>
                    </div>
                </div> 
            </div>
            <div className="auth__form-container_image">
                <img src={signinImage} alt="Đăng ký" />
            </div>
        </div>
    )
}

export default Auth
