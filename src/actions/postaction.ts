"use server"
import { prisma } from "@/lib/prisma"
import { GetUserId } from "./useraction"
export const CreateUserPost = async(content:string , image:File | null)=>{

    const userId = await GetUserId();

    if(!userId){
       console.log("Not logged In")
       return;
    }
    console.log(userId);

 const newPost = await prisma.post.create({
    data:{
        content,
        userId,
    }
 })

 if(newPost){
    console.log("Post Created")
}

}

export const GetPosts = async()=>{
   const posts = await prisma.post.findMany({
      orderBy:{
         createdAt:"desc"
      },
      include:{
         user:{
            select:{
               id:true,
               name:true,
               image:true
            }
         },
         comments:{
            include:{
               user:{
                  select:{
                     id:true,
                     name:true,
                     image:true
                  }
               }
            },
            orderBy:{
               createdAt:"asc"
            }
         },
         likes:{
            select:{
               userId:true
            }
         },
         _count:{
            select:{
               comments:true,
               likes:true
            }
         }
      }
   })

   return posts;
}