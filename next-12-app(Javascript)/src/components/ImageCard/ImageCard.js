import style from './ImageCard.module.css'
import Image from 'next/image'


export default function ImageCard() {
    return (
        <div className="shadow-lg d-flex bg-white  p-2">
            <Image 
            src="https://images.unsplash.com/photo-1625806786037-2af608423424?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" 
            width="350"
            height="400"
            alt="crypto image"
            objectFit="cover"
            />
        </div>
    )
}
