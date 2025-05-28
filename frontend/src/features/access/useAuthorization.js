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
  const logInStatus = useSelector((state) => state.logInStatus);

  // authorization
  const { status } = useQuery({
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

  // Check for loss of localStorage and cookie data, and log out if data is lost
  useEffect(() => {
    if (!logInStatus || status === "error") {
      window.localStorage.removeItem('logIn');
      queryClient.resetQueries({ queryKey: ['authorization'], exact: true });
      dispatch(setlogInStatus(false));
    }
  }, [status, dispatch, queryClient, logInStatus]);
  // /Check for loss of localStorage and cookie data, and log out if data is lost
}
