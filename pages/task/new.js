import React, { useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '../../layouts/Layout';
import configData from '../../config.json';
import { AuthContext } from '../../layouts/Layout';

const NewTask = (props) => {
    const router = useRouter();
    const authContext = useContext(AuthContext);

    console.log(authContext);

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
        <form onSubmit={submit}>
            <h1>Create new task</h1>

            <label htmlFor='title'>Title</label>
            <input className='text' name='title' type='text' required />

            <label htmlFor='body'>Text</label>
            <textarea className='text' name='body' type='textarea' required />

            <button type='submit'>Save</button>
        </form>
    );
};

export default NewTask;
