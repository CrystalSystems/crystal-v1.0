import { useSelector } from 'react-redux';
import {
  OptionsMenu,
  CurrentTopics,
  RecommendedUsers,
} from "../../components";
import styles from "./RightSide.module.css";
export function RightSide() {
  const darkThemeStatus = useSelector((state) => state.darkThemeStatus);
  // Checking user authorization
  const userIsAuthorizedСheck = window.localStorage.getItem("logIn");
  // /Checking user authorization
  return (
    <div
      className={styles.right_side}
      data-right-side-dark-theme={darkThemeStatus}
    >
      <div className={styles.options_menu}>
        <OptionsMenu />
      </div>
      <RecommendedUsers />
      {userIsAuthorizedСheck && <CurrentTopics />}
    </div>
  );
}
