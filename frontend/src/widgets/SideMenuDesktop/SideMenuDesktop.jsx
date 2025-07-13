import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { useAuthData } from "../../features";
import {
  UserIcon,
  MessagesIcon,
  FriendsIcon,
  GroupsIcon,
  PhotosIcon,
  VideosIcon,
  BookmarkIcon,
  HelpIcon,
  CrystalIcon,
  LikeIcon,
  DocumentationIcon,
} from '../../shared/ui';

import styles from "./SideMenuDesktop.module.css";

export function SideMenuDesktop() {

  // authorized user
  const { authorizedUser } = useAuthData();
  // /authorized user

  const darkThemeStatus = useSelector((state) => state.darkThemeStatus);
  const { t } = useTranslation();

  if (!authorizedUser) {
    return null
  }

  return (
    <nav
      className={styles.side_menu_desktop}
      data-side-menu-desktop-dark-theme={darkThemeStatus}
    >
      <ul>
        <li className={styles.user}>
          <UserIcon />
          <p>{t("SideMenuDesktop.MyProfile")}</p>
          <Link to={"/" + authorizedUser.customId}></Link>
        </li>
        <li className={styles.messages}>
          <MessagesIcon />
          <p>{t("SideMenuDesktop.Messages")}</p>
          <Link to={`/${authorizedUser.customId}`}></Link>
        </li>
        <li className={styles.friends}>
          <FriendsIcon />
          <p>{t("SideMenuDesktop.Friends")}</p>
          <Link to={`/${authorizedUser.customId}`}></Link>
        </li>
        <li className={styles.groups}>
          <GroupsIcon />
          <p>{t("SideMenuDesktop.Communities")}</p>
          <Link to={`/${authorizedUser.customId}`}></Link>
        </li>
        <li className={styles.photo}>
          <PhotosIcon />
          <p>{t("SideMenuDesktop.Photo")}</p>
          <Link to={`/${authorizedUser.customId}`}></Link>
        </li>
        <li className={styles.video}>
          <VideosIcon />
          <p>{t("SideMenuDesktop.Video")}</p>
          <Link to={`/${authorizedUser.customId}`}></Link>
        </li>
        <li className={styles.bookmark}>
          <BookmarkIcon />
          <p>{t("SideMenuDesktop.Bookmarks")}</p>
          <Link to={`/${authorizedUser.customId}`}></Link>
        </li>
        <li className={styles.like}>
          <LikeIcon />
          <p>{t("SideMenuDesktop.Likes")}</p>
          <Link to={"/likes/" + authorizedUser.customId}></Link>
        </li>
        <li className={styles.crystal}>
          <CrystalIcon />
          <p>{t("SideMenuDesktop.AboutCrystal")}</p>
          <Link
            to={"/about-crystal"}
            target="_blank"
            rel="noreferrer"
          ></Link>
        </li>
        <li className={styles.agreements}>
          <DocumentationIcon />
          <p>{t("SideMenuDesktop.Agreements")}</p>
          <Link
            to={"/agreements"}
            target="_blank"
            rel="noreferrer"
          ></Link>
        </li>
        <li className={styles.help}>
          <HelpIcon />
          <p>{t("SideMenuDesktop.Help")}</p>
          <Link
            to={"/help"}
            target="_blank"
            rel="noreferrer"
          ></Link>
        </li>
      </ul>
    </nav>
  );
}
