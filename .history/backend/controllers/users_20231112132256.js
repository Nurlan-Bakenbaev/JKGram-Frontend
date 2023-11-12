import User from "../models/User";
//READ
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user await User.findB
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
