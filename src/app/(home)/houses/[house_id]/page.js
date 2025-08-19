'use client'

import HouseDetail from "@/app/components/houses/HouseDetail"
import getHouseById from "@/app/data/houses/getHouseById"
import clsx from "clsx"
import { useEffect, useState } from "react"
import styles from './page.module.css'
export default function Page({ params: { house_id } }) {
  // Wait for the artist
  const id = Number(house_id)
  const [house, SetHouse] = useState()
  const [isChanged, SetIsChanged] = useState(false)
  const [currentImageIndex, SetCurrentImageIndex] = useState(0)
  useEffect(() => {
    getHouse()
  }, [isChanged])
  const getHouse = async () => {
    SetHouse(await getHouseById(id))
  }

  return (
    <div className={clsx("mt-20")}>
      <div className="font-semibold text-3xl mb-6">{house?.title}</div>
      <div className={clsx("flex ", styles.container)}>

        <div className={clsx(styles.big_img_container)}>
          <img src={house?.images[currentImageIndex].url} style={{ 'objectFit': 'cover', 'borderRadius': '5px' ,'width':'100%','height':'100%'}} />
        </div>
        <div className={clsx(styles.padding)}></div>
        <div className={clsx(styles.slide, 'grid md:grid-cols-2 grid-cols-1 gap-1.5')} >
          {house?.images != undefined ? house?.images.map((image, index) => {
            return (
              <div className={styles.img_container}>
                <img key={index} src={image.url} className={clsx(styles.slide_img, house?.images[currentImageIndex].url == image.url && styles.targeted_img)} onClick={()=>{SetCurrentImageIndex(index)}}
                />
              </div>
            )
          }) : null}
        </div>


      </div >
      <HouseDetail house={house} SetIsChanged={SetIsChanged} />
    </div>
  )
}