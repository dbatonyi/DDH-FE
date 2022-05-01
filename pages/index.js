import { useEffect, useState } from 'react'
import Layout from '../layouts/Layout'
import configData from "../config.json";

export default function Home() {

  const [message, setMessage] = useState('');
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    (
      async () => {
        try {
          const response = await fetch(`${configData.SERVER_URL}/api/user`, {
            credentials: 'include',
          });

          const content = await response.json();

          if (content.auth === true) {
              setMessage(`HI ${content.userInfo.firstname} ${content.userInfo.lastname}`);
              setAuth(true);
          } else {
              setMessage('You are not logged in');
              setAuth(false);
          }

        } catch (e) {
          setMessage('You are not logged in');
          setAuth(false);
        }
        
      }
    )();
  });

  return (
    <Layout auth={auth}>
      {message}
    </Layout>
  )
}
