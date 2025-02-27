"use client"
import React from 'react'
import {
    SignInButton,
    SignUpButton,
    SignedIn,
    SignedOut,
    UserButton,
  } from '@clerk/nextjs'

const UserNavs = () => {
  return (
    <div>
         <SignedOut>
        <SignInButton mode="modal" />
      </SignedOut>
      
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  )
}

export default UserNavs