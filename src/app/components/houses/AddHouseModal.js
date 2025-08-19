'use client'
import clsx from 'clsx'
import styles from './AddHouseModal.module.css'
import { useContext, useEffect, useState } from 'react'

import addHouses from '@/app/data/houses/addHouse'
import addImage from '@/app/data/images/addImage'
import Overlay from './Overlay'
import { UserContext } from '@/app/userProvider/UserProvider'
const AddHouseModal = ({ changeState, style, state }) => {
    const { user } = useContext(UserContext)
    const [errors, SetError] = useState({
        message: ''
    })
    const [img_path, SetImagePath] = useState('')
    const [img_file, SetImageFile] = useState()
    const [new_house, SetNewHouse] = useState(
        {
            owner: { id: user?.id },
            address: '',
            price: 0,
            state: "EMPTY",
            title: ""
        }
    )
    const handleSubmit = async () => {
        try {
            let house_id
            if (await addImage(img_file, house_id)) {
                house_id = await addHouses(new_house)
            }
            changeState('add')

        } catch (err) {
            SetError(error => { return { ...error, message: err?.message } })

        }
    }
    return (
        <div className={styles.container} style={style} >
            <Overlay />
            <div className={clsx(styles.modal_container)} >
                <div className={clsx(styles.image_container)}>
                    <div className={clsx('text-left', 'font-bold', 'mb-3')}>Image :</div>
                    {img_path.length > 5 ?
                        <div className='flex flex-col items-center'>
                            <img src={img_path} width={400} height={400} />
                            <label className={styles.other_btn} htmlFor='upload_image'> Other</label>
                        </div>
                        :
                        <label className={clsx(styles.image_box)} htmlFor='upload_image'>
                            <svg className={clsx(styles.add_icon)} xmlns="http://www.w3.org/2000/svg" height="50px" viewBox="0 -960 960 960" width="50px" fill="#5f6368"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" /></svg>
                        </label>
                    }
                    <input accept="image/*" type='file' name='upload_image' id='upload_image' className={styles.img_input} onChange={event => {
                        const file = event.target.files[0];

                        if (file) {
                            const filePath = URL.createObjectURL(file);
                            SetImagePath(filePath);
                            SetImageFile(file)
                        }
                    }} />

                </div>
                <div className={clsx(styles.text_container)} >
                    <div className={clsx('my-5 w-80')}>
                        <label htmlFor='title' className={clsx('mt-8', 'text-left', 'font-bold', 'mb-3')} >Title :</label>
                        <textarea placeholder='' name='title' type='text' className={clsx(styles.text_area_input, 'px-3', 'mt-1','pt-3','max-h-20','min-h-12')} maxLength={200} value={new_house?.title} onChange={e => {
                            SetNewHouse(house => { return { ...house, title: e.target.value } })

                        }} />
                    </div>
                    <div className={clsx('my-5 w-80')}>
                        <label htmlFor='address' className={clsx('mt-5', 'text-left', 'font-bold', 'mb-3')} >Address :</label>
                        <input placeholder='' name='address' type='text' className={clsx(styles.text_input, 'px-3', 'mt-1')} minLength={8} value={new_house?.address} onChange={e => {
                            SetNewHouse(house => { return { ...house, address: e.target.value } })

                        }
                        } />

                    </div>
                    <div className={clsx('my-5 w-80')}>
                        <label htmlFor='price' className={clsx('mt-5', 'text-left', 'font-bold', 'mb-3')}>Price :</label>

                        <input placeholder='' name='price' type='number' className={clsx(styles.text_input, 'px-3', 'mt-1')} defaultValue={new_house?.price} onChange={e => {
                            SetNewHouse(house => { return { ...house, price: Number(e.target.value) } })

                        }
                        }
                        />

                    </div>
                    <div className={clsx('my-5 w-80')}>
                        <label htmlFor='state' className={clsx('mt-5', 'text-left', 'font-bold', 'mb-3')}>State :</label>
                        <select placeholder='' name='state' type='text' className={clsx(styles.text_input, 'px-3', 'mt-1')} value={new_house?.state} onChange={e => {
                            SetNewHouse(house => { return { ...house, state: e.target.value } })

                        }
                        }
                        >
                            <option value="RENTED">RENTED</option>
                            <option value="EMPTY">EMPTY</option>

                        </select>

                    </div>
                    {errors.message} <br />
                </div>
                <div className={clsx(styles.button_container, 'flex')}>
                    <button className={clsx(styles.cancel_button)} onClick={() => {
                        changeState('add')
                        SetNewHouse({
                            title: '',
                            address: '',
                            price: '',
                            state: ''
                        })
                        SetImageFile(
                            null
                        )
                        SetImagePath('')
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
export default AddHouseModal