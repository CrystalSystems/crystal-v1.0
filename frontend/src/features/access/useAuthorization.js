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
  const { status, data } = useQuery({
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

  useEffect(() => {
    if (!logInStatus || status === 'error') {
      window.localStorage.removeItem('logIn');
      queryClient.resetQueries({ queryKey: ['authorization'], exact: true });
      dispatch(setlogInStatus(false));
    }
  }, [status, logInStatus, dispatch, queryClient]);

  return data;
}