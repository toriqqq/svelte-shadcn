import { useMutation, useQueryClient } from "@sveltestack/svelte-query";
import api from "./consumeApi";
import { authStore } from "../store/store";
import { toast } from "svelte-sonner";
import { useQuery } from "@sveltestack/svelte-query";

export const useAuthMutation = () => {
  return useMutation(
    async (values: { username: string; password: string }) => {
      await api
        .post<{ result: { token: string } }>("login", values, {
          withCredentials: true,
        })
        .then(() => {
          authStore.set(true);
          toast.success("Login berhasil");
        })
        .catch((error: any) => {
          toast.error(error?.response?.data?.message || "err....");
        });
    },
    {
      mutationKey: ["login"],
    }
  );
};

export const useLogoutMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async () => {
      await api
        .post(
          "/auth/sign-out",
          {},
          {
            withCredentials: true,
          }
        )
        .then(() => {
          authStore.set(false);
          toast.success("Logout success");
          queryClient.invalidateQueries("auth");
          // navigate("/auth/login");
        })
        .catch((error: any) => {
          toast.error(error?.response?.data?.message || "An error occurred");
        });
    },
    {
      mutationKey: ["logout"],
    }
  );
};

export const verifyUser = () => {
  return useQuery({
    queryKey: ["auth"],
    queryFn: async (): Promise<{
      info: string;
    }> => {
      const response = await api
        .get(`restricted`, {
          withCredentials: true,
        })
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          throw new Error(error);
        });
      return response;
    },
    retry: false,
  });
};
