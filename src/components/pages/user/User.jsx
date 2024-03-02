"use client";
import Link from "next/link";
import { notFound, usePathname } from "next/navigation";
import { useContext } from "react";
import { AuthContext } from "@/authProvider/AuthProvider";

const User = () => {
    const data = useContext(AuthContext);
    const pathname = usePathname();
    if (pathname !== "/user/@" + data.uid) {
        notFound();
    }
    return (
        <div>
            <h1>Dynamic Route Page</h1>
            <h2>name : {data.displayName}</h2>
            <img src={data.photoURL} alt="avt" width={300} height={300} />
            <p>email : {data.email}</p>
            <p>uid : {data.uid}</p>
            <Link style={{ color: "blue" }} href={"/"}>
                home
            </Link>
        </div>
    );
};

export default User;
