// formats the date as follows:
// Jul 4, 2025 dot 10:45 PM
// 4 июля 2025 dot 22:45

import { useTranslation } from 'react-i18next';

import styles from './FormattedPostDate.module.css';

export const useFormattedPostDate = (dateString, fullPost) => {

  const { i18n } = useTranslation();

  if (!dateString) return null;

  const date = new Date(dateString);
  const now = new Date();
  const lang = i18n.language;
  const isCurrentYear = date.getFullYear() === now.getFullYear();

  let datePart = '';
  let timePart = '';

  if (lang === 'ru') {
    datePart = date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      ...(isCurrentYear ? {} : { year: 'numeric' }),
    }).replace(/\s?г\.$/, '');

    timePart = date.toLocaleTimeString('ru-RU', {
      hour: '2-digit',
      minute: '2-digit',
    });
  } else {
    datePart = date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      ...(isCurrentYear ? {} : { year: 'numeric' }),
    });

    timePart = date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  }

  return {
    isCurrentYear,
    element: (
      <div className={styles.formatted_post_date_wrap}>
        <p>{datePart}</p>
        <div className={
          fullPost
            ? `${styles.separator}
             ${styles.separator_full_post}`
            : `${styles.separator} ${styles.separator_post_preview}`
        }></div>
        <p>{timePart}</p>
      </div>
    )
  };
};

