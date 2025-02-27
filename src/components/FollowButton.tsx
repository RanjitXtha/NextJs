"use client";
import { ToggleFollow } from '@/actions/useraction';
import React from 'react'

const FollowButton = ({userId}:{userId:string}) => {
    const handleFollow = ()=>{
        try{
            ToggleFollow(userId);
        }catch(err){
            console.log(err);
        }
       
    }
  return (
    <div>
        <button onClick={handleFollow}>Follow</button>
    </div>
  )
}

export default FollowButton