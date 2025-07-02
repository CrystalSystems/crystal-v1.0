import { useDispatch, useSelector } from 'react-redux';

import { setDarkTheme } from './theme-slice';
import {
  SunIcon,
  HalfMoonIcon
} from '../../shared/ui';

import styles from './ThemeSwitcher.module.css';

export function ThemeSwitcher() {

  const darkThemeStatus = useSelector((state) => state.darkThemeStatus);

  const dispatch = useDispatch();

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
