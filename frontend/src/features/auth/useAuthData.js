import { useQueryClient } from "@tanstack/react-query";

export function useAuthData() {

  const queryClient = useQueryClient();
  const data = queryClient.getQueryData(['me']);
  const state = queryClient.getQueryState(['me']);

  return {
    authorizedUser: data,
    status: state?.status || "idle",
    isPending: state?.status === "pending",
    isError: state?.status === "error",
    isSuccess: state?.status === "success"
  };
}
