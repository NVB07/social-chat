"use client";
import Link from "next/link";
import Image from "next/image";
import { useContext, useCallback, useRef, useState } from "react";
import { Spinner, Button, Textarea, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";

import { GoHome, GoHomeFill } from "react-icons/go";
import { FiSearch } from "react-icons/fi";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { IoChatboxEllipsesOutline, IoChatboxEllipses, IoImageOutline, IoClose } from "react-icons/io5";
import { TbUser, TbUserFilled } from "react-icons/tb";
import { addDocument, addFileToStorage } from "@/firebase/services";

import { AuthContext } from "@/authProvider/AuthProvider";

import style from "./NavIcons.module.scss";

const NavIcons = ({ home = false, search = false, newPost = false, chat = false, about = false }) => {
    const data = useContext(AuthContext);
    const inputImageRef = useRef();
    const imagePreviewRef = useRef();

    const [previewImageState, setPreviewImageState] = useState(false);
    const [imageFile, setImageFile] = useState();
    const [postContent, setPostContent] = useState("");
    const [loading, setLoading] = useState(false);

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const handleSelectImage = useCallback(() => {
        inputImageRef.current.click();
    }, []);
    const handleRemoveImage = useCallback(() => {
        if (inputImageRef.current && inputImageRef.current.value) {
            setPreviewImageState(false);
            inputImageRef.current.value = null;
            setImageFile(null);
        }
    }, []);

    const handleCloseModal = useCallback(() => {
        setPostContent("");
        handleRemoveImage();
        onOpenChange();
    });

    const previewImage = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                if (imagePreviewRef.current) {
                    imagePreviewRef.current.src = reader.result;
                    imagePreviewRef.current.style.display = "block";
                }
            };
            setImageFile({ reader: reader, name: file.name });
            reader.readAsDataURL(file);
            setPreviewImageState(true);
        }
    };

    const handleNewPost = async (close) => {
        setLoading(true);
        const formattedContent = postContent.replace(/\n/g, "|~n|");
        await addDocument("blogs", {
            author: {
                displayName: data?.displayName,
                uid: data?.uid,
                photoURL: data?.photoURL,
            },
            post: {
                content: formattedContent,
                imageURL: imageFile ? await addFileToStorage(imageFile.reader?.result, "imagePostBlogs/", imageFile.name) : "",
                reaction: {
                    liked: 0,
                    comments: [
                        {
                            displayName: "",
                            uid: "",
                            photoURL: "",
                            comment: "",
                            liked: false,
                        },
                    ],
                },
            },
        }).then(() => {
            setLoading(false);
            handleCloseModal();
            close();
        });
    };

    return (
        <nav className={style.navIcons}>
            <Link scroll={false} className={style.navLink} href={"/"} style={home ? { color: "black" } : { color: "#b8b8b8" }}>
                {home ? <GoHomeFill /> : <GoHome />}
            </Link>
            <Link scroll={false} className={style.navLink} href={"/search"} style={search ? { color: "black" } : { color: "#b8b8b8" }}>
                <FiSearch />
            </Link>
            <Button onPress={onOpen} className={style.navLink} style={newPost ? { color: "black" } : { color: "#b8b8b8" }}>
                <HiOutlinePencilSquare />
            </Button>
            <Modal
                isOpen={isOpen}
                onOpenChange={handleCloseModal}
                size="xl"
                placement={"center"}
                scrollBehavior="inside"
                hideCloseButton
                motionProps={{
                    variants: {
                        enter: {
                            y: 0,
                            opacity: 1,
                            transition: {
                                duration: 0.3,
                                ease: "easeOut",
                            },
                        },
                        exit: {
                            y: -20,
                            opacity: 0,
                            transition: {
                                duration: 0.2,
                                ease: "easeIn",
                            },
                        },
                    },
                }}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">New post</ModalHeader>
                            <ModalBody>
                                <div className="w-full flex">
                                    <div className="flex flex-col items-center w-10 mr-2">
                                        <Image className=" w-9 h-9 rounded-full" width={60} height={60} alt={data?.displayName} src={data?.photoURL} />
                                        <div className="w-[2px] h-full bg-[#e5e5e5] relative after:content-[''] after:bg-[#e5e5e5] after:-translate-x-1/2 after:left-1/2 after:absolute after:w-3 after:h-3 after:rounded-full after:top-full"></div>
                                    </div>
                                    <div className="flex flex-col w-full">
                                        <b>{data?.displayName}</b>
                                        <Textarea
                                            size="lg"
                                            onChange={(e) => setPostContent(e.target.value.trim())}
                                            placeholder="Create new post"
                                            className="w-full mt-2 text-base"
                                        />

                                        {previewImageState ? (
                                            <div className="w-[300px] p-3 relative">
                                                <Button
                                                    onClick={handleRemoveImage}
                                                    isIconOnly
                                                    size="sm"
                                                    radius="full"
                                                    color="danger"
                                                    variant="faded"
                                                    className="text-lg mt-1 absolute top-0 right-0"
                                                    aria-label="remove photo"
                                                >
                                                    <IoClose />
                                                </Button>
                                                <img className="w-full h-auto" src="#" alt="preview-image" ref={imagePreviewRef} />
                                            </div>
                                        ) : null}

                                        <Button
                                            onClick={handleSelectImage}
                                            isIconOnly
                                            size="sm"
                                            radius="full"
                                            color="secondary"
                                            variant="faded"
                                            className="text-lg mt-1"
                                            aria-label="Take a photo"
                                        >
                                            <IoImageOutline />
                                        </Button>
                                        <input ref={inputImageRef} type="file" accept="image/*" hidden onChange={previewImage} />
                                    </div>
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button isDisabled={loading} color="danger" onPress={onClose}>
                                    Cancel
                                </Button>
                                <Button isDisabled={postContent && !loading ? false : true} color="primary" onClick={() => handleNewPost(onClose)}>
                                    {loading ? <Spinner size="sm" color="warning" /> : "Post"}
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
            <Link scroll={false} className={style.navLink} href={"/"} style={chat ? { color: "black" } : { color: "#b8b8b8" }}>
                {chat ? <IoChatboxEllipses /> : <IoChatboxEllipsesOutline />}
            </Link>
            <Link scroll={false} className={style.navLink} href={"/user/@" + data?.uid} style={about ? { color: "black" } : { color: "#b8b8b8" }}>
                {about ? <TbUserFilled /> : <TbUser />}
            </Link>
        </nav>
    );
};

export default NavIcons;
