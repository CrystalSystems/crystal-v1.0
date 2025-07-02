import { useSelector } from 'react-redux';

import {
  OptionsMenu,
  CurrentTopics,
  RecommendedUsers,
} from "../../widgets";

import styles from "./RightSide.module.css";

export function RightSide() {

  const darkThemeStatus = useSelector((state) => state.darkThemeStatus);

  // checking user log in
  const logInStatus = useSelector((state) => state.logInStatus)
  // /checking user log in

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
