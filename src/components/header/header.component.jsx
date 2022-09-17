import { Link, Outlet } from "react-router-dom"
import s from './header.module.css';

const Header = () => {
    return (
        <>
            <header className={s.headerContainer}>
                <span className={s.links}><Link to='/menu/drinks'>Напитки</Link></span>
                <span className={s.links}><Link to='/menu/food'>Еда</Link></span>
                <span className={s.links}><Link to='/'>Дополнительно</Link></span>
            </header>
            <Outlet />
        </>
    )

}

export default Header;