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

export function isAdmin(token: string) {
  return jwt.verify(token, JWT_SECRET);
}

export function authorizeRoles(...allowedRoles: string[]) {
  return (req: any, res: any, next: any) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ error: "Forbidden: insufficient role" });
    }
    next();
  };
}

