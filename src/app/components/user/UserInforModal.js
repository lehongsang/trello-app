'use client'
import clsx from 'clsx'
import styles from './UserInforModal.module.css'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '@/app/userProvider/UserProvider'
import Overlay from '../houses/Overlay'
import EditUser from '@/app/actions/editUser'
import { userSchema } from '@/app/data/types/schemas'
const UserInforModal = ({ changeState, style, state }) => {
    const { user, setUser } = useContext(UserContext)
    const [errors, SetError] = useState('')
    const [formData, SetFormData] = useState()
    useEffect(() => {
        SetFormData({ ...user })
    }, [user])
    const handleSubmit = async () => {
        const user_zod = userSchema.safeParse(formData)
        console.log(formData)
        if (!user_zod.success) {
            const issues = user_zod.error.issues
            console.log(issues)
            SetError(issues[0].message);
        }
        else {
            try {
                const data = await EditUser(formData, user)

                if (!data) {
                    SetError('Submit failed !')
                }
                else {
                    setUser(data)
                    changeState()

                }

            } catch (error) {
                console.log(error)
            }
        }

    }
    return (
        <div className={styles.container} style={style} >
            <Overlay />

            <div className={clsx(styles.modal_container, 'px-32 ')}   >
                <div className='my-2 flex items-center'>
                    <div className='mr-5 w-20'>Name :</div>
                    <input id='name' type='text' defaultValue={user.name} className={clsx(styles.text_input, 'px-3', 'mt-1')} placeholder='' onChange={e => { SetFormData(form => { return { ...form, name: e.target.value } }) }} />
                    <label htmlFor='name' className={clsx(styles.label)}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M80 0v-160h800V0H80Zm160-320h56l312-311-29-29-28-28-311 312v56Zm-80 80v-170l448-447q11-11 25.5-17t30.5-6q16 0 31 6t27 18l55 56q12 11 17.5 26t5.5 31q0 15-5.5 29.5T777-687L330-240H160Zm560-504-56-56 56 56ZM608-631l-29-29-28-28 57 57Z" /></svg>
                    </label>
                </div>
                <div className='my-2 flex items-center'>
                    <div className='mr-5 w-20'>Address :</div>
                    <input id='address' type='text' defaultValue={user.address} className={clsx(styles.text_input, 'px-3', 'mt-1')} placeholder='' onChange={e => { SetFormData(form => { return { ...form, address: e.target.value } }) }} />
                    <label htmlFor='address' className={clsx(styles.label)}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M80 0v-160h800V0H80Zm160-320h56l312-311-29-29-28-28-311 312v56Zm-80 80v-170l448-447q11-11 25.5-17t30.5-6q16 0 31 6t27 18l55 56q12 11 17.5 26t5.5 31q0 15-5.5 29.5T777-687L330-240H160Zm560-504-56-56 56 56ZM608-631l-29-29-28-28 57 57Z" /></svg>
                    </label>

                </div>
                <div className='my-2 flex items-center'>
                    <div className='mr-5 w-20'>Email :</div>
                    <input id='email' type='email' defaultValue={user.email} className={clsx(styles.text_input, 'px-3', 'mt-1')} placeholder='' onChange={e => { SetFormData(form => { return { ...form, email: e.target.value } }) }} />
                    <label htmlFor='email' className={clsx(styles.label)}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M80 0v-160h800V0H80Zm160-320h56l312-311-29-29-28-28-311 312v56Zm-80 80v-170l448-447q11-11 25.5-17t30.5-6q16 0 31 6t27 18l55 56q12 11 17.5 26t5.5 31q0 15-5.5 29.5T777-687L330-240H160Zm560-504-56-56 56 56ZM608-631l-29-29-28-28 57 57Z" /></svg>
                    </label>
                </div>
                <div className='my-2 flex items-center'>
                    <div className='mr-5 w-20'>Phone :</div>
                    <input id='phone' type='text' defaultValue={user.phone} className={clsx(styles.text_input, 'px-3', 'mt-1')} placeholder='' minLength={'8'} onChange={e => { SetFormData(form => { return { ...form, phone: e.target.value } }) }} />
                    <label htmlFor='phone' className={clsx(styles.label)}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M80 0v-160h800V0H80Zm160-320h56l312-311-29-29-28-28-311 312v56Zm-80 80v-170l448-447q11-11 25.5-17t30.5-6q16 0 31 6t27 18l55 56q12 11 17.5 26t5.5 31q0 15-5.5 29.5T777-687L330-240H160Zm560-504-56-56 56 56ZM608-631l-29-29-28-28 57 57Z" /></svg>
                    </label>
                </div>
                <div className='ml-8'>
                    {errors}<br />
                </div>
                <div className={styles.btn_container}>
                    <button className={styles.cancle_btn} onClick={() => changeState()}>Cancel</button>
                    <button className={styles.submit_btn} onClick={e => {
                        e.preventDefault()
                        handleSubmit()
                    }}  >Submit</button>
                </div>

            </div>
        </div >)
}
export default UserInforModal