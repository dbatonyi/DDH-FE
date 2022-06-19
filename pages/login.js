import React, { useContext } from 'react';
import Link from 'next/link';
import { AuthContext } from '../layouts/Layout';

const Login = () => {
    const { actions } = useContext(AuthContext);

    const submit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const email = formData.get('email');
        const password = formData.get('password');
        actions.login(email, password);
    };

    return (
        <>
            <form onSubmit={submit}>
                <h1>Please sign in</h1>

                <label htmlFor='email'>Email Address</label>
                <input className='text' name='email' type='email' required />

                <label htmlFor='password'>Password</label>
                <input name='password' type='password' required />

                <button type='submit'>Sign in</button>
            </form>

            <div className='password-reset-btn'>
                <Link href='/password/new'>Reset password!</Link>
            </div>
        </>
    );
};

export default Login;
