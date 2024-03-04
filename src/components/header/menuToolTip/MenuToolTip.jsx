import { HiMenuAlt3 } from "react-icons/hi";
import { Popover, PopoverTrigger, PopoverContent, Button } from "@nextui-org/react";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase/config";

import style from "./MenuToolTip.module.scss";
const MenuToolTip = () => {
    const handleSignOut = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error("Lỗi khi đăng xuất", error);
        }
    };
    return (
        <Popover placement="bottom-end">
            <PopoverTrigger>
                <button className={style.menuToolTip}>
                    <HiMenuAlt3 />
                </button>
            </PopoverTrigger>
            <PopoverContent>
                <div className="px-1 py-2">
                    <Button color="danger" className="w-32" onClick={handleSignOut}>
                        Log out
                    </Button>
                </div>
            </PopoverContent>
        </Popover>
    );
};

export default MenuToolTip;
