import Layout from '../layouts/Layout';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
    return (
        <Layout>
            <h1>{new Date().getMilliseconds()}</h1>
            <Component {...pageProps} />
        </Layout>
    );
}

export default MyApp;
