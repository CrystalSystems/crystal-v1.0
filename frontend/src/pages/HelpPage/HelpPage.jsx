import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styles from "./HelpPage.module.css";

export function HelpPage() {
  const { i18n } = useTranslation();
  
  return (
    <div className={styles.help}>
      {i18n.language === "ru" ? (
        <>
          <h1>Помощь</h1>
          <h2>Служба поддержки:</h2>
          <Link
            to={"mailto:crystalhelpservice@gmail.com"}
            target="_blank"
            rel="noreferrer"
          >CrystalHelpService@gmail.com</Link>
        </>
      ) : (
        <>
          <h1>Help</h1>
          <h2>Support service:</h2>
          <Link
            to={"mailto:crystalhelpservice@gmail.com"}
            target="_blank"
            rel="noreferrer"
          >CrystalHelpService@gmail.com</Link>
        </>
      )}
    </div>
  );
};
