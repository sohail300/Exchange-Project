import { createClient, RedisClientType } from "redis";
import { MessageToEngine } from "./types/MessageToEngine";
import { MessageFromOrderbook } from "./types/MessageFromOrderbook";

export class RedisManager {
  private queue: RedisClientType;
  private pubsub: RedisClientType;
  private static instance: RedisManager;

  constructor() {
    this.queue = createClient();
    this.queue.connect();
    this.pubsub = createClient();
    this.pubsub.connect();
  }

  public static getInstance() {
    if (this.instance) {
      this.instance = new RedisManager();
    }
    return this.instance;
  }

  public sendAndAwait(message: MessageToEngine) {
    return new Promise<MessageFromOrderbook>((resolve, reject) => {
      const id = this.getRandomClientId();
      this.pubsub.subscribe(id, (message) => {
        this.pubsub.unsubscribe(id);
        resolve(JSON.parse(message));
      });

      this.queue.lPush(
        "messages",
        JSON.stringify({
          clientId: id,
          message,
        })
      );
    });
  }

  private getRandomClientId() {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  }
}
