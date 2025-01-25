export interface PostInfo {
  postId: number;
  title: string;
  uploadDate: string;
}

export interface Post {
  postInfo: PostInfo;
  content: string;
}
