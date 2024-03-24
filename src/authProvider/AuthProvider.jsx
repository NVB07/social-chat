"use client";
import { auth } from "@/firebase/config";
import { useState, useEffect, createContext } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter, usePathname } from "next/navigation";
import { NextUIProvider } from "@nextui-org/react";
import Loading from "@/components/loading/Loading";
import Login from "@/components/pages/login/Login";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [userData, setUserData] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const { displayName, email, uid, photoURL } = user;
                setUserData({ displayName, email, uid, photoURL });
                setIsLoading(false);
            } else {
                setIsLoading(false);
                setUserData(null);
                router.push("/");
            }
        });
        return () => unsubscribe();
    }, [pathname]);

    return <AuthContext.Provider value={userData}>{isLoading ? <Loading /> : userData ? <NextUIProvider>{children}</NextUIProvider> : <Login />}</AuthContext.Provider>;
};

export default AuthProvider;
