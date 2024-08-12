export type MessageToEngine =
  | {
      type: "CREATE_ORDER";
      data: {
        market: string;
        price: string;
        quantity: string;
        side: "buy" | "sell";
        userId: string;
      };
    }
  | {
      type: "CANCEL_ORDER";
      data: {
        orderId: string;
        market: string;
      };
    }
  | {
      type: "GET_OPEN_ORDERS";
      data: {
        userId: string;
        market: string;
      };
    }
  | {
      type: "DEPTH";
      data: {
        symbol: string;
      };
    };
