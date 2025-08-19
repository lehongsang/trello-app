
export default async function getHouses(address = null, min_price = null, max_price = null) {
    let data
    let url = `http://localhost:8080/houses?`
    if (address != null) {
        url = url + `address=${address}&`
    }
    if (min_price != null) {
        url += `min_price=${min_price}&`
    }
    if (max_price != null) {
        url += `max_price=${max_price}&`
    }
    try {
        data = await ((await fetch(url, { cache: 'no-store' })).json())
        return data
    } catch (error) {
        console.log(error)
    }
    return data
}