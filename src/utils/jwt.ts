//@ts-ignore
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET; // store in .env!

export function generateToken(user: { id: number; email: string; role: string }) {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role }, // payload
    JWT_SECRET,
    { expiresIn: "1h" }
  );
}

export function verifyToken(token: string) {
  return jwt.verify(token, JWT_SECRET);
}

export function decodeToken(token: string) {
  return jwt.decode(token);
}


