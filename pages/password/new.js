import React, { useState } from "react";
import { useRouter } from "next/router";
import Layout from "../../layouts/Layout";
import configData from "../../config.json";

const NewPassword = () => {
    const [email, setEmail] = useState("");
    const router = useRouter();

    const submit = async (e) => {
        e.preventDefault();

        await fetch(`${configData.SERVER_URL}/api/password/new`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
                email: email,
            })
        });

        await router.push('/');
    }

    return (
        <Layout>
            <form onSubmit={submit}>
                <h1>Reset Password</h1>

                <label htmlFor="email">Email</label>     
                <input name="email" type="email" required onChange={e => setEmail(e.target.value)}/>

                <button type='submit'>Reset password</button>

            </form>
        </Layout>
    );
};

export default NewPassword;