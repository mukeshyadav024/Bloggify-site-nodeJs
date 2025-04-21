const { validateToken } = require("../services/authentication");

function checkForAuthentication(cookieName) {
  return (req, res, next) => {
    const tokenCookieValue = req.cookies[cookieName];

    if (!tokenCookieValue) {
      return next(); // early return if cookie not found
    }

    try {
      const userPayload = validateToken(tokenCookieValue);
      req.user = userPayload;
    } catch (error) {
      console.log("Invalid token:", error.message);
      // You can optionally clear the cookie here or handle unauthenticated access
      // res.clearCookie(cookieName);
    }

    return next(); // always call next only once
  };
}

module.exports = {
  checkForAuthentication,
};
