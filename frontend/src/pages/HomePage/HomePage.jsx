import {
  useRef,
  useCallback
} from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { Loader } from '../../shared/ui';
import {
  PostPreview,
  PostSourceMenu
} from '../../widgets';
import { httpClient } from '../../shared/api';

import styles from './HomePage.module.css';

export function HomePage() {
  const getPostsPage = async (pageParam = 1, limitPosts = 5) => {
    const response = await httpClient.get(
      `/posts?page=${pageParam}&limit=${limitPosts}`,
    );
    return response;
  };
  
  const {
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    data,
    isPending,
    isSuccess } =
    useInfiniteQuery({
      queryKey: ['posts', "homePagePosts", useParams],
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
      <PostSourceMenu />
      {isPending &&
        <div
          className={
            `${styles.loader}
                 ${styles.loader_first_loading}`
          }>
          <Loader />
        </div>
      }
      {isSuccess && posts}
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
