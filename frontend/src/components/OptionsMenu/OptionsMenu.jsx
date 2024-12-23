import {
  OptionsMenuUser,
  OptionsMenuGuest
} from "./parts";
export function OptionsMenu() {
  // Checking user authorization
  const userIsAuthorizedСheck = window.localStorage.getItem("logIn");
  // /Checking user authorization
  return (
    <>
      {userIsAuthorizedСheck && <OptionsMenuUser />}
      {!userIsAuthorizedСheck && <OptionsMenuGuest />}
    </>
  );
}
