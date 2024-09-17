import { userSearchFarms } from "@/api/FarmApi";
import { useParams } from "react-router-dom";

const SearchPage = () => {
  //given the way lifecycle of react hooks works, bunch of rerendering, city could be undefined on first rerender
  const { city } = useParams();

  //when city value
  const { results } = userSearchFarms(city);

  return (
    <span>
      Winner searched for {city}{" "}
      <span>
        {results?.data.map((farm) => (
          <span>
            found - {farm.farmName}, {farm.city}
          </span>
        ))}
      </span>
    </span>
  );
};

export default SearchPage;
