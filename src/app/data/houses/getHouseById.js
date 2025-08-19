
export default async function getHouseById(house_id) {

    let url = `http://localhost:8080/houses/${house_id}`
    try {
        const  house  = await ((await fetch(url, { cache: 'no-store' })).json())
        return house
    } catch (error) {
        console.log(error)
    }
}