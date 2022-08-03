import React, { useContext, useEffect } from 'react';
import Link from 'next/link';
import { AuthContext } from '../layouts/Layout';

const Login = () => {
    const { actions, authFailed } = useContext(AuthContext);

    const submit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const email = formData.get('email');
        const password = formData.get('password');
        actions.login(email, password);
    };

    useEffect(() => {
        if (authFailed) {
            const getLoginPassword = document.querySelector('.login-password');
            getLoginPassword.value = '';
        }
    }, [authFailed]);

    return (
        <div className='ddh-login'>
            <div className='ddh-login__form-container'>
                <form onSubmit={submit}>
                    <h1>Please sign in</h1>
                    {authFailed ? (
                        <div className='ddh-login__form-container--error'>
                            Wrong email or password!
                        </div>
                    ) : (
                        ''
                    )}
                    <label htmlFor='email'>Email Address</label>
                    <input className='text' name='email' type='email' required />

                    <label htmlFor='password'>Password</label>
                    <input className='login-password' name='password' type='password' required />

                    <div className='submit-btn'>
                        <button className='btn' type='submit'>
                            Sign in
                        </button>
                    </div>
                </form>
                <div className='ddh-login__form-container--password-reset'>
                    <Link href='/password/new'>Reset password!</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
