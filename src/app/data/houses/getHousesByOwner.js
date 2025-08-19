export default async function getHousesByOwner(owner_id) {
    let data
    let url = `http://localhost:8080/houses/owner/${owner_id}`
    try {
        data = await ((await fetch(url, { cache: 'no-store' })).json())
      
        return data
    } catch (error) {
        console.log(error)
    }
    return data
}