
import axios from "axios"
export default async function deleteImage(image_id) {
    let url = `http://localhost:8080/images/${image_id}`


    try {

        await ((await axios.delete(url)))

        return true
    } catch (error) {
        console.log(error)
    }
    return false
}