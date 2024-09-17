import { useParams } from "react-router-dom";

const SearchPage = () => {
  const { city } = useParams();

  return <span>Winner searched for {city}</span>;
};

export default SearchPage;
