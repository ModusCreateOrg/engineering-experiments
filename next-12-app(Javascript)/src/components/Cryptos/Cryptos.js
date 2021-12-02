import style from './Cryptos.module.css'
import api from 'hooks/coin'
import { useEffect, useState } from 'react'
import Image from 'next/image'

export default function Cryptos() {

    const [coins, setCoins] = useState([])

    useEffect(() => {
        async function loadCoins() {
            const coins = await api.coins.all()
            setCoins(coins.data)
            console.log(coins)
        }
        loadCoins()
    }, [])

    return (
        <div className="d-flex w-50 flex-wrap">
            {coins.slice(0,4).map((coin => {
                return (
                    <div className="w-25 d-flex justify-content-center align-items-center" key={coin.id}>
                        <h3 className={style.cardTitleSize}>{coin.name}</h3>
                        <Image src={coin.image.thumb} alt={coin.name} width="30" height="30" />
                    </div>
                )
            }))}
        </div>
    )
}