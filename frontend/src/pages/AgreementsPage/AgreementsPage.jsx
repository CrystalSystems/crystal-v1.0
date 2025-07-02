import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styles from "./AgreementsPage.module.css";

export function AgreementsPage() {
  const { i18n } = useTranslation();
  return (
    <div className={styles.agreements}>
      {i18n.language === "ru" ? (
        <>
          <h1>Соглашения</h1>
          <div className={styles.agreements_links}>
            <Link
              to={"/terms"}
              target="_blank"
              rel="noreferrer"
            >Условия пользовательского соглашения</Link>
            <Link
              to={"/privacy"}
              target="_blank"
              rel="noreferrer"
            >Политика конфиденциальности</Link>
            <Link
              to={"/cookies-policy"}
              target="_blank"
              rel="noreferrer"
            >Политика использования файлов cookies</Link>
          </div>
        </>
      ) : (
        <>
          <h1>Agreements</h1>
          <div className={styles.agreements_links}>
            <Link
              to={"/terms"}
              target="_blank"
              rel="noreferrer"
            >Terms of user agreement</Link>
            <Link
              to={"/privacy"}
              target="_blank"
              rel="noreferrer"
            >Privacy Policy</Link>
            <Link
              to={"/cookies-policy"}
              target="_blank"
              rel="noreferrer"
            >Cookies Policy</Link>
          </div>
        </>
      )}
    </div>
  );
};
