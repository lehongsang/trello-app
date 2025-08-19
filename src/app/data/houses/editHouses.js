import axios from "axios"

export default async function editHouses(new_house) {
    let url = `http://localhost:8080/houses/${new_house.id}`

    try {
        const data = await ((await axios.put(url, { ...new_house })))
        return true
    } catch (error) {
        console.log(error)
    }
    return false
}