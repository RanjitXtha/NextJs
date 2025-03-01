import { RegisterUserToDatabase } from '@/actions/useraction';
import UserNavs from '@/components/UserNavs';
import { currentUser } from '@clerk/nextjs/server';
import React from 'react';
import '../app/globals.css';
import { IoSearch } from "react-icons/io5";
import { AiFillHome } from "react-icons/ai";
import { FaBell } from "react-icons/fa6";
import { FaUserFriends } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa";

const Header = async() => {
 const user = await currentUser();
 if(user){
  RegisterUserToDatabase();
 }

  return (
    <div className='fixed w-full grid grid-cols-2 px-[2rem] items-center bg-[#f4f1f2] py-[0.5rem] '>
      <div className='flex gap-3'>
        <p>Social App</p>
        <span className='px-2 py-1 rounded-lg bg-white flex items-center'>
          <button><IoSearch /></button>
          <input type="text" className='bg-transparent pl-2'  placeholder="Search" />
          
        </span>
      </div>

      <div className='flex gap-6 justify-end text-xl items-center'>
        <nav><AiFillHome /></nav>
        <nav><FaBell /> </nav>
        <nav><FaUserFriends /> </nav>
        <nav className='flex gap-2'>
          <UserNavs />
          <p className='text-sm font-semibold flex items-center gap-2'> {user?.fullName}<FaAngleDown /> </p>
  
        </nav>
      </div>
   
    </div>
  )
}

export default Header