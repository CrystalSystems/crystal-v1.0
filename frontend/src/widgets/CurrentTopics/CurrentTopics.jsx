import {
  useDispatch,
  useSelector
} from 'react-redux';
import { useQuery } from "@tanstack/react-query";
import {
  Link,
  useParams
} from "react-router-dom";
import { useTranslation } from "react-i18next";

import { httpClient } from '../../shared/api';
import {
  setShowAccessModal
} from '../../features/accessModal/accessModalSlice';
import {
  Loader,
  ThreeDotsIcon
} from '../../shared/ui';
import {
  formatLongNumber
} from '../../shared/helpers';

import styles from "./CurrentTopics.module.css";

export function CurrentTopics() {

  const dispatch = useDispatch();

  const darkThemeStatus = useSelector((state) => state.darkThemeStatus);

  // checking user log in
  const logInStatus = useSelector((state) => state.logInStatus)
  // /checking user log in

  const { changesAddressBar } = useParams();

  const topics = useQuery({
    queryKey: ['posts', 'currentTopics', changesAddressBar],
    queryFn: () => {
      const params =
        logInStatus ? { limit: 6 } : { limit: 6 };
      return httpClient.get('/hashtags/', params);
    },
    refetchOnWindowFocus: true,
    retry: false
  });

  const { t } = useTranslation();

  return (
    <div className={styles.current_topics} data-current-topics-dark-theme={darkThemeStatus}>
      <div className={styles.title}>
        <p>{t("CurrentTopics.CurrentTopics")}</p>
      </div>

      {topics.isPending &&
        <div className={styles.loader}>
          <Loader />
        </div>
      }

      {topics.isSuccess && (
        topics.data?.map((post) => (
          <div
            key={post.hashtag}
            className={styles.topic}
          >
            <div className={styles.name}>
              <p>{post.hashtag}</p>
            </div>
            <div className={styles.number_post_wrap}>
              <div className={styles.number}>
                <p>{formatLongNumber(post.numberPosts)}</p>
              </div>
              <div className={styles.post}>
                <p>{(post.numberPosts > 1000) ?
                  t("CurrentTopics.Posts")
                  :
                  t('CurrentTopics.key', { count: post.numberPosts })
                }</p>
              </div>
            </div>
            <button className={styles.options}
              onClick={() =>
                !logInStatus &&
                dispatch(setShowAccessModal(true)
                )}
            >
              <ThreeDotsIcon />
            </button>
            <Link to={/hashtags/ + post.hashtag.slice(1)}> </Link>
          </div>
        ))
      )}

      <button className={styles.show_more}>
        {t("CurrentTopics.ShowMore")}
      </button>
    </div>
  );
}
