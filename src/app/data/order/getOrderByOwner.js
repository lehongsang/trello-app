export default async function getOrdersByOwner(owner_id) {
    let url = `http://localhost:8080/orders/owner/${owner_id}`
    try {
        const data = await ((await fetch(url, { cache: 'no-store' })).json())
        console.log(data)
        return data
    } catch (error) {
        console.log(error)
    }
}