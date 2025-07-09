import { useSelector } from 'react-redux';
import { SearchIcon } from '../../../shared/ui';

import styles from './Search.module.css';

export function Search() {

  const darkThemeStatus = useSelector((state) => state.darkThemeStatus);
  
  return (
    <div
      className={styles.search}
      data-search-dark-theme={darkThemeStatus}
    >
      <form role="search">
        <input></input>
        <SearchIcon />
      </form>
    </div>
  );
}
