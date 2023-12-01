import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  mode: true,
  user: null,
  token: null,
  posts: [],
};
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = !state.mode;
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogOut: (state) => {
      state.user = null;
      state.token = null;
      console.log("User is Log out");
    },
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friens = action.payload.friends;
      } else {
        console.log("User friends non-exists");
      }
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post_id) return action.payload.post;
        return post;
      });
      state.posts = updatedPosts;
    },
  },
});
export const { setMode, setLogin, setLogOut, setPosts, setPost, setFriends } =
  authSlice.actions;
export default authSlice.reducer;
