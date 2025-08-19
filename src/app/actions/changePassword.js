'use server'
import axios from 'axios';
import { cookies } from 'next/headers';
const ChangePassword =
    async (form_data, user ) => {
        
        const new_password = form_data.new_password
        const old_password = form_data.old_password
        const response = { status: false, message: '' }
        const access_token = cookies().get('access_token').value
        try {
            const { data } = await axios.patch(`http://localhost:8080/users/${user.id}`, { old_password, new_password }, {
                headers: {
                    'Authorization': `Bearer ${access_token}`,
                    'Content-Type': 'application/json'
                }
            })
            console.log(data)
            response.status = true
            response.message = data
        } catch (error) {
            console.log(error.response.data)
            response.message = error.response.data
        }
        return response
    }
export default ChangePassword