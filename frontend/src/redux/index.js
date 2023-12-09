import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: true,
  user: null,
  token: null,
  posts: [],
  notifications: [],
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
    setNotification: (state, action) => {
      const { key, value } = action.payload;
      state.notifications.push({ key, value });
    },
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.error("user friends non-existent :(");
      }
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post;
        return post;
      });
      state.posts = updatedPosts;
    },
    deleteFeedPost: (state, action) => {
      const postIdToDelete = action.payload.postId;
      state.posts = state.posts.filter((post) => post._id !== postIdToDelete);
    },
    updateComments: (state, action) => {
      const { postId, updatedComments } = action.payload;
      state.comments = {
        ...state.comments,
        [postId]: updatedComments,
      };
    },
  },
});

export const {
  setMode,
  setLogin,
  setLogOut,
  setPosts,
  setPost,
  setFriends,
  deleteFeedPost,
  updateComments,
  setNotification,
} = authSlice.actions;

export default authSlice.reducer;
