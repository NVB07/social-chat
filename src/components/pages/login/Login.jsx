"use client";
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { useContext } from "react";
import { addDoc, collection } from "firebase/firestore";
import { auth, fireStore } from "@/firebase/config";
import { addDocument } from "@/firebase/services";
import { FaGoogle, FaGithub, FaFacebook } from "react-icons/fa";
import BrandLogo from "@/components/header/brandLogo/BrandLogo";

import { AuthContext } from "@/authProvider/AuthProvider";

const Login = () => {
    const data = useContext(AuthContext);

    const handleGoogleSignUp = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const userCredential = await signInWithPopup(auth, provider);
            // Thực hiện các hành động sau khi đăng ký bằng Google thành công, ví dụ: chuyển hướng, hiển thị thông báo thành công, vv.
            if (userCredential._tokenResponse?.isNewUser) {
                await addDocument("users", {
                    displayName: userCredential.user.displayName,
                    email: userCredential.user.email,
                    photoURL: userCredential.user.photoURL,
                    uid: userCredential.user.uid,
                    providerId: userCredential.user.providerId,
                });
            }
            console.log(userCredential);
        } catch (error) {
            // Xử lý lỗi đăng ký bằng Google, ví dụ: hiển thị thông báo lỗi, đặt state lỗi, vv.
            console.error("Lỗi đăng ký bằng Google", error);
        }
    };
    const handleGithubSignUp = async () => {
        alert("chức năng đang được phát triển");
        // try {
        //     const provider = new GoogleAuthProvider();
        //     const userCredential = await signInWithPopup(auth, provider);
        //     // Thực hiện các hành động sau khi đăng ký bằng Google thành công, ví dụ: chuyển hướng, hiển thị thông báo thành công, vv.
        //     if (userCredential._tokenResponse?.isNewUser) {
        //         await addDocument("users", {
        //             displayName: userCredential.user.displayName,
        //             email: userCredential.user.email,
        //             photoURL: userCredential.user.photoURL,
        //             uid: userCredential.user.uid,
        //             providerId: userCredential.user.providerId,
        //         });
        //     }
        //     console.log(userCredential);
        // } catch (error) {
        //     // Xử lý lỗi đăng ký bằng Google, ví dụ: hiển thị thông báo lỗi, đặt state lỗi, vv.
        //     console.error("Lỗi đăng ký bằng Google", error);
        // }
    };

    const handleFacebookSignUp = async () => {
        alert("chức năng đang được phát triển");
        // try {
        //     const provider = new GoogleAuthProvider();
        //     const userCredential = await signInWithPopup(auth, provider);
        //     // Thực hiện các hành động sau khi đăng ký bằng Google thành công, ví dụ: chuyển hướng, hiển thị thông báo thành công, vv.
        //     if (userCredential._tokenResponse?.isNewUser) {
        //         await addDocument("users", {
        //             displayName: userCredential.user.displayName,
        //             email: userCredential.user.email,
        //             photoURL: userCredential.user.photoURL,
        //             uid: userCredential.user.uid,
        //             providerId: userCredential.user.providerId,
        //         });
        //     }
        //     console.log(userCredential);
        // } catch (error) {
        //     // Xử lý lỗi đăng ký bằng Google, ví dụ: hiển thị thông báo lỗi, đặt state lỗi, vv.
        //     console.error("Lỗi đăng ký bằng Google", error);
        // }
    };
    // const handleSignOut = async () => {
    //     try {
    //         await signOut(auth);
    //         setUserInformation(null);
    //     } catch (error) {
    //         console.error("Lỗi khi đăng xuất", error);
    //     }
    // };
    // if (data) {
    //     return <div>loading...</div>;
    // }

    return (
        <div className="w-full h-screen flex items-center justify-center ">
            <div className="W-full max-w-[500px] p-4 pb-6 flex flex-col items-center bg-[#ffffffc2] rounded-2xl ">
                <div className="flex flex-col items-center pb-7">
                    <BrandLogo width="100" height="100" />
                    <h2 className="text-3xl font-semibold text-[#4e4e4e] text-center">
                        Login to continue to <span className="text-[#0d9b00] text-4xl inline-block mt-3 font-bold text-nowrap">Social Chat</span>
                    </h2>
                </div>

                <button
                    className="mb-2 relative w-full transition-shadow hover:shadow hover:shadow-black max-w-[300px] flex font-medium items-center justify-center border border-[#525252] border-solid rounded-full p-2"
                    onClick={handleGoogleSignUp}
                >
                    <svg
                        className="absolute top1/2 left-2"
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        preserveAspectRatio="xMidYMid"
                        viewBox="0 0 256 262"
                        id="google"
                    >
                        <path
                            fill="#4285F4"
                            d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                        ></path>
                        <path
                            fill="#34A853"
                            d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                        ></path>
                        <path
                            fill="#FBBC05"
                            d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
                        ></path>
                        <path
                            fill="#EB4335"
                            d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                        ></path>
                    </svg>
                    Đăng nhập bằng <b className="mx-1">Google</b>
                </button>
                <button
                    className="mb-2 relative transition-shadow hover:shadow hover:shadow-black w-full max-w-[300px] flex font-medium items-center justify-center border border-[#525252] border-solid rounded-full p-2"
                    onClick={handleGithubSignUp}
                >
                    <svg className="absolute top1/2 left-2" width={18} height={18} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" id="github">
                        <g fill="#181616">
                            <path
                                fill-rule="evenodd"
                                d="M64 5.103c-33.347 0-60.388 27.035-60.388 60.388 0 26.682 17.303 49.317 41.297 57.303 3.017.56 4.125-1.31 4.125-2.905 0-1.44-.056-6.197-.082-11.243-16.8 3.653-20.345-7.125-20.345-7.125-2.747-6.98-6.705-8.836-6.705-8.836-5.48-3.748.413-3.67.413-3.67 6.063.425 9.257 6.223 9.257 6.223 5.386 9.23 14.127 6.562 17.573 5.02.542-3.903 2.107-6.568 3.834-8.076-13.413-1.525-27.514-6.704-27.514-29.843 0-6.593 2.36-11.98 6.223-16.21-.628-1.52-2.695-7.662.584-15.98 0 0 5.07-1.623 16.61 6.19C53.7 35 58.867 34.327 64 34.304c5.13.023 10.3.694 15.127 2.033 11.526-7.813 16.59-6.19 16.59-6.19 3.287 8.317 1.22 14.46.593 15.98 3.872 4.23 6.215 9.617 6.215 16.21 0 23.194-14.127 28.3-27.574 29.796 2.167 1.874 4.097 5.55 4.097 11.183 0 8.08-.07 14.583-.07 16.572 0 1.607 1.088 3.49 4.148 2.897 23.98-7.994 41.263-30.622 41.263-57.294C124.388 32.14 97.35 5.104 64 5.104z"
                                clip-rule="evenodd"
                            ></path>
                            <path d="M26.484 91.806c-.133.3-.605.39-1.035.185-.44-.196-.685-.605-.543-.906.13-.31.603-.395 1.04-.188.44.197.69.61.537.91zm-.743-.55M28.93 94.535c-.287.267-.85.143-1.232-.28-.396-.42-.47-.983-.177-1.254.298-.266.844-.14 1.24.28.394.426.472.984.17 1.255zm-.575-.618M31.312 98.012c-.37.258-.976.017-1.35-.52-.37-.538-.37-1.183.01-1.44.373-.258.97-.025 1.35.507.368.545.368 1.19-.01 1.452zm0 0M34.573 101.373c-.33.365-1.036.267-1.552-.23-.527-.487-.674-1.18-.343-1.544.336-.366 1.045-.264 1.564.23.527.486.686 1.18.333 1.543zm0 0M39.073 103.324c-.147.473-.825.688-1.51.486-.683-.207-1.13-.76-.99-1.238.14-.477.823-.7 1.512-.485.683.206 1.13.756.988 1.237zm0 0M44.016 103.685c.017.498-.563.91-1.28.92-.723.017-1.308-.387-1.315-.877 0-.503.568-.91 1.29-.924.717-.013 1.306.387 1.306.88zm0 0M48.614 102.903c.086.485-.413.984-1.126 1.117-.7.13-1.35-.172-1.44-.653-.086-.498.422-.997 1.122-1.126.714-.123 1.354.17 1.444.663zm0 0"></path>
                        </g>
                    </svg>
                    Đăng nhập bằng <b className="mx-1">Github</b>
                </button>
                <button
                    className="mb-2 relative transition-shadow hover:shadow hover:shadow-black w-full max-w-[300px] flex font-medium items-center justify-center border border-[#525252] border-solid rounded-full p-2"
                    onClick={handleFacebookSignUp}
                >
                    <svg
                        className="absolute top1/2 left-2"
                        xmlns="http://www.w3.org/2000/svg"
                        width={18}
                        height={18}
                        enable-background="new 0 0 100 100"
                        viewBox="0 0 100 100"
                        id="facebook"
                    >
                        <g>
                            <path fill="#1877f2" d="M50,2.5c-58.892,1.725-64.898,84.363-7.46,95l0,0h0H50h7.46l0,0C114.911,86.853,108.879,4.219,50,2.5z"></path>
                            <path
                                fill="#f1f1f1"
                                d="M57.46,64.104h11.125l2.117-13.814H57.46v-8.965c0-3.779,1.85-7.463,7.781-7.463h6.021
			c0,0,0-11.761,0-11.761c-12.894-2.323-28.385-1.616-28.722,17.66V50.29H30.417v13.814H42.54c0,0,0,33.395,0,33.396H50h7.46l0,0h0
			V64.104z"
                            ></path>
                        </g>
                    </svg>
                    Đăng nhập bằng <b className="mx-1">Facebook</b>
                </button>
                <p className="text-xs w-full max-w-[300px] text-center mt-4">Your continued use of this website means you agree to use my services.</p>
            </div>
        </div>
    );
};

export default Login;
