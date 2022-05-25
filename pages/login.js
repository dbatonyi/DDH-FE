import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import configData from '../config.json';

const Login = () => {
    const router = useRouter();

    const submit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const email = formData.get('email');
        const password = formData.get('password');

        await fetch(`${configData.SERVER_URL}/api/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
                email: email,
                password: password
            })
        });

        await router.push('/');
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
