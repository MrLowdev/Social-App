import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "../ui/sheet";
import Image from "next/image";
import Env from "@/config/env";

const ImageViewer = ({ image }: { image: string }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Image
          src={`${Env.APP_URL}/uploads/${image}`}
          alt={`Post_image_${image}`}
          width={100}
          height={100}
          className="w-full rounded-md mt-2 cursor-pointer"
        />
      </SheetTrigger>
      <SheetContent side="bottom" className="w-screen">
        <SheetHeader>Show Image</SheetHeader>
        <SheetDescription className="mb-4 w-full flex justify-center items-center">
          <Image
            src={`${Env.APP_URL}/uploads/${image}`}
            alt={`Post_image_${image}`}
            width={10}
            height={10}
            className="w-full rounded-lg h-[550px] object-contain"
            unoptimized
          />
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
};

export default ImageViewer;
