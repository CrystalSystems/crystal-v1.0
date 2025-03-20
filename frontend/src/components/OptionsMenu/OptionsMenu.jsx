import { useSelector } from "react-redux";
import {
  OptionsMenuUser,
  OptionsMenuGuest
} from "./parts";
export function OptionsMenu() {
  // Checking user authorization
  const userIsAuthorizedСheck = useSelector((state) => state.logInStatus)
  // /Checking user authorization
  return (
    <>
      {userIsAuthorizedСheck && <OptionsMenuUser />}
      {!userIsAuthorizedСheck && <OptionsMenuGuest />}
    </>
  );
}
