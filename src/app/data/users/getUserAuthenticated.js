import axios from "axios"
import { cookies } from "next/headers"


export default async function getUserAuthenticated() {


    let url = `http://localhost:8080/users/auth`
    const jwt_access_token = cookies().get("access_token")?.value
    try {
        const {data} = await axios.post(url,{}, {
            headers: {
                'Authorization': `Bearer ${jwt_access_token}`
            }
        })
       
        return data
    } catch (error) {
        
    }



}