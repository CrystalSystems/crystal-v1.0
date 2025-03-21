import { useSelector } from 'react-redux';
import {
  OptionsMenu,
  CurrentTopics,
  RecommendedUsers,
} from "../../components";
import styles from "./RightSide.module.css";
export function RightSide() {
  const darkThemeStatus = useSelector((state) => state.darkThemeStatus);
  // Checking user log in
  const logInStatus = useSelector((state) => state.logInStatus)
  // /Checking user log in
  return (
    <div
      className={styles.right_side}
      data-right-side-dark-theme={darkThemeStatus}
    >
      <div className={styles.options_menu}>
        <OptionsMenu />
      </div>
      <RecommendedUsers />
      {logInStatus && <CurrentTopics />}
    </div>
  );
}
