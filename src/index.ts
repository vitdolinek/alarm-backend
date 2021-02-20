import express from "express";
import "reflect-metadata";
import { createConnection } from "typeorm";
import cors from "cors";
import bodyParser from "body-parser";
import attackRouter from "./router/Attack";

const app = express();
const port = 8888;

app.use(cors());
app.use(bodyParser.json());

createConnection()
  .then(() => {
    app.use("/attack", attackRouter);
    app.listen(port, () =>
      console.log(`[server]: Server is running on port ${port}.`)
    );

    console.log(`[database]: Database is connected.`);
  })
  .catch((error) => console.log(error));
