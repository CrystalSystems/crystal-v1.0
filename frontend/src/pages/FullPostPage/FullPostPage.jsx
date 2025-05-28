import {
  useState,
  useRef,
  useEffect
} from 'react';
import {
  useQuery,
  useQueryClient
} from '@tanstack/react-query';
import {
  Link,
  useNavigate
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { requestManager } from '../../requestManagement';
import { BASE_URL } from '../../requestManagement';
import { useTranslation } from 'react-i18next';
import {
  NoAvatarIcon,
  ThreeDotsIcon,
  CrystalIcon,
  EyeIcon,
  RepostIcon,
  BookmarkIcon,
  LinkIcon,
  LikeIcon,
  MessagesIcon,
} from '../../components/SvgIcons';
import { NotFoundPage } from '../../components';
import { setShowAccessModal } from '../../features/accessModal/accessModalSlice';
import { formattingLinksInText } from '../../helpers/index';
import styles from './FullPostPage.module.css';

export function FullPostPage() {
  const darkThemeStatus = useSelector((state) => state.darkThemeStatus);

  // checking user log in
  const logInStatus = useSelector((state) => state.logInStatus)
  // /checking user log in

  const queryClient = useQueryClient();

  // authorized user
  const authorizedUser = queryClient.getQueryState(['authorization'])
  // /authorized user

  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  const [userId, setUserId] = useState();
  const linkToUserProfile = userId && window.location.origin + '/' + userId;
  const { t } = useTranslation();
  const { postId } = useParams();

  // Formatting a long number
  const formattingLongNumber = Intl.NumberFormat('en', {
    notation: 'compact',
  });
  // /Formatting a long number

  const post = useQuery({
    queryKey: ['post', 'fullPostPage', postId],
    refetchOnWindowFocus: true,
    retry: false,
    queryFn: () =>
      requestManager.get('/post/get/one/' + postId).then((response) => {
        return response;
      }),
  });

  const userAvatar = BASE_URL + post?.data?.user?.avatarUrl;
  const postImage = BASE_URL + post?.data?.imageUrl;
  const [userLiked, setUserLiked] = useState();
  const [numberLiked, setNumberLiked] = useState();
  const [userLikedStatus, setUserLikedStatus] = useState();

  useEffect(() => {
    setUserId(post?.data?.user?.customId);
    if (post.status === 'success') {
      setNumberLiked(post?.data?.liked?.length);
      setUserLiked(post?.data?.liked?.find((like) => like === authorizedUser?.data?._id));
      setUserLikedStatus(true);
    }
    if (!authorizedUser?.data?._id) {
      setUserLikedStatus(true);
      setUserLiked(false);
    }
  }, [post.data, post.status, authorizedUser?.data?._id]);

  const onClickAddLike = async () => {
    if (userLiked) {
      setNumberLiked(numberLiked - 1);
      setUserLiked(false);
    } else {
      setNumberLiked(numberLiked + 1);
      setUserLiked(true);
    }
    const fields = {
      userId: authorizedUser?.data?._id,
    };
    await requestManager.patch(`/post/add/like/${postId}`, fields);
  };

  const onClickDeletePost = async (event) => {
    event.preventDefault();
    if (window.confirm(t("FullPostPage.DeletePostQuestion"))) {
      await requestManager.delete('/post/delete/' + postId);
      navigateTo('/');
      queryClient.invalidateQueries({
        queryKey: ['post'],
      });
    }
  };

  const onClickDeleteAllPosts = async (event) => {
    event.preventDefault();
    if (window.confirm(t("FullPostPage.DeleteAllUserPostsQuestion"))) {
      await requestManager.delete('/post/delete/all/by/' + userId);
      navigateTo('/');
      queryClient.invalidateQueries({
        queryKey: ['post']
      });
      queryClient.invalidateQueries({
        queryKey: ['user']
      });
    }
  };

  const onClickDeleteUserAccount = async (event) => {
    event.preventDefault();
    if (window.confirm(t('FullPostPage.DeleteAccountQuestion'))) {
      setFadeOutMenuPostOptions(true);
      await requestManager.delete('/user/delete/account/' + userId);
      queryClient.invalidateQueries({
        queryKey: ['post'],
      });
      queryClient.invalidateQueries({
        queryKey: ['user'],
      });
    }
  };

  // post options, menu
  const menuPostOptions = useRef();
  const [showMenuPostOptions, setShowMenuPostOptions] = useState(false);
  const [fadeOutMenuPostOptions, setFadeOutMenuPostOptions] = useState(false);
  const buttonShowMenuPostOptions = (Visibility) => {
    if (Visibility) {
      setShowMenuPostOptions(true);
    } else {
      setFadeOutMenuPostOptions(true);
    }
  };

  // Closing a menu when clicking outside its field
  useEffect(() => {
    if (menuPostOptions.current) {
      const handler = (e) => {
        e.stopPropagation();
        if (!menuPostOptions.current.contains(e.target)) {
          setFadeOutMenuPostOptions(true);
        }
      };
      document.addEventListener('mousedown', handler);
      return () => {
        document.removeEventListener('mousedown', handler);
      };
    }
  });
  // /Closing a menu when clicking outside its field
  // /post options, menu

  if (post.status === 'pending') {
    return null;
  }

  return (
    <>
      {post.status === 'error' && <NotFoundPage />}
      {post.status === 'success' && (
        <div
          className={styles.post}
          data-full-post-page-dark-theme={darkThemeStatus}
        >
          <div className={styles.post_info_top}>
            <div className={styles.post_info_top_user_info_wrap}>
              {post?.data?.user === null ? (
                <div className={styles.user_info}>
                  {post?.data?.user?.avatarUrl ? (
                    <div className={styles.avatar}>
                      <img src={userAvatar} alt="" />
                    </div>
                  ) : (
                    <div className={styles.no_avatar}>
                      <NoAvatarIcon />
                    </div>
                  )}
                  <div className={styles.user_name}>
                    <p>{post?.data?.user === null ? t('FullPostPage.UserDeleted') : post?.data.user?.name}</p>
                  </div>
                  {post?.data.user?.creator && (
                    <div className={styles.crystal_icon}>
                      <CrystalIcon />
                    </div>
                  )}
                </div>
              ) : (
                <div className={styles.user_info}>
                  <Link to={linkToUserProfile}></Link>
                  {post?.data?.user?.avatarUrl ? (
                    <div className={styles.avatar}>
                      <img src={userAvatar} alt="" />
                    </div>
                  ) : (
                    <div className={styles.no_avatar}>
                      <NoAvatarIcon />
                    </div>
                  )}
                  <div className={styles.user_name_user_custom_id_wrap}>
                    <div className={styles.user_name_wrap}>
                      <div className={styles.user_name}>
                        <p>{post?.data?.user === undefined ? t('FullPostPage.UserDeleted') : post?.data.user?.name}</p>
                      </div>
                      {post?.data.user?.creator && (
                        <div className={styles.crystal_icon}>
                          <CrystalIcon />
                        </div>
                      )}
                    </div>
                    <div className={styles.user_id}>
                      <p>{post?.data?.user === undefined ? t('FullPostPage.UserDeleted') : '@' + post?.data.user?.customId}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <button
              className={styles.options}
              onClick={() =>
                logInStatus ?
                  buttonShowMenuPostOptions(!showMenuPostOptions)
                  :
                  dispatch(setShowAccessModal(true))
              }
            >
              <ThreeDotsIcon />
            </button>
            {showMenuPostOptions && (
              <div
                ref={menuPostOptions}
                className={
                  fadeOutMenuPostOptions
                    ? `${styles.options_menu} ${styles.options_menu_fade_out}`
                    : styles.options_menu
                }
                onAnimationEnd={(e) => {
                  if (e.animationName === styles.fadeOut) {
                    setShowMenuPostOptions(false);
                    setFadeOutMenuPostOptions(false);
                  }
                }}
              >
                <ul>
                  {((post?.data.user?._id === authorizedUser.data._id && post?.data?.user?._id !== undefined) ||
                    authorizedUser.data.creator) && (
                      <>
                        <li>
                          {t('FullPostPage.EditPost')}
                          <Link to={'/post/edit/' + post?.data?._id}></Link>
                        </li>
                        <li onClick={onClickDeletePost}>{t('FullPostPage.DeletePost')}</li>
                      </>
                    )}
                  {post?.data?.user?._id !== authorizedUser.data._id && authorizedUser.data.creator && (
                    <>
                      <li onClick={onClickDeleteAllPosts}>
                        {t('FullPostPage.DeleteAllUserPosts')}
                      </li>
                      <li onClick={onClickDeleteUserAccount}>
                        {t('FullPostPage.DeleteUser')}
                      </li>
                    </>
                  )}
                </ul>
              </div>
            )}
          </div>
          <div className={styles.post_creation_date_eye_top_wrap}>
            <div className={styles.post_creation_date_eye_top}>
              <div className={styles.post_creation_date}>
                <p>{post?.data?.createdAt?.replace(/[.-]/g, '.').slice(0, -14)}</p>
              </div>
              <div className={styles.eye_top}>
                <EyeIcon />
                {post?.data?.viewsCount > 0 &&
                  <p>{formattingLongNumber.format(post?.data?.viewsCount)}</p>}
              </div>
            </div>
          </div>
          {post?.data?.title && (
            <div className={styles.post_title}>
              <h1>
                {formattingLinksInText(post?.data?.title)}
              </h1>
            </div>
          )}
          {post?.data?.imageUrl && (
            <div className={styles.post_image}>
              <img src={postImage} alt="" />
            </div>
          )}
          {post?.data?.text && (
            <div className={styles.post_text}>
              <p>
                {formattingLinksInText(post?.data?.text)}
              </p>
            </div>
          )}
          <div className={styles.post_info_bottom}>
            <div className={styles.post_info_bottom_part_1}>
              <div className={styles.post_info_bottom_part_1_1}>
                <div className={styles.eye}>
                  <EyeIcon />
                  {post?.data?.viewsCount > 0 &&
                    <p>{formattingLongNumber.format(post?.data?.viewsCount)}</p>}
                </div>
              </div>
              {userLikedStatus ? (
                <div
                  onClick={() =>
                    !logInStatus &&
                    dispatch(setShowAccessModal(true)
                    )}
                  className={styles.post_info_bottom_part_1_2}
                >
                  <div className={styles.link_wrap}>
                    <button className={styles.link}>
                      <LinkIcon />
                    </button>
                  </div>
                  <div className={styles.link_bookmark_repost_like_wrap}>
                    <button className={styles.repost}>
                      <RepostIcon />
                    </button>
                    <button className={styles.bookmark}>
                      <BookmarkIcon />
                    </button>
                    <button className={styles.messages}>
                      <MessagesIcon />
                    </button>
                    <div className={styles.like_wrap}>
                      <button
                        onClick={authorizedUser.data ?
                          onClickAddLike
                          :
                          null}
                        className={
                          userLiked ?
                            styles.like_liked
                            :
                            styles.like
                        }
                      >
                        <LikeIcon />
                      </button>
                      {numberLiked > 0 && <p>{formattingLongNumber.format(numberLiked)}</p>}
                    </div>
                  </div>
                </div>
              ) : (
                <div className={styles.post_info_bottom_part_1_2_loader}></div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
