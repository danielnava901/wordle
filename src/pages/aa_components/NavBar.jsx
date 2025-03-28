import { Link } from "react-router";

const NavBar = () => {
  return (
    <div className="flex gap-2 w-full justify-center h-[45px] border-b-1">
      <Link to="/wordl" className="uppercase pointer underline">
        WORDL
      </Link>
    </div>
  );
};

export default NavBar;
