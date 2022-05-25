import Link from 'next/link';
import { useRouter } from 'next/router';

const Navbar = ({ auth, onLogout }) => {
    const router = useRouter();

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
                        <div onClick={onLogout}>Logout</div>
                    </li>
                </ul>
            )}
        </nav>
    );
};

export default Navbar;
