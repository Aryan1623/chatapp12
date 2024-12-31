import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const JWT_SECRET = "my-secret";  // Use const or let for defining the secret key

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized - No Token Provided" });
    }

    // Verify the token and decode its payload
    const decoded = jwt.verify(token, JWT_SECRET);

    // If the token is valid, decoded will contain the payload (user info)
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Attach the user to the request object
    req.user = user;

    // Continue to the next middleware or route handler
    next();
  } catch (error) {
    console.log("Error in protectRoute middleware: ", error.message);

    // Handle different types of errors
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Unauthorized - Invalid Token" });
    }

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Unauthorized - Token Expired" });
    }

    // Generic error handling
    res.status(500).json({ message: "Internal server error" });
  }
};

