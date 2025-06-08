import {
  useDispatch,
  useSelector
} from 'react-redux';
import { Link } from "react-router-dom";
import { ThreeDotsIcon } from "../SvgIcons";
import {
  requestManager,
  BASE_URL
} from "../../requestManagement";
import { useTranslation } from "react-i18next";
import {
  NoAvatarIcon,
  CrystalIcon
} from "../../components/SvgIcons";
import { useQuery } from "@tanstack/react-query";
import { setShowAccessModal } from '../../features/accessModal/accessModalSlice';
import {
  useAuthorization
} from "../../features";
import styles from "./RecommendedUsers.module.css";

export function RecommendedUsers() {
  // authorized user
  const authorizedUser = useAuthorization();
  // /authorized user
  const darkThemeStatus = useSelector((state) => state.darkThemeStatus);
  const dispatch = useDispatch();

  // checking user log in
  const logInStatus = useSelector((state) => state.logInStatus)
  // /checking user log in

  const users = useQuery({
    queryKey: ['user', 'recommendedUsers'],
    refetchOnWindowFocus: true,
    queryFn: () =>
      requestManager.get("/user/get/all").then((response) => {
        return response;
      }),
    retry: false,
  });

  const { t } = useTranslation();
  const dataUsers = logInStatus
    ? users.data?.filter((user) => user.customId !== authorizedUser?.customId).toReversed().slice(0, 4)
    : users.data?.filter((user) => user.customId !== authorizedUser?.customId).toReversed().slice(0, 4);

  if (users.status === "pending") {
    return null;
  }

  return (
    <div className={
      logInStatus
        ? styles.recommended_users
        : `${styles.recommended_users} ${styles.recommended_users_not_authorized_user}`
    } data-recommended-users-dark-theme={darkThemeStatus}>
      <div className={styles.title}>
        <p>{t("RecommendedUsers.YouMightLike")}</p>
      </div>
      {users.status === "success" &&
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
                      <img src={BASE_URL + user.avatarUrl} alt={user.name} />
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
                    !logInStatus &&
                    dispatch(setShowAccessModal(true)
                    )}>
                  <ThreeDotsIcon />
                </button>
                <button className={styles.subscribe}
                  onClick={() =>
                    !logInStatus &&
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
