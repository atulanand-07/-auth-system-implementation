import { registerUser, loginUser } from "../services/user.service.js";

export const signup = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await registerUser(username, password); // resgisterUser is a service

    res.status(201).json({
      success: true,
      message: "User Registered Successfully!",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error signup",
      error: error.message,
    });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await loginUser(username, password);

    req.session.userId = user._id;
    res.status(200).json({
      success: true,
      message: "Login Successfull",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error Logging In.",
      error: error.message,
    });
  }
};


// no service is required here.
export const logout = async (req, res) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Could not log out",
          error: err.message,
        });
      }
      res.clearCookie("connect.sid"); // Clear the session cookie from the browser
      res.status(200).json({
        success: true,
        message: "Logout Successful",
      });
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error during logout",
      error: error.message,
    });
  }
};
