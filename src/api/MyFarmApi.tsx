import { Farm } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useCreateMyFarm = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createMyFarmRequest = async (farmFormData: FormData): Promise<Farm> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/farm`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: farmFormData,
    });

    if (!response.ok) {
      throw new Error("Failed to create farm");
    }

    return response.json();
  };

  const {
    mutate: createFarm,
    isLoading,
    isSuccess,
    error,
  } = useMutation(createMyFarmRequest);

  if (isSuccess) {
    toast.success("Farm updated :)");
  }

  if (error) {
    toast.error("Unable to update restaurant");
  }

  return { createFarm, isLoading };
};
