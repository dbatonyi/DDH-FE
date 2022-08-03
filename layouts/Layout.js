import React, { createContext, useEffect, useState } from 'react';
import Head from 'next/head';
import configData from '../config.json';
import Navbar from '../components/Navbar';
import { useRouter } from 'next/router';

export const AuthContext = React.createContext(null);

const Layout = (props) => {
    const router = useRouter();
    const getLocation = router.pathname;

    const [isLoading, setIsLoading] = useState(true);
    const [auth, setAuth] = useState(false);
    const [authFailed, setAuthFailed] = useState(false);
    const [userInfo, setUserInfo] = useState({});

    useEffect(authentication, [router.route]);

    useEffect(() => {
        setAuthFailed(false);
    }, [router.route]);

    function authentication() {
        fetch(`${configData.SERVER_URL}/api/user`, {
            credentials: 'include'
        })
            .then((res) => res.json())
            .then((content) => {
                const authorized = content.auth;
                setAuth(authorized);
                if (authorized) {
                    setUserInfo(content.userInfo);
                    setIsLoading(false);

                    if (getLocation === '/') {
                        router.push('/dashboard');
                    }
                } else {
                    const resetPasswordUrls = getLocation.includes('/password/');

                    if (!['/login', '/register'].includes(getLocation) && !resetPasswordUrls) {
                        router.push('/login');
                    } else {
                        setIsLoading(false);
                    }
                }
            })
            .catch((err) => setAuth(false));
    }

    function logout() {
        fetch(`${configData.SERVER_URL}/api/logout`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        });

        setAuth(false);

        router.push('/login');
    }

    async function login(email, password) {
        const response = await fetch(`${configData.SERVER_URL}/api/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
                email,
                password
            })
        });

        if (response.status === 200) {
            setAuth(true);
            router.push('/dashboard');
        }
        if (response.status === 401) {
            setAuthFailed(true);
            setAuth(false);
        }
    }

    return (
        <>
            {isLoading ? (
                <>Page is loading!</>
            ) : (
                <AuthContext.Provider
                    value={{
                        auth,
                        authFailed,
                        userInfo,
                        actions: {
                            logout,
                            login
                        }
                    }}>
                    <div className='app-container'>
                        <Head>
                            <title>DDH - Frontend</title>
                            <meta name='description' content='DDH FE' />
                            <link rel='icon' href='/favicon.ico' />
                        </Head>

                        <Navbar auth={auth} onLogout={logout} />

                        <main className='ddh-main'>{props.children}</main>
                    </div>
                </AuthContext.Provider>
            )}
        </>
    );
};

export default Layout;
