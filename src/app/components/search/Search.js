'use client'

import { useEffect, useState } from 'react'
import styles from './Search.module.css'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import clsx from 'clsx'
const SearchComponent = () => {
    const search_param = useSearchParams()
    const pathname = usePathname();
    const { replace } = useRouter();
    const [isVisible, setIsVisible] = useState(true);
    function handleSearchAddress(address) {
        const params = new URLSearchParams(search_param);
        if (address) {
            params.set('address', address);
        } else {
            params.delete('address');
        }
        replace(`${pathname}?${params.toString()}`);
    }
    useEffect(() => {
        const handleScroll = () => {
    
            if (window.scrollY > 51) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    function handleSearchPrice(min_price, max_price) {
        const params = new URLSearchParams(search_param);
        if (min_price) {
            params.set('min_price', min_price);
        } else {
            params.delete('min_price');
        }
        if (max_price) {
            params.set('max_price', max_price);
        } else {
            params.delete('max_price');
        }
        replace(`${pathname}?${params.toString()}`);
    }
    const [min_price, set_min_price] = useState("")
    const [max_price, set_max_price] = useState("")
    return (
        <div className={clsx(isVisible && styles.search_container)} style={{ display: pathname != '/' || !isVisible ? 'none' : 'flex' }} >
            <div className={styles.search_child + " flex"}>
                <div className={"w-1/3 font-semibold"}>Price : </div>
                <div className={"w-2/3 flex "}>
                    <div className='flex items-center w-full' >
                        <div className={'relative ' + styles.input_label_container}>
                            <input type='number' className={styles.price_input} placeholder=' ' name='price' onChange={e => set_min_price(e.target.value)} value={search_param.get("min_price")?.toString()} />
                            <label htmlFor='price' className={styles.price_input_label}> Min</label>

                        </div>
                    </div>
                    <div className='flex items-center w-full'>
                        <div className={'relative ' + styles.input_label_container}>
                            <input type='number' className={styles.price_input} placeholder=' ' name='price' onChange={e => set_max_price(e.target.value)} value={search_param.get("max_price")?.toString()} />
                            <label htmlFor='price' className={styles.price_input_label}>Max</label>

                        </div>
                    </div>
                </div>

            </div>
            <div className={styles.search_child}>
                <div className={styles.address_container + " flex"}>
                    <div className={'relative ' + styles.input_label_container}>
                        <input placeholder=' ' className={'pl-5 ml-5 ' + styles.address_input} name='address' onChange={e => handleSearchAddress(e.target.value)} defaultValue={search_param.get('address')?.toString()} type='address' />
                        <label htmlFor='address' className={styles.address_input_label}>Address</label>

                    </div>
                </div>
            </div>
            <div className={"relative flex items-center " + styles.search_child_icon}>
                <div className={styles.search_icon} onClick={() => { handleSearchPrice(min_price, max_price) }} >
                    <svg className='mx-auto' xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#5f6368"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" /></svg>
                </div>
            </div>

        </div>

    )



}
export default SearchComponent