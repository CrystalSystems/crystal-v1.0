import { useSelector } from 'react-redux';
import { SortLeftIcon } from '../../../shared/ui';

import styles from './Sort.module.css';

export function Sort() {

  const darkThemeStatus = useSelector((state) => state.darkThemeStatus);

  return (
    <div
      className={styles.sort_wrap}
      data-sort-wrap-dark-theme={darkThemeStatus}
    >
      <div
        className={styles.sort}>
        <SortLeftIcon />
      </div>
    </div>
  );
}
