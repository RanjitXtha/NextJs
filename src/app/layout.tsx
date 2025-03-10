import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import './globals.css';
import React from "react";
import Header from "@/sections/Header";
import Sidebar from "@/sections/Sidebar";
import { ClerkProvider } from "@clerk/nextjs";
import RecommendUser from "@/sections/RecommendUser";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body
        className={` ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
       
        <div className="pt-[4rem]">
    
          <Sidebar />
          <main>
            {children}
          </main>
          <RecommendUser />
        </div>
        
      </body>
    </html>
    </ClerkProvider>
  );
}
