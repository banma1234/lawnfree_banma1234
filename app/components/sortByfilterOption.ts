import { PostInfo } from "../types/postType";

const sortByFilterOption = (loadedPosts: PostInfo[], sortOption: string) => {
  if (!loadedPosts) return;
  if (!loadedPosts.length) {
    return;
  }
  console.log("hit!");

  if (sortOption === "STANDARD") {
    console.log(sortOption);
    return loadedPosts.sort((a, b) => a.postId - b.postId);
  } else if (sortOption === "RECENT") {
    console.log(sortOption);
    return loadedPosts.sort((a, b) => b.postId - a.postId);
  } else if (sortOption === "PAST") {
    console.log(sortOption);
    return loadedPosts.sort(
      (a, b) =>
        new Date(a.uploadDate).getTime() - new Date(b.uploadDate).getTime(),
    );
  }
};

export default sortByFilterOption;
