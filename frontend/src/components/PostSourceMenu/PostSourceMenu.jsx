
import styles from "./PostSourceMenu.module.css";
import { useTranslation } from "react-i18next";
export function PostSourceMenu() {
  const { t } = useTranslation();
  // Checking user authorization
  const userIsAuthorizedСheck = window.localStorage.getItem("logIn");
  // /Checking user authorization
  return (
    <>
      {userIsAuthorizedСheck && (
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
