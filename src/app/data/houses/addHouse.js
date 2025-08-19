import axios from "axios"
import { houseSchema } from "../types/schemas"

export default async function delteHouses(new_house) {
    let url = `http://localhost:8080/houses`
    const house = houseSchema.safeParse(new_house)
    console.log(3)
    if (!house.success) {
        const issues = house.error.issues
        console.log(issues)
        throw new Error(issues[0].message);
    }
    try {
        const { data } = await ((await axios.post(url, { ...house.data })))
        return data.id
    } catch (error) {
        console.log(error)
    }
    return 0
}