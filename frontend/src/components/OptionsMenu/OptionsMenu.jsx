import { useSelector } from "react-redux";
import {
  OptionsMenuUser,
  OptionsMenuGuest
} from "./parts";
export function OptionsMenu() {
  // Checking user log in
  const logInStatus = useSelector((state) => state.logInStatus)
  // /Checking user log in
  return (
    <>
      {logInStatus && <OptionsMenuUser />}
      {!logInStatus && <OptionsMenuGuest />}
    </>
  );
}
