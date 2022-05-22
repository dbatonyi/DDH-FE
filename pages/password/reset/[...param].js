import React, { useState } from "react";
import { useRouter } from "next/router";
import Layout from "../../../layouts/Layout";
import configData from "../../../config.json";

const ResetPassword = () => {
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const router = useRouter();
    const urlParam = router.query.param;

    const submit = async (e) => {
        e.preventDefault();

        await fetch(`${configData.SERVER_URL}/api/password/reset/${urlParam}`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
                password: password,
                repassword: rePassword 
            })
        });

        await router.push('/');
    }

    return (
        <Layout>
            <form onSubmit={submit}>
                <h1>Reset Password</h1>

                <label htmlFor="password">New password</label>     
                <input name="password" type="password" required onChange={e => setPassword(e.target.value)} />

                <label htmlFor="password">New password again</label>     
                <input name="password" type="password" required onChange={e => setRePassword(e.target.value)}/>

                <button type='submit'>Submit</button>

            </form>

        </Layout>
    );
};

export default ResetPassword;