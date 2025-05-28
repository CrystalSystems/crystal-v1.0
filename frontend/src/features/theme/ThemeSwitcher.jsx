import { useDispatch, useSelector } from "react-redux";
import { setDarkTheme } from "./theme-slice";
import styles from "./ThemeSwitcher.module.css";
import { SunIcon, HalfMoonIcon } from "../../components/SvgIcons";

export function ThemeSwitcher() {
  const dispatch = useDispatch();
  const darkThemeStatus = useSelector((state) => state.darkThemeStatus);

  const changeTheme = () => {
    dispatch(setDarkTheme(!darkThemeStatus));
    localStorage.setItem("darkTheme", !darkThemeStatus);
  };

  return (
    <button
      onClick={() => {
        changeTheme();
      }}
    >
      {darkThemeStatus ? (
        <div className={styles.sun}>
          <SunIcon />
        </div>
      ) : (
        <div className={styles.half_moon}>
          <HalfMoonIcon />
        </div>
      )}
    </button>
  );
}
