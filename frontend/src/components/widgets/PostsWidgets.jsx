import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setPosts } from "../../redux";
import PostWidget from "./PostWidget";
const PostsWidgets = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.auth.posts);
  const token = useSelector((state) => state.auth.token);
  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await fetch(
          "https://postgrammserver.onrender.com/post",
          {
            method: "GET",
            headers: { Authorization: `Bearer  ${token}` },
          }
        );
        const data = await response.json();
        const sortedPosts = [...data].sort((a, b) => {
          const timeA = new Date(a.createdAt).getTime();
          const timeB = new Date(b.createdAt).getTime();
          return timeB - timeA;
        });
        dispatch(setPosts({ posts: sortedPosts }));
      } catch (error) {
        console.error(error);
      }
    };
    const getUserPosts = async () => {
      const response = await fetch(`https://postgrammserver.onrender.com/post/${userId}`, {
        method: "GET",
        headers: { Authorization: `Bearer  ${token}` },
      });
      const data = await response.json();
      dispatch(setPosts({ posts: data }));
    };
    if (isProfile) {
      getUserPosts();
    } else getPosts();
  }, [token]); //eslint-disable-line
  return (
    <div>
      {posts?.map(
        ({
          _id,
          userId,
          firstName,
          lastName,
          description,
          likes,
          comments,
          userPicturePath,
          picturePath,
          location,
        }) => (
          <PostWidget
            key={_id}
            postId={_id}
            postUserId={userId}
            name={`${firstName} ${lastName}`}
            description={description}
            likes={likes}
            comments={comments}
            userPicturePath={userPicturePath}
            picturePath={picturePath}
            location={location}
          />
        )
      )}
    </div>
  );
};
export default PostsWidgets;
