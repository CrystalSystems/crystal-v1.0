import {
  Search,
  Sort
} from '../../../shared/ui';

import styles from './SearchAndSort.module.css';

export function SearchAndSort() {

  return (
    <div className={styles.search_and_sort_wrap}>
      <Sort />
      <Search />
    </div>
  );
}
