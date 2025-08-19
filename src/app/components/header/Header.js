import { redirect } from 'next/navigation'
import SearchComponent from '../search/Search'
import AvatarBox from './AvatarBox'
import styles from './Header.module.css'
import Logo from './Logo'
import clsx from 'clsx'

const Header = async () => {
    return (
        <div className={clsx(styles.header_and_search_box,'px-20')}>
            <header className="header-container h-20">
                <div className={"h-full flex " + styles.vertical_center_align}>
                    <div className={"shrink grow-0 basis-36 "}  >
                        <Logo />
                    </div>
                    <div className={"min-w-96 shrink grow  px-6"} />
                    <div className={"grow shrink-0 flex max-w-sm "}>
                        <div className={"flex-auto"}>Rent Accomodation By Airbnb</div>
                        <div className={"flex-auto flex relative"}>
                            <AvatarBox />
                        </div>
                    </div>


                </div>
                <SearchComponent />
            </header>
        </div>)
}
export default Header 