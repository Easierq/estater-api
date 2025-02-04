import jwt from "jsonwebtoken";
import prisma from "../lib/prisma.js";

export const addTest = async (req, res) => {
  const { msg } = req.body;

  try {
    // HASH THE PASSWORD

    // CREATE A NEW USER AND SAVE TO DB
    const testff = await prisma.tester.create({
      data: {
        msg: msg,
      },
    });

    console.log(testff);

    res.status(201).json({ message: "Test created successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to create test!" });
  }
};

export const shouldBeLoggedIn = async (req, res) => {
  console.log(req.userId);
  res.status(200).json({ message: "You are Authenticated" });
};

export const shouldBeAdmin = async (req, res) => {
  const token = req.cookies.token;

  if (!token) return res.status(401).json({ message: "Not Authenticated!" });

  jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
    if (err) return res.status(403).json({ message: "Token is not Valid!" });
    if (!payload.isAdmin) {
      return res.status(403).json({ message: "Not authorized!" });
    }
  });

  res.status(200).json({ message: "You are Authenticated" });
};
