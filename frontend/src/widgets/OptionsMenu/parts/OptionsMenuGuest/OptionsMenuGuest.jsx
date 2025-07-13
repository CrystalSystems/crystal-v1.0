import {
  useState,
  useEffect,
  useRef
} from "react";
import {
  useDispatch,
  useSelector
} from "react-redux";
import { Link } from 'react-router-dom';
import { useTranslation } from "react-i18next";

import { ThemeSwitcher } from "../../../../features/theme/ThemeSwitcher";
import { setShowAccessModal } from "../../../../features/accessModal/accessModalSlice";
import {
  AuthorizationIcon,
  PlusIcon,
  DotsMenuIcon,
  LanguageIcon,
  SearchIcon,
  HelpIcon,
  CrystalIcon,
  DocumentationIcon,
} from "../../../../shared/ui";

import styles from "./OptionsMenuGuest.module.css";

export function OptionsMenuGuest() {

  const darkThemeStatus = useSelector((state) => state.darkThemeStatus);

  const dispatch = useDispatch();

  const [
    showGuestMenuList,
    setShowGuestMenuList
  ] = useState(false);

  const [
    fadeOutGuestMenuList,
    setFadeOutGuestMenuList
  ] = useState(false);
  const guestMenuListRef = useRef();

  const onClickShowGuestMenuList = (open) => {
    if (open) {
      setShowGuestMenuList(true);
    } else {
      setFadeOutGuestMenuList(true);
    }
  };

  const { t, i18n } = useTranslation();
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  const [lang, setlang] = useState();

  useEffect(() => {
    switch (
    i18n.language.length > 3 ? i18n.language.slice(0, -3) : i18n.language
    ) {
      case "en":
        setlang("ru");
        break;
      case "ru":
        setlang("en");
        break;
      default:
        setlang("ru");
    }
  }, [i18n.language]);

  const changeLang = () => {
    setlang((state) => (state === "en" ? "ru" : "en"));
    changeLanguage(lang);
  };

  // Closing a menu list when clicking outside its field
  useEffect(() => {
    if (guestMenuListRef.current) {
      const handler = (e) => {
        if (!guestMenuListRef.current.contains(e.target)) {
          setFadeOutGuestMenuList(true);
        }
      };
      document.addEventListener("mousedown", handler);
      return () => {
        document.removeEventListener("mousedown", handler);
      };
    }
  });
  // /Closing a menu list when clicking outside its field

  const [showSearchIcon, setShowSearchIcon] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 20) {
        setShowSearchIcon(true);
      } else {
        setShowSearchIcon(false);
      }
    });
  }, []);

  return (
    <div className={styles.options_menu_guest} data-options-menu-guest-dark-theme={darkThemeStatus}>
      <button
        onClick={() => dispatch(setShowAccessModal(true))}
        className={styles.add_post}
      >
        <PlusIcon />
      </button>
      <button
        className={
          showSearchIcon
            ? styles.search_icon
            : styles.search_icon + " " + styles.search_icon_hide
        }
      >
        <SearchIcon />
      </button>
      <ThemeSwitcher />
      <button
        className={styles.guest_menu_button}
        onClick={() => onClickShowGuestMenuList(!showGuestMenuList)}
      >
        <DotsMenuIcon />
      </button>
      {showGuestMenuList && (
        <nav
          ref={guestMenuListRef}
          className={
            fadeOutGuestMenuList
              ? `${styles.guest_menu_list} ${styles.guest_menu_list_fade_out}`
              : `${styles.guest_menu_list}`
          }
          onAnimationEnd={(e) => {
            if (e.animationName === styles.fadeOut) {
              setShowGuestMenuList(false);
              setFadeOutGuestMenuList(false);
            }
          }}
        >
          <ul>
            <li className={styles.guest_menu_list_about_crystal}>
              <CrystalIcon />
              {t("OptionsMenuGuest.AboutCrystal")}
              <Link
                to={"/about-crystal"}
                target="_blank"
                rel="noreferrer"
              ></Link>
            </li>
            <li className={styles.guest_menu_list_agreements}>
              <DocumentationIcon />
              {t("OptionsMenuGuest.Agreements")}
              <Link
                to={"/agreements"}
                target="_blank"
                rel="noreferrer"
              ></Link>
            </li>
            <li className={styles.guest_menu_list_help}>
              <HelpIcon />
              {t("OptionsMenuGuest.Help")}
              <Link
                to={"/help"}
                target="_blank"
                rel="noreferrer"
              ></Link>
            </li>
            <li
              className={styles.guest_menu_list_lang}
              onClick={() => changeLang()}
            >
              <LanguageIcon />
              {lang === "en" ? <span>English</span> : <span>Русский</span>}
            </li>
          </ul>
        </nav>
      )}
      <button
        className={styles.authorization}
        onClick={() => dispatch(setShowAccessModal(true))}
      >
        <AuthorizationIcon />
      </button>
    </div>
  );
}
