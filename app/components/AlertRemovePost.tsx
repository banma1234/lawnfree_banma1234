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

export default function AlertRemovePost(props: { postId: number }) {
  const removePost = usePostStateRemove();

  const removeTargetPost = (postId: number) => {
    removePost(postId);
    toast({ title: "포스트가 삭제되었습니다" });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <p>삭제</p>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            정말로 해당 포스트를 삭제하시겠습니까?
          </AlertDialogTitle>
          <AlertDialogDescription>
            삭제한 포스트는 다시 되돌릴 수 없습니다.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>취소</AlertDialogCancel>
          <AlertDialogAction
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
