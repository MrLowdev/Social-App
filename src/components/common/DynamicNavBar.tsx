"use client";
import { MoveLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const DynamicNavBar = ({ title }: { title: string }) => {
  const router = useRouter();
  return (
    <div>
      <div className="flex space-x-10">
        <MoveLeft onClick={() => router.back()} className="cursor-pointer" />
        <h1 className="text-xl font-bold">{title}</h1>
      </div>
    </div>
  );
};

export default DynamicNavBar;
