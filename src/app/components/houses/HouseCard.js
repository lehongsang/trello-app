import Link from 'next/link'
import styles from './Housecard.module.css'
import clsx from 'clsx'

const HouseCard = ({ house }) => {
    const main_image = house.images[0]
    return (
        <Link href={`houses/${house.id}`} className={styles.card_container}>
            <div className={clsx(styles.img_container)}>
                <img src={main_image?.url} className="rounded-2xl h-full w-full" style={{ 'objectFit': 'cover' }} />
            </div>
            <div className="font-semibold" >{house.title}  </div>
            <div className="text-slate-400">Hosted by {house.owner.name}  </div>
            <div>Address : {house.address}</div>
            <div className='flex'>
                <div className='font-semibold'>
                {house.price}$
                </div>
                <div className='ml-2 text-slate-600'> per night</div>
            </div>
        </Link>)
}
export default HouseCard