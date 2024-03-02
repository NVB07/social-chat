"use client";
import { auth } from "@/firebase/config";
import { useState, useEffect, createContext } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter, usePathname } from "next/navigation";
import { NextUIProvider } from "@nextui-org/react";

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
                if (pathname === "/login") {
                    router.push("/");
                }
            } else {
                setIsLoading(false);
                setUserData(null);
                router.push("/login");
            }
        });
        return () => unsubscribe();
    }, [pathname]);

    return (
        <AuthContext.Provider value={userData}>
            {isLoading ? <div>Loading...</div> : <NextUIProvider>{children}</NextUIProvider>}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
