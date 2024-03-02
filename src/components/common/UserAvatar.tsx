import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const UserAvatar = ({ name, image }: { name: string; image?: string }) => {
  return (
    <Avatar>
      <AvatarImage src={image} className="object-cover" />
      <AvatarFallback>{name[0].toUpperCase()}</AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
