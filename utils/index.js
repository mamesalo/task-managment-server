import jwt from "jsonwebtoken";

export const createJWT = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {});

  // Change sameSite from strict to none when you deploy your app
  res.cookie("token", token, {
    // httpOnly: true,
    secure: true,
    sameSite: "None", //prevent CSRF attack
  });
};
