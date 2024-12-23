import {
  useRef,
  useCallback
} from "react";
import { useParams } from "react-router-dom";
import {
  PostPreview,
  // Loader
} from "../../../../components";
import { requestManager } from "../../../../requestManagement";
import { useInfiniteQuery } from "@tanstack/react-query";
import styles from "./UserPagePostsWrap.module.css";
export function UserPagePostsWrap() {
  const { userId } = useParams();
  const link = "posts/get/all/by/" + userId;
  const getPostsPage = async (pageParam = 1, limitPosts = 5, options = {}) => {
    const response = await requestManager.get(
      `${link}?page=${pageParam}&limit=${limitPosts}`,
      options,
    );
    return response.data;
  };
  const {
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    data,
    status
  } =
    useInfiniteQuery({
      queryKey: ["Posts", "UserPagePostsWrap", userId],
      queryFn: ({ pageParam = 1 }) => getPostsPage(pageParam),
      refetchOnWindowFocus: true,
      retry: false,
      getNextPageParam: (lastPage, allPages) => {
        return lastPage?.length ? allPages?.length + 1 : undefined;
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
    return page?.map((obj, index) => {
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
