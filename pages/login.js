import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from 'next/link';
import Layout from "../layouts/Layout";
import configData from "../config.json";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const submit = async (e) => {
        e.preventDefault();

        await fetch(`${configData.SERVER_URL}/api/login`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
                email: email,
                password: password
            })
        });

        await router.push('/');
    }

    return (
        <Layout>
            <form onSubmit={submit}>
                <h1>Please sign in</h1>

                <label htmlFor="email">Email Address</label>         
                <input className="text" name="email" type="email" required onChange={e => setEmail(e.target.value)}/>

                <label htmlFor="password">Password</label>     
                <input name="password" type="password" required onChange={e => setPassword(e.target.value)}/>

                <button type='submit'>Sign in</button>

            </form>

            <div className="password-reset-btn"><Link href="/password/new">Reset password!</Link></div>
        </Layout>
    );
};

export default Login;