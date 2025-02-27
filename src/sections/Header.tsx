import { RegisterUserToDatabase } from '@/actions/useraction';
import UserNavs from '@/components/UserNavs';
import { currentUser } from '@clerk/nextjs/server';
import React from 'react';

const Header = async() => {
 const user = await currentUser();
 if(user){
  RegisterUserToDatabase();
 }

  return (
    <div>
      <p className='font-extrabold text-red-400'>This is headerr</p>
     <UserNavs />
    </div>
  )
}

export default Header