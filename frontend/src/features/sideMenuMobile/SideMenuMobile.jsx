import {
  useEffect,
  useRef
} from 'react';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { useAuthData } from "../../features";
import {
  setShowSideMenuMobile,
  setShowSideMenuMobileBackground,
  setSideMenuMobileFadeOut,
} from './sideMenuMobileSlice';
import {
  UserIcon,
  MessagesIcon,
  FriendsIcon,
  GroupsIcon,
  PhotosIcon,
  VideosIcon,
  BookmarkIcon,
  LikeIcon,
  HelpIcon,
  CrystalIcon,
  DocumentationIcon,
} from '../../shared/ui';

import styles from "./SideMenuMobile.module.css";

export function SideMenuMobile() {

  // authorized user
  const { authorizedUser } = useAuthData();
  // /authorized user

  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { showSideMenuMobile, sideMenuMobileFadeOut } = useSelector(
    (state) => state.sideMenuMobile
  );

  // Click tracking outside the menu
  const sideMenuMobileRef = useRef();
  useEffect(() => {
    if (sideMenuMobileRef.current) {
      const handler = (e) => {
        !sideMenuMobileRef.current.contains(e.target) &&
          dispatch(setSideMenuMobileFadeOut(true));
      };
      document.addEventListener("mousedown", handler);
      return () => {
        document.removeEventListener("mousedown", handler);
      };
    }
  });
  //  /Click tracking outside the menu

  // hide body scroll when opening menu
  useEffect(() => {
    showSideMenuMobile
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "auto");
  }, [showSideMenuMobile]);
  // /hide body scroll when opening menu

  if (!authorizedUser) {
    return null
  }

  return (
    <>
      {showSideMenuMobile && (
        <div
          ref={sideMenuMobileRef}
          className={
            sideMenuMobileFadeOut
              ? `${styles.side_menu_mobile_wrap} ${styles.side_menu_mobile_fade_out}`
              : styles.side_menu_mobile_wrap
          }
          onAnimationEnd={(e) => {
            if (e.animationName === styles.fadeOut) {
              dispatch(setShowSideMenuMobile(false));
              dispatch(setShowSideMenuMobileBackground(false));
              dispatch(setSideMenuMobileFadeOut(false));
            }
          }}
        >
          <nav
            onClick={() => dispatch(setSideMenuMobileFadeOut(true))}
            className={styles.side_menu_mobile}
          >
            <ul>
              <li className={styles.user}>
                <UserIcon />
                {t("SideMenuMobile.MyProfile")}
                <Link to={"/" + authorizedUser.customId}></Link>
              </li>
              <li className={styles.messages}>
                <MessagesIcon />
                {t("SideMenuMobile.Messages")}
                <Link to={"/" + authorizedUser.customId}></Link>
              </li>
              <li className={styles.friends}>
                <FriendsIcon />
                {t("SideMenuMobile.Friends")}
                <Link to={"/" + authorizedUser.customId}></Link>
              </li>
              <li className={styles.groups}>
                <GroupsIcon />
                {t("SideMenuMobile.Communities")}
                <Link to={"/" + authorizedUser.customId}></Link>
              </li>
              <li className={styles.photo}>
                <PhotosIcon />
                {t("SideMenuMobile.Photo")}
                <Link to={"/" + authorizedUser.customId}></Link>
              </li>
              <li className={styles.video}>
                <VideosIcon />
                {t("SideMenuMobile.Video")}
                <Link to={"/" + authorizedUser.customId}></Link>
              </li>
              <li className={styles.bookmark}>
                <BookmarkIcon />
                {t("SideMenuMobile.Bookmarks")}
                <Link to={"/" + authorizedUser.customId}></Link>
              </li>
              <li className={styles.like}>
                <LikeIcon />
                {t("SideMenuMobile.Likes")}
                <Link to={"/likes/" + authorizedUser.customId}></Link>
              </li>
              <li className={styles.crystal}>
                <CrystalIcon />
                {t("SideMenuMobile.AboutCrystal")}
                <Link
                  to={"/about-crystal"}
                  target="_blank"
                  rel="noreferrer"
                ></Link>
              </li>
              <li className={styles.agreements}>
                <DocumentationIcon />
                {t("SideMenuMobile.Agreements")}
                <Link
                  to={"/agreements"}
                  target="_blank"
                  rel="noreferrer"
                ></Link>
              </li>
              <li className={styles.help}>
                <HelpIcon />
                {t("SideMenuMobile.Help")}
                <Link
                  to={"/help"}
                  target="_blank"
                  rel="noreferrer"
                ></Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </>
  );
}
