import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
  try {
    let token = req.cookies.token;

    // Also check Authorization header for Bearer token
    if (
      !token &&
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    // Debug logging for production
    console.log("Cookie token:", req.cookies.token ? "present" : "missing");
    console.log(
      "Auth header:",
      req.headers.authorization ? "present" : "missing"
    );
    console.log("Final token:", token ? "present" : "missing");

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "user not authenticated",
      });
    }

    const decode = await jwt.verify(token, process.env.SECRET_KEY);
    if (!decode) {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }

    req.id = decode.userId;
    next();
  } catch (error) {
    console.log("Auth middleware error:", error.message);
    return res.status(401).json({
      success: false,
      message: "Authentication failed",
    });
  }
};
export { isAuthenticated };
