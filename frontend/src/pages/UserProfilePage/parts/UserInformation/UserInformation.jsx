import {
  useState,
  useEffect,
  useRef
} from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useParams,
  Link
} from "react-router-dom";
import {
  BASE_URL,
  requestManager
} from "../../../../requestManagement";
import {
  useQuery,
  useQueryClient
} from '@tanstack/react-query';
import {
  NoAvatarIcon,
  DeleteIcon,
  CameraIcon,
  AcceptIcon,
  CrystalIcon,
  ThreeDotsIcon
} from "../../../../components/SvgIcons";
import {
  NotFoundPage,
  LoadingBar
} from "../../../../components";
import { setShowAccessModal } from '../../../../features/accessModal/accessModalSlice';
import { useTranslation } from 'react-i18next';
import imageCompression from 'browser-image-compression';
import styles from "./UserInformation.module.css";
export function UserInformation() {
  const darkThemeStatus = useSelector((state) => state.darkThemeStatus);
  // Checking user log in
  const logInStatus = useSelector((state) => state.logInStatus)
  // /Checking user log in
  const queryClient = useQueryClient();

  // Authorized user
  const authorizedUser = queryClient.getQueryState(['Authorization'])
  // /Authorized user

  const { t } = useTranslation();
  // user options, menu 
  const menuUserOptions = useRef();
  const [showMenuUserOptions, setShowMenuUserOptions] = useState(false);
  const [menuUserOptionsFadeOut, setMenuUserOptionsFadeOut] = useState(false);
  const buttonShowMenuPostOptions = (Visibility) => {
    if (Visibility) {
      setShowMenuUserOptions(true);
    } else {
      setMenuUserOptionsFadeOut(true);
    }
  };
  // Closing a menu when clicking outside its field
  useEffect(() => {
    if (menuUserOptions.current) {
      const handler = (event) => {
        event.stopPropagation();
        if (
          !menuUserOptions.current.contains(event.target)
        ) {
          setMenuUserOptionsFadeOut(true);
        }
      };
      document.addEventListener("mousedown", handler);
      return () => {
        document.removeEventListener("mousedown", handler);
      };
    }
  },);
  // /Closing a menu when clicking outside its field
  // /user options, menu
  const { userId } = useParams();
  // Checking the access rights of an authorized user
  const authorizedUserAccessCheck = (authorizedUser?.data?.creator || (authorizedUser?.data?.customId === userId));
  // /Checking the access rights of an authorized user
  // Checking whether the user has posts
  const [userHavePosts, setUserHavePost] = useState(false);
  const UserPosts = useQuery({
    queryKey: ["Posts", "UserInformation_UserHavePosts", userId],
    refetchOnWindowFocus: true,
    retry: false,
    queryFn: () =>
      requestManager
        .get("posts/get/all/by/" + userId)
        .then((response) => {
          return response.data;
        }),
  });
  useEffect(() => {
    UserPosts.data?.length > 0
      ? setUserHavePost(UserPosts.data)
      : setUserHavePost(false);
  }, [UserPosts]);
  // /Checking whether the user has posts
  const dispatch = useDispatch();
  const userDataQuery = useQuery({
    queryKey: ['Users', 'UserProfilePage_UserData', userId],
    refetchOnWindowFocus: true,
    retry: false,
    queryFn: () =>
      requestManager.get('/user/get/one/' + userId).then((response) => {
        return response.data
      }
      ),
  })
  const userData = userDataQuery.data;
  const [databaseHaveBanner, setDatabaseHaveBanner] = useState(true);
  const [databaseBannerUrl, setDatabaseBannerUrl] = useState();
  const [fileBannerUrl, setFileBannerUrl] = useState();
  const [fileBanner, setFileBanner] = useState();
  const inputAddFileBannerRef = useRef();
  const [databaseHaveAvatar, setDatabaseHaveAvatar] = useState(true);
  const [databaseAvatarUrl, setDatabaseAvatarUrl] = useState();
  const [fileAvatarUrl, setFileAvatarUrl] = useState();
  const [fileAvatar, setFileAvatar] = useState();
  const inputAddFileAvatarRef = useRef();
  const [userName, setUserName] = useState();
  const [userСustomId, setUserСustomId] = useState();
  const [userAbout, setUserAbout] = useState();
  const [creatorСrystalStatus, setCreatorСrystalStatus] = useState();
  const [showBannerButtons, setShowBannerButtons] = useState();
  const [showAvatarButtons, setShowAvatarButtons] = useState(false);
  const onClickSaveBanner = async () => {
    const fields = {
      bannerUrl: '',
    };
    const formData = new FormData();
    const file = fileBanner;
    const fileType = `users/images`;
    formData.append("image", file);
    (!databaseHaveBanner && !fileBanner) ? await requestManager.patch('/user/edit/' + userId, fields).then(() => {
      queryClient.invalidateQueries({ queryKey: ['Users'] });
      queryClient.invalidateQueries({ queryKey: ['Posts'] });
    }) : await requestManager.post('/user/add/image/' + userId, formData, {
      params: {
        fileType: fileType,
      }
    }).then(response => {
      const fields = {
        bannerUrl: response.data.imageUrl,
      };
      return requestManager.patch(`/user/edit/${userId}`, fields);
    }).then(() => {
      setFileBannerUrl();
      setFileBanner("");
      if (inputAddFileBannerRef.current?.value) { inputAddFileBannerRef.current.value = "" }
      queryClient.invalidateQueries({ queryKey: ['Users'] });
      queryClient.invalidateQueries({ queryKey: ['Posts'] });
    });
  };
  const onClickDeleteUserBanner = () => {
    setDatabaseHaveBanner("")
    setDatabaseBannerUrl("");
    setFileBannerUrl("");
    setFileBanner("")
    inputAddFileBannerRef.current.value = "";
  };
  const onClickSaveAvatar = async () => {
    const fields = {
      userId: userId,
      avatarUrl: '',
    };
    const formData = new FormData();
    const file = fileAvatar;
    const fileType = `users/images`;
    formData.append("image", file);
    (!databaseHaveAvatar && !fileAvatar) ? await requestManager.patch('/user/edit/' + userId, fields).then(() => {
      queryClient.invalidateQueries({ queryKey: ['Users'] });
      queryClient.invalidateQueries({ queryKey: ['Posts'] });
      queryClient.invalidateQueries({ queryKey: ['Authorization'] });
      if (userId === authorizedUser?.data?.customId) {
        queryClient.invalidateQueries({ queryKey: ['authorizedUser'] });
      }
    }) : await requestManager.post('/user/add/image/' + userId, formData, {
      params: {
        fileType: fileType,
      }
    }).then(response => {
      const fields = {
        avatarUrl: response.data.imageUrl,
      };
      return requestManager.patch(`/user/edit/${userId}`, fields);
    }).then(() => {
      setFileAvatarUrl();
      setFileAvatar("");
      if (inputAddFileAvatarRef.current?.value) { inputAddFileAvatarRef.current.value = "" };
      queryClient.invalidateQueries({ queryKey: ['Users'] });
      queryClient.invalidateQueries({ queryKey: ['Posts'] });
      queryClient.invalidateQueries({ queryKey: ['Authorization'] });
      if (userId === authorizedUser?.data?.customId) {
        queryClient.invalidateQueries({ queryKey: ['authorizedUser'] });
      }
    });
  };
  const onClickDeleteUserAvatar = () => {
    setDatabaseHaveAvatar("")
    setDatabaseAvatarUrl("");
    setFileAvatarUrl("");
    setFileAvatar("")
    inputAddFileAvatarRef.current.value = "";
  };
  useEffect(() => {
    (userDataQuery.status === "success") && (
      setDatabaseAvatarUrl(BASE_URL + userData?.avatarUrl),
      setDatabaseHaveAvatar(userData?.avatarUrl),
      setDatabaseBannerUrl(BASE_URL + userData?.bannerUrl),
      setDatabaseHaveBanner(userData?.bannerUrl),
      setUserName(userData?.name),
      setUserСustomId(userData?.customId),
      setUserAbout(userData?.aboutMe),
      setCreatorСrystalStatus(userData?.creator)
    )
  }, [userData, userDataQuery.status]);
  // Compressed avatar image
  // Avatar image loading and error status
  const [
    avatarImageLoadingStatus,
    setAvatarImageLoadingStatus
  ] = useState(false);
  const [
    avatarImageLoadingStatusError,
    setAvatarImageLoadingStatusError
  ] = useState(false);
  useEffect(() => {
    if (avatarImageLoadingStatus == 100) {
      setTimeout(() => {
        setAvatarImageLoadingStatus(false);
      }, "500");
    }
    if (avatarImageLoadingStatusError) {
      setTimeout(() => {
        setAvatarImageLoadingStatusError(false);
      }, "3500");
    }
  }, [avatarImageLoadingStatus, avatarImageLoadingStatusError]);
  // /Avatar image loading and error status 
  async function onChangeCompressedAvatarImage(event) {
    setAvatarImageLoadingStatusError(false);
    const imageFile = event.target.files[0];
    const options = {
      // maxSizeMB: 1,
      maxSizeMB: 0.250,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
      onProgress: loading => { setAvatarImageLoadingStatus(loading) }
    }
    try {
      const compressedFile = await imageCompression(imageFile, options);
      const convertingBlobToFile = new File([compressedFile], "name.png", { type: "image/jpeg", });
      setDatabaseAvatarUrl('');
      setFileAvatarUrl(URL.createObjectURL(compressedFile));
      setFileAvatar(convertingBlobToFile);
      setAvatarImageLoadingStatusError(false);
    } catch (error) {
      console.log(error);
      if (error != 'Error: The file given is not an instance of Blob or File') {
        setAvatarImageLoadingStatusError(true)
      }
      setAvatarImageLoadingStatus(false);
    }
  }
  // /Compressed avatar image
  // Compressed banner image
  // Banner image loading and error status
  const [
    bannerImageLoadingStatus,
    setBannerImageLoadingStatus
  ] = useState(false);
  const [
    bannerImageLoadingStatusError,
    setBannerImageLoadingStatusError
  ] = useState(false);
  useEffect(() => {
    if (bannerImageLoadingStatus == 100) {
      setTimeout(() => {
        setBannerImageLoadingStatus(false);
      }, "500");
    }
    if (bannerImageLoadingStatusError) {
      setTimeout(() => {
        setBannerImageLoadingStatusError(false);
      }, "3500");
    }
  }, [bannerImageLoadingStatus, bannerImageLoadingStatusError]);
  // /Banner image loading and error status
  async function onChangeCompressedBannerImage(event) {
    setBannerImageLoadingStatusError(false);
    const imageFile = event.target.files[0];
    const options = {
      // maxSizeMB: 1,
      maxSizeMB: 0.250,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
      onProgress: loading => { setBannerImageLoadingStatus(loading) }
    }
    try {
      const compressedFile = await imageCompression(imageFile, options);
      const convertingBlobToFile = new File([compressedFile], "name.png", { type: "image/jpeg", });
      setDatabaseBannerUrl('');
      setFileBannerUrl(URL.createObjectURL(compressedFile));
      setFileBanner(convertingBlobToFile);
      setBannerImageLoadingStatusError(false);
    } catch (error) {
      console.log(error);
      if (error != 'Error: The file given is not an instance of Blob or File') {
        setBannerImageLoadingStatusError(true)
      }
      setBannerImageLoadingStatus(false);
    }
  }
  // /Compressed banner image
  return (
    <>
      {userDataQuery.error && (
        <NotFoundPage />
      )}
      {userDataQuery.status === "success" && (
        <div className={
          userHavePosts ?
            styles.user_information
            :
            styles.user_information_no_posts
        }
          data-user-information-dark-theme={darkThemeStatus}
        >
          <div className={styles.banner}
            onMouseOver={() => setShowBannerButtons(true)}
            onMouseOut={() => setShowBannerButtons(false)}
          >
            {(databaseHaveBanner || fileBannerUrl) &&
              <img src={databaseBannerUrl || fileBannerUrl} alt="banner" />
            }
            {authorizedUserAccessCheck && (
              <div
                className={
                  showBannerButtons
                    ? `${styles.banner_buttons_wrap} ${styles.banner_buttons_wrap_show}`
                    : styles.banner_buttons_wrap
                }
              >
                <button className={styles.add_banner_button}
                  onClick={() => inputAddFileBannerRef.current.click()}
                >
                  <CameraIcon />
                </button>
                {(fileBanner || !databaseBannerUrl) && (
                  <button className={styles.save_banner_button}
                    onClick={onClickSaveBanner}>
                    <AcceptIcon />
                  </button>
                )}
                <input ref={inputAddFileBannerRef} type="file"
                  accept="image/*"
                  onChange={event => onChangeCompressedBannerImage(event)}
                  hidden
                />
                {(databaseHaveBanner || fileBanner) && (
                  <>
                    <button
                      className={styles.delete_banner_button}
                      onClick={onClickDeleteUserBanner}
                    >
                      <DeleteIcon />
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
          <div className={styles.user_options}>
            <button
              onClick={() =>
                logInStatus ?
                  buttonShowMenuPostOptions(!showMenuUserOptions)
                  :
                  dispatch(setShowAccessModal(true))
              }>
              <ThreeDotsIcon />
            </button>
            {showMenuUserOptions && (
              <nav
                ref={menuUserOptions}
                className={
                  menuUserOptionsFadeOut
                    ? `${styles.user_options_menu} ${styles.user_options_menu_fade_out}`
                    : styles.user_options_menu
                }
                onAnimationEnd={(e) => {
                  if (e.animationName === styles.fadeOut) {
                    setShowMenuUserOptions(false);
                    setMenuUserOptionsFadeOut(false);
                  }
                }}
              >
                <ul>
                  {authorizedUserAccessCheck &&
                    <li><Link to={'/user/edit/' + userId}>{t('UserProfilePage.editUser')}</Link></li>
                  }
                </ul>
              </nav>
            )}
          </div>
          {bannerImageLoadingStatus && (
            <div className={styles.banner_image_loading_bar_wrap}>
              <LoadingBar value={bannerImageLoadingStatus} />
            </div>
          )
          }
          {bannerImageLoadingStatusError && (
            <div className={styles.banner_image_loading_error}>
              <p>{t('SystemMessages.Error')}</p>
            </div>
          )
          }
          <div className={
            (!userName && !userAbout) ?
              `${styles.avatar_name_wrap} ${styles.avatar_name_wrap_without_name_without_about}`
              :
              styles.avatar_name_wrap
          }>
            <div className={
              (!userAbout) ?
                `${styles.avatar_name} ${styles.avatar_name_without_about}`
                :
                styles.avatar_name
            }>
              <div className={styles.avatar_wrap}>
                <div
                  className={
                    userName
                      ? styles.avatar
                      : `${styles.avatar} ${styles.avatar_without_name}`
                  }
                  onMouseOver={(event) => {
                    event.stopPropagation();
                    setShowAvatarButtons(true);
                  }}
                  onMouseOut={(event) => {
                    event.stopPropagation();
                    setShowAvatarButtons(false);
                  }}
                >
                  {databaseHaveAvatar || fileAvatarUrl ?
                    <img
                      src={databaseAvatarUrl || fileAvatarUrl}
                      alt="avatar" />
                    : (
                      <div
                        className={styles.no_avatar_icon}>
                        <NoAvatarIcon />
                      </div>)
                  }
                  {authorizedUserAccessCheck && (
                    <div
                      className={
                        showAvatarButtons
                          ? `${styles.avatar_buttons_wrap} ${styles.avatar_buttons_wrap_show}`
                          : `${styles.avatar_buttons_wrap}`
                      }
                    >
                      <button
                        className={styles.add_avatar_button}
                        onClick={() => inputAddFileAvatarRef.current.click()}
                      >
                        <CameraIcon />
                      </button>
                      {(fileAvatar || !databaseAvatarUrl) && (
                        <button
                          className={styles.save_avatar_button}
                          onClick={onClickSaveAvatar}>
                          <AcceptIcon />
                        </button>
                      )}
                      <input ref={inputAddFileAvatarRef} type="file"
                        accept="image/*"
                        onChange={event => onChangeCompressedAvatarImage(event)}
                        hidden
                      />
                      {(databaseHaveAvatar || fileAvatar) && (
                        <>
                          <button
                            className={styles.delete_avatar_button}
                            onClick={onClickDeleteUserAvatar}
                          >
                            <DeleteIcon />
                          </button>
                        </>
                      )}
                    </div>
                  )}
                  {avatarImageLoadingStatus && (
                    <div className={styles.avatar_image_loading_bar_wrap}>
                      <LoadingBar value={avatarImageLoadingStatus} />
                    </div>
                  )
                  }
                  {avatarImageLoadingStatusError && (
                    <div className={styles.avatar_image_loading_error}>
                      <p>{t('SystemMessages.Error')}</p>
                    </div>
                  )
                  }
                </div>
              </div>
              <div className={styles.name_id_wrap}>
                {(userName) && (
                  <div className={styles.name}>
                    <p>
                      {userName}
                    </p>
                    {creatorСrystalStatus &&
                      <div className={styles.crystal_icon}>
                        <CrystalIcon />
                      </div>
                    }
                  </div>
                )}
                {(userСustomId) && (
                  <div className={styles.id}>
                    <p>
                      @{userСustomId}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
          {(userAbout) && (
            <div className={styles.about_wrap}>
              <div className={
                userName
                  ? styles.about
                  : styles.about_without_name
              } >
                <p> {userAbout?.split(" ").map((str, index) => {
                  if (str.startsWith("#")) {
                    return <Link key={index} to={`/hashtag/${str.slice(1)}`}>{str} </Link>;
                  }
                  if (str.startsWith('http')) {
                    return <Link key={index} to={`${str.slice(0)}`} target="_blank" rel="noreferrer noopener">{str.slice(8).replace("/", "") + ' '}</Link>;
                  }
                  return str + " ";
                })}</p>
              </div>
            </div>)
          }
        </div>
      )}
    </>
  );
};
