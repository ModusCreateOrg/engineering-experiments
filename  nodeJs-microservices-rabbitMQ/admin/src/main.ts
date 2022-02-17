import * as express from "express";
import { Request, Response } from "express";
import { Connection, createConnection } from "typeorm";
import { Item } from "./entity/item";
import * as amqp from "amqplib/callback_api";

const ITEM_CREATED = "ITEM-CREATED";
const ITEM_UPDATED = "ITEM-UPDATED";
const ITEM_DELETED = "ITEM-DELETED";

createConnection()
  .then((database: Connection) => {
    const itemRepo = database.getRepository(Item);

    amqp.connect("amqp://guest:guest@127.0.0.1:5672/", (error, connection) => {
      connection.createChannel((channelConnectionError, amqpChannel) => {
        if (channelConnectionError) {
          throw new Error(channelConnectionError);
        }

        const app = express();

        app.use(express.json());

        // fetch all items
        app.get("/api/items", async (request: Request, response: Response) => {
          const items = await itemRepo.find();
          response.json(items);
        });

        // create an item
        app.post("/api/items", async (request: Request, response: Response) => {
          const item = await itemRepo.create(request.body);
          const result = await itemRepo.save(item);
          amqpChannel.sendToQueue(
            ITEM_CREATED,
            Buffer.from(JSON.stringify(result))
          );
          return response.send(result);
        });

        // fetch one item by id
        app.get(
          "/api/items/:id",
          async (request: Request, response: Response) => {
            const item = await itemRepo.findOne(request.params.id);
            return response.send(item);
          }
        );

        // update one item by id
        app.put(
          "/api/items/:id",
          async (request: Request, response: Response) => {
            const item = await itemRepo.findOne(request.params.id);
            itemRepo.merge(item, request.body);
            const result = await itemRepo.save(item);
            amqpChannel.sendToQueue(
              ITEM_UPDATED,
              Buffer.from(JSON.stringify(result))
            );
            return response.send(result);
          }
        );

        // delete one item by id
        app.delete(
          "/api/items/:id",
          async (request: Request, response: Response) => {
            const result = await itemRepo.delete(request.params.id);
            amqpChannel.sendToQueue(
              ITEM_DELETED,
              Buffer.from(request.params.id)
            );
            return response.send(result);
          }
        );

        // buy one item
        app.post(
          "/api/items/:id/buy",
          async (request: Request, response: Response) => {
            const item = await itemRepo.findOne(request.params.id);
            if (item.totalItems >= 1) {
              item.totalItems--;
            } else {
              throw new Error("No Item left in inventory");
            }
            const result = await itemRepo.save(item);
            amqpChannel.sendToQueue(
              ITEM_UPDATED,
              Buffer.from(JSON.stringify(result))
            );
            return response.send(result);
          }
        );

        app.listen(5001);
        console.log("Listening on 5001")
        process.on("beforeExit", () => {
          connection.close();
        });
      });
    });
  })
  .catch((error) => {
    throw new Error(error);
  });
