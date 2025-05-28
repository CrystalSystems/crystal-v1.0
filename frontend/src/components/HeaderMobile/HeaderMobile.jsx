import {
  useState,
  useEffect
} from "react";
import {
  useSelector
} from 'react-redux';
import { Link } from "react-router-dom";
import { CrystalIcon } from "../SvgIcons";
import styles from "./HeaderMobile.module.css";
import { OptionsMenu } from "../";

export function HeaderMobile() {
  // checking user log in
  const logInStatus = useSelector((state) => state.logInStatus)
  // /checking user log in

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
        {(!logInStatus && showLogo) && <p>Crystal</p>}
      </Link>
      <OptionsMenu />
    </div>
  );
}
