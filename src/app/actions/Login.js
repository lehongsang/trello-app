'use server'
import axios from 'axios';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import getUserAuthenticated from '../data/users/getUserAuthenticated';
const Login =
    async (form_data) => {

        const account = form_data.account
        const password = form_data.password
        let isSuccess = false
        try {
            const { data } = await axios.post('http://localhost:8080/users/login', { account: account, password: password }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            cookies().set({
                name: 'access_token',
                value: data.access_token,
                httpOnly: true,
                path: '/',
            })
            cookies().set({
                name: 'refresh_token',
                value: data.refresh_token,
                httpOnly: true,
                path: '/',
            })
            isSuccess = true
        } catch (error) {
            console.log(error.message)

        }
        if (isSuccess) {

            return await getUserAuthenticated()
        }
        else {
            return null
        }
    }
export default Login