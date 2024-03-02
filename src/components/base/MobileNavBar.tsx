"use client";

import { Menu, User2 } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import Image from "next/image";
import Link from "next/link";
import SideBarLink from "../common/SideBarLink";

const MobileNavBar = () => {
  return (
    <nav className="md:hidden flex justify-between items-center">
      <div className="flex items-center">
        <Sheet>
          <SheetTrigger>
            <Menu height={30} width={30} className="font-bold" />
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>
                <div className="flex justify-start items-center">
                  <Image
                    src="/images/logo.svg"
                    width={50}
                    height={50}
                    alt="logo"
                  />
                </div>
              </SheetTitle>
              <SheetDescription>
                <SideBarLink />
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
      <div>
        <Image src="/images/logo.svg" width={30} height={30} alt="Logo" />
      </div>
      <Link href="/profile">
        <User2 height={25} width={25} />
      </Link>
    </nav>
  );
};

export default MobileNavBar;
