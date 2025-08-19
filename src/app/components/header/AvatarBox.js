'use client'
import Logout from '@/app/actions/Logout'
import styles from './AvatarBox.module.css'
import { useContext, useState } from 'react'
import Link from 'next/link'
import ChangePasswordModal from '../change_password/changePasswordModel'
import UserInforModal from '../user/UserInforModal'
import { UserContext } from '@/app/userProvider/UserProvider'
const AvatarBox = () => {
  const [isDisplayed, setIsDisplay] = useState(false)
  const handleDisplay = () => { setIsDisplay(!isDisplayed) }
  const [isChangePasswordModalShowed, setChangePasswordModalState] = useState(false)
  const [isUserInforModalShowed, setUserInforModalState] = useState(false)
  console.log(useContext(UserContext))
  let {user,SetUser} = useContext(UserContext)
  if (user) {
    const { name } = user
  }
  const changePasswordModel = () => {
    setChangePasswordModalState(!isChangePasswordModalShowed)
  }
  const changeUserInforModel = () => {
    setUserInforModalState(!isUserInforModalShowed)
  }
  return (
    <div>
      <div className={'flex items-center border-2 justify-center rounded-3xl w-full my-4 max-w-24 ' + styles.avatar_button} onClick={() => { handleDisplay() }} >
        <div className='flex-auto basis-4 shink-0 grow-0 mx-2'>
          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="15" height="15" viewBox="0 0 24 24">
            <path d="M 2 5 L 2 7 L 22 7 L 22 5 L 2 5 z M 2 11 L 2 13 L 22 13 L 22 11 L 2 11 z M 2 17 L 2 19 L 22 19 L 22 17 L 2 17 z"></path>
          </svg>
        </div>
        <div className='flex-auto basis-8 shink-0 grow-0 mx-1.5'>
          <img height={30} width={30} src='https://cdn.vectorstock.com/i/500p/96/64/anonymous-esport-logotype-icon-sticker-logo-hacker-vector-50369664.jpg' alt='avatar' />
        </div>
      </div>
      <div className={styles.overlay} style={{ display: `${isDisplayed ? 'block' : 'none'}` }} onClick={handleDisplay}></div>
      {user ? <div id="user_ultil" className={styles.user_ultil_container} style={{ display: `${isDisplayed ? 'flex' : 'none'}` }}>
        <div href={""} className={styles.child + ' w-full h-14 text-center'} id='username'>
          {user.name}
        </div>
        <div className={styles.child + ' w-full h-14 text-center'}>
          <div onClick={() => { changePasswordModel() }}>   Change Password</div>

          <ChangePasswordModal changeState={changePasswordModel} style={{ display: isChangePasswordModalShowed ? 'block' : 'none' }} />
        </div>
        <div className={styles.child + ' w-full h-14 text-center'}>
          <div onClick={() => { changeUserInforModel() }}> My Information</div>

          <UserInforModal changeState={changeUserInforModel} style={{ display: isUserInforModalShowed ? 'block' : 'none' }} />
        </div>
        <Link href={"/owner"} className={styles.child + ' w-full h-14 text-center'}>
          Owner Page
        </Link>

        <Link href={"/orders?type=all"} className={styles.child + ' w-full h-14 text-center'}>
          My Orders
        </Link>
        <button  className={styles.child + ' w-full h-14 text-center'} onClick={() => { 
          SetUser(null)
          Logout()
          
          
          }}>
          Logout
        </button>
      </div> : null}
      {!user ? <div id="user_ultil" className={styles.user_ultil_container} style={{ display: `${isDisplayed ? 'flex' : 'none'}` }}>
        <Link href={"/login"} className={styles.child + ' w-full h-14 text-center cursor-pointer'}>
          Sign in
        </Link>
        <Link href={"/signup"} className={styles.child + ' w-full h-14 text-center'}>
          Sign up
        </Link>
      </div> : null}




    </div>
  )
}
export default AvatarBox