import {
  useState,
  useEffect,
  useRef,
  forwardRef
} from 'react';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import { useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { httpClient } from '../../shared/api';
import { API_BASE_URL } from '../../shared/constants';
import { useAuthData } from "../../features";
import { setShowAccessModal } from '../../features/accessModal/accessModalSlice';
import {
  useFormattedPostDate
} from '../../shared/hooks';
import {
  formatLinksInText,
  formatLongNumber,
  isSamePostDate
} from '../../shared/helpers';
import {
  NoAvatarIcon,
  ThreeDotsIcon,
  EyeIcon,
  CrystalIcon,
  RepostIcon,
  BookmarkIcon,
  LinkIcon,
  LikeIcon,
  MessagesIcon,
  PulseLineIcon
} from '../../shared/ui';

import styles from './PostPreview.module.css';

export const PostPreview = forwardRef(function Post(props, lastPostRef) {

  // authorized user
  const { authorizedUser } = useAuthData();
  // /authorized user

  // checking user log in
  const logInStatus = useSelector((state) => state.logInStatus)
  // /checking user log in

  const darkThemeStatus = useSelector((state) => state.darkThemeStatus);

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { ...postData } = props;
  const linkToUserProfile = window.location.origin + '/' + postData.userCustomId;
  const userAvatar = API_BASE_URL + postData.userAvatarUrl;
  const postImage = API_BASE_URL + postData.imageUrl;
  const queryClient = useQueryClient();

  // menu - post options
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

  // closing a menu when clicking outside its field
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
  // /menu - post options

  // post options

  // delete post
  const onClickDeletePost = async (event) => {
    event.preventDefault();
    if (window.confirm(t("PostPreview.DeletePostQuestion"))) {
      await httpClient.delete(`/posts/${postData.postId}`);
      queryClient.invalidateQueries({
        queryKey: ['posts'],
      });
    }
  };
  // /delete post

  // delete all posts
  const onClickDeleteAllPosts = async (event) => {
    event.preventDefault();
    if (window.confirm(t("PostPreview.DeleteAllUserPostsQuestion"))) {
      await httpClient.delete(`/posts/user/${postData.userCustomId}`);
      queryClient.invalidateQueries({
        queryKey: ['posts']
      });
      queryClient.invalidateQueries({
        queryKey: ['users']
      });
    }
  };
  // /delete all posts

  // delete user account
  const onClickDeleteUserAccount = async (event) => {
    event.preventDefault();
    if (window.confirm(t('PostPreview.DeleteAccountQuestion'))) {
      setFadeOutMenuPostOptions(true);
      await httpClient.delete(`/users/${postData.userCustomId}`);
      queryClient.invalidateQueries({
        queryKey: ['posts'],
      });
      queryClient.invalidateQueries({
        queryKey: ['users'],
      });
    }
  };
  // /delete user account

  // /post options

  // add like and scheck authorized user
  const [userLiked, setUserLiked] = useState();
  const [numberLiked, setNumberLiked] = useState();
  const [userLikedStatus, setUserLikedStatus] = useState();
  useEffect(() => {
    setNumberLiked(postData.post?.liked?.length);
    setUserLiked(postData.post?.liked?.find((like) => like === authorizedUser?._id));
    setUserLikedStatus(true);
    if (!authorizedUser?._id) {
      setUserLikedStatus(true);
      setUserLiked(false);
    }
  }, [postData.post, authorizedUser?._id]);
  const onClickAddLike = async () => {
    if (userLiked) {
      setNumberLiked(numberLiked - 1);
      setUserLiked(false);
    } else {
      setNumberLiked(numberLiked + 1);
      setUserLiked(true);
    }
    const fields = {
      userId: authorizedUser?._id,
    };
    await httpClient.patch(`/posts/${postData.postId}/like`, fields);
  };
  // /add like and scheck authorized user

  // format post date
  const created = useFormattedPostDate(postData.post?.createdAt, false);
  const updated = useFormattedPostDate(postData.post?.updatedAt, false);
  // /format post date

  return (
    <div
      className={styles.post_wrap}
      data-post-preview-dark-theme={darkThemeStatus}
    >
      <Link ref={lastPostRef} to={'/posts/' + postData.postId}></Link>
      <div className={styles.post}>
        <div className={styles.post_info_top}>
          {postData.post?.user === null ? (
            <div className={styles.user_info}>
              {postData.userAvatarUrl ? (
                <div className={styles.avatar}>
                  <img src={userAvatar} alt="" />
                </div>
              ) : (
                <div className={styles.no_avatar}>
                  <NoAvatarIcon />
                </div>
              )}
              <div className={styles.user_name}>
                <p>{postData.post?.user === null ? t('PostPreview.UserDeleted') : postData.post.user?.name}</p>
              </div>
              {postData.post.user?.creator && (
                <div className={styles.crystal_icon}>
                  <CrystalIcon />
                </div>
              )}
            </div>
          ) : (
            <div className={styles.user_info}>
              <Link to={linkToUserProfile}></Link>
              {postData.userAvatarUrl ? (
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
                    <p>{postData.post?.user === undefined ? t('PostPreview.UserDeleted') : postData.post.user?.name}</p>
                  </div>
                  {postData.post.user?.creator && (
                    <div className={styles.crystal_icon}>
                      <CrystalIcon />
                    </div>
                  )}
                </div>
                <div className={styles.user_custom_id}>
                  <p>{postData.post?.user === undefined ? t('PostPreview.UserDeleted') : '@' + postData.post.user?.customId}</p>
                </div>
              </div>
            </div>
          )}
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
                {((postData.post.user?._id === authorizedUser?._id && postData.post?.user?._id !== undefined) ||
                  authorizedUser?.creator) && (
                    <>
                      <li>
                        {t('PostPreview.EditPost')}
                        <Link to={`/posts/${postData.postId}/edit`}></Link>
                      </li>
                      <li onClick={onClickDeletePost}>{t('PostPreview.DeletePost')}</li>
                    </>
                  )}
                {(postData.post.user?._id !== authorizedUser?._id && authorizedUser?.creator) && (
                  <>
                    <li onClick={onClickDeleteAllPosts}>
                      {t('PostPreview.DeleteAllUserPosts')}
                    </li>
                    <li onClick={onClickDeleteUserAccount}>
                      {t('PostPreview.DeleteUser')}
                    </li>
                  </>
                )}
              </ul>
            </div>
          )}
        </div>
        {postData.post?.title && (
          <div className={styles.post_title}>
            <h2>
              {formatLinksInText(postData.post?.title)}
            </h2>
          </div>
        )}
        {postData.post?.text && (
          <div className={postData.imageUrl ? styles.post_text_preview : styles.post_text_long}>
            <p>{formatLinksInText(postData.post.text)}</p>
          </div>
        )}
        {postData.imageUrl && (
          <div className={styles.post_image}>
            <img src={postImage} alt="" />
          </div>
        )}

        {/* post publication date   */}
        <div className={styles.post_date_wrap}>
          <div className={styles.post_date_creation}>
            {!isSamePostDate(postData.post?.createdAt, postData.post?.updatedAt)}
            {created.element}
          </div>
          {!isSamePostDate(postData.post?.createdAt, postData.post?.updatedAt) &&
            <div className={styles.post_date_update_wrap}>
              <div className={styles.post_date_separator}><PulseLineIcon /></div>
              <div className={styles.post_date_update}>
                <p>{t('PostPreview.upd')}:</p>
                {updated.element}
              </div>
            </div>
          }
        </div>
        {/* /post publication date   */}

        <div className={styles.post_info_bottom}>
          <div className={styles.post_info_bottom_part_1}>
            <div className={styles.post_info_bottom_part_1_1}>
              <div className={styles.eye}>
                <EyeIcon />
                {postData.post?.views > 0 &&
                  <p>{formatLongNumber(postData.post?.views)}</p>}
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
                      onClick={authorizedUser ?
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
                    {numberLiked > 0 && <p>{formatLongNumber(numberLiked)}</p>}
                  </div>
                </div>
              </div>
            ) : (
              <div className={styles.post_info_bottom_part_1_2_loader}></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
},
);
