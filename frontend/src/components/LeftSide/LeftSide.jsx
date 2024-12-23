import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  CurrentTopics,
  SideMenuDesktop
} from "../../components";
import { CrystalIcon } from "../../components/SvgIcons";
import styles from "./LeftSide.module.css";
export function LeftSide() {
  const darkThemeStatus = useSelector((state) => state.darkThemeStatus);
  // Checking user authorization
  const userIsAuthorizedСheck = window.localStorage.getItem("logIn");
  // /Checking user authorization
  return (
    <div className={
      userIsAuthorizedСheck
        ? styles.left_side
        : `${styles.left_side} ${styles.left_side_not_authorized_user}`
    }
      data-left-side-dark-theme={darkThemeStatus}
    >
      <div
        className={
          userIsAuthorizedСheck ?
            styles.logo_wrap
            :
            `${styles.logo_wrap} ${styles.logo_wrap_user_not_authorized}`
        }>
        <div
          className={
            userIsAuthorizedСheck ?
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
      {userIsAuthorizedСheck ?
        <SideMenuDesktop />
        :
        <CurrentTopics />}
    </div>
  );
}
