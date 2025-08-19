import clsx from "clsx"
import styles from "./DeleteHouseModal.module.css"
import Overlay from "./Overlay"
import deleteHouses from "@/app/data/houses/deleteHouse"

const DeleteHouseModal = ({ changeState, style, house_id }) => {
     console.log(house_id)
    const handleDelete = async () => {
        if (await deleteHouses(house_id)) {
            console.log(1
            )
            changeState('delete')
        }
    }
    return (
        <div className={styles.container} style={style} >
            <Overlay />
            <div className={styles.modal_container} >
                <div className={styles.text_line}>
                    <div className="text-center"> This house will be deleted permanently .</div>
                    <div className="text-center">      Are you sure about that ?</div>
                </div>
                <div className={styles.btn_container}>
                    <button className={clsx(styles.cancel_btn)} onClick={() => {
                        changeState('delete')

                    }} >Cancel</button>
                    <button className={clsx(styles.delete_btn)} onClick={() => {
                        handleDelete()
                    }} > Delete</button>
                </div>
            </div>

        </div>)

}
export default DeleteHouseModal