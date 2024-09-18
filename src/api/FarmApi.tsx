import { SearchState } from "@/pages/SearchPage";
import { Farm, FarmSearchResponse } from "@/types";
import { useQuery } from "react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetFarm = (farmId?: string) => {
  const getFarmByIdRequest = async (): Promise<Farm> => {
    const response = await fetch(`${API_BASE_URL}/api/farm/${farmId}`);

    if (!response.ok) {
      throw new Error("Failed to get farm");
    }

    return response.json();
  };

  const { data: farm, isLoading } = useQuery("fetchFarm", getFarmByIdRequest, {
    //only enable query if we have farmId, prevents query being called when there is no id (error + waste of api call)
    enabled: !!farmId,
  });

  return { farm, isLoading };
};

export const userSearchFarms = (searchState: SearchState, city?: string) => {
  const createSearchRequest = async (): Promise<FarmSearchResponse> => {
    const params = new URLSearchParams();
    params.set("searchQuery", searchState.searchQuery);
    params.set("page", searchState.page.toString());
    //convert array to comma separated string, to avoid issues with urlencoding in backend
    params.set("selectedProduce", searchState.selectedProduce.join(","));
    params.set("sortOption", searchState.sortOption);

    const response = await fetch(
      `${API_BASE_URL}/api/farm/search/${city}?${params.toString()}`
    );

    if (!response.ok) {
      throw new Error("failed to get farm");
    }

    return response.json();
  };

  const { data: results, isLoading } = useQuery(
    ["searchFarms", searchState],
    createSearchRequest,
    //query will not run if city undefined
    { enabled: !!city }
  );

  return { results, isLoading };
};
