import {
  useEffect,
  useState
} from "react";
import { useSelector } from "react-redux";

import { UpButtonIcon } from "../../../shared/ui";

import styles from "./UpButton.module.css";

export function UpButton() {
  const darkThemeStatus = useSelector((state) => state.darkThemeStatus);
  const [showUpButton, setShowUpButton] = useState(false);
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", () => {
      window.scrollY > 300 ?
        setShowUpButton(true)
        :
        setShowUpButton(false);
    });
  }, []);

  return (
    showUpButton &&
    <div
      onClick={scrollToTop}
      className={styles.up_button}
      data-up-button-dark-theme={darkThemeStatus}
      >
      <UpButtonIcon />
    </div>
  );
}
