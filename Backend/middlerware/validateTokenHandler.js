import jwt from "jsonwebtoken";

const validateToken = (req, res, next) => {
  let token;
  let authHeader = req.headers.authorization; // Correct access to authorization header

  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1]; // Extract the token

    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "User is not authorized" }); // Return error if token verification fails
      }

      req.user = decoded.user; // Assign the decoded user data to req.user
      next(); // Proceed to the next middleware or route handler
    });
  } else {
    // If no token is provided, return an error
    return res.status(401).json({ message: "Token is missing or invalid" });
  }
};

export default validateToken;
