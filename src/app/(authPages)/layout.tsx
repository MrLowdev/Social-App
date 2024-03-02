import CustomProvider from "@/provider/CustomProvider";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Auth Page",
  description: "The Threads app Auth pages.",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <CustomProvider>{children}</CustomProvider>;
}
