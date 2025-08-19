'use client'
import EditHouseModal from "@/app/components/houses/EditHouseModal"
import styles from "./page.module.css"
import getHouseById from "@/app/data/houses/getHouseById"
import clsx from "clsx"
import { useCallback, useEffect, useState } from "react"
import addImage from "@/app/data/images/addImage"
import deleteImage from "@/app/data/images/deleteImage"
const Page = ({ params: { id } }) => {
    const Id = Number(id)
    const [house, setHouse] = useState(null)
    const [selectedFile, setSelectedFile] = useState(null);
    const [currentImageIndex, SetCurrentImageIndex] = useState(0)
    const [edit_house_modal_state, SetEditModalState] = useState(false)
    const [isHouseChanged, SetIsChange] = useState(false)
    useEffect(() => {
        getHouse(Id)
    }, [isHouseChanged])
    const getHouse = async (id) => {
        const house = await getHouseById(id)
        setHouse(house)
    }
    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };
    const changeState = () => {
        SetEditModalState(!edit_house_modal_state)
    };

    const handelAddImage = async (event) => {
        const image_file = event.target.files[0];
        console.log(image_file)
        try {
            await addImage(image_file, house.id)
            SetIsChange(!isHouseChanged)
        } catch (error) {
            console.log(error)
        }

    };
    const handleDeleteImage = async (image_id) => {
        try {
            await deleteImage(image_id)
            SetIsChange(s => !s)
        } catch (error) {
            console.log(error)
        }

    }
   console.log(50)
    return (
        <div className={clsx("mt-10", styles.container)} >
            <div className={clsx('font-semibold', 'text-4xl', 'mb-12', styles.title)}>{house?.title}</div>
            <EditHouseModal old_house={house} style={{ display: edit_house_modal_state ? 'block' : 'none' }} changeState={changeState} state={edit_house_modal_state} />
            <div className={clsx('md:flex md:w-full ', styles.image_container)}>
                <div className="box-border">
                    <div className={clsx('flex')}>
                        <button className={clsx('mr-5')} onClick={() => {
                            SetCurrentImageIndex(index =>
                                index - 1 < 0 ? house?.images.length - 1 : index - 1

                            )
                        }}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="50px" viewBox="0 -960 960 960" width="50px" fill="#5f6368"><path d="m480-320 56-56-64-64h168v-80H472l64-64-56-56-160 160 160 160Zm0 240q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" /></svg>
                        </button>
                        <div className={styles.big_img_container}>
                        <img src={house?.images[currentImageIndex]?.url} className={clsx("rounded-2xl h-full", styles.house_img)} />
                        </div>
                        <button className={clsx('ml-5')} onClick={() => {
                            SetCurrentImageIndex(index => index + 1 == house?.images.length ? 0 : index + 1
                            )
                        }}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="50px" viewBox="0 -960 960 960" width="50px" fill="#5f6368"><path d="m480-320 160-160-160-160-56 56 64 64H320v80h168l-64 64 56 56Zm0 240q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" /></svg>
                        </button>
                    </div>
                    <div className="flex justify-center pt-10">
                        <button className={styles.delete_btn} onClick={() => { handleDeleteImage(house.images[currentImageIndex].id) }}>Delete</button>
                    </div>
                    <input id="add_img" type="file" onChange={handelAddImage} accept="image/*" className={clsx(styles.upload_input, 'my-5')} />
                </div>


                <div className={clsx(styles.slide_container, 'mr-10')}>

                    <div className={clsx(styles.slide, 'grid grid-cols-4 lg:grid-cols-5')} >
                        {house?.images != undefined ? house?.images.map((image, index) => {
                            return (
                                <div className={styles.img_container}>
                                    <img key={index}  src={image.url}  className={clsx(styles.slide_img, house?.images[currentImageIndex].url == image.url && styles.targeted_img)} onMouseEnter={() => { SetCurrentImageIndex(index) }}
                                    />
                                </div>
                            )
                        }) : null}
                    </div>
                    <div className="mt-5">{`(Total : ${house?.images.length} images)`}</div>
                    <label htmlFor="add_img" className={clsx(styles.add_btn, 'mt-10')} >
                        Add
                    </label>


                </div>
            </div>
            <div className={clsx(styles.edit_container)} >

                <div className={clsx('flex my-10 items-center')}>
                    <div className={clsx('font-bold')}>Address :</div>
                    <div className={clsx('text-center mx-5')}>{house?.address}</div>
                    {/* <input value={new_house?.address} type="text" className={clsx(styles.edit_input, 'text-center ml-8')} onChange={(e) => { set_new_house(house => { return { ...house, address: e.target.value } }) }} /> */}
                </div>
                <div className={clsx('flex my-10 items-center')}>
                    <div className={clsx('font-bold')}>Price :</div>
                    <div className={clsx('text-center mx-5')}>{house?.price}$/night</div>
                    {/* <input value={new_house?.price} className={clsx(styles.edit_input,'w-20')} onChange={(e) => { set_new_house(house => { return { ...house, price: e.target.value } }) }} type="number" /> */}
                </div>
                <div className={clsx('flex my-10 items-center')}>
                    <div className={clsx('font-bold')}>State :</div>
                    <div className={clsx('text-center mx-5')}>{house?.state}</div>
                </div>
                <button className={clsx(styles.upload_btn, 'mt-5')} onClick={() => { changeState() }}>Edit</button>
            </div>
        </div>
    )
}
export default Page