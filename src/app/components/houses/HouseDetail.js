'use client'
import { useContext, useEffect, useState } from 'react'
import styles from './HouseDetail.module.css'
import Order from '@/app/data/order/order'
import clsx from 'clsx'
import { UserContext } from '@/app/userProvider/UserProvider'
export default function HouseDetail({ house, SetIsChange }) {
    const { user } = useContext(UserContext)
    const [Ordered, setOrdered] = useState(null)
    useEffect(() => {
        if (house?.state == 'EMPTY') {
            setOrdered(false)
        }
        else if (house?.state == 'RENTED') {
            setOrdered(true)
        }
    }, [house?.state])
    let order = null
    if (user) {
        order = {
            tenant: {
                id: user.id
            },
            house: {
                id: house?.id
            },
            state: "PENDING"
        }
    }
    const button_props = {
        disabled: Ordered
    }
    return (
        <div className={styles.house_detail_container}>
            <div className={clsx('flex justify-between pt-16 items-top')}>
                <div className='w-3/5 pr-5' >
                    <div className={clsx(' font-semibold text-2xl ', styles.address)}>{house?.address}</div>

                    <div className={clsx('mt-6 flex items-center')}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="50px" viewBox="0 -960 960 960" width="50px" fill="#5f6368"><path d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q53 0 100-15.5t86-44.5q-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160Zm0-360q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0-60Zm0 360Z" /></svg>
                        <div className={clsx('my-4 font-semibold  ml-3', styles.owner)}>
                            Hosted by {house?.owner.name}
                        </div>
                    </div>

                    <div className={clsx('pt-10', styles.description_container)}>{house?.description}</div>
                </div>

                <div className={clsx('h-40', styles.order_container)}>
                    <div className='flex items-center'>
                        <div className='font-semibold text-2xl mr-3'>{house?.price}$ </div>
                        <div >per day</div>
                    </div>
                    <button className={clsx(styles.order_button)} {...button_props} onClick={async () => {
                        try {
                            console.log(order)
                            await Order(order)
                            alert("Orders successfully ! Please wait for owner confirm .")

                            setOrdered(true)
                            SetIsChange(s => !s)
                        } catch (error) {
                            console.log(error.message)
                        }
                    }}> {Ordered ? "Ordered" : "Order"}</button>
                </div>


            </div>

        </div >
    )
}