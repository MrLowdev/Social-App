"use client";

import { useToast } from "@/hooks/use-toast";
import { Dialog } from "@radix-ui/react-dialog";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Copy, SendHorizonal } from "lucide-react";
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  LineShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  LinkedinIcon,
} from "next-share";

const ShareModal = ({ url }: { url: string }) => {
  const { toast } = useToast();
  const copyUrl = async () => {
    navigator.clipboard.writeText(url);
    toast({
      title: "Copied!",
      description: "Url Copied successfully!",
      className: "bg-green-500",
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <SendHorizonal width={20} height={20} className="ml-3 cursor-pointer" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Share Post</DialogTitle>
          <DialogDescription>
            <div className="flex rounded-md border justify-between p-5 mt-5">
              <strong>{url}</strong>
              <Copy onClick={copyUrl} className="cursor-pointer" />
            </div>
            <div className="flex items-center space-x-5 mt-5">
              <FacebookShareButton
                url={url}
                quote={"Threads Post."}
                hashtag={"#threads"}
              >
                <FacebookIcon size={32} round />
              </FacebookShareButton>
              <WhatsappShareButton url={url}>
                <WhatsappIcon size={32} round />
              </WhatsappShareButton>
              <LineShareButton url={url}>
                <LinkedinIcon size={32} round />
              </LineShareButton>
              <EmailShareButton url={url}>
                <EmailIcon size={32} round />
              </EmailShareButton>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ShareModal;
