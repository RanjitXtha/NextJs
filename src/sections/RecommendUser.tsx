import { GetUserRecommendations } from '@/actions/useraction';
import FollowButton from '@/components/FollowButton';
import React from 'react'

const RecommendUser = async() => {
    const users = await GetUserRecommendations();
    if(!users){
        return;
    }
    
  return (
    <div>
        <p>Recommeded Users</p>
        {users.map((user)=>(
            <div key={user.id}>
                <p>{user.name}</p>
                <p>{user.email}</p>
                <p>Followers: {user._count.followers}</p>
                <div>
                    <FollowButton userId={user.id} />
                </div>
            </div>
        ))}

       

    </div>
  )
}

export default RecommendUser