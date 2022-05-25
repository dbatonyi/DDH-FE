import React, { createContext, useEffect, useState } from 'react';
import Head from 'next/head';
import configData from '../config.json';
import Navbar from '../components/Navbar';
import { useRouter } from 'next/router';

export const AuthContext = React.createContext(null);

const Layout = (props) => {
    const router = useRouter();
    const getLocation = router.pathname;

    const [auth, setAuth] = useState(null);
    const [userInfo, setUserInfo] = useState({});

    useEffect(() => {
        fetch(`${configData.SERVER_URL}/api/user`, {
            credentials: 'include'
        })
            .then((res) => res.json())
            .then((content) => {
                console.log(content);
                const authorized = content.auth;
                setAuth(authorized);
                if (authorized) {
                    setUserInfo(content.userInfo);
                } else {
                    const resetPasswordUrls = getLocation.includes('/password/');

                    if (!['/login', '/register'].includes(getLocation) && !resetPasswordUrls) {
                        console.log('run');
                        router.push('/login');
                    }
                }
            })
            .catch((err) => setAuth(false));
    }, []);

    return (
        <AuthContext.Provider value={{ auth, userInfo }}>
            <div className='app-container'>
                <Head>
                    <title>DDH - Frontend</title>
                    <meta name='description' content='DDH FE' />
                    <link rel='icon' href='/favicon.ico' />
                </Head>

                <nav>
                    <div>
                        <Navbar auth={auth} />
                    </div>
                </nav>

                <main className='form-signin'>
                    {props.children}
                    {/*{React.cloneElement(props.children, {didComplete: auth})}*/}
                </main>

                <footer className='footer'></footer>
            </div>
        </AuthContext.Provider>
    );
};

export default Layout;
