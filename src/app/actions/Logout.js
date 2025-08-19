'use server'

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
const Logout = async () => {
  cookies().delete('access_token')
  cookies().delete('refresh_token')
  redirect('/login')
}
export default Logout

