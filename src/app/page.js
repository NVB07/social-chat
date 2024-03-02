"use client";

import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { Fragment, useLayoutEffect, useState } from "react";
import { auth } from "@/firebase/config";
import Header from "@/components/header/Header";
import styles from "./page.module.css";
import MainContent from "@/components/mainContent/MainContent";

export default function Home() {
    const router = useRouter();
    // const [isLoading, setIsLoading] = useState(true); // State để kiểm soát việc render nội dung
    // useLayoutEffect(() => {
    //     onAuthStateChanged(auth, (user) => {
    //         if (!user) {
    //             router.push("/login");
    //         } else {
    //             setIsLoading(false); // Đánh dấu rằng đã tải xong và có người dùng đăng nhập
    //         }
    //     });
    // }, []);
    const handleSignOut = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error("Lỗi khi đăng xuất", error);
        }
    };

    // Nếu isLoading là true, hiển thị nội dung chờ loading
    // if (isLoading) {
    //     return <div>Loading...</div>;
    // }

    // Nếu đã tải xong và có người dùng đăng nhập, hiển thị nội dung chính
    return (
        <section>
            <Header home />
            <MainContent />
            <button onClick={handleSignOut}>Đăng xuất</button>
        </section>
    );
}
