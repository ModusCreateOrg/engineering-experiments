import style from './Navbar.module.css'
import Link from 'next/link'


export default function Navbar() {
    return (
        <header className={style.header}>
            <div className="container-lg d-flex align-items-center justify-content-between">
                <div className={style.brandName}>
                    <h1>Crypto</h1>
                </div>
                <ul className="nav">
                    <li className="p-2">
                        <Link href="/">
                            <a className="text-decoration-none text-light">Home</a>
                        </Link>
                    </li>
                    <li className="p-2">
                        <Link href="/about">
                            <a className="text-decoration-none text-light">About Us</a>
                        </Link>
                    </li>
                    <li className="p-2">
                        <Link href="/blog/hello-world">
                            <a className="text-decoration-none text-light">Buy/Sell</a>
                        </Link>
                    </li>
                </ul>
            </div>
        </header>
    )
}