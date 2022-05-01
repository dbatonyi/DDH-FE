import React from "react";
import Head from 'next/head';
import Link from 'next/link';
import configData from "../config.json";
import { useRouter } from "next/router";

const Layout = (props) => {
    const router = useRouter();

    const logout = async () => {
        await fetch(`${configData.SERVER_URL}/api/logout`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        });

        await router.push('/login');
    }

    let menu;

    if (!props.auth) {
        menu = (
            <ul>
                <li>
                    <Link href="/login">
                        <a>Login</a>
                    </Link>
                </li>
                <li>
                    <Link href="/register">
                        <a>Register</a>
                    </Link>
                </li>
            </ul>
        )

    } else {
        menu = (
            <ul>
                <li>
                    <a onClick={logout}>Logout</a>
                </li>
            </ul>
        )
    }

    return (
        <div className="app-container">
            <Head>
                <title>DDH - Frontend</title>
                <meta name="description" content="DDH FE" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            
            <nav>
                <div>
                    <Link href="/">
                        <a href="#">Home</a>
                    </Link>
                    <div>
                        {menu}
                    </div>
                </div>   
            </nav>

            <main className="form-signin">
                {props.children}
            </main>

            <footer className="footer">
        
            </footer>
        </div>
    );
};

export default Layout;