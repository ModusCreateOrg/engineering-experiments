import Cryptos from 'components/Cryptos/RandomCryptos'
import style from './CryptoIntro.module.css'
import Image from 'next/image'

export default function CryptoIntro() {
    return (
        <div className={style.cryptoIntroContainer}>
            <div style={{ height: '600px' }} className="container d-flex align-items-center justify-content-evenly ">
                <div className="shadow-lg d-flex bg-white p-2">
                    <Image
                        src="https://images.unsplash.com/photo-1625806786037-2af608423424?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                        width="350"
                        height="400"
                        alt="crypto image"
                        objectFit="cover"
                    />
                </div>
                <Cryptos />
            </div>
        </div>
    )
}