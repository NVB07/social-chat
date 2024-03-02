import Link from "next/link";
import style from "./Header.module.scss";
import BrandLogo from "./brandLogo/BrandLogo";
import MenuToolTip from "./menuToolTip/MenuToolTip";
import NavIcons from "./navIcons/NavIcons";

const Header = ({ home = false, search = false, newPost = false, chat = false, about = false }) => {
    return (
        <header className={style.header}>
            <div className={style.headerWraper}>
                <div className={style.brand}>
                    <Link href={"/"}>
                        <BrandLogo color="black" />
                    </Link>
                </div>
                <NavIcons home={home} search={search} newPost={newPost} chat={chat} about={about} />
                <MenuToolTip />
            </div>
        </header>
    );
};

export default Header;
