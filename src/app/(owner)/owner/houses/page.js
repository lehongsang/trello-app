'use client'
import AddHouseModal from '@/app/components/houses/AddHouseModal'
import styles from './page.module.css'
import HouseOwner from "@/app/components/houses/HouseOwner"
import getHousesByOwner from "@/app/data/houses/getHousesByOwner"
import clsx from "clsx"
import { useContext, useEffect, useState } from "react"
import DeleteHouseModal from '@/app/components/houses/DeleteHouseModal'
import { UserContext } from '@/app/userProvider/UserProvider'
const Page = () => {
    const [listHouses, SetListHouses] = useState([])
    const [modal_state, SetModalState] = useState({
        'add': false,
        'delete': false
    })
    const [chosen_house_id, SetChosenHouseId] = useState(0)
    const changeState = (type) => {

        if (type) {
            SetModalState(state => { return { ...state, [type]: !state[type] } })
        }
    }
    const setChosenHouse = (id) => {
        if (id) {
            SetChosenHouseId(id)
        }
        console.log(10000)

    }
    console.log(modal_state)
    let { user } = useContext(UserContext)
    if (user) {
        useEffect(() => {
            getListHouses(user.id)

        }, [modal_state])
    }
    const getListHouses = async (id) => {
        const list = await getHousesByOwner(id)
        SetListHouses(list)
    }
    console.log(chosen_house_id)
    return (
        <div className="mt-20">
            <div className={clsx(styles.house_container)}>
                {
                    listHouses?.map(house => {
                        return (
                            <HouseOwner house={house} changeState={changeState} setChosenHouse={setChosenHouse} />
                        )

                    })

                }

            </div>
            <DeleteHouseModal changeState={changeState} style={modal_state.delete ? { display: 'block' } : { display: 'none' }} house_id={chosen_house_id} />
            <div className={styles.add_btn_container}>
                <svg onClick={() => { changeState('add') }} className={styles.add_btn} xmlns="http://www.w3.org/2000/svg" height="60px" viewBox="0 -960 960 960" width="60px" fill="#5f6368"><path d="M440-280h80v-160h160v-80H520v-160h-80v160H280v80h160v160Zm40 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" /></svg>
                <AddHouseModal changeState={changeState} style={modal_state.add ? { display: 'block' } : { display: 'none' }} />

            </div>
        </div>
    )
}
export default Page