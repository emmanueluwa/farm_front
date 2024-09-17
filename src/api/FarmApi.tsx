import { FarmSearchResponse } from "@/types";
import { useQuery } from "react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const userSearchFarms = (city?: string) => {
  const createSearchRequest = async (): Promise<FarmSearchResponse> => {
    const response = await fetch(`${API_BASE_URL}/api/farm/search/${city}`);

    if (!response.ok) {
      throw new Error("failed to get farm");
    }

    return response.json();
  };

  const { data: results, isLoading } = useQuery(
    ["searchFarms"],
    createSearchRequest,
    //query will not run if city undefined
    { enabled: !!city }
  );

  return { results, isLoading };
};
