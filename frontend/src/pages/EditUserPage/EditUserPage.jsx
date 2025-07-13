import {
  useState,
  useRef,
  useEffect
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  useNavigate,
  useParams,
  Link,
  Navigate
} from 'react-router-dom';
import {
  useQueryClient,
  useQuery,
  useMutation
} from '@tanstack/react-query';
import TextareaAutosize from 'react-textarea-autosize';
import { useTranslation } from 'react-i18next';

import { httpClient } from '../../shared/api';
import { API_BASE_URL } from '../../shared/constants';
import { useAuthData } from "../../features";
import { setlogInStatus } from '../../features/auth/logInStatusSlice';
import { NotFoundPage } from '../../pages';
import {
  NoAvatarIcon,
  CrystalIcon,
  ClosedEyeSecondVersionIcon,
  EyeIconSecondVersionIcon,
  Loader
} from '../../shared/ui';

import styles from "./EditUserPage.module.css";

export function EditUserPage() {

  // authorized user
  const { authorizedUser } = useAuthData();
  // /authorized user

  const [serverMessage, setServerMessage] = useState();
  const darkThemeStatus = useSelector((state) => state.darkThemeStatus);
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { userId } = useParams();
  const [userIdUseParams, setUserIdUseParams] = useState(userId);
  const linkToUserProfile = window.location.origin + "/" + userId;

  //userName
  const userNameRef = useRef();
  const [userName, setUserName] = useState();
  const [userNameValueDatabase, setUserNameValueDatabase] = useState();
  const [numberCharactersInUsername, setNumberCharactersInUsername] =
    useState();
  const onChangeUserName = (event) => {
    setNumberCharactersInUsername(event.target.value.length);
    setUserName(event.target.value);
  };
  // /userName

  // userId
  const userIdRef = useRef();
  const [userIdValue, setUserIdValue] = useState();
  const [userIdValueDatabase, setUserIdValueDatabase] = useState();
  const [numberCharactersInUserId, setNumberCharactersInUserId] = useState("");
  const onChangeUserId = (e) => {
    setUserIdUseParams(e.target.value);
    setUserIdValue(e.target.value);
    setNumberCharactersInUserId(e.target.value.length);
    setServerMessage(e.target.value);
  };
  const [validationUserIdErrorStatus, setValidationUserIdErrorStatus] =
    useState();
  // /userId

  const [serverPostsDeletedMessage, setServerPostsDeletedMessage] = useState();
  useEffect(() => {
    if (serverPostsDeletedMessage) {
      setTimeout(() => {
        setServerPostsDeletedMessage(false);
      }, "7500");
    }
  }, [serverPostsDeletedMessage, serverMessage]);

  // userAboutMe
  const userAboutMeRef = useRef();
  const [userAboutMe, setUserAboutMe] = useState();
  const [userAboutMeValueDatabase, setUserAboutMeValueDatabase] = useState();
  const [numberCharactersInUserAboutMe, setNumberCharactersInUserAboutMe] =
    useState();
  const onChangeUserAboutMe = (e) => {
    setNumberCharactersInUserAboutMe(e.target.value.length);
    setUserAboutMe(e.target.value);
  };
  // /userAboutMe

  const [userData, setUserData] = useState(false);

  const user = useQuery({
    queryKey: ['users', "editUserPageUser", userId],
    refetchOnWindowFocus: false,
    retry: false,
    queryFn: () =>
      httpClient
        .get(`/users/${userIdUseParams}/edit`)
        .then((response) => {
          return response;
        }),
  });

  useEffect(() => {
    user.isError && setServerMessage(user.error.message);
    setUserData(user.data);
  }, [user]);

  // Checking whether the user has posts
  const [userHavePosts, setUserHavePost] = useState(false);

  const userPosts = useQuery({
    queryKey: ['posts', "editUserPageUserHavePosts", userId],
    refetchOnWindowFocus: true,
    retry: false,
    queryFn: () =>
      httpClient
        .get(`/posts/user/${userIdUseParams}`)
        .then((response) => {
          return response;
        }),
  });

  useEffect(() => {
    userPosts.data?.length > 0
      ? setUserHavePost(userPosts.data)
      : setUserHavePost(false);
  }, [userPosts]);
  // /Checking whether the user has posts

  const [userCreatorStatus, setUserCreatorStatus] = useState();
  useEffect(() => {
    setUserName(userData?.name);
    setUserNameValueDatabase(userData?.name);
    setUserIdValue(userData?.customId);
    setUserIdValueDatabase(userData?.customId);
    setUserAboutMe(userData?.aboutMe);
    setUserAboutMeValueDatabase(userData?.aboutMe);
    setUserCreatorStatus(userData?.creator);
  }, [userData]);

  // user authorization check
  const userAuthorizationCheck =
    (authorizedUser?.creator && userId) !== authorizedUser?.customId;
  const userAuthorizationCheckToChangePassword =
    authorizedUser?.customId === userId;
  // /user authorization check

  const { t } = useTranslation();
  const checkingUserChanges =
    userNameValueDatabase !== userName ||
    userIdValueDatabase !== userIdValue ||
    userAboutMeValueDatabase !== userAboutMe;

  const saveUserChanges = useMutation({
    mutationKey: ['saveUserChanges'],
    mutationFn: (fields) => {
      return httpClient.patch(`/users/${userId}`, fields);
    },

    onSuccess: () => {
      navigate(`/users/${userIdValue}/edit`);
      queryClient.invalidateQueries({ queryKey: ['users'] });
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      queryClient.invalidateQueries({ queryKey: ['me'] });
    },

    onError: (error) => {
      setServerMessage(error.message);
    },

  });

  const onClickSaveUserChanges = async () => {
    const fields = {
      userId: userId,
      name: userName,
      customId: userIdValue,
      aboutMe: userAboutMe,
    };
    if (window.confirm(t("EditUserPage.SaveChanges"))) {
      saveUserChanges.mutate(fields);
    }
  };

  // change password
  const [changePasswordFormStatus, setChangePasswordFormStatus] = useState(false);

  // old password
  const oldPasswordInputRef = useRef();
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [oldPassword, setOldPassword] = useState();
  const onChangeOldPassword = (e) => {
    setOldPassword(e.target.value);
    setServerMessage(e.target.value);
  };
  // /old password

  // new password
  const newPasswordInputRef = useRef();
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [newPassword, setNewPassword] = useState();
  const [validatingNewPassword, setValidatingNewPassword] = useState();
  const newPasswordValidationRule = /^[a-zA-Z\d!@#$%^&*[\]{}()?"\\/,><':;|_~`=+-]{8,35}$/;
  const onChangeNewPassword = (e) => {
    setServerMessage(e.target.value);
    setNewPassword(e.target.value);
    e.target.value?.match(newPasswordValidationRule) ? setValidatingNewPassword(true) : setValidatingNewPassword(false);
  };
  // /new password

  const changePassword = useMutation({
    mutationKey: ['changePassword'],
    mutationFn: (fields) => {
      return httpClient.post(`/users/${userId}/password/`, fields);
    },
    onSuccess: (data) => {
      setServerMessage(data.message);
      setNewPassword('');
      setOldPassword('');
      setValidatingNewPassword(false);
      newPasswordInputRef.current.value = '';
      oldPasswordInputRef.current.value = '';
    },
    onError: (error) => {
      setServerMessage(error.message);
    },
  });

  const onClickChangePassword = async () => {
    const fields = {
      oldPassword: oldPassword,
      newPassword: newPassword,
    };
    if (window.confirm(t("EditUserPage.SaveChanges"))) {
      changePassword.mutate(fields);
    }
  };
  // /change password

  // delete all posts by user
  const onClickDeleteAllUserPosts = async (event) => {
    event.preventDefault();
    if (
      window.confirm(
        userAuthorizationCheck
          ? t("EditUserPage.DeleteAllUserPosts")
          : t("EditUserPage.DeleteAllYourPosts"),
      )
    ) {
      await httpClient
        .delete(`/posts/user/${userId}`)
        .then((response) => {
          queryClient.invalidateQueries({ queryKey: ['posts'] });
          setServerPostsDeletedMessage(response.message);
          setUserHavePost(false);
        });
    }
  };
  // /delete all posts by user

  // delete user account
  const onClickDeleteUserAccount = async () => {
    if (window.confirm(t("EditUserPage.DeleteAccountQuestion"))) {
      deleteUserAccount.mutate();
    }
  };

  const deleteUserAccount = useMutation({
    mutationKey: ['deleteUserAccount'],
    mutationFn: () => {
      return httpClient
        .delete(`/users/${userId}`);
    },

    onSuccess: () => {
      navigate("/");
      if (authorizedUser?.customId === userId) {
        dispatch(setlogInStatus(false));
        window.localStorage.removeItem('logIn');
        queryClient.invalidateQueries({ queryKey: ['posts'] });
        queryClient.invalidateQueries({ queryKey: ['users'] });
        httpClient.post("/auth/logout");
      }
      else {
        queryClient.invalidateQueries({ queryKey: ['posts'] });
        queryClient.invalidateQueries({ queryKey: ['users'] });
        queryClient.invalidateQueries({ queryKey: ['me'] });
      }
    },

    onError: (error) => {
      console.log(error);
    },

  });
  // /delete user account

  useEffect(() => {
    if (userNameValueDatabase === userName) {
      setNumberCharactersInUsername(null);
    }
    if (userIdValueDatabase === userIdValue) {
      setNumberCharactersInUserId(null);
    }
    if (userAboutMeValueDatabase === userAboutMe) {
      setNumberCharactersInUserAboutMe(null);
    }
    setValidationUserIdErrorStatus(
      userIdValue === undefined
        ? false
        : !/^[a-zA-Z0-9-_]{1,35}$/.test(userIdValue),
    );
  }, [
    userNameValueDatabase,
    userName,
    userIdValueDatabase,
    userIdValue,
    userAboutMeValueDatabase,
    userAboutMe,
  ]);

  if (serverMessage === "No access") {
    return <Navigate to="/" />;
  }

  return (
    <>
      {user.isPending &&
        <div className={styles.loader}>
          <Loader />
        </div>
      }
      {user.isError && <NotFoundPage />}
      {user.isSuccess && (
        <div
          className={styles.edit_user}
          data-edit-user-page-dark-theme={darkThemeStatus}
        >
          <div className={styles.title}>
            <h1>{t("EditUserPage.EditUser")}</h1>
          </div>
          <div className={styles.user_info_wrap}>
            <div className={styles.user_info}>
              <Link to={linkToUserProfile}></Link>
              {user.data?.avatarUrl ? (
                <div className={styles.avatar}>
                  <img
                    className={styles.avatar}
                    src={API_BASE_URL + user.data?.avatarUrl}
                    alt={userName}
                  />
                </div>
              ) : (
                <div className={styles.no_avatar_icon}>
                  <NoAvatarIcon />
                </div>
              )}
              <div className={styles.user_info_user_name_custom_id_wrap}>
                <div className={styles.user_info_user_name_wrap}>
                  <div className={styles.user_info_user_name}>
                    <p>{userName}</p>
                  </div>
                  {userCreatorStatus && (
                    <div className={styles.crystal_icon}>
                      <CrystalIcon />
                    </div>
                  )}
                </div>
                <div className={styles.user_info_custom_id}>
                  <p>@{userIdValue}</p>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.user_name}>
            <TextareaAutosize
              type="text"
              maxLength={200}
              ref={userNameRef}
              value={userName}
              variant="standard"
              placeholder={t("EditUserPage.UserName")}
              onChange={onChangeUserName}
            />
          </div>
          {numberCharactersInUsername > 0 && (
            <div className={styles.letter_counter}>
              <p>{numberCharactersInUsername}/200</p>
            </div>
          )}
          <div className={styles.user_id}>
            <TextareaAutosize
              type="text"
              maxLength={35}
              ref={userIdRef}
              value={userIdValue}
              variant="standard"
              placeholder="Id"
              onChange={onChangeUserId}
            />
            {numberCharactersInUserId > 0 && (
              <div className={styles.letter_counter}>
                <p>{numberCharactersInUserId}/35</p>
              </div>
            )}
          </div>
          {validationUserIdErrorStatus && (
            <div className={styles.user_id_validation_error}>
              <p>
                {t(
                  "EditUserPage.IdErrorMinimumMaximumLengthSymbols",
                )}
              </p>
            </div>
          )}
          {serverMessage === "This Id already exists" && (
            <div className={styles.user_id_server_error}>
              <p>
                {t("EditUserPage.IdAlreadyExists")}
              </p>
            </div>
          )}
          <div className={styles.user_about_me}>
            <TextareaAutosize
              type="text"
              maxLength={175}
              ref={userAboutMeRef}
              value={userAboutMe}
              variant="standard"
              placeholder={t("EditUserPage.UserAboutMe")}
              onChange={onChangeUserAboutMe}
            />
          </div>
          {numberCharactersInUserAboutMe > 0 && (
            <div className={styles.letter_counter}>
              <p>{numberCharactersInUserAboutMe}/175</p>
            </div>
          )}
          {userAuthorizationCheckToChangePassword && (
            <div
              className={styles.change_password_wrap}
            >
              <button onClick={() => { setChangePasswordFormStatus(!changePasswordFormStatus) }}>
                {changePasswordFormStatus
                  ? t("EditUserPage.Hide")
                  : t("EditUserPage.ChangePassword")}
              </button>
              <div
                className={
                  changePasswordFormStatus ?
                    `${styles.change_password_form} ${styles.change_password_show}`
                    :
                    styles.change_password_form
                }
              >
                <form className={styles.change_password_form_wrap}>
                  <div className={styles.change_password_input_errors_wrap}>
                    <div className={styles.change_password_input_wrap}>
                      <input
                        className={styles.old_password}
                        key='OldPassword'
                        type={showOldPassword ? "text" : "password"}
                        label="password"
                        autoComplete="off"
                        maxLength={30}
                        placeholder={t(
                          "EditUserPage.OldPassword"
                        )}
                        onChange={onChangeOldPassword}
                        ref={oldPasswordInputRef}
                      />
                      <div
                        onClick={() => { setShowOldPassword(!showOldPassword) }}
                        className={styles.show_password}
                      >
                        {showOldPassword ? <EyeIconSecondVersionIcon /> : <ClosedEyeSecondVersionIcon />}
                      </div>
                    </div>
                    {serverMessage === "Old password is incorrect" && (
                      <div className={styles.change_password_input_errors_server}>
                        <p>
                          {t(
                            "EditUserPage.OldPasswordIncorrect"
                          )}
                        </p>
                      </div>
                    )}
                  </div>
                  <div className={styles.change_password_input_errors_wrap}>
                    <div className={styles.change_password_input_wrap}>
                      <input
                        className={styles.new_password}
                        key='NewPassword'
                        type={showNewPassword ? "text" : "password"}
                        label="password"
                        autoComplete="off"
                        placeholder={t(
                          "EditUserPage.NewPassword"
                        )}
                        onChange={onChangeNewPassword}
                        maxLength={30}
                        ref={newPasswordInputRef}
                      />
                      <div
                        onClick={() => { setShowNewPassword(!showNewPassword) }}
                        className={styles.show_password}
                      >
                        {showNewPassword ? <EyeIconSecondVersionIcon /> : <ClosedEyeSecondVersionIcon />}
                      </div>
                    </div>
                    <div className={styles.password_requirements}>
                      <p>
                        {t(
                          "EditUserPage.PasswordRequirements"
                        )}
                      </p>
                    </div>
                    {serverMessage === "Password successfully changed" && (
                      <div className={styles.change_password_success}>
                        <p>
                          {t(
                            "EditUserPage.PasswordSuccessfullyChanged"
                          )}
                        </p>
                      </div>
                    )}
                  </div>
                </form>
                {(validatingNewPassword && (oldPassword?.length > 0) && (oldPassword !== newPassword)) && (
                  < button className={styles.change_password} onClick={onClickChangePassword}>
                    {t("EditUserPage.ChangePassword")}
                  </button>
                )}
              </div>
            </div >
          )}
          {(userAuthorizationCheck !== undefined) && (
            <>
              {userHavePosts && (
                <div
                  className={styles.delete_all_user_posts}
                >
                  <button onClick={onClickDeleteAllUserPosts}>
                    {userAuthorizationCheck
                      ? t("EditUserPage.DeleteAllUserPosts")
                      : t("EditUserPage.DeleteAllYourPosts")}
                  </button>
                </div>
              )}
              {serverPostsDeletedMessage === "All posts deleted" && (
                <div className={styles.server_message_all_posts_deleted}>
                  <p>{t("EditUserPage.AllPostsDeleted")}</p>
                </div>
              )}
              <div className={styles.delete_user_account}>
                <button onClick={onClickDeleteUserAccount}>
                  {t("EditUserPage.DeleteAccount")}
                </button>
              </div>
            </>
          )}
          <div className={styles.save_user_changes_back_buttons_wrap}>
            <div className={styles.save_user_changes_back_buttons}>
              <div className={styles.back}>
                <button onClick={() => navigate("/" + userId)}>
                  {t("AddPostPage.Back")}
                </button>
              </div>
              {(checkingUserChanges && !validationUserIdErrorStatus) && (
                <div className={styles.save_user_changes}>
                  <button onClick={onClickSaveUserChanges}>
                    {t("EditUserPage.Save")}
                  </button>
                </div>
              )
              }
            </div>
          </div>
        </div >
      )
      }
    </>
  );
}
