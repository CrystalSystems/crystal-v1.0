import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  useState,
  useEffect,
} from "react";
import styles from "./CookiesBanner.module.css";
import { useTranslation } from "react-i18next";

export function CookiesBanner() {
  const darkThemeStatus = useSelector((state) => state.darkThemeStatus);
  const { t } = useTranslation();
  const [cookiesAccept, setCookiesAccept] = useState(true);

  const cookiesAcceptButton = () => {
    localStorage.setItem("cookiesAccept", true);
    setCookiesAccept(true);
  };

  useEffect(() => {
    setCookiesAccept(window.localStorage.getItem("cookiesAccept"));
  }, []);

  return (
    <div
      className={
        cookiesAccept
          ? styles.cookies_wrap
          : `${styles.cookies_wrap} ${styles.cookies_visible}`
      }
      data-cookies-banner-dark-theme={darkThemeStatus}
    >
      <div className={styles.cookies}>
        <div className={styles.cookies_information}>
          <p>{t("CookiesBanner.Text")}</p>
        </div>
        <div className={styles.cookies_buttons}>
          <div className={styles.cookies_button_link}>
            <button>
              {t("CookiesBanner.ButtonMoreDetails")}
            </button>
            <Link
              to={"/cookies-policy"}
              target="_blank"
              rel="noreferrer"
            ></Link>
          </div>
          <button
            onClick={() => {
              cookiesAcceptButton();
            }}
          >
            {t("CookiesBanner.ButtonAccept")}
          </button>
        </div>
      </div>
    </div>
  );
}
