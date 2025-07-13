import {
  useState,
  useEffect,
  useRef
} from "react";
import {
  useDispatch,
  useSelector
} from "react-redux";
import {
  useParams,
  Link
} from "react-router-dom";
import {
  useQuery,
  useQueryClient
} from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import imageCompression from 'browser-image-compression';

import { httpClient } from '../../../../shared/api';
import { API_BASE_URL } from '../../../../shared/constants';
import {
  LoadingBar,
  NoAvatarIcon,
  DeleteIcon,
  CameraIcon,
  AcceptIcon,
  CrystalIcon,
  ThreeDotsIcon,
  Loader
} from '../../../../shared/ui';
import { setShowAccessModal } from '../../../../features/accessModal/accessModalSlice';
import { useAuthData } from "../../../../features";
import { NotFoundPage } from '../../../../pages';
import { formatLinksInText } from '../../../../shared/helpers';

import styles from "./UserInformation.module.css";

export function UserInformation() {

  // authorized user
  const { authorizedUser } = useAuthData();
  // /authorized user

  const dispatch = useDispatch();
  const darkThemeStatus = useSelector((state) => state.darkThemeStatus);

  // checking user log in
  const logInStatus = useSelector((state) => state.logInStatus)
  // /checking user log in

  const queryClient = useQueryClient();

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

  // closing a menu when clicking outside its field
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
  // /closing a menu when clicking outside its field
  // /user options, menu

  const { userId } = useParams();

  // checking the access rights of an authorized user
  const authorizedUserAccessCheck = (authorizedUser?.creator || (authorizedUser?.customId === userId));
  // /checking the access rights of an authorized user

  // checking whether the user has posts
  const [userHavePosts, setUserHavePost] = useState(false);

  const userPosts = useQuery({
    queryKey: ['posts', 'userInformationUserHavePosts', userId],
    refetchOnWindowFocus: true,
    retry: false,
    queryFn: () =>
      httpClient
        .get(`/posts/user/${userId}`)
        .then((response) => {
          return response;
        }),
  });

  useEffect(() => {
    userPosts.data?.length > 0
      ? setUserHavePost(userPosts.data)
      : setUserHavePost(false);
  }, [userPosts]);
  // /checking whether the user has posts

  const user = useQuery({
    queryKey: ['users', 'userProfilePageUserData', userId],
    refetchOnWindowFocus: true,
    retry: false,
    queryFn: () =>
      httpClient.get(`/users/${userId}`).then((response) => {
        return response
      }
      ),
  })

  // banner useState()
  const [databaseHaveBanner, setDatabaseHaveBanner] = useState(true);
  const [databaseBannerUrl, setDatabaseBannerUrl] = useState();
  const [fileBannerUrl, setFileBannerUrl] = useState();
  const [fileBanner, setFileBanner] = useState();
  const inputAddFileBannerRef = useRef();
  // /banner useState()

  // avatar useState()
  const [databaseHaveAvatar, setDatabaseHaveAvatar] = useState(true);
  const [databaseAvatarUrl, setDatabaseAvatarUrl] = useState();
  const [fileAvatarUrl, setFileAvatarUrl] = useState();
  const [fileAvatar, setFileAvatar] = useState();
  const inputAddFileAvatarRef = useRef();
  // /avatar useState()

  const [userName, setUserName] = useState();
  const [userCustomId, setUserCustomId] = useState();
  const [userAbout, setUserAbout] = useState();
  const [creatorCrystalStatus, setCreatorCrystalStatus] = useState();

  const [showBannerButtons, setShowBannerButtons] = useState();
  const [showAvatarButtons, setShowAvatarButtons] = useState(false);

  const onClickSaveBanner = async () => {
    const fields = {
      bannerUrl: '',
    };
    const formData = new FormData();
    const file = fileBanner;
    formData.append("image", file);
    (!databaseHaveBanner && !fileBanner) ? await httpClient.patch(`/users/${userId}`, fields).then(() => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      queryClient.invalidateQueries({ queryKey: ['me'] });
    }) : await httpClient.post(`/users/${userId}/image`, formData).then(response => {
      const fields = {
        bannerUrl: response.imageUrl,
      };
      return httpClient.patch(`/users/${userId}`, fields);
    }).then(() => {
      setFileBannerUrl();
      setFileBanner("");
      if (inputAddFileBannerRef.current?.value) { inputAddFileBannerRef.current.value = "" }
      queryClient.invalidateQueries({ queryKey: ['users'] });
      queryClient.invalidateQueries({ queryKey: ['posts'] });
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
    formData.append("image", file);
    (!databaseHaveAvatar && !fileAvatar) ? await httpClient.patch(`/users/${userId}`, fields).then(() => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      queryClient.invalidateQueries({ queryKey: ['me'] });
    }) : await httpClient.post(`/users/${userId}/image`, formData).then(response => {
      const fields = {
        avatarUrl: response.imageUrl,
      };
      return httpClient.patch(`/users/${userId}`, fields);
    }).then(() => {
      setFileAvatarUrl();
      setFileAvatar("");
      if (inputAddFileAvatarRef.current?.value) { inputAddFileAvatarRef.current.value = "" };
      queryClient.invalidateQueries({ queryKey: ['users'] });
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      queryClient.invalidateQueries({ queryKey: ['me'] });
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
    user.isSuccess && (
      setDatabaseAvatarUrl(API_BASE_URL + user.data?.avatarUrl),
      setDatabaseHaveAvatar(user.data?.avatarUrl),
      setDatabaseBannerUrl(API_BASE_URL + user.data?.bannerUrl),
      setDatabaseHaveBanner(user.data?.bannerUrl),
      setUserName(user.data?.name),
      setUserCustomId(user.data?.customId),
      setUserAbout(user.data?.aboutMe),
      setCreatorCrystalStatus(user.data?.creator)
    )
  }, [user.data, user.status]);

  // Compressed avatar image
  // avatar image loading and error status
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
  // /avatar image loading and error status 

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
  // /compressed avatar image

  // compressed banner image
  // banner image loading and error status
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
  // /banner image loading and error status

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
  // /compressed banner image

  return (
    <>
      {user.isPending &&
        <div className={styles.loader}>
          <Loader />
        </div>
      }
      {user.isError && (
        <NotFoundPage />
      )}
      {user.isSuccess && (
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
                    <li><Link to={`/users/${userId}/edit`}>{t('UserProfilePage.EditUser')}</Link></li>
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
                    {creatorCrystalStatus &&
                      <div className={styles.crystal_icon}>
                        <CrystalIcon />
                      </div>
                    }
                  </div>
                )}
                {(userCustomId) && (
                  <div className={styles.id}>
                    <p>
                      @{userCustomId}
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
                <p>{formatLinksInText(userAbout)}</p>
              </div>
            </div>)
          }
        </div>
      )}
    </>
  );
};
