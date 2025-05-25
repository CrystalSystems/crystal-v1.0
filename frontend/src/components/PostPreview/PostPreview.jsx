import {
  useState,
  useEffect,
  useRef,
  forwardRef
} from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { requestManager } from '../../requestManagement';
import { BASE_URL } from '../../requestManagement';
import { useTranslation } from 'react-i18next';
import { setShowAccessModal } from '../../features/accessModal/accessModalSlice';
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
} from '../../components/SvgIcons';
import { formattingLinksInText } from '../../helpers/index';
import styles from './PostPreview.module.css';
export const PostPreview = forwardRef(function Post(props, lastPostRef) {
  const darkThemeStatus = useSelector((state) => state.darkThemeStatus);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { ...postData } = props;
  const LinkToUserProfile = window.location.origin + '/' + postData.userCustomId;
  const userAvatar = BASE_URL + postData.userAvatarUrl;
  const postImage = BASE_URL + postData.imageUrl;
  const queryClient = useQueryClient();
  // Checking user log in
  const logInStatus = useSelector((state) => state.logInStatus)
  // /Checking user log in
  // Authorized user
  const authorizedUser = queryClient.getQueryState(['Authorization'])
  // /Authorized user
  // Menu - post options
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
  // /Menu - post options
  // Post options
  // DeletePost
  const onClickDeletePost = async (event) => {
    event.preventDefault();
    if (window.confirm(t("PostPreview.DeletePostQuestion"))) {
      await requestManager.delete('/post/delete/' + postData.postId);
      queryClient.invalidateQueries({
        queryKey: ['Posts'],
      });
    }
  };
  // /DeletePost
  // DeleteAllPosts
  const onClickDeleteAllPosts = async (event) => {
    event.preventDefault();
    if (window.confirm(t("PostPreview.DeleteAllUserPostsQuestion"))) {
      await requestManager.delete('/posts/delete/all/by/' + postData.userCustomId);
      queryClient.invalidateQueries({
        queryKey: ['Posts']
      });
      queryClient.invalidateQueries({
        queryKey: ['Users']
      });
    }
  };
  // /DeleteAllPosts
  // DeleteUserAccount
  const onClickDeleteUserAccount = async (event) => {
    event.preventDefault();
    if (window.confirm(t('PostPreview.DeleteAccountQuestion'))) {
      setFadeOutMenuPostOptions(true);
      await requestManager.delete('/user/delete/account/' + postData.userCustomId);
      queryClient.invalidateQueries({
        queryKey: ['Posts'],
      });
      queryClient.invalidateQueries({
        queryKey: ['Users'],
      });
    }
  };
  // /DeleteUserAccount
  // /Post options
  // Formatting a long number
  const formattingLongNumber = Intl.NumberFormat('en', {
    notation: 'compact',
  });
  // /Formatting a long number
  // Add like and scheck authorized user
  const [userLiked, setUserLiked] = useState();
  const [numberLiked, setNumberLiked] = useState();
  const [userLikedStatus, setUserLikedStatus] = useState();
  useEffect(() => {
    setNumberLiked(postData.post?.liked?.length);
    setUserLiked(postData.post?.liked?.find((like) => like === authorizedUser?.data?._id));
    setUserLikedStatus(true);
    if (!authorizedUser?.data?._id) {
      setUserLikedStatus(true);
      setUserLiked(false);
    }
  }, [postData.post, authorizedUser?.data?._id]);
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
    await requestManager.patch(`/post/add/like/${postData.postId}`, fields);
  };
  // /Add like and scheck authorized user
  return (
    <div
      className={styles.post_wrap}
      data-post-preview-dark-theme={darkThemeStatus}
    >
      <Link ref={lastPostRef} to={'/post/' + postData.postId}></Link>
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
              <Link to={LinkToUserProfile}></Link>
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
                {((postData.post.user?._id === authorizedUser?.data?._id && postData.post?.user?._id !== undefined) ||
                  authorizedUser?.data?.creator) && (
                    <>
                      <li>
                        {t('PostPreview.EditPost')}
                        <Link to={'/post/edit/' + postData.postId}></Link>
                      </li>
                      <li onClick={onClickDeletePost}>{t('PostPreview.DeletePost')}</li>
                    </>
                  )}
                {(postData.post.user?._id !== authorizedUser?.data?._id && authorizedUser?.data?.creator) && (
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
              {formattingLinksInText(postData.post?.title)}
            </h2>
          </div>
        )}
        {postData.post?.text && (
          <div className={postData.imageUrl ? styles.post_text_preview : styles.post_text_long}>
            <p>{formattingLinksInText(postData.post.text)}</p>
          </div>
        )}
        {postData.imageUrl && (
          <div className={styles.post_image}>
            <img src={postImage} alt="" />
          </div>
        )}
        <div className={styles.post_info_bottom}>
          <div className={styles.post_info_bottom_part_1}>
            <div className={styles.post_info_bottom_part_1_1}>
              <div className={styles.eye}>
                <EyeIcon />
                {postData.post?.viewsCount > 0 &&
                  <p>{formattingLongNumber.format(postData.post?.viewsCount)}</p>}
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
                      onClick={authorizedUser?.data ?
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
          <div className={styles.post_creation_date_eye_bottom_wrap}>
            <div className={styles.post_creation_date_eye_bottom}>
              <div className={styles.eye_bottom}>
                <EyeIcon />
                {postData.post?.viewsCount > 0 &&
                  <p>{formattingLongNumber.format(postData.post?.viewsCount)}</p>}
              </div>
              <div className={styles.post_creation_date}>
                <p>{postData.post?.createdAt?.replace(/[.-]/g, '.').slice(0, -14)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
},
);
