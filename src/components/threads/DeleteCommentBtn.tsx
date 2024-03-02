"use client";

import { useToast } from "@/hooks/use-toast";
import { CommentType } from "@/types/type";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Trash2 } from "lucide-react";

const DeleteCommentBtn = ({ comment }: { comment: CommentType }) => {
  const { toast } = useToast();
  const router = useRouter();
  const deletePost = () => {
    axios
      .delete(`/api/comment/${comment.id}`)
      .then((res) => {
        const response = res.data;
        if (response.status === 401) {
          toast({
            title: "Error",
            description: "Un-Authorized",
            className: "bg-red-400",
          });
        } else if (response.status === 200) {
          toast({
            title: "Success",
            description: response.message,
            className: "bg-green-400",
          });
          router.refresh();
        }
      })
      .catch((err) => {
        console.log("There is a error", err);
      });
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Trash2
          height={22}
          width={22}
          className="cursor-pointer text-red-400"
        />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            comment and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className="bg-red-400" onClick={deletePost}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteCommentBtn;
