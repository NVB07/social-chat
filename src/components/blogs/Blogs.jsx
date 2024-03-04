"use client";
import Link from "next/link";
import { useState, Fragment, useCallback, useContext } from "react";
import { Button, Image, Spinner, Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
import { RxChatBubble } from "react-icons/rx";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { SlOptions } from "react-icons/sl";

import { deleteDocument, handleReact } from "@/firebase/services";
import style from "./Blogs.module.scss";
import ViewPhoto from "../viewPhoto/ViewPhoto";

const Blogs = ({
    blogid,
    authorid,
    currentUserData,
    liked,
    useURL = "/",
    imageSrc,
    avatar = "/default_avt.jpg",
    username = "null?",
    postTime = "",
    content = "",
    likedCount = 0,
}) => {
    const isAuthor = currentUserData?.uid === authorid;
    const [likePost, setLikePost] = useState(liked);
    const [loading, setLoading] = useState(false);

    const getPathImage = useCallback(() => {
        if (imageSrc) {
            const startIndex = imageSrc.lastIndexOf("/") + 1;
            const endIndex = imageSrc.indexOf("?alt=");
            const encodedImagePath = imageSrc.substring(startIndex, endIndex);

            return decodeURIComponent(encodedImagePath);
        }
        return null;
    });

    // get path image
    const parts = content.split("|~n|");
    const elements = parts.map((part, index) => (
        <Fragment key={index}>
            {part}
            {index < parts.length - 1 && <br />}
        </Fragment>
    ));

    const handleLikePost = useCallback(() => {
        handleReact(blogid, { displayName: currentUserData.displayName, uid: currentUserData.uid, photoURL: currentUserData.photoURL });
        setLikePost((prev) => !prev);
    });

    const handleEdit = useCallback(() => {});

    const handleDelete = useCallback(async () => {
        setLoading(true);
        await deleteDocument("blogs", blogid, getPathImage()).then(() => {
            setLoading(false);
        });
    });

    return (
        <div className={style.blogs}>
            <div className={style.leftBlog}>
                <Link href={useURL}>
                    <div className={style.modalCard}>
                        <Image src={avatar} width={36} height={36} alt="user" />
                    </div>
                </Link>
                <div className={style.blogLine}>
                    <div className={style.line}></div>
                </div>
            </div>
            <div className={style.rightBlog}>
                <div className={style.topBlog}>
                    <Link href={useURL}>{username}</Link>
                    <div className="flex items-center">
                        <div className={style.blogTime}>{postTime}</div>
                        <>
                            {isAuthor ? (
                                <Popover placement="bottom-end">
                                    <PopoverTrigger>
                                        <Button variant="light" size="sm" radius="full" isIconOnly>
                                            <SlOptions color="#444444" />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent>
                                        <div className="px-1 py-2 flex flex-col items-start">
                                            <Button onClick={handleEdit} className="w-full flex justify-start px-2 hover:!bg-transparent " variant="light">
                                                Edit post
                                            </Button>

                                            <Button onClick={handleDelete} className="w-full flex justify-start px-2 hover:!bg-transparent text-red-600" variant="light">
                                                {loading ? <Spinner label="Danger" size="sm" color="danger" labelColor="danger" /> : "Delete post"}
                                            </Button>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            ) : null}
                        </>
                    </div>
                </div>
                <div className={style.content}>{elements}</div>
                <div className={style.blogImage}>
                    {imageSrc ? (
                        <ViewPhoto photoURL={imageSrc}>
                            <Image style={{ width: "100%", height: "auto" }} src={imageSrc} width={1000} height={1000} alt="image" />
                        </ViewPhoto>
                    ) : null}
                </div>
                <div className={style.react}>
                    <div className={style.reactLike}>
                        <button onClick={handleLikePost}>{likePost ? <IoMdHeart color="red" /> : <IoMdHeartEmpty />}</button>
                    </div>
                    <div className={style.reactComment}>
                        <button>
                            <RxChatBubble />
                        </button>
                    </div>
                    <div className={style.reactShare}>
                        <button>
                            <IoPaperPlaneOutline />
                        </button>
                    </div>
                </div>
                <div className={style.countLike}>{likedCount} react</div>
            </div>
        </div>
    );
};

export default Blogs;
