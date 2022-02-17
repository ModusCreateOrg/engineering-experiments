import * as express from "express";
import { Request, Response } from "express";
import { createConnection } from "typeorm";
import * as amqp from "amqplib/callback_api";
import { Item } from "./entity/item";
import axios from "axios";

const ITEM_CREATED = "ITEM-CREATED";
const ITEM_UPDATED = "ITEM-UPDATED";
const ITEM_DELETED = "ITEM-DELETED";

createConnection().then((db) => {
  const itemRepo = db.getMongoRepository(Item);

  amqp.connect("amqp://guest:guest@127.0.0.1:5672/", (error, connection) => {
    if (error) {
      throw new Error(error.message);
    }

    connection.createChannel((channelConnectionError, amqpChannel) => {
      if (channelConnectionError) {
        throw new Error(channelConnectionError.message);
      }

      amqpChannel.assertQueue(ITEM_CREATED, { durable: false });
      amqpChannel.assertQueue(ITEM_UPDATED, { durable: false });
      amqpChannel.assertQueue(ITEM_DELETED, { durable: false });

      const app = express();

      app.use(express.json());

      // fetch all items
      app.get("/api/items", async (request: Request, response: Response) => {
        const items = await itemRepo.find();
        return response.send(items);
      });

      // buy one item
      app.post(
        "/api/items/:id/buy",
        async (request: Request, response: Response) => {
          const item = await itemRepo.findOne(request.params.id);
          await axios.post(
            `http://localhost:5001/api/items/${item.adminId}/buy`,
            {}
          );
          item.totalItems--;
          await itemRepo.save(item);
          return response.send(item);
        }
      );


      amqpChannel.consume(
        ITEM_CREATED,
        async (msg) => {
          const createItemEvent: Item = JSON.parse(msg.content.toString());
          const item = new Item();
          item.adminId = createItemEvent.id;
          item.name = createItemEvent.name;
          item.imageUrl = createItemEvent.imageUrl;
          item.totalItems = createItemEvent.totalItems;
          await itemRepo.save(item);
          console.log(ITEM_CREATED);
        },
        { noAck: true }
      );

      amqpChannel.consume(
        ITEM_UPDATED,
        async (msg) => {
          const updateItemEvent: Item = JSON.parse(msg.content.toString());
          const item = await itemRepo.findOne({
            adminId: updateItemEvent.id,
          });
          itemRepo.merge(item, {
            name: updateItemEvent.name,
            imageUrl: updateItemEvent.imageUrl,
            totalItems: updateItemEvent.totalItems,
          });
          await itemRepo.save(item);
          console.log(ITEM_UPDATED);
        },
        { noAck: true }
      );

      amqpChannel.consume(ITEM_DELETED, async (msg) => {
        const adminId = parseInt(msg.content.toString());
        await itemRepo.deleteOne({ adminId });
        console.log(ITEM_DELETED);
      });

      app.listen(5002);
      console.log("Listening on 5002");
      process.on("beforeExit", () => {
        connection.close();
      });
    });
  });
});
