import { useEffect, useState } from "react"
import { useRouter, isReady } from 'next/router'
import api from 'hooks/coin'
import Image from 'next/image'
import Navbar from 'components/Navbar/Navbar'

export default function Coin() {
    const [coin, setCoin] = useState({
        description: '',
        imageUrl:'',
        rank: '',
        price: '',
    })
    
    const [loading, setLoading] = useState(true)


    const router = useRouter()

    useEffect(() => {  
        if (!router.isReady) return   
        async function coinLoad() {
            setLoading(true)
            const response = await api.coins.fetch(router.query.symbol, {})
            console.log(response)
            setCoin({
                description: response.data.description.en,
                rank: response.data.coingecko_rank,
                imageUrl: response.data.image.large,
                price: response.data.market_data.current_price.usd,
            })
            setLoading(false)
        }
        coinLoad()    
    }, [router.isReady])


    return router.isReady && !loading && (
        <>
            <Navbar />
            <div className="container">
                <h1 className="text-center mb-4">{router.query.symbol.toUpperCase()}</h1>
                <h1 className="text-center mb-4">Rank: {coin.rank}</h1>
                <h1 className="text-center mb-4">Price: ${coin.price}</h1>
                <Image blurDataURL={coin.imageUrl || 'https://images.unsplash.com/photo-1599690925058-90e1a0b56154?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=765&q=80'} placeholder="blur" src={coin.imageUrl || 'https://images.unsplash.com/photo-1599690925058-90e1a0b56154?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=765&q=80'} alt={router.query.symbol} width="400" height="400" objectFit="cover" />
                <h2>Description</h2>
                <p>{coin.description}</p>
            </div>
        </>
    )
}

