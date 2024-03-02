import DynamicNavBar from "@/components/common/DynamicNavBar";
import UserListCard from "@/components/common/UserListCard";
import ExploreSearchBar from "@/components/explore/ExploreSearchBar";
import { searchUser } from "@/lib/serverMethods";
import { User } from "@prisma/client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Explore",
  description: "Search users here and show there profile...",
};

const Explore = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const user: Array<User> | [] = await searchUser(searchParams?.query!);
  return (
    <div>
      <DynamicNavBar title="Explore" />
      <ExploreSearchBar />
      <div className="mt-5">
        {user?.length > 0 &&
          user.map((item) => <UserListCard user={item} key={item.id} />)}
        {user?.length < 1 && searchParams?.query?.length! > 1 && (
          <div className="text-center">
            <h1 className="font-bold">No User found</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default Explore;
