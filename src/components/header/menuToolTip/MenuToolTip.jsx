import { HiMenuAlt3 } from "react-icons/hi";

import style from "./MenuToolTip.module.scss";
const MenuToolTip = () => {
    return (
        <button className={style.menuToolTip}>
            <HiMenuAlt3 />
        </button>
    );
};

export default MenuToolTip;
