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

export function useAuthorization() {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const authorizationGetQueryState = queryClient.getQueryState(['authorization']);
  const logInStatus = useSelector((state) => state.logInStatus);

  // authorization
  useQuery({
    queryKey: ['authorization'],
    enabled: logInStatus,
    refetchOnWindowFocus: true,
    retry: false,
    queryFn: async () =>
      await requestManager.get("/user/authorization").then((response) => {
        return response;
      }),
  });
  // /authorization

  // check for loss of localStorage and cookie data, and log out if data is lost
  useEffect(() => {
    if (!logInStatus
      || authorizationGetQueryState?.status === 'error'
    ) {
      window.localStorage.removeItem('logIn');
      queryClient.resetQueries({ queryKey: ['authorization'], exact: true });
      dispatch(setlogInStatus(false));
    }
  }, [authorizationGetQueryState, dispatch, queryClient, logInStatus]);
  // /check for loss of localStorage and cookie data, and log out if data is lost
}
