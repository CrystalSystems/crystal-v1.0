import {
  Routes,
  Route,
  useLocation
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

import { useAuth } from "../features";
import {
  AccessModal,
  SideMenuMobile,
  SideMenuMobileBackground,
} from '../features';
import {
  HomePage,
  FullPostPage,
  AddPostPage,
  EditPostPage,
  UserProfilePage,
  EditUserPage,
  HashtagPage,
  LikesPage,
  NotFoundPage,
  TermsPage,
  PrivacyPage,
  CookiesPolicyPage,
  AboutCrystalPage,
  AgreementsPage,
  HelpPage
} from '../pages';
import {
  SearchAndSort,
  CookiesBanner,
  UpButton
} from '../shared/ui';
import { HeaderMobile } from '../widgets';
import {
  RightSide,
  LeftSide
} from '../layout';

import styles from './App.module.css';

export default function App() {

  // auth
  useAuth()
  // /auth

  const location = useLocation()
  const defineFullPostPage = location.pathname.includes('/posts/')

  // dark theme
  const darkThemeStatus = useSelector((state) => state.darkThemeStatus);

  useEffect(() => {
    const html = document.documentElement;
    html.setAttribute('data-dark-theme', String(darkThemeStatus));
  }, [darkThemeStatus]);
  // /dark theme

  return (
    <div className={styles.app}>
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
            <SearchAndSort />

            <Routes>
              <Route path="/" element={<HomePage />} />

              {/* users */}
              <Route path="/:userId" element={<UserProfilePage />} />
              <Route path="/users/:userId/edit" element={<EditUserPage />} />
              <Route path="/likes/:userId" element={<LikesPage />} />
              {/* /users */}

              {/* posts */}
              <Route path="/posts/:postId" element={<FullPostPage />} />
              <Route path="/posts/new" element={<AddPostPage />} />
              <Route path="/posts/:postId/edit" element={<EditPostPage />} />
              <Route path="/hashtags/:tag" element={<HashtagPage />} />
              {/* /posts */}

              {/* agreements */}
              <Route path="/agreements" element={<AgreementsPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/cookies-policy" element={<CookiesPolicyPage />} />
              {/* /agreements */}

              {/* others */}
              <Route path="/about-crystal" element={<AboutCrystalPage />} />
              <Route path="/help" element={<HelpPage />} />
              {/* /others */}

              {/* 404 */}
              <Route path="*" element={<NotFoundPage />} />
              {/* /404 */}

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
