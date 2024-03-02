import CommentCard from "@/components/common/CommentCard";
import DynamicNavBar from "@/components/common/DynamicNavBar";
import PostCard from "@/components/common/PostCard";
import { fetchPostById } from "@/lib/serverMethods";
import { CommentType } from "@/types/type";
import React from "react";

const Post = async ({ params }: { params: { id: string } }) => {
  const post = await fetchPostById(params.id);
  return (
    <div>
      <DynamicNavBar title="Show Post" />
      {post && (
        <div className="mt-7">
          <PostCard post={post} noRedirect={true} />
        </div>
      )}

      <div className="mt-5">
        <h1 className="font-bold text-lg mb-5">Comments</h1>
        {post?.comment ? (
          <div>
            {post.comment.map((item: CommentType) => {
              <CommentCard comment={item} key={item.id} />;
            })}
          </div>
        ) : (
          <div>No Comments Found</div>
        )}{" "}
      </div>
    </div>
  );
};

export default Post;
