import style from './Cryptos.module.css'
import api from 'hooks/coin'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'

export default function RandomCryptos() {

    const [coins, setCoins] = useState([])
    const router = useRouter()

    useEffect(() => {
        async function loadCoins() {
            const coins = await api.coins.all()
            setCoins(coins.data.sort(() => 0.5 - Math.random()))
        }
        loadCoins()
    }, [])

    const handleClick = (id) => {
        router.push(`cryptos/coin/${id}`)
    }

    return (
        <div className="w-50 d-flex flex-column justify-content-center align-items-center">
            <h1 className="text-white">Invest in Crypto today!</h1>
            <div className="d-flex flex-wrap">
                {coins.slice(0, 3).map((coin => {
                    return (
                        <div onClick={() => handleClick(coin.id)} className="w-33 d-flex align-items-center pe-3" key={coin.id} role="button">
                            <Image src={coin.image.thumb} alt={coin.name} width="40" height="40" objectFit="cover" />
                            <h3 className={style.cardTitleSize}>{coin.name}</h3>
                        </div>
                    )
                }))}
            </div>
        </div> 
    )
}