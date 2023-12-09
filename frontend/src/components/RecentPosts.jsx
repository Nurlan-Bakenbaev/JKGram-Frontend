import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ActionAreaCard from "./ActionAreaCard";

const RecentPosts = () => {
  const token = useSelector((state) => state.auth.token);
  const mode = useSelector((state) => state.auth.mode);
  const posts = useSelector((state) => state.auth.posts);
  const [post, setPosts] = useState(null);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await fetch("https://postgrammserver.onrender.com/post", {
          method: "GET",
          headers: { Authorization: `Bearer  ${token}` },
        });

        const data = await response.json();
        const sortedPosts = data.sort((a, b) => {
          const likesCountA = Object.values(a.likes).filter(Boolean).length;
          const likesCountB = Object.values(b.likes).filter(Boolean).length;
          return likesCountB - likesCountA;
        });
        setPosts(sortedPosts);
      } catch (error) {
        console.error(error);
      }
    };
    getPosts();
  }, [token, posts]);
  return (
    <div
      className={`flex  ${
        mode && "bg-[#3a3349] hover:bg-[#524869]"
      } flex-col gap-3 px-2 py-4 rounded-md drop-shadow-md`}
    >
      <h5 className="text-sm text-center"> Most liked Posts:</h5>
      {post
        ?.slice(0, 5)
        .map(
          ({ firstName, lastName, description, picturePath, _id, userId }) => (
            <div
              title="Recent Posts"
              className="hover:scale-105 duration-300"
              key={_id}
            >
              <ActionAreaCard
                name={`${firstName} ${lastName}`}
                userId={userId}
                picturePath={picturePath}
                description={description}
              />
            </div>
          )
        )}
    </div>
  );
};

export default RecentPosts;
