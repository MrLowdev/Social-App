import { fetchUser } from "@/lib/serverMethods";
import { User } from "@prisma/client";
import React from "react";
import UserListCard from "../common/UserListCard";

const RightSideBar = async () => {
  const users: Array<User> | [] = await fetchUser();

  return (
    <div className="h-screen border-l-2 lg:w-1/4 lg:pt-5 lg:px-2 xl:p-5 hidden lg:block">
      <div>
        <h1 className="text-2xl font-bold">Suggestion for you</h1>
      </div>
      <div className="mt-5">
        {users.map((item) => (
          <UserListCard key={item.id} user={item} />
        ))}
      </div>
    </div>
  );
};

export default RightSideBar;
