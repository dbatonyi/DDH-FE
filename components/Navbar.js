import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import configData from '../config.json';

const Navbar = ({ auth }) => {
    const router = useRouter();

    console.log(auth);

    const logout = async () => {
        await fetch(`${configData.SERVER_URL}/api/logout`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        });

        await router.push('/login');
    };

    return (
        <nav>
            {!auth ? (
                <ul className='menu'>
                    <li>
                        <Link href='/register'>Registration</Link>
                    </li>
                    <li>
                        <Link href='/login'>Login</Link>
                    </li>
                </ul>
            ) : (
                <ul className='menu'>
                    <li>
                        <Link href='/'>Home</Link>
                    </li>
                    <li>
                        <Link href='/task/new'>Create New Task</Link>
                    </li>
                    <li>
                        <div onClick={logout}>Logout</div>
                    </li>
                </ul>
            )}
        </nav>
    );
};

export default Navbar;
