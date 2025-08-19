'use client'

import Order from "@/app/components/orders/Order"
import getOrdersByOwner from "@/app/data/order/getOrderByOwner"
import { UserContext } from "@/app/userProvider/UserProvider"

import clsx from "clsx"
import { useContext, useEffect, useState } from "react"

const Page = () => {
    const { user } = useContext(UserContext)
    const [list_order, set_list_order] = useState([])
    const [isDeleted, SetIsDeleted] = useState(false)
    useEffect(() => {
        const getListOrder = async () => {
            const list = await getOrdersByOwner(user.id)
            set_list_order(list)
        }
        getListOrder().catch(console.error)
    }, [isDeleted])
    const handleDeleted = () => {
        SetIsDeleted(s => !s)

    }
    console.log(handleDeleted)
    return (
        list_order.length > 0 ? 
        <div className={clsx("mt-20  text-center")} >
            {list_order ? list_order.map(order => {
                return (<Order order={order} user_type={"owner"} handleDeleted={handleDeleted} />)
            }) : ""


            }
        </div> : <div className={clsx("mt-40 text-center")}>There is no order !</div>
    )
}
export default Page