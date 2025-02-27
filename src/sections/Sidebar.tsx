import { GetUserFromDatabase } from '@/actions/useraction';
import { auth, currentUser } from '@clerk/nextjs/server';
import React from 'react'
import Image from 'next/image';

const Sidebar = async() => {
  const {userId} = await auth();
  if(!userId){
    return(
      <div>
        User not Logged In
      </div>
    )
  }

  const currentUser = await GetUserFromDatabase(userId);
  if(!currentUser){
    return
  }
  console.log(currentUser);
  return (
    <div>
        <p>{currentUser.name}</p>
        <p>{currentUser.email}</p>
        <p>{currentUser.bio}</p>
        <p>{currentUser.website}</p>
        <p>{currentUser.location}</p>
        <p>Followers: {currentUser._count.followers}</p>
        <p>Following: {currentUser._count.following}</p>
        <div className='relative'>
          <Image src={currentUser.image??""} alt="profile-pic" width={50} height={50} />
        </div>
    </div>
  )
}

export default Sidebar