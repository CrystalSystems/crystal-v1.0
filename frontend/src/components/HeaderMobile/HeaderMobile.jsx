import {
  useState,
  useEffect
} from "react";
import { Link } from "react-router-dom";
import { CrystalIcon } from "../SvgIcons";
import styles from "./HeaderMobile.module.css";
import { OptionsMenu } from "../";
export function HeaderMobile() {
  // Checking user authorization
  const userIsAuthorizedСheck = window.localStorage.getItem("logIn");
  // /Checking user authorization
  const [showLogo, setShowLogo] = useState(true);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 20) {
        setShowLogo(false);
      } else {
        setShowLogo(true);
      }
    });
  }, []);
  return (
    <div className={styles.header_mobile}>
      <Link className={styles.logo} to="/">
        <CrystalIcon />
        {(!userIsAuthorizedСheck && showLogo) && <p>Crystal</p>}
      </Link>
      <OptionsMenu />
    </div>
  );
}
