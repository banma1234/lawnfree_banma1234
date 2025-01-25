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
import { useRouter, usePathname } from "next/navigation";
import { ReactNode } from "react";

/**
 * 대상 포스트를 삭제하고 `Alert-Dialog`창을 띄우는 컴포넌트
 * @param props 화면에 출력될 `ReactNode`와 삭제할 포스트의 `postId`
 */
export default function AlertRemovePost(props: {
  postId: number;
  children: ReactNode;
}) {
  const router = useRouter();
  const pathName = usePathname();
  const removePostById = usePostStateRemove();

  /**
   * 대상 포스트를 삭제하고 현재 페이지의 위치에 따라 라우팅 진행
   * @param postId 삭제할 포스트의 `postId`
   */
  const removeTargetPost = (postId: number) => {
    removePostById(postId);
    toast({ title: "포스트가 삭제되었습니다" });

    if (pathName !== "/") {
      router.replace("/");
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild className="hover:text-stone-500">
        {props.children}
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
