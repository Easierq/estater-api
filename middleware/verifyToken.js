import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) return res.status(401).json({ message: "Not Authenticated!" });

  jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
    if (err) return res.status(403).json({ message: "Token is not Valid!" });
    req.userId = payload.id;

    next();
  });
};

export const verifyAdmin = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) return res.status(401).json({ message: "Not Authenticated!" });

  jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
    if (err) return res.status(403).json({ message: "Token is not Valid!" });
    if (!payload.isAdmin) {
      return res.status(403).json({ message: "Not authorized!" });
    }

    next();
  });
};

// USING HEADERS

export const verifyHeader = (req, res, next) => {
  const authHeader = req.headers.token;
  if (!authHeader || !authHeader.startsWith("Bearer "))
    return res.status(401).json({ message: "Not Authenticated!" });
  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Not Authenticated!" });

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: "Token is not Valid!" });
    req.user = user;
    next();
  });
};

export const verifyHeaderAdmin = (req, res, next) => {
  const authHeader = req.headers.token;
  if (!authHeader || !authHeader.startsWith("Bearer "))
    return res.status(401).json({ message: "Not Authenticated!" });
  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Not Authenticated!" });

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: "Token is not Valid!" });
    req.user = user;
    if (req.user.isAdmin) {
      next();
    } else {
      return res
        .status(403)
        .json({ message: "Only Admin is allowed to perform this operation!" });
    }
  });
};
