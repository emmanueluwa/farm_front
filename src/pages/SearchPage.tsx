import { userSearchFarms } from "@/api/FarmApi";
import SearchResultCard from "@/components/SearchResultCard";
import SearchResultInfo from "@/components/SearchResultInfo";
import { useParams } from "react-router-dom";

const SearchPage = () => {
  //given the way lifecycle of react hooks works, bunch of rerendering, city could be undefined on first rerender
  const { city } = useParams();

  //when city value
  const { results, isLoading } = userSearchFarms(city);

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (!results?.data || !city) {
    return <span>No results found</span>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div id="produce-list">insert produce here :)</div>
      <div id="main-content" className="flex flex-col gap-5">
        <SearchResultInfo total={results.pagination.total} city={city} />
        {results.data.map((farm) => (
          <SearchResultCard farm={farm} />
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
