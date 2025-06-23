import {
  useRef,
  useCallback
} from "react";
import {
  useParams,
  Navigate
} from "react-router-dom";
import {
  PostPreview,
  NotFoundPage,
  Loader
} from "../../components";
import { requestManager } from "../../requestManagement";
import { useInfiniteQuery } from "@tanstack/react-query";
import styles from "./LikedPage.module.css";

export function LikedPage() {
  const { userId } = useParams();
  const link = "/liked/post/get/all/by/" + userId;
  const getPostsPage = async (pageParam = 1, limitPosts = 5) => {
    const response = await requestManager.get(
      `${link}?page=${pageParam}&limit=${limitPosts}`,
    );
    return response;
  };
  const {
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    data,
    status,
    error,
  } = useInfiniteQuery({
    queryKey: ['post', "LikedPage", userId],
    queryFn: ({ pageParam = 1 }) => getPostsPage(pageParam),
    retry: false,
    refetchOnWindowFocus: true,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length ? allPages.length + 1 : undefined;
    },
  });
  const intObserver = useRef();
  const lastPostRef = useCallback(
    (post) => {
      if (isFetchingNextPage) return;
      if (intObserver.current) intObserver.current.disconnect();
      intObserver.current = new IntersectionObserver((posts) => {
        if (posts[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });
      if (post) intObserver.current.observe(post);
    },
    [isFetchingNextPage, fetchNextPage, hasNextPage],
  );

  const posts = data?.pages?.map((page) => {
    return page.map((post, index) => {
      if (page.length === index + 1) {
        return (
          <PostPreview
            ref={lastPostRef}
            key={post._id}
            post={post}
            imageUrl={post.imageUrl ? post.imageUrl : ""}
            userId={post.user?._id}
            userCustomId={post.user?.customId}
            userAvatarUrl={post.user?.avatarUrl}
            postId={post._id}
          />
        );
      }
      return (
        <PostPreview
          key={post._id}
          post={post}
          imageUrl={post.imageUrl ? post.imageUrl : ""}
          userId={post.user?._id}
          userCustomId={post.user?.customId}
          userAvatarUrl={post.user?.avatarUrl}
          postId={post._id}
        />
      );
    });
  });
  return (
    <div className={styles.posts_wrap}>
      {error?.message === "No access" && <Navigate to="/" />}
      {status === "error" && <NotFoundPage />}
      {status === "pending" &&
        <div
          className={
            `${styles.loader}
                       ${styles.loader_first_loading}`
          }>
          <Loader />
        </div>
      }
      {status === "success" && posts}
      {isFetchingNextPage &&
        <div
          className={
            `${styles.loader}
                       ${styles.loader_infinite_scroll}`
          }>
          <Loader />
        </div>}
    </div>
  );
}
