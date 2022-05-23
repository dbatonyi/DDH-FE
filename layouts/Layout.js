import { useEffect, useState } from 'react'
import Head from 'next/head';
import Link from 'next/link';
import configData from "../config.json";
import Navbar from "../components/Navbar";
import { useRouter } from "next/router";

const Layout = (props) => {
    const router = useRouter();
    const getLocation = router.pathname;

    const [auth, setAuth] = useState("");

    useEffect(() => {
        (
          async () => {
            try {
              const response = await fetch(`${configData.SERVER_URL}/api/user`, {
                credentials: 'include',
              });

              const content = await response.json();

              if (content.auth === true) {
                  setAuth(true);
              } else {
                  setAuth(false);
                  const resetPasswordUrls = getLocation.includes("/password/");

                  if (getLocation !== "/login" && getLocation !== "/register" && !resetPasswordUrls) {
                    router.push('/login');
                  }
                
              }

            } catch (e) {
              setAuth(false);
            }
        
          }
        )();
    });

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
                        <a>Home</a>
                    </Link>
                    <div>
                        <Navbar auth={auth} />
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