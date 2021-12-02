import Cryptos from 'components/Cryptos/Cryptos'
import ImageCard from 'components/ImageCard/ImageCard'
import style from './CryptoIntro.module.css'

export default function CryptoIntro() {
    return (
        <div className={style.cryptoIntroContainer}>
            <div style={{height: '600px'}} className="container d-flex align-items-center justify-content-evenly ">
                <ImageCard />
                <Cryptos />
            </div>
        </div>
    )
}