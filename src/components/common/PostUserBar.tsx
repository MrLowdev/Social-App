import { PostType } from "@/types/type";
import React from "react";
import UserAvatar from "./UserAvatar";
import { formatDate } from "@/lib/utils";
import DeletePostBtn from "../threads/DeletePostBtn";
import { MoreHorizontal } from "lucide-react";

const PostUserBar = ({
  post,
  isAuthPost,
}: {
  post: PostType;
  isAuthPost?: boolean;
}) => {
  return (
    <div className="flex">
      <div>
        <UserAvatar name={post.user.name} image="" />
      </div>
      <div className="flex ml-2 justify-between items-start w-full">
        <p className="font-bold">{post.user.name}</p>
        <div className="flex">
          <span className="mr-4 text-sm">{formatDate(post.created_at)}</span>
          {isAuthPost ? (
            <DeletePostBtn post={post} />
          ) : (
            <MoreHorizontal height={22} width={22} />
          )}
        </div>
      </div>
    </div>
  );
};

export default PostUserBar;
