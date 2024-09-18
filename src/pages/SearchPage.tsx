import { userSearchFarms } from "@/api/FarmApi";
import PaginationSelector from "@/components/PaginationSelector";
import ProduceFilter from "@/components/ProduceFilter";
import SearchBar, { SearchForm } from "@/components/SearchBar";
import SearchOptionDropdown from "@/components/SearchOptionDropdown";
import SearchResultCard from "@/components/SearchResultCard";
import SearchResultInfo from "@/components/SearchResultInfo";
import { useState } from "react";
import { useParams } from "react-router-dom";

export type SearchState = {
  searchQuery: string;
  page: number;
  selectedProduce: string[];
  sortOption: string;
};

const SearchPage = () => {
  //given the way lifecycle of react hooks works, bunch of rerendering, city could be undefined on first rerender
  const { city } = useParams();
  const [searchState, setSearchState] = useState<SearchState>({
    searchQuery: "",
    page: 1,
    selectedProduce: [],
    sortOption: "bestMatch",
  });

  //state maintained in parent each time component rerenders
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  //when city value
  const { results, isLoading } = userSearchFarms(searchState, city);

  /* state handler functions
  setSearchQuery
  resetSearch
  setPage
  setSelectedProduce
  setSortOption
  */

  const setSortOption = (sortOption: string) => {
    setSearchState((prevState) => ({
      ...prevState,
      sortOption,
      page: 1,
    }));
  };

  const setSelectedProduce = (selectedProduce: string[]) => {
    setSearchState((prevState) => ({
      ...prevState,
      selectedProduce,
      page: 1,
    }));
  };

  const setPage = (page: number) => {
    setSearchState((prevState) => ({
      ...prevState,
      page,
    }));
  };

  const setSearchQuery = (searchFormData: SearchForm) => {
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery: searchFormData.searchQuery,
      page: 1,
    }));
  };

  const resetSearch = () => {
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery: "",
      page: 1,
    }));
  };

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (!results?.data || !city) {
    return <span>No results found</span>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div id="produce-list">
        <ProduceFilter
          selectedProduce={searchState.selectedProduce}
          onChange={setSelectedProduce}
          isExpanded={isExpanded}
          onExpandedClick={() =>
            setIsExpanded((prevIsExpanded) => !prevIsExpanded)
          }
        />
      </div>
      <div id="main-content" className="flex flex-col gap-5">
        <SearchBar
          searchQuery={searchState.searchQuery}
          onSubmit={setSearchQuery}
          placeHolder="Search Produce or Farm"
          onReset={resetSearch}
        />

        <div className="flex justify-between flex-col gap-3 lg:flex-row">
          <SearchResultInfo total={results.pagination.total} city={city} />
          <SearchOptionDropdown
            sortOption={searchState.sortOption}
            onChange={(value) => setSortOption(value)}
          />
        </div>

        {results.data.map((farm) => (
          <SearchResultCard farm={farm} />
        ))}
        <PaginationSelector
          page={results.pagination.page}
          pages={results.pagination.pages}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
};

export default SearchPage;
