import axios from "axios"

export default async function deleteOrder(order_id) {

    let url = `http://localhost:8080/orders/${order_id}`
    console.log(order_id)
    try {
        await axios.delete(url)
        return true
    } catch (error) {
        console.log(error)
        return false
    }

}