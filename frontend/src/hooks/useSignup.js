import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signup } from "../lib/api";
import toast from "react-hot-toast";

export const useSignup = () => {
  const queryClient = useQueryClient();

  const {
    mutate: signupMutate,
    isPending,
    error,
  } = useMutation({
    mutationFn: signup,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["authUser"] }),
    onError: (error) => {
      console.log("error in signup", error);
      return toast.error(error.response.data.message);
    },
  });
  return { signupMutate, isPending, error };
};
