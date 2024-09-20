import { Farm, Order } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetMyFarm = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getMyFarmRequest = async (): Promise<Farm> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/farm`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to get farm");
    }

    return response.json();
  };

  const { data: farm, isLoading } = useQuery("fetchMyFarm", getMyFarmRequest);

  return { farm, isLoading };
};

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

export const useUpdateMyFarm = () => {
  const { getAccessTokenSilently } = useAuth0();

  const updateMyFarmRequest = async (farmFormData: FormData): Promise<Farm> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/farm`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: farmFormData,
    });

    if (!response) {
      throw new Error("Failed to update farm");
    }

    return response.json();
  };

  const {
    mutate: updateFarm,
    isLoading,
    error,
    isSuccess,
  } = useMutation(updateMyFarmRequest);

  if (isSuccess) {
    toast.success("Farm updated");
  }

  if (error) {
    toast.error("Unable to update farm");
  }

  return { updateFarm, isLoading };
};

export const useGetMyFarmOrders = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getMyFarmOrdersRequest = async (): Promise<Order[]> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/farm/order`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch orders");
    }

    return response.json();
  };

  const { data: orders, isLoading } = useQuery(
    "fetchMyFarmOrders",
    getMyFarmOrdersRequest
  );

  return { orders, isLoading };
};
