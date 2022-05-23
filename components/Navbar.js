import { useEffect, useState } from 'react'
import Link from 'next/link';
import { useRouter } from "next/router";
import configData from "../config.json";

const Navbar = ({ auth }) => {
    const router = useRouter();
    
    console.log(auth)

    const logout = async () => {
        await fetch(`${configData.SERVER_URL}/api/logout`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        });

        await router.push('/login');
    }

    return (
        <nav>
            <div>Navbar</div>
            {auth ?
            
            <div onClick={logout}>Logout</div>
                
            : null}
        </nav>
    );
}

export default Navbar;