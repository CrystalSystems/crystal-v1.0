import {
  useRef,
  useCallback
} from "react";
import {
  PostPreview,
  // Loader
} from "../../components";
import { PostSourceMenu } from "../../components/";
import { requestManager } from "../../requestManagement";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import styles from "./HomePage.module.css";
export function HomePage() {
  const getPostsPage = async (pageParam = 1, limitPosts = 5) => {
    const response = await requestManager.get(
      `/post/get/all?page=${pageParam}&limit=${limitPosts}`,
    );
    return response;
  };
  const {
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    data,
    status } =
    useInfiniteQuery({
      queryKey: ["Posts", "HomePagePosts", useParams],
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
  const posts = data?.pages.map((page) => {
    return page.map((obj, index) => {
      if (page.length === index + 1) {
        return (
          <PostPreview
            ref={lastPostRef}
            key={obj._id}
            post={obj}
            imageUrl={obj.imageUrl ? obj.imageUrl : ""}
            userId={obj.user?._id}
            userCustomId={obj.user?.customId}
            userAvatarUrl={obj.user?.avatarUrl}
            postId={obj._id}
          />
        );
      }
      return (
        <PostPreview
          key={obj._id}
          post={obj}
          imageUrl={obj.imageUrl ? obj.imageUrl : ""}
          userId={obj.user?._id}
          userCustomId={obj.user?.customId}
          userAvatarUrl={obj.user?.avatarUrl}
          postId={obj._id}
        />
      );
    });
  });
  return (
    <div className={styles.posts_wrap}>
      <PostSourceMenu />
      {/* {status === "pending" &&
        <div className={styles.loader}>
          <Loader />
        </div>
      } */}
      {status === "success" && posts}
      {/* {isFetchingNextPage &&
        <div className={styles.loader}>
          <Loader />
        </div>} */}
    </div>
  );
}
