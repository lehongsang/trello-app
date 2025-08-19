'use server'
import axios from 'axios';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import getUserAuthenticated from '../data/users/getUserAuthenticated';
const Signup =
    async (form_data) => {
         
        const account = form_data.account
        const password = form_data.password
        const name = form_data.name
        console.log(account)
        if(account.length<8){
            return
        }
        if(password.length<8){
            return
        }
        let isSuccess = false
        try {
            const { data } = await axios.post('http://localhost:8080/users/register', { account: account, password: password,name:name }, {
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
export default Signup