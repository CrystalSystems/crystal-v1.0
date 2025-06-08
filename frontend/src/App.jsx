import { useEffect } from "react";
import {
  Routes,
  Route,
  useLocation
} from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "./App.module.css";
import {
  AccessModal,
  SideMenuMobile,
  SideMenuMobileBackground,
} from "./features";
import {
  HomePage,
  FullPostPage,
  AddPostPage,
  EditPostPage,
  UserProfilePage,
  EditUserPage,
  HashtagPage,
  LikedPage,
  Terms,
  Privacy,
  CookiesPolicy,
  AboutCrystal,
  Agreements,
  Help
} from "./pages";
import {
  HeaderMobile,
  RightSide,
  LeftSide,
  NotFoundPage,
  Search,
  CookiesBanner,
  UpButton
} from "./components";

export default function App() {
  const location = useLocation()
  const defineFullPostPage = location.pathname.includes('/post/')

  // dark theme
  const darkThemeStatus = useSelector((state) => state.darkThemeStatus);
  useEffect(() => {
    const html = document.getElementsByTagName('html')[0];
    darkThemeStatus ?
      html.classList.add('dark-mode')
      :
      html.classList.remove('dark-mode')
  }, [darkThemeStatus]);
  // /dark theme

  return (
    <div className={styles.app} data-dark-theme={darkThemeStatus}>
      <div className={styles.left_center_right_parts_wrap}>
        <div className={styles.left_center_right_parts}>
          <div className={styles.left_side_wrap}>
            <LeftSide />
          </div>
          <div className={
            defineFullPostPage
              ? `${styles.center} ${styles.center_full}`
              : styles.center
          }>
            <div className={styles.header_mobile_wrap}>
              <HeaderMobile />
              <SideMenuMobile />
            </div>
            <Search />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/post/:postId" element={<FullPostPage />} />
              <Route path="/:userId" element={<UserProfilePage />} />
              <Route path="/user/edit/:userId" element={<EditUserPage />} />
              <Route path="/post/add" element={<AddPostPage />} />
              <Route path="/post/edit/:postId" element={<EditPostPage />} />
              <Route path="/hashtag/:hashtagName" element={<HashtagPage />} />
              <Route path="/liked/:userId" element={<LikedPage />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/cookies-policy" element={<CookiesPolicy />} />
              <Route path="/about-crystal" element={<AboutCrystal />} />
              <Route path="/agreements" element={<Agreements />} />
              <Route path="/help" element={<Help />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
          <div className={styles.right_side_wrap}>
            <RightSide />
          </div>
        </div>
      </div>
      <CookiesBanner />
      <AccessModal />
      <SideMenuMobileBackground />
      <UpButton />
    </div>
  );
}
