import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWTPayload } from "../types/JWTPayload";

async function auth(req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;

    if (authHeader) {
      const token = authHeader.split(" ")[1];

      if (token) {
        const payload: JWTPayload = jwt.verify(
          token,
          process.env.JWT_SECRET!
        ) as JWTPayload;

        if (payload) {
          req.headers["userid"] = payload.id;
          next();
        } else {
        }
      } else {
      }
    } else {
    }
  } catch (error) {
    console.error(error);
    return res.status(401).json({ msg: "Unauthorised!" });
  }
}
