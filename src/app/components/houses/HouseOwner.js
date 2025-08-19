'use client'

import Link from 'next/link'
import styles from './HouseOwner.module.css'
import clsx from 'clsx'

const HouseOwner = ({ house, changeState, setChosenHouse }) => {
    const main_image = house.images[0]
    return (
        <div className={styles.card_container}>
            <div className={styles.img_container}>
            <img src={main_image?.url} style={{'objectFit':'cover'}} className={clsx("rounded-2xl h-full w-full", styles.house_img)} />
            </div>
            <div className={clsx(styles.house_address)}>{house.address}</div>
            <div>{house.price}$/night</div>
            <div>{house.state}</div>
            <div className={clsx(styles.btn_container, 'flex')}>
                <button className={clsx(styles.delete_btn)} onClick={() => {
                    setChosenHouse(house.id)
                    changeState('delete')
                }} >Delete</button>
                <Link href={`houses/${house.id}`} className={clsx(styles.detail_link)}>Detail</Link>
            </div>
        </div>)
}
export default HouseOwner