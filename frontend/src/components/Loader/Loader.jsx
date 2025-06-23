import styles from "./Loader.module.css";
import { useSelector } from 'react-redux';
export function Loader() {
  const darkThemeStatus = useSelector((state) => state.darkThemeStatus);

  return (
    <div className={styles.loader} data-loader-dark-theme={darkThemeStatus}>
    </div>
  );
}
