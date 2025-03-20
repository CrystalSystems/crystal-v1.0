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
  // Check for loss of localStorage and cookie data, and log out if data is lost
  useEffect(() => {
    if (!logInStatus
      || AuthorizationQuery?.status === "error"
    ) {
      window.localStorage.removeItem("logIn");
      queryClient.resetQueries({ queryKey: ["Authorization"], exact: true });
      dispatch(setlogInStatus(false));
    }
  }, [AuthorizationQuery, dispatch, queryClient, logInStatus]);
  // /Check for loss of localStorage and cookie data, and log out if data is lost
}
