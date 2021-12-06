import style from './Navbar.module.css'
import Link from 'next/link'
import { useRouter } from 'next/router';



export default function Navbar() {
    const router = useRouter();

    return (
        <header className={style.header}>
            <div className="container-lg d-flex align-items-center justify-content-between">
                <div className={style.brandName}>
                    <h1>Crypto</h1>
                </div>
                <ul className="nav">
                    <li className="p-2">
                        <Link href="/">
                            <a className={`text-decoration-none text-light ${router.pathname == "/" ? style.active : ''}`}>Home</a>
                        </Link>
                    </li>
                    <li className="p-2">
                        <Link href="/about">
                            <a className={`text-decoration-none text-light ${router.pathname == "/about" ? style.active : ''}`}>About Us</a>
                        </Link>
                    </li>
                </ul>
            </div>
        </header>
    )
}