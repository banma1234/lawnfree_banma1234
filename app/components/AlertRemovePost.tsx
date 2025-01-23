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
} from "@/ui/shadCn/alert-dialog";
import { toast } from "@/app/utils/hooks/use-toast";
import { usePostStateRemove } from "@/app/utils/hooks/store/usePostStore";
import { handleSVG } from "../utils/handleSVG";

export default function AlertRemovePost(props: { postId: number }) {
  const removePostById = usePostStateRemove();

  const removeTargetPost = (postId: number) => {
    removePostById(postId);
    toast({ title: "포스트가 삭제되었습니다" });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild className="ml-1.5 hover:text-stone-700">
        {handleSVG("delete", "18")}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>해당 포스트를 삭제하시겠습니까?</AlertDialogTitle>
          <AlertDialogDescription>
            삭제한 포스트는 다시 되돌릴 수 없습니다.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>취소</AlertDialogCancel>
          <AlertDialogAction
            className="bg-purple-600 hover:bg-purple-800"
            onClick={() => {
              removeTargetPost(props.postId);
            }}
          >
            확인
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
