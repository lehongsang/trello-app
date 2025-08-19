'use client'
import styles from './Order.module.css'
import confirmOrder from '@/app/data/order/confirmOrder'
import clsx from 'clsx'
import { useEffect, useState } from 'react'
import cancelOrder from '@/app/data/order/cancelOrder'
import deleteOrder from '@/app/data/order/deleteOrder'
const Order = ({ order, user_type, setListChange, list_order }) => {
    const [orderState, SetOrderState] = useState()
    useEffect(() => { SetOrderState(order.state) }, [list_order])
    const handleOrder = async () => {
        if (user_type == 'tenant') {
            console.log(order.id)
            if (await cancelOrder(order.id)) {
                setListChange()
                SetOrderState('CANCELED')

            }
        }
        else {

            if (await confirmOrder(order.id)) {
                setListChange()
                SetOrderState('DONE')
            }
        }
    }
    const DeleteOrder = async () => {
        console.log(order.id)
        if (await deleteOrder(order.id)) {
            setListChange()
        }
    }

    const button_prop = {
        disabled: orderState == 'CANCELED' || orderState == 'DONE'
    }
    return (
        <div className={clsx(styles.order)}>
            <div className={clsx('mx-10')}>
                <div className={clsx(styles.owner_bar, 'flex')}>
                 { user_type=='owner' ? <div className={clsx('font-bold')}>{order.house.owner.name}</div>: <div className={clsx('font-bold')}>{order.tenant.name}</div>}
                    <div className={clsx('text-xl font-bold text-rose-500')}>{order.state}</div>

                </div>
                <div className={clsx('flex items-center justify-between', styles.mid_container)}>

                    <div className={clsx('flex justify-between h-full w-4/6')} >
                        <div className={clsx(styles.img_container)}>
                            <img src={order.house.images[0]?.url} className={clsx(styles.house_image)} />
                        </div>
                        <div>
                            <div className={clsx('ml-8 text-left')}>
                                <div className={clsx('font-semibold ')}>{order.house.title}</div>
                                <div className={clsx('mt-3 ')}>Address : {order.house.address}</div>
                            </div>
                        </div>
                    </div>

                    <div className={clsx('ml-5 text-left')}>
                        <div className={clsx('flex items-center')}>
                            <div className={clsx('text-3xl text-orange-600')}>{order.house.price}$</div>
                            <div className={clsx('text-slate-500 text-2xl')}>/night</div>
                        </div>
                        <div></div>
                        <div className={clsx('mt-3')}>Duration : 3 day</div>
                    </div>
                </div>
                <div className={clsx(styles.total_payment, 'flex justify-end mb-3 ')}>
                    <div className={clsx('text-xl flex items-center')}>
                        <div>
                            Total amount :
                        </div>
                        <div className={clsx('text-3xl text-orange-600 ml-3')}>
                            {order.house.price * 3}$
                        </div>
                    </div>
                </div>
                {/* <div className={clsx('col-span-2 flex flex-col justify-center', styles.order_child)}>

                {user_type == 'owner' ? <div>{order.tenant.phone}</div> : <div>{order.house.owner.phone}</div>}
                {user_type == 'owner' ? <div>{order.tenant.name}</div> : <div>{order.house.owner.name}</div>}
            </div> */}
                <div className={clsx('col-span-2 flex  justify-end', styles.order_child)}>
                    {user_type == 'tenant' ? <button className={clsx(styles.contact_button, "px-5", '')}>Contact owner</button> : <button className={clsx(styles.contact_button, "px-5", '')}>Contact tenant</button>}
                    <button onClick={() => { handleOrder(order.id) }} className={clsx(styles.cancel_button, "px-5", '')} {...button_prop}  >{user_type == 'tenant' ? "Cancel" : "Confirm"}</button>
                    <button onClick={() => { DeleteOrder(order.id) }} className={clsx(styles.cancel_button, "px-5", orderState == 'PENDING' && 'hidden')} >Delete </button>
                </div>
            </div>
        </div>)
}


export default Order