import axios from "axios"

export default async function cancelOrder(order_id) {
    
    let url = `http://localhost:8080/orders/${order_id}/cancel`
    try {
        const  order  = await axios.patch(url)
        console.log(order)
         return true
    } catch (error) {
        console.log(error)
        return false
    }
    
}