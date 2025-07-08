import { useEffect } from 'react';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import {
  useQuery,
  useQueryClient
} from '@tanstack/react-query';

import { httpClient } from '../../shared/api';
import { setlogInStatus } from './logInStatusSlice';

export function useAuth() {
  
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const logInStatus = useSelector((state) => state.logInStatus);

  // auth
  const { data, isError } = useQuery({
    queryKey: ['me'],
    enabled: logInStatus,
    refetchOnWindowFocus: true,
    retry: false,
    queryFn: async () =>
      await httpClient.get("/auth/me").then((response) => {
        return response;
      }),
  });
  // /auth

  // Check for loss of localStorage and cookie data, and log out if data is lost
  useEffect(() => {
    if (!logInStatus || isError) {
      window.localStorage.removeItem('logIn');
      queryClient.resetQueries({ queryKey: ['me'], exact: true });
      dispatch(setlogInStatus(false));
    }
  }, [logInStatus, dispatch, queryClient, isError]);
  // /Check for loss of localStorage and cookie data, and log out if data is lost

  return data;
}