import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="border-b-2 border-b-green-800 py-6">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          to="/"
          className="text-3xl font-bold tracking-tight text-green-800"
        >
          FarmFrsh.com
        </Link>
      </div>
    </div>
  );
};

export default Header;
