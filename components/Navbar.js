import Link from 'next/link';
import { useRouter } from 'next/router';

const Navbar = ({ auth, onLogout }) => {
    const router = useRouter();

    return (
        <div className='ddh-navigation-sidebar'>
            <nav>
                {!auth ? (
                    <ul className='menu'>
                        <li className={router.asPath == '/register' ? 'active' : ''}>
                            <Link href='/register'>Registration</Link>
                        </li>
                        <li className={router.asPath == '/login' ? 'active' : ''}>
                            <Link href='/login'>Login</Link>
                        </li>
                    </ul>
                ) : (
                    <ul className='menu'>
                        <li className={router.asPath == '/' ? 'active' : ''}>
                            <Link href='/'>Home</Link>
                        </li>
                        <li className={router.asPath == '/task/new' ? 'active' : ''}>
                            <Link href='/task/new'>Create New Task</Link>
                        </li>
                        <li className={router.asPath == '/task/list' ? 'active' : ''}>
                            <Link href='/task/list'>Task List</Link>
                        </li>
                        <li>
                            <div onClick={onLogout}>Logout</div>
                        </li>
                    </ul>
                )}
            </nav>
        </div>
    );
};

export default Navbar;
