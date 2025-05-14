import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../lib/api";
import toast from "react-hot-toast";

export const useLoginHook = () => {
  const queryClient = useQueryClient();
  const {
    mutate: loginMutate,
    isPending,
    error,
  } = useMutation({
    mutationFn: login,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["authUser"] }),
    onError: (error) => (
      console.log(error.response.data.message),
      toast.error(error.response.data.message)
    ),
  });

  return { loginMutate, isPending, error };
};
