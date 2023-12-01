import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setPosts } from "../../redux";
import PostWidget from "./PostWidget";

const PostsWidgets = ({ userId, isProfile = false }) => {
  console.log(userId)
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.auth.user.posts);
 
  const token = useSelector((state) => state.auth.token);

  const getPosts = async () => {
    const response = await fetch("http://localhost:3001/posts", {
      method: "GET",
      headers: { Authorization: `Bearer  ${token}` },
    });
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };
  const getUserPosts = async () => {
    const response = await fetch(`http://localhost:3001/posts/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer  ${token}` },
    });
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };
  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else getPosts();
  }, []); //eslint-disable-line
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
