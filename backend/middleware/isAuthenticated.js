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
    console.log(error.message);
  }
};
export { isAuthenticated };
