import {
  useDispatch,
  useSelector
} from 'react-redux';
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { httpClient } from '../../shared/api';
import { API_BASE_URL } from '../../shared/constants';
import { useAuthData } from "../../features";
import { setShowAccessModal } from '../../features/accessModal/accessModalSlice';
import { ThreeDotsIcon } from '../../shared/ui';
import {
  NoAvatarIcon,
  CrystalIcon,
  Loader
} from "../../shared/ui";

import styles from "./RecommendedUsers.module.css";

export function RecommendedUsers() {

  // authorized user
  const { authorizedUser } = useAuthData();
  // /authorized user

  // checking user log in
  const logInStatus = useSelector((state) => state.logInStatus)
  // /checking user log in

  const darkThemeStatus = useSelector((state) => state.darkThemeStatus);

  const dispatch = useDispatch();

  const users = useQuery({
    queryKey: ['users', 'recommendedUsers', authorizedUser?.customId || 'guest'],
    queryFn: () => {
      const params =
        logInStatus && authorizedUser?.customId
          ? { exclude: authorizedUser?.customId, limit: 4 }
          : { limit: 4 };
      return httpClient.get('/users/', params);
    },
    refetchOnWindowFocus: true,
    retry: false
  });

  const { t } = useTranslation();

  return (
    <div className={
      logInStatus
        ? styles.recommended_users
        : `${styles.recommended_users} ${styles.recommended_users_not_authorized_user}`
    } data-recommended-users-dark-theme={darkThemeStatus}>
      <div className={styles.title}>
        <p>{t("RecommendedUsers.YouMightLike")}</p>
      </div>

      {users.isPending &&
        <div className={styles.loader}>
          <Loader />
        </div>
      }

      {users.isSuccess &&
        users.data?.map((user, index) => {
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
                      <img src={API_BASE_URL + user.avatarUrl} alt={user.name} />
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
