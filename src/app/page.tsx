import CreatePost from "@/sections/CreatePost";
import PostSection from "@/sections/PostSection";
import Image from "next/image";
import "./globals.css";

export default function Home() {
  return (
    <div>
     Home page
     <CreatePost />
     <PostSection />

    </div>
  );
}
