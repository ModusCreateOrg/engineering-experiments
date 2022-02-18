import CryptoPageLayout from "components/Layout/CryptoPageLayout"

type Exchanges = {
    name: string,
    score: number,
}

export async function getStaticProps() {
    const exchanges = await fetch('http://localhost:3000/exchanges')
    const data = await exchanges.json()
    const index = Math.floor(Math.random() * 4)
    return { props: {exchanges: data[index]}, revalidate: 30 };
}


const Exchange = ({ exchanges }: { exchanges: Exchanges}) => {
    return (
    <CryptoPageLayout title="Exchange">
        <>
        <h1>Exchange Name: {exchanges.name}</h1>
        <h2>Score: {exchanges.score}</h2>
        </>
    </CryptoPageLayout>
    )

}

export default Exchange 

