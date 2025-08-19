'use client'

import clsx from 'clsx'
import styles from './ChangePassWordModal.module.css'
import { useContext, useState } from 'react'
import ChangePassword from '@/app/actions/changePassword'
import { UserContext } from '@/app/userProvider/UserProvider'

const ChangePasswordModal = ({ changeState, style }) => {
      const { user } = useContext(UserContext)
      const [errors, SetError] = useState({ old_password: '', new_password: '' })
      const [formData, SetFormData] = useState({
            new_password: '',
            confirmed_new_password: '',
            old_password: ''
      })
      const handleSubmit = async () => {
          
            if (formData.new_password != formData.confirmed_new_password) {
                  SetError({ ...errors, new_password: 'New password is not similar' })
                  console.log(1)
            }

            else {
                  try {
                        const response = await ChangePassword(formData, user)
                        if (!response.status) {
                              SetError({ ...errors, old_password: response.message })
                        }
                        else {
                              changeState()
                              SetFormData({
                                    new_password: '',
                                    confirmed_new_password: '',
                                    old_password: ''
                              })
                              alert(response.message)
                        }
                  } catch (error) {
                        console.log(error)
                  }
            }
      }
      return (<div className={styles.container} style={style} >
            <div className={clsx(styles.modal_overlay)} ></div>
            <div className={clsx(styles.modal_container)} >

                  <input placeholder='Old password' name='old_password' type='password' className={clsx(styles.password_input, 'mt-16', 'px-3', 'mt-16')} value={formData.old_password} onChange={e => {
                        SetFormData({ ...formData, old_password: e.target.value })
                        SetError({ old_password: '', new_password: '' })
                  }} />
                  {errors.old_password}<br />
                  <input placeholder='New password' name='new_password' type='text' className={clsx(styles.password_input, 'px-3')} minLength={8} value={formData.new_password} onChange={e => {
                        SetFormData({ ...formData, new_password: e.target.value })
                        SetError({ old_password: '', new_password: '' })
                  }
                  } />
                  <input placeholder='Confirm new password' name='confirm_new_password' type='text' className={clsx(styles.password_input, 'mt-14', 'px-3')} minLength={8} value={formData.confirmed_new_password} onChange={e => {
                        SetFormData({ ...formData, confirmed_new_password: e.target.value })
                        SetError({ old_password: '', new_password: '' })
                  }
                  }

                  />
                  {errors.new_password}<br />
                  <div className={clsx(styles.button_container, 'flex')}>
                        <button className={clsx(styles.cancel_button)} onClick={() => {
                              changeState()
                              SetFormData({
                                    new_password: '',
                                    confirmed_new_password: '',
                                    old_password: ''
                              })
                              SetError({ old_password: null, new_password: null })
                        }}>Cancel</button>
                        <button className={clsx(styles.confirm_button)} onClick={(e) => {
                              e.preventDefault()
                              handleSubmit() }}>Confirm</button>
                  </div>
            </div>

      </div >)
}
export default ChangePasswordModal