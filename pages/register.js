import React from "react";
import { useRouter } from "next/router";
import Layout from "../layouts/Layout";
import configData from "../config.json";

const Register = () => {
    const router = useRouter();

    const submit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const firstName = formData.get('firstname');
        const lastName = formData.get('lastname');
        const email = formData.get('email');
        const password = formData.get('password');
        const repassword = formData.get('repassword');

        if (password === repassword) {
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

        return console.log("Password must be match")
    }

    return (
        <Layout>
            <form className="signup-container__form" onSubmit={submit}>
                <label htmlFor="email">Email Address</label>         
                <input className="text" name="email" type="email" required />
                    
                <label htmlFor="firstname">Firstname</label>
                <input name="firstname" type="text" required />
                
                <label htmlFor="lastname">Lastname</label>
                <input name="lastname" type="text" required />
                
                <label htmlFor="password">Password</label>     
                <input name="password" type="password" required />
                    
                <label htmlFor="repassword">Re-Password</label>
                <input name="repassword" type="password" required />
                    
                <div className="signup-container__form--submit-btn">
                    <button className="btn" type="submit">Sign up</button>
                </div>
                </form>
        </Layout>
    );
};

export default Register;