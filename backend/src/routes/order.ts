import { Router } from "express";
import { createOrder, deleteOrder, getOpenOrder } from "../controllers/order";

export const orderRouter = Router();

orderRouter.post("/", createOrder);
orderRouter.delete("/", deleteOrder);
orderRouter.get("/open", getOpenOrder);
