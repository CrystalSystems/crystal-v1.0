import { useTranslation } from "react-i18next";
import styles from "./CookiesPolicyPage.module.css";

export function CookiesPolicyPage() {
  const { i18n } = useTranslation();
  return (
    <div className={styles.cookies_policy}>
      {i18n.language === "ru" ? (
        <>
          <h1>Политика использования файлов cookies на сайте crystal.you</h1>
          <p>
            Файлы cookies представляют собой небольшие текстовые файлы,
            включающие уникальный идентификатор, который посылается
            веб-сервером на ваш компьютер, мобильный телефон или другое
            устройство, подключенное к интернету, когда вы посещаете сайт
            или используете мобильное приложение. Файлы cookies широко
            используются для эффективной работы сайтов и сбора информации о
            сетевых предпочтениях пользователей.
          </p>
          <p>
            В любое время, вы можете запретить использование файлов cookies в
            вашем браузере. Чтобы получить инструкции по блокировке,
            удалению или отключению файлов cookies, воспользуйтесь
            средствами помощи и поддержки вашего браузера. Если вы удалите
            файлы cookies данного сайта или отключите возможность загружать
            файлы cookies в будущем, вы можете не получить доступ к
            определенным областям или функциям сайта www.crystal.you.
          </p>
        </>
      ) : (
        <>
          <h1>Cookies Policy on the crystal.you website</h1>
          <p>
            A cookies is a small text file containing a unique identifier
            that is sent by the web server to your computer, mobile phone or
            other Internet-connected device when you visit a website or use
            a mobile application. Cookies are widely used to help websites
            operate efficiently and to collect information about users
            online preferences.
          </p>
          <p>
            You can refuse the use of cookies in your browser at any time.
            Please refer to your browser&#39;s help and support tools for
            instructions on blocking, deleting, or disabling cookies. If you
            delete this website&#39;s cookies or disable the ability to download
            cookies in the future, you may not be able to access certain
            areas or features of the website www.crystal.you.
          </p>
        </>
      )}
    </div>
  );
};
