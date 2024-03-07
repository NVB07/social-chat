"use client";
import { usePathname, useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/authProvider/AuthProvider";
import { Avatar, Button } from "@nextui-org/react";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";
import { fireStore } from "@/firebase/config";

const User = ({ param }) => {
    const [userData, setUserData] = useState();
    const authUserData = useContext(AuthContext);
    const [isMyAccount, setIsMyAccount] = useState(false);

    const router = useRouter();
    const pathname = usePathname();
    useEffect(() => {
        if (pathname !== "/user/@" + authUserData.uid) {
            setIsMyAccount(false);
        } else {
            setIsMyAccount(true);
        }
    }, []);

    useEffect(() => {
        const q = query(collection(fireStore, "users"), orderBy("createAt", "desc"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const userArray = [];
            querySnapshot.forEach((doc) => {
                userArray.push({ data: doc.data(), id: doc.id });
            });

            const objUser = userArray.find((item) => {
                if ("%40" + item.data.uid === param) {
                    return 1;
                }
            });

            setUserData(objUser);
        });

        return () => unsubscribe();
    }, []);
    if (!authUserData) {
        router.push("/login");
        return;
    }
    return (
        <div className="w-full ">
            <div className="full flex items-start mb-6">
                <div className="w-1/2">
                    <h3 className="text-xl font-bold">{userData?.data.displayName}</h3>
                    <h2 className="text-sm italic mt-2">{userData?.data.email}</h2>
                </div>
                <div className="w-1/2 flex justify-end">
                    <Avatar className="w-20 h-20" src={userData?.data.photoURL} alt="avt" />
                </div>
            </div>
            <Button isDisabled={!isMyAccount} color={isMyAccount ? "primary" : "warning"} className="w-full ">
                Edit profile
            </Button>
            <div className="w-full mt-5 border-b border-[#8f8f8f] p-1 font-semibold">{isMyAccount ? "My blogs" : userData?.data.displayName + "'s blog"}</div>
            <div className="mt-5"></div>
        </div>
    );
};

export default User;
