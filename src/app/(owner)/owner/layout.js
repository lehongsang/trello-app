import OwnerSidebar from "@/app/components/owner/OwnerSidebar"
import clsx from "clsx"

const Layout = ({ children }) => {

    return (
        <div >
            <OwnerSidebar />
            <div className={clsx('mx-12 ml-60 xl:mx-28 xl:ml-72 ')}>
            {children}
            </div>
        </div>
    )
}
export default Layout