import React, { useState } from 'react';
import { useRouter } from 'next/router';
import configData from '../../../config.json';

const ResetPassword = () => {
    const router = useRouter();
    const urlParam = router.query.param;

    const submit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const password = formData.get('password');
        const rePassword = formData.get('repassword');

        if (password === rePassword) {
            await fetch(`${configData.SERVER_URL}/api/password/reset/${urlParam}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({
                    password: password,
                    repassword: rePassword
                })
            });

            await router.push('/');
        }

        return console.log('Password must match');
    };

    return (
        <>
            <form onSubmit={submit}>
                <h1>Reset Password</h1>

                <label htmlFor='password'>New password</label>
                <input name='password' type='password' required />

                <label htmlFor='password'>New password again</label>
                <input name='repassword' type='password' required />

                <button type='submit'>Submit</button>
            </form>
        </>
    );
};

export default ResetPassword;
