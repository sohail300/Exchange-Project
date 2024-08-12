export type MessageFromOrderbook =
  | {
      type: "ORDER_PLACED";
      payload: {
        orderId: string;
        executedQty: number;
        fills: [
          {
            price: string;
            qty: number;
            tradeId: number;
          }
        ];
      };
    }
  | {
      type: "ORDER_CANCELLED";
      payload: {
        orderId: string;
        executedQty: number;
        remainingQty: number;
      };
    }
  | {
      type: "OPEN_ORDERS";
      payload: {
        orderId: string;
        executedQty: number;
        price: string;
        quantity: string;
        side: "buy" | "sell";
        userId: string;
      }[];
    }
  | {
      type: "DEPTH";
      payload: {
        market: string;
        bids: [string, string][];
        asks: [string, string][];
      };
    };
