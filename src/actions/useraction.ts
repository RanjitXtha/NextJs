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