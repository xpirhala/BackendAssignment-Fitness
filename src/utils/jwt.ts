//@ts-ignore
import jwt from "jsonwebtoken";
import { ROLE_TYPE } from "./enums";

const JWT_SECRET = process.env.JWT_SECRET; // store in .env!

export function generateToken(user: { id: number; email: string; role: string }) {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role }, // payload
    JWT_SECRET,
    { expiresIn: "10h" }
  );
}

export function verifyToken(token: string) {
  return jwt.verify(token, JWT_SECRET);
}

export function decodeToken(token: string) {
  return jwt.decode(token);
}

export function isAdmin(authHeader: string) {
  const token = authHeader.split(' ')[1];
  const decoded = jwt.decode(token);
  if(decoded.role === ROLE_TYPE.ADMIN) {
    return true;
  }
  return false;
}

export function getUserId(authHeader: string) {
  const token = authHeader.split(' ')[1];
  const decoded = jwt.decode(token);
  
  return decoded.id;
}



