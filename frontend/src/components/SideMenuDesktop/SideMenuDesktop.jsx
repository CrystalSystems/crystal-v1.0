import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import {
  useQueryClient
} from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
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
} from "../../components/SvgIcons";
import styles from "./SideMenuDesktop.module.css";
export function SideMenuDesktop() {
  const queryClient = useQueryClient();

  // Authorized user
  const authorizedUser = queryClient.getQueryState(['Authorization'])
  // /Authorized user

  const darkThemeStatus = useSelector((state) => state.darkThemeStatus);
  const { t } = useTranslation();

  if (!authorizedUser.data) {
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
          <p>{t("DesktopSideMenu.MyProfile")}</p>
          <Link to={"/" + authorizedUser.data.customId}></Link>
        </li>
        <li className={styles.messages}>
          <MessagesIcon />
          <p>{t("DesktopSideMenu.Messages")}</p>
          <Link to={`/${authorizedUser.data.customId}`}></Link>
        </li>
        <li className={styles.friends}>
          <FriendsIcon />
          <p>{t("DesktopSideMenu.Friends")}</p>
          <Link to={`/${authorizedUser.data.customId}`}></Link>
        </li>
        <li className={styles.groups}>
          <GroupsIcon />
          <p>{t("DesktopSideMenu.Communities")}</p>
          <Link to={`/${authorizedUser.data.customId}`}></Link>
        </li>
        <li className={styles.photo}>
          <PhotosIcon />
          <p>{t("DesktopSideMenu.Photo")}</p>
          <Link to={`/${authorizedUser.data.customId}`}></Link>
        </li>
        <li className={styles.video}>
          <VideosIcon />
          <p>{t("DesktopSideMenu.Video")}</p>
          <Link to={`/${authorizedUser.data.customId}`}></Link>
        </li>
        <li className={styles.like}>
          <LikeIcon />
          <p>{t("DesktopSideMenu.Liked")}</p>
          <Link to={"/liked/" + authorizedUser.data.customId}></Link>
        </li>
        <li className={styles.bookmark}>
          <BookmarkIcon />
          <p>{t("DesktopSideMenu.Bookmarks")}</p>
          <Link to={`/${authorizedUser.data.customId}`}></Link>
        </li>
        <li className={styles.crystal}>
          <CrystalIcon />
          <p>{t("DesktopSideMenu.AboutCrystal")}</p>
          <Link
            to={"/about-crystal"}
            target="_blank"
            rel="noreferrer"
          ></Link>
        </li>
        <li className={styles.agreements}>
          <DocumentationIcon />
          <p>{t("DesktopSideMenu.Agreements")}</p>
          <Link
            to={"/agreements"}
            target="_blank"
            rel="noreferrer"
          ></Link>
        </li>
        <li className={styles.help}>
          <HelpIcon />
          <p>{t("DesktopSideMenu.Help")}</p>
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
