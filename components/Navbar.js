import Link from 'next/link';
import { useRouter } from 'next/router';

const Navbar = ({ auth, userInfo, onLogout }) => {
    const router = useRouter();

    const userRole = userInfo?.role;

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
                        {userRole && !userRole.includes('User') ? (
                            <li className={router.asPath == '/tmf' ? 'active' : ''}>
                                <Link href='/tmf'>Task Manager Form</Link>
                            </li>
                        ) : null}
                        {userRole && !userRole.includes('User') ? (
                            <>
                            <div className='separator'></div>
                            <li className={router.asPath == '/tags' ? 'active' : ''}>
                                <Link href='/tags'>Tag library</Link>
                            </li>
                            </>
                        ) : null}
                        <div className='separator'></div>
                        {userRole && !userRole.includes('User') ? (
                            <li className={router.asPath == '/task/new' ? 'active' : ''}>
                                <Link href='/task/new'>Create Task</Link>
                            </li>
                        ) : null}
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
