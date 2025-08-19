'use client'
import clsx from 'clsx'
import styles from './OwnerSidebar.module.css'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const OwnerSidebar = () => {
    const pathname = usePathname()
    return (
        <div className={styles.sidebar_container}>


            <Link href={"/"} className={clsx('mt-8')}>
                <svg width={50} className={clsx(styles.home_icon)} id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.88 113.97"><defs><style></style></defs><title>homepage</title><path className="cls-1" d="M18.69,73.37,59.18,32.86c2.14-2.14,2.41-2.23,4.63,0l40.38,40.51V114h-30V86.55a3.38,3.38,0,0,0-3.37-3.37H52.08a3.38,3.38,0,0,0-3.37,3.37V114h-30V73.37ZM60.17.88,0,57.38l14.84,7.79,42.5-42.86c3.64-3.66,3.68-3.74,7.29-.16l43.41,43,14.84-7.79L62.62.79c-1.08-1-1.24-1.13-2.45.09Z" />
                </svg></Link>
            <Link href={"/owner"} className={clsx(styles.child, 'my-3', 'mt-7',
                pathname === "/owner" && styles.choosen_child
            )}  >
                Dashboard</Link>
            <Link href={"/owner/houses"} className={clsx(styles.child, 'my-3', pathname === "/owner/houses" && styles.choosen_child)}>My Houses</Link>
            <Link href={"/owner/orders"} className={clsx(styles.child, 'my-3',
                pathname === "/owner/orders" && styles.choosen_child,
            )}>My Orders</Link>
        </div>


    )

}
export default OwnerSidebar