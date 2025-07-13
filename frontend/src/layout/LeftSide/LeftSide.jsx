import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  CurrentTopics,
  SideMenuDesktop
} from "../../widgets";
import { CrystalIcon } from "../../shared/ui";

import styles from "./LeftSide.module.css";

export function LeftSide() {
  const darkThemeStatus = useSelector((state) => state.darkThemeStatus);

  // checking user log in
  const logInStatus = useSelector((state) => state.logInStatus)
  // /checking user log in

  return (
    <div className={
      logInStatus
        ? styles.left_side
        : `${styles.left_side} ${styles.left_side_not_authorized_user}`
    }
      data-left-side-dark-theme={darkThemeStatus}
    >
      <div
        className={
          logInStatus ?
            styles.logo_wrap
            :
            `${styles.logo_wrap} ${styles.logo_wrap_user_not_authorized}`
        }>
        <div
          className={
            logInStatus ?
              styles.logo
              :
              `${styles.logo} ${styles.logo_user_not_authorized}`
          }
        >
          <div className={styles.crystal_icon}>
            <CrystalIcon />
          </div>
          <p>Crystal</p>
        </div>
        <Link to="/"></Link>
      </div>
      {logInStatus ?
        <SideMenuDesktop />
        :
        <CurrentTopics />}
    </div>
  );
}
