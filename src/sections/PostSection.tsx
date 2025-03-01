import { GetPosts } from '@/actions/postaction'
import { GetUserId } from '@/actions/useraction';
import PostCard from '@/components/PostCard';
import React from 'react'

const PostSection = async() => {
    const userId = await GetUserId();
    if(!userId){
        return;
    }

    const posts = await GetPosts();
    if(!posts){
        return;
    }
  return (
    <div>
        <p>Posts</p>
        {posts.map((post)=>(
          <PostCard post={post} userId = {userId} />
        ))}
    </div>
  )
}

export default PostSection