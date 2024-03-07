"use client";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";
import { fireStore } from "@/firebase/config";
import { Card, Skeleton } from "@nextui-org/react";
import { useEffect, useState, useCallback, useContext } from "react";

import { AuthContext } from "@/authProvider/AuthProvider";
import Blogs from "../blogs/Blogs";
import style from "./MainContent.module.scss";

const MainContent = () => {
    const currentUserData = useContext(AuthContext);

    const [posts, setPosts] = useState([]);

    const handleConvertDate = useCallback((timestamp) => {
        if (timestamp) {
            const date = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);

            const year = date.getFullYear();
            const month = date.getMonth() + 1;
            const day = date.getDate();
            const hours = date.getHours();
            const minutes = date.getMinutes();
            const time = `${hours}:${minutes} | ${day}/${month}/${year}`;

            return time;
        }
        return "?";
    });

    useEffect(() => {
        const q = query(collection(fireStore, "blogs"), orderBy("createAt", "desc"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const postsArray = [];
            querySnapshot.forEach((doc) => {
                postsArray.push({ data: doc.data(), id: doc.id });
            });
            setPosts(postsArray);
        });

        return () => unsubscribe();
    }, []);

    if (posts.length === 0) {
        return (
            <main className={style.main}>
                <div className={style.block}>
                    <div className="w-[620px]  flex " radius="lg">
                        <div className="w-12">
                            <Skeleton className="w-9 h-9 rounded-full"></Skeleton>
                        </div>
                        <div className="flex-1 ">
                            <div className="space-y-2 mb-2">
                                <Skeleton className="w-36 h-5 rounded-lg"></Skeleton>
                                <Skeleton className="w-4/5 rounded-lg">
                                    <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
                                </Skeleton>
                                <Skeleton className="w-2/5 rounded-lg">
                                    <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
                                </Skeleton>
                                <Skeleton className="w-2/6 rounded-lg">
                                    <div className="h-3 w-2/6 rounded-lg bg-default-300"></div>
                                </Skeleton>
                            </div>
                            <Skeleton className="rounded-lg">
                                <div className="h-60 rounded-lg bg-default-300"></div>
                            </Skeleton>
                        </div>
                    </div>
                </div>
            </main>
        );
    }
    return (
        <main className={style.main}>
            <div className={style.block}>
                {posts.map((post) => {
                    return (
                        <Blogs
                            key={post.id}
                            currentUserData={currentUserData}
                            blogid={post.id}
                            authorid={post?.data.author.uid}
                            liked={
                                post?.data.post.reaction.comments.findIndex((item) => {
                                    return item.uid === currentUserData?.uid && item.liked === true;
                                }) !== -1
                            }
                            useURL={"/user/@" + post?.data.author.uid}
                            avatar={post?.data.author.photoURL}
                            username={post?.data.author.displayName}
                            postTime={handleConvertDate(post?.data.createAt)}
                            content={post?.data.post.content}
                            imageSrc={post?.data.post.imageURL}
                            likedCount={post?.data.post.reaction.liked}
                        />
                    );
                })}
            </div>
        </main>
    );
};

export default MainContent;
