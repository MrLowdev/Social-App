import { User } from "@prisma/client";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/Button";
import UserAvatar from "./UserAvatar";

const UserListCard = ({ user }: { user: User }) => {
  return (
    <div className="w-full shadow-sm p-4 rounded-md mb-3">
      <div className="flex">
        <UserAvatar name={user.name} image={user.image as string} />
        <div className="flex justify-between items-start w-full">
          <div className="flex flex-col">
            <strong className="text-md font-bold ml-2">{user.name}</strong>
            <span className="ml-2 font-light text-xs">@{user.username}</span>
          </div>
          <Link href={`/home/user/${user.id}`}>
            <Button size="sm">view</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserListCard;
