import BaseComponent from "@/components/base/BaseComponent";
import { Toaster } from "@/components/ui/Toaster";
import CustomProvider from "@/provider/CustomProvider";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Threads App",
  description: "The Threads app to share your thoughts and much more.",
};

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CustomProvider>
      <BaseComponent> {children}</BaseComponent>
      <Toaster />
    </CustomProvider>
  );
}
