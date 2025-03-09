import {
  useDispatch,
  useSelector
} from 'react-redux';
import { requestManager } from "../../requestManagement";
import {
  Link,
  useParams
} from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ThreeDotsIcon } from "../SvgIcons";
import { useQuery } from "@tanstack/react-query";
import { setShowAccessModal } from '../../features/accessModal/accessModalSlice';
import styles from "./CurrentTopics.module.css";
export function CurrentTopics() {
  const darkThemeStatus = useSelector((state) => state.darkThemeStatus);
  const dispatch = useDispatch();
  // Checking user authorization
  const userIsAuthorizedСheck = window.localStorage.getItem("logIn");
  // /Checking user authorization
  const { changesAddressBar } = useParams();
  const topicsQuery = useQuery({
    queryKey: ["Posts", "CurrentTopics", changesAddressBar],
    refetchOnWindowFocus: true,
    queryFn: () =>
      requestManager.get("/hashtag/get/all").then((response) => {
        return response.data;
      }),
    retry: false,
  });
  const hashtagsData = userIsAuthorizedСheck ? topicsQuery.data?.slice(0, 5) : topicsQuery.data?.slice(0, 5);
  const { t } = useTranslation();
  // Formatting a long number
  const formattingLongNumber = Intl.NumberFormat('en', {
    notation: 'compact',
  });
  // /Formatting a long number
  if (topicsQuery.status === "pending") {
    return null;
  }
  return (
    <div className={styles.current_topics} data-current-topics-dark-theme={darkThemeStatus}>
      <div className={styles.title}>
        <p>{t("CurrentTopics.CurrentTopics")}</p>
      </div>
      {topicsQuery.status === "success" && (
        hashtagsData?.map((post) => (
          <div
            key={post.hashtagName}
            className={styles.topic}
          >
            <div className={styles.name}>
              <p>{post.hashtagName}</p>
            </div>
            <div className={styles.number_post_wrap}>
              <div className={styles.number}>
                <p>{formattingLongNumber.format(post.numberPosts)}</p>
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
                !userIsAuthorizedСheck &&
                dispatch(setShowAccessModal(true)
                )}
            >
              <ThreeDotsIcon />
            </button>
            <Link to={/hashtag/ + post.hashtagName.slice(1)}> </Link>
          </div>
        ))
      )}
      <button className={styles.show_more}>
        {t("CurrentTopics.ShowMore")}
      </button>
    </div>
  );
}
