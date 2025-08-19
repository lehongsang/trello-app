'use client'
import clsx from "clsx"
import getOrdersByTenant from "../../data/order/getOrdersByTenant"
import { useCallback, useContext, useEffect, useState } from "react"

import Order from "@/app/components/orders/Order"
import styles from './page.module.css'
import { usePathname, useSearchParams, useRouter } from "next/navigation"
import  findByState from '@/app/helper/findByState'
import { UserContext } from "@/app/userProvider/UserProvider"
const Page = () => {
    const searchParams = useSearchParams()
    const router = useRouter()
    const pathname = usePathname()
    const type = searchParams.get('type')
    const { user } = useContext(UserContext)
    const [initial_list,set_initial_list] = useState([])
    const [list_order, set_list_order] = useState([])
    const [isListChanged, SetIsChanged] = useState(false)
  
    useEffect(() => {
        getListOrder()
    }, [isListChanged])
    useEffect(() => {
        getListOrder()
    }, [user])
    useEffect(()=>{
        console.log(1)
        set_list_order(findByState(type,initial_list))
        console.log(list_order)
        
    },[type,initial_list])
    const createQueryString = useCallback(
        (name, value) => {
            const params = new URLSearchParams(searchParams)
            params.set(name, value)

            return params.toString()
        },
        [searchParams]
    )
    const getListOrder = async () => {
        const list = await getOrdersByTenant(user?.id)
        set_initial_list(list)
    }
    const handleChange = () => {
        SetIsChanged(s => !s)

    }
   
    console.log(list_order)
    return (
       <div className={clsx("mt-20  gap-4 text-center")} >
            <div className={clsx(styles.head_bar, 'flex')}>
                <div className={clsx(styles.bar_child,type=='all'&&styles.choosen_child)} onClick={() => { router.push(pathname + '?' + createQueryString('type', 'all')) }}>All</div>
                <div className={clsx(styles.bar_child,type=='done'&&styles.choosen_child)} onClick={() => { router.push(pathname + '?' + createQueryString('type', 'done')) }}>Done</div>
                <div className={clsx(styles.bar_child,type=='cancelled'&&styles.choosen_child)} onClick={() => { router.push(pathname + '?' + createQueryString('type', 'cancelled')) }}>Cancelled</div>
            </div>
            {list_order&&list_order.length>0 ? list_order?.map(order => {
                return (<Order order={order} user_type={"tenant"} setListChange={handleChange} list_order={list_order} />)
            }) :  <div className={clsx("mt-40 text-center")}>There is no order !</div>
            }
        </div> 


    )
}
export default Page