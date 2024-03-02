import AuthForm from "@/components/auth/AuthForm";
import Loading from "@/components/common/Loading";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

export default function Login() {
  return (
    <div className="bg-background">
      <div className=" h-screen w-screen flex justify-center items-center">
        <div className="w-full mx-2 md:w-1/3 md:mx-0 bg-muted p-6 rounded-lg">
          <div className="flex justify-center">
            <Image
              property="40"
              src="/images/logo.svg"
              width={50}
              height={50}
              alt="Logo"
            />
          </div>
          <Suspense fallback={<Loading />}>
            <AuthForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
