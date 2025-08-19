
import axios from "axios"
import { imageSchema } from "../types/schemas"
export default async function addImage(new_image, house_id) {
    let url = `http://localhost:8080/images`
   
    const image = imageSchema.safeParse({ file: new_image })
    if (!image.success) {
        const issues = image.error.issues
        throw new Error(issues[0].message);
    }
    try {
        console.log(house_id)
        const valid_image = image.data
        const form_data = new FormData()
        form_data.append("file", valid_image.file)
        form_data.append("house_id", house_id)
        console.log(form_data)
        const data = await ((await axios.post(url, form_data)))
        console.log(data)
        return true
    } catch (error) {
        console.log(error)
    }
    return false
}