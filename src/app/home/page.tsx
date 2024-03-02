import Loading from "@/components/common/Loading";
import PostCard from "@/components/common/PostCard";
import AddThread from "@/components/threads/AddThread";
import { fetchPost } from "@/lib/serverMethods";
import { PostType } from "@/types/type";
import Image from "next/image";
import React, { Suspense } from "react";

const Home = async () => {
  const posts: Array<PostType> | [] = await fetchPost(1);
  return (
    <div>
      <div className="flex justify-center items-center">
        <Image
          src="/images/logo.svg"
          priority={true}
          width={50}
          height={50}
          alt="logo"
          className="hidden md:block"
        />
      </div>
      <AddThread />
      <Suspense fallback={<Loading />}>
        <div className="mt-10">
          {posts.map((item) => (
            <PostCard post={item} key={item.id} />
          ))}
        </div>
      </Suspense>
    </div>
  );
};

export default Home;
