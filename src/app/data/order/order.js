import axios from "axios"
const Order = async (order) => {
    let url = `http://localhost:8080/orders`

    try {
        console.log(order)
        const { data } = await axios.post(url, { ...order })
        console.log(data)
        return data
    } catch (error) {

        console.log(error)
        throw new Error("Orders fail !")
    }



}
export default Order