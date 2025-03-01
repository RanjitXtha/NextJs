"use client";
import { GetPosts } from '@/actions/postaction';
import React from 'react'

type Posts = Awaited<ReturnType<typeof GetPosts>>;
type Post = Posts[number];

const PostCard = ({post , userId}:{post:Post,userId:string}) => {
    console.log(post);

    const handleLike = async()=>{

    }
  return (
    <div>
        <p>{post.content}</p>
        <p>By: {post.user.name}</p>
        <p>Comments: {post._count.comments}</p>
        <p>Likes: {post._count.likes }</p>
        
    </div>
  )
}

export default PostCard