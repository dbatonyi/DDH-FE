import React, { useState } from "react";
import { useRouter } from "next/router";
import Layout from "../layouts/Layout";
import configData from "../config.json";

const Register = () => {
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const router = useRouter();

    const submit = async (e) => {
        e.preventDefault();

        await fetch(`${configData.SERVER_URL}/api/register`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: email,
                firstname: firstName,
                lastname: lastName,
                password: password
            })
        });

        await router.push('/login');
    }

    return (
        <Layout>
            <form className="signup-container__form" onSubmit={submit}>
                <label htmlFor="email">Email Address</label>         
                <input className="text" name="email" type="email" required onChange={e => setEmail(e.target.value)}/>
                    
                <label htmlFor="firstname">Firstname</label>
                <input name="firstname" type="text" required onChange={e => setFirstName(e.target.value)}/>
                
                <label htmlFor="lastname">Lastname</label>
                <input name="lastname" type="text" required onChange={e => setLastName(e.target.value)}/>
                
                <label htmlFor="password">Password</label>     
                <input name="password" type="password" required onChange={e => setPassword(e.target.value)}/>
                    
                <label htmlFor="repassword">Re-Password</label>
                <input name="repassword" type="password" required onChange={e => setRePassword(e.target.value)}/>
                    
                <div className="signup-container__form--submit-btn">
                    <button className="btn" type="submit">Sign up</button>
                </div>
                </form>
        </Layout>
    );
};

export default Register;