import { useEffect } from "react";
import {
  useDispatch,
  useSelector
} from "react-redux";
import {
  useQuery,
  useQueryClient
} from "@tanstack/react-query";
import { requestManager } from "../../requestManagement";
import { setlogInStatus } from "../access/logInStatusSlice";
export function Authorization() {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const AuthorizationQuery = queryClient.getQueryState(["Authorization"]);
  const logInStatus = useSelector((state) => state.logInStatus);
  const userIsAuthorizedСheck = window.localStorage.getItem("logIn");
  const authorizedUserDataCheck = window.localStorage.getItem("authorizedUserData");
  // Authorization query
  useQuery({
    queryKey: ["Authorization"],
    enabled: logInStatus,
    refetchOnWindowFocus: true,
    retry: false,
    queryFn: async () =>
      await requestManager.get("/authorization").then((response) => {
        return response.data;
      }),
  });
  // /Authorization query
  // Checking for loss, required login data and logging out if lost
  useEffect(() => {
    if (!authorizedUserDataCheck
      || !userIsAuthorizedСheck
      || AuthorizationQuery?.status === "error"
    ) {
      window.localStorage.removeItem("authorizedUserData");
      window.localStorage.removeItem("logIn");
      queryClient.resetQueries({ queryKey: ["Authorization"], exact: true });
      dispatch(setlogInStatus(false));
    }
  }, [AuthorizationQuery, authorizedUserDataCheck, dispatch, queryClient, userIsAuthorizedСheck]);
  // //Checking for loss, required login data and logging out if lost
}
