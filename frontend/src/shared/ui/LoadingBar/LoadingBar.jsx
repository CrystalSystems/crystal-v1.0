import { useSelector } from "react-redux";
import { number } from 'prop-types';
import styles from "./LoadingBar.module.css";

export function LoadingBar({ value = 0 }) {
  const darkThemeStatus = useSelector((state) => state.darkThemeStatus);

  LoadingBar.propTypes = {
    value: number,
  };

  return (
    <div
      className={styles.loading_bar}
      data-loading-bar-dark-theme={darkThemeStatus}>
      <div
        className={styles.loading_bar_filling}
        style={{ width: `${value}%` }}
      ></div>
    </div>
  );
}
