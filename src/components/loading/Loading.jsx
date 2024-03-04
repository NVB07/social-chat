"use client";
import { Progress } from "@nextui-org/react";
import BrandLogo from "../header/brandLogo/BrandLogo";

const Loading = () => {
    return (
        <div className="w-full h-screen flex flex-col items-center justify-center bg-black">
            <BrandLogo color="#fff" />
            <Progress size="sm" isIndeterminate aria-label="Loading..." className="max-w-80 mt-4" />
        </div>
    );
};

export default Loading;
