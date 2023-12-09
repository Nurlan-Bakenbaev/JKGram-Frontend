import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useSelector } from "react-redux";

const SearchFriend = () => {
  const [searchQuery, setSearchQuery] = useState({ name: "" });
  const [foundUsers, setFoundUsers] = useState([]);
  const token = useSelector((state) => state.auth.token);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:3001/users/${encodeURIComponent(searchQuery.name)}`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = await response.json();
      console.log(data);
      setFoundUsers(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div>
      <form className="relative flex items-center">
        <input
          onChange={(e) => setSearchQuery({ name: e.target.value })}
          placeholder="Search..."
          className="relative p-1 pl-3 border drop-shadow-sm border-slate-300 text-[12px] 
            md:text-md outline-none
             text-black rounded"
          type="text"
        />
        <button type="submit"
          onClick={handleSearch}
          className="absolute right-3 text-blue-500 
           hover:text-green-500  hover:scale-110"
        >
          <SearchIcon />
        </button>
      </form>
      {/*foundUsers.length > 0 && (
        <div
          className=" absolute w-[200px] h-[25vh] bg-white border
         border-gray-300 rounded-md mt-1 shadow-md"
        >
          {foundUsers.map((user) => (
            <div key={user._id} className=" p-2 hover:bg-gray-100">
              <p className="text-sm">
                {user.firstName} {user.lastName}
              </p>
            </div>
          ))}
        </div>
      )*/}
    </div>
  );
};

export default SearchFriend;
