import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../lib/api";

export const useLogout = () => {
  const queryClient = useQueryClient();

  const {
    mutate: logoutMutate,
    isPending,
    error,
  } = useMutation({
    mutationFn: logout,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["authUser"] }),
    onError: (error) => console.log(error.response.data.message),
  });

  return { logoutMutate, isPending, error };
};
