"use client";
import { useState, useEffect } from "react";
const BgLogin = ({ children }) => {
    const [imageData, setImageData] = useState(null);

    useEffect(() => {
        const savedImageData = localStorage.getItem("loginImage");
        if (savedImageData) {
            setImageData(savedImageData);
        } else {
            const image = new Image();
            image.src = "/w11.jpg";
            image.onload = () => {
                const canvas = document.createElement("canvas");
                canvas.width = image.width;
                canvas.height = image.height;

                const context = canvas.getContext("2d");
                context.drawImage(image, 0, 0);

                const base64ImageData = canvas.toDataURL("image/jpeg");
                localStorage.setItem("loginImage", base64ImageData);
                setImageData(base64ImageData);
            };
        }
    }, []);
    return (
        <div className="w-full h-screen bg-login-image bg-center bg-cover font-mono" style={{ backgroundImage: `url(${imageData})` }}>
            {children}
        </div>
    );
};

export default BgLogin;
