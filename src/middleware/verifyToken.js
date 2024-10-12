import { Jwt } from "@web5/credentials";

async function verifyToken(req, res, next) {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return res
        .status(401)
        .json({ errors: ["Authorization header required"] });
    }

    const tokenParts = authHeader.split("Bearer ");
    if (tokenParts.length !== 2) {
      return res
        .status(401)
        .json({ errors: ["Authorization header format is Bearer <token>"] });
    }

    const token = await Jwt.verify({ jwt: tokenParts[1] });

    req.token = token;
    next();
  } catch (error) {
    return res.status(401).json({ errors: [error.message] });
  }
}

export default verifyToken;
