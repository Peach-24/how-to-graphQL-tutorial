const jwt = require("jsonwebtoken");
const APP_SECRET = "GraphQL-is-aw3some";

function getTokenPayload(token) {
  return jwt.verify(token, APP_SECRET);
}

function getUserId(req, authToken) {
  if (req) {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.replace("Bearer ", "");
      if (!token) {
        throw new Error("No token found");
      }
      const { userId } = getTokenPayload(token);
      return userId;
    }
    throw new Error("Not authenticated");
  }
}

module.exports = {
  APP_SECRET,
  getUserId,
};

/* 

The APP_SECRET is used to sign the JWTs which you’re issuing for your users.

The getUserId function is a helper function that you’ll call in resolvers which require authentication (such as post). It first retrieves the Authorization header (which contains the User’s JWT) from the context. It then verifies the JWT and retrieves the User’s ID from it. Notice that if that process is not successful for any reason, the function will throw an exception. You can therefore use it to “protect” the resolvers which require authentication.

*/
