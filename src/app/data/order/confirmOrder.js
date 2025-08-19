import axios from "axios"

export default async function confirmOrder(order_id) {

    let url = `http://localhost:8080/orders/${order_id}/done`
    try {
        const  order  = await axios.patch(url)
        return true
    } catch (error) {
        return false
    }
}