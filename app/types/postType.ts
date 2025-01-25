export interface PostInfo {
  postId: number;
  title: string;
  uploadDate: Date;
}

export interface Post {
  postInfo: PostInfo;
  content: string;
}
