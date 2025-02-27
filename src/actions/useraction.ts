"use server"
import { prisma } from '@/lib/prisma';
import { auth, currentUser } from '@clerk/nextjs/server';

export const RegisterUserToDatabase =async()=>{
    const user = await currentUser();
    const {userId} = await auth();
  
    if(!user || !userId){
      console.log("No user found");
      return
    }

  
    const existingUser = await prisma.user.findUnique({
      where:{
        clerkId: userId
      }
    })
  
    if(existingUser){
      console.log("User already exists");
      return;
    }
  
    const newUser = await prisma.user.create({
      data:{
        clerkId: userId,
        email: user.emailAddresses[0].emailAddress,
        name: user.fullName??  user.firstName + " " + user.lastName,
        image: user.imageUrl
      }
    })
}

export const GetUserFromDatabase = async(userId:string)=>{

    const user_ = await prisma.user.findUnique({
        where:{
            clerkId: userId
        },
        include:{
            _count:{
                select:{
                    followers:true,
                    following:true,
                    posts:true
            },
        },
    }
})
    return user_;

}

export const GetUserId = async()=>{
    const {userId} = await auth();
    if(!userId) return;
     
    const dbId = await prisma.user.findUnique({
      where:{
        clerkId: userId
      }
    })

    if(!dbId) return;

    return dbId.id;
}


export const GetUserRecommendations = async()=>{
  const userId = await GetUserId();
  if(!userId) return;

  const users = await prisma.user.findMany({
    where:{
      AND:[
        {NOT:{
          id:userId
        }},
        {
          NOT:{
            followers:{
              some:{
                followerId:userId
              }
            }
          }
        }
      ]
    },
    select:{
      id:true,
      name:true,
      image:true,
      email:true,
      _count:{
        select:{
          followers:true,
        }
      }
    },
    take:3
  })

  return users;
}

export const ToggleFollow = async(sentId:string)=>{
  const userId = await GetUserId();
  if(!userId) return;
  if(userId === sentId) return; //so we dont follow ourselves

  const alreadyFollowed = await prisma.follow.findUnique({
    where:{
      followerId_followingId:{
        followerId:userId,
        followingId:sentId
      }
    }
  })

  if(alreadyFollowed){
    await prisma.follow.delete({
      where:{
        followerId_followingId:{
          followerId:userId,
          followingId:sentId
        }
      }
    })
  }else{
    await prisma.$transaction([
      prisma.follow.create({
        data:{
          followerId:userId,
          followingId:sentId
        }
      }),
      prisma.notification.create({
        data:{
          type:"FOLLOW",
          userId:sentId,
          creatorId:userId,
        }
      })
    ])
  }

  console.log("Follow Toggled");

}