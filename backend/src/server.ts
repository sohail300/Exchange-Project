import express, { Request, Response } from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  console.log("Healthy Server");
  return res.status(200).json({ msg: "Healthy Server" });
});

app.use("/api/v1/order");
app.use("/api/v1/depth");
app.use("/api/v1/trades");
app.use("/api/v1/klines");
app.use("/api/v1/tickers");

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
