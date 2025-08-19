'use server'
import axios from 'axios';
import { cookies } from 'next/headers';
const EditUser =
    async (form_data, user) => {
        const new_infor = { ...user, ...form_data }
        const access_token = cookies().get('access_token').value
        try {
            const { data } = await axios.put(`http://localhost:8080/users/${user.id}`, { ...new_infor }, {
                headers: {
                    'Authorization': `Bearer ${access_token}`,
                    'Content-Type': 'application/json'
                }
            })
            
            return data
        } catch (error) {
            console.log(error.response.data)
            return false
        }

    }
export default EditUser