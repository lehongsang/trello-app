'use client'
import clsx from 'clsx'
import styles from './EditHouseModal.module.css'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '@/app/provider/Provider'
import editHouses from '@/app/data/houses/editHouses'
const EditHouseModal = ({ changeState, style, old_house, state }) => {
    const { user } = useContext(UserContext)
    const [errors, SetError] = useState({
        title: '',
        address: '',
        price: '',
        state: ''
    })
    const [new_house, SetNewHouse] = useState({})
    useEffect(() => {
        SetNewHouse({ ...old_house })
    }, [state, old_house])
    const handleSubmit = async () => {
        try {
            const response = await editHouses(new_house)
            if (!response) {
                SetError({ ...errors, old_password: response.message })
            }
            else {
                changeState()
                SetNewHouse({
                    ...old_house
                })
                alert('Edit successfully')
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (<div className={styles.container} style={style} >
        <div className={clsx(styles.modal_overlay)} ></div>
        <div className={clsx(styles.modal_container)} >
            <div className={clsx('my-5 w-80')}>
                <label htmlFor='title' className={clsx('mt-8', 'text-left', 'font-bold', 'mb-3')} >Title :</label>
                <textarea placeholder='' name='title' type='text' className={clsx(styles.text_area_input, 'px-3', 'mt-1')} maxLength={200} value={new_house?.title} onChange={e => {
                    SetNewHouse(house => { return { ...house, title: e.target.value } })
                    SetError({
                        title: '',
                        address: '',
                        price: '',
                        state: ''
                    })
                }} />
                {errors.title}<br /></div>

            <div className={clsx('my-5 w-80')}>
                <label htmlFor='address' className={clsx('mt-5', 'text-left', 'font-bold', 'mb-3')} >Address :</label>
                <input placeholder='' name='address' type='text' className={clsx(styles.text_input, 'px-3', 'mt-1')} minLength={8} value={new_house?.address} onChange={e => {
                    SetNewHouse(house => { return { ...house, address: e.target.value } })
                    SetError({
                        title: '',
                        address: '',
                        price: '',
                        state: ''
                    })
                }
                } />
                {errors.address}<br />
            </div>
            <div className={clsx('my-5 w-80')}>
                <label htmlFor='price' className={clsx('mt-5', 'text-left', 'font-bold', 'mb-3')}>Price :</label>

                <input placeholder='' name='price' type='number' className={clsx(styles.text_input, 'px-3', 'mt-1')} value={new_house?.price} onChange={e => {
                    SetNewHouse(house => { return { ...house, price: e.target.value } })
                    SetError({
                        title: '',
                        address: '',
                        price: '',
                        state: ''
                    })
                }
                }

                />
                {errors.price}<br />
            </div>
            <div className={clsx('my-5 w-80')}>
                <label htmlFor='state' className={clsx('mt-5', 'text-left', 'font-bold', 'mb-3')}>State :</label>

                <select placeholder='' name='state' type='text' className={clsx(styles.text_input, 'px-3', 'mt-1')} value={new_house?.state} onChange={e => {
                    SetNewHouse(house => { return { ...house, state: e.target.value } })
                    SetError({
                        title: '',
                        address: '',
                        price: '',
                        state: ''
                    })
                }
                }

                >
                    <option value="RENTED">RENTED</option>
                    <option value="EMPTY">EMPTY</option>

                </select>
                {errors.price}<br />
            </div>





            <div className={clsx(styles.button_container, 'flex')}>
                <button className={clsx(styles.cancel_button)} onClick={() => {
                    changeState()
                    SetNewHouse({
                        title: '',
                        address: '',
                        price: '',
                        state: ''
                    })
                    SetError({
                        title: '',
                        address: '',
                        price: '',
                        state: ''
                    })
                }}>Cancel</button>
                <button className={clsx(styles.confirm_button)} onClick={(e) => {
                    e.preventDefault()
                    handleSubmit()
                }}>Confirm</button>
            </div>
        </div>

    </div >)
}
export default EditHouseModal