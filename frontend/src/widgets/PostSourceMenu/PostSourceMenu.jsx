import { useSelector } from 'react-redux';
import styles from "./PostSourceMenu.module.css";
import { useTranslation } from "react-i18next";

export function PostSourceMenu() {
  const { t } = useTranslation();

  // checking user log in
  const logInStatus = useSelector((state) => state.logInStatus)
  // /checking user log in

  return (
    <>
      {logInStatus && (
        <nav className={styles.post_source_menu}>
          <ul>
            <li>{t("PostSourceMenu.Subscriptions")}</li>
            <li>{t("PostSourceMenu.Preferences")}</li>
            <li className={styles.post_source_menu_item_active}>
              {t("PostSourceMenu.World")}
            </li>
            <li>{t("PostSourceMenu.Mine")}</li>
          </ul>
        </nav>
      )}
    </>
  );
}
