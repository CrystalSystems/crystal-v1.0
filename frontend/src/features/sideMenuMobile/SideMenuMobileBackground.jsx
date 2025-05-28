import styles from "./SideMenuMobileBackground.module.css";
import { useSelector } from "react-redux";

export function SideMenuMobileBackground() {
  const { showSideMenuMobileBackground, sideMenuMobileFadeOut } = useSelector(
    (state) => state.sideMenuMobile
  );

  return (
    <>
      {showSideMenuMobileBackground && (
        <div
          className={
            sideMenuMobileFadeOut
              ? `${styles.side_menu_mobile_background} ${styles.side_menu_mobile_background_fade_out}`
              : styles.side_menu_mobile_background
          }
        ></div>
      )}
    </>
  );
}
