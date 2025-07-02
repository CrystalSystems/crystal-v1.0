import { useSelector } from "react-redux";
import {
  OptionsMenuUser,
  OptionsMenuGuest
} from "./parts";

export function OptionsMenu() {

  // checking user log in
  const logInStatus = useSelector((state) => state.logInStatus)
  // /checking user log in

  return (
    <>
      {logInStatus && <OptionsMenuUser />}
      {!logInStatus && <OptionsMenuGuest />}
    </>
  );
}
