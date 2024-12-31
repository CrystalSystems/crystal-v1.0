import {
  useDispatch,
  useSelector
} from 'react-redux';
import { Link } from "react-router-dom";
import { ThreeDotsIcon } from "../SvgIcons";
import {
  requestManager,
  baseURL
} from "../../requestManagement";
import { useTranslation } from "react-i18next";
import {
  NoAvatarIcon,
  CrystalIcon
} from "../../components/SvgIcons";
import { useQuery } from "@tanstack/react-query";
import { setShowAccessModal } from '../../features/accessModal/accessModalSlice';
import styles from "./RecommendedUsers.module.css";
export function RecommendedUsers() {
  const darkThemeStatus = useSelector((state) => state.darkThemeStatus);
  const dispatch = useDispatch();
  // Checking user authorization
  const userIsAuthorizedСheck = window.localStorage.getItem("logIn");
  // /Checking user authorization
  // Authorized user data
  const userAuthorizedData = JSON.parse(
    window.localStorage.getItem("authorizedUserData"),
  );
  // /Authorized user data
  const usersQuery = useQuery({
    queryKey: ["Users", "RecommendedUsers"],
    refetchOnWindowFocus: true,
    queryFn: () =>
      requestManager.get("/users/get/all").then((response) => {
        return response.data;
      }),
    retry: false,
  });
  const { t } = useTranslation();
  const dataUsers = userIsAuthorizedСheck
    ? usersQuery.data?.toReversed().filter((user) => user.customId !== userAuthorizedData?.customId).slice(0, 5)
    : usersQuery.data?.toReversed().filter((user) => user.customId !== userAuthorizedData?.customId).slice(0, 7);

  if (usersQuery.status === "pending") {
    return null;
  }
  return (
    <div className={
      userIsAuthorizedСheck
        ? styles.recommended_users
        : `${styles.recommended_users} ${styles.recommended_users_not_authorized_user}`
    } data-recommended-users-dark-theme={darkThemeStatus}>
      <div className={styles.title}>
        <p>{t("RecommendedUsers.YouMightLike")}</p>
      </div>
      {usersQuery.status === "success" &&
        dataUsers?.map((user, index) => {
          return (
            <div
              key={index}
              className={styles.user_wrap
              }
            >
              <Link to={"/" + user.customId}></Link>
              <div
                className={styles.user
                }
              >
                <div
                  className={styles.avatar_name_id_wrap
                  }
                >
                  {user.avatarUrl ? (
                    <div
                      className={styles.avatar
                      }
                    >
                      <img src={baseURL + user.avatarUrl} alt={user.name} />
                    </div>
                  ) : (
                    <div
                      className={styles.no_avatar_icon
                      }
                    >
                      <NoAvatarIcon />
                    </div>
                  )}
                  <div
                    className={styles.name_id_wrap
                    }
                  >
                    {user.name && (
                      <div
                        className={styles.name
                        }
                      >
                        <p>{user.name}</p>
                        {user.creator && (
                          <div
                            className={styles.crystal_icon
                            }
                          >
                            <CrystalIcon />
                          </div>
                        )}
                      </div>
                    )}
                    <div
                      className={styles.id
                      }
                    >
                      <p>@{user.customId}</p>
                    </div>
                  </div>
                </div>
                <button className={styles.options}
                  onClick={() =>
                    !userIsAuthorizedСheck &&
                    dispatch(setShowAccessModal(true)
                    )}>
                  <ThreeDotsIcon />
                </button>
                <button className={styles.subscribe}
                  onClick={() =>
                    !userIsAuthorizedСheck &&
                    dispatch(setShowAccessModal(true)
                    )}>
                  {t("RecommendedUsers.Subscribe")}
                </button>
              </div>
            </div>
          );
        })}
      <button className={styles.show_more}>
        {t("RecommendedUsers.ShowMore")}
      </button>
    </div>
  );
}
