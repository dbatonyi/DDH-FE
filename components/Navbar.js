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
                        <li className={router.asPath == '/dashboard' ? 'active' : ''}>
                            <Link href='/dashboard'>Home</Link>
                        </li>
                        <li className={router.asPath == '/tmf' ? 'active' : ''}>
                            <Link href='/tmf'>Task Manager Form</Link>
                        </li>
                        <div className='separator'></div>
                        <li className={router.asPath == '/task/new' ? 'active' : ''}>
                            <Link href='/task/new'>Create Task</Link>
                        </li>
                        <li className={router.asPath == '/task/list' ? 'active' : ''}>
                            <Link href='/task/list'>Task List</Link>
                        </li>
                        <div className='separator'></div>
                        <li>
                            <div className='nav-logout-btn' onClick={onLogout}>
                                Logout
                            </div>
                        </li>
                    </ul>
                )}
            </nav>
        </div>
    );
};

export default Navbar;
